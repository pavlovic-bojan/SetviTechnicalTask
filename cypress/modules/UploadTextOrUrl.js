import statusCodes from '../fixtures/statusCodes.json'
import endpoint from '../fixtures/endpoint.json'
import input from '../fixtures/input.json'

export default class UploadTextOrUrl {
    constructor() {
        this.endpoint = endpoint || {}
        this.input = input || {}
        this.statusCodes = statusCodes || {}

        this.expectedProductTerms = {
            cuttingBoard: ['Cutting Board'],
            storageContainer: ['4 Qt Container', 'Food Storage Container']
        }

        this.inputMeta = null
        this.initInputMeta()
    }

    initInputMeta() {
        this.inputMeta = {
            input1: {
                apis: [
                    { endpointKey: 'api1', statusKey: 'SUCCESS' },
                    { endpointKey: 'api3', statusKey: 'NOT_FOUND' }
                ],
                expectedProductKey: 'cuttingBoard',
            },
            input2: {
                apis: [
                    { endpointKey: 'api1', statusKey: 'SUCCESS' },
                    { endpointKey: 'api3', statusKey: 'NOT_FOUND' }
                ],
                expectedProductKey: 'storageContainer',
            },
            input3: {
                apis: [
                    { endpointKey: 'api2', statusKey: 'SUCCESS' },
                    { endpointKey: 'api3', statusKey: 'NOT_FOUND' }
                ],
                expectedProductKey: 'cuttingBoard',
            },
            input4: {
                apis: [
                    { endpointKey: 'api2', statusKey: 'SUCCESS' },
                    { endpointKey: 'api3', statusKey: 'NOT_FOUND' }
                ],
                expectedProductKey: 'storageContainer',
            },
            input5: {
                apis: [
                    { endpointKey: 'api1', statusKey: 'BAD_REQUEST' },
                    { endpointKey: 'api2', statusKey: 'BAD_REQUEST' },
                    { endpointKey: 'api3', statusKey: 'NOT_FOUND' }
                ],
                expectedProductKey: null,
            },
        }
    }

    upload(textUpload, failOnStatusCode = true, endpointKey) {
        const url = this.endpoint[endpointKey]
        if (!url) throw new Error(`Unknown endpoint key "${endpointKey}"`)
        if (textUpload === undefined || textUpload === null) {
            throw new Error(`Missing required text for endpoint "${endpointKey}"`)
        }

        const field = endpointKey === 'api2' ? 'url' : 'text'
        const requestBody = {
            [field]: textUpload,
            topK: 3,
            threshold: 0.8,
            enablePrivateLabelRanking: false,
            enableStockProductRanking: false,
            enableVendorRanking: false
        }

        return cy.postApi(url, requestBody, { failOnStatusCode })
    }

    uploadAndValidateStatus(text, statusKey, failOnStatusCode = true, endpointKey) {
        const expected = this.statusCodes[statusKey]
        if (!expected) throw new Error(`Unknown statusKey "${statusKey}" in statusCodes`)

        return this.upload(text, failOnStatusCode, endpointKey).then(response => {
            expect(response.status).to.eq(expected.httpStatus)

            const body = response.body

            if (!body || Object.keys(body).length === 0) {
                cy.log('Response body is empty – skipping body field assertions')
            } else if (body.error_code !== undefined) {
                expect(body.error_code).to.eq(expected.apiStatus)
                expect(body.IsSuccess).to.eq(expected.isSuccess)
            } else if (body.status !== undefined && body.isSuccess !== undefined) {
                expect(body.status).to.eq(expected.apiStatus)
                expect(body.isSuccess).to.eq(expected.isSuccess)
            } else {
                cy.log('Unexpected response body structure:', JSON.stringify(body, null, 2))
            }
            return cy.wrap(response)
        })
    }

    uploadAndValidateMatchedProducts(text, expectedProductKey, statusKey, endpointKey) {
        const expectedTerms = this.expectedProductTerms[expectedProductKey] || []

        return this.uploadAndValidateStatus(text, statusKey, true, endpointKey).then(response => {
            const matchedItems = response.body.result?.matchedItems || []
            expect(matchedItems).to.be.an('array').that.is.not.empty

            const foundTerm = matchedItems.some(item =>
                expectedTerms.some(term =>
                    item.productName.toLowerCase().includes(term.toLowerCase())
                )
            )
            expect(foundTerm, 'Expected product terms not found in matched items').to.be.true

            return response
        })
    }

    validateInputKey(inputKey, apiKey) {
        const endpoint = this.endpoint[apiKey]
        if (!endpoint) throw new Error(`Unknown endpoint key "${apiKey}"`)

        const textUpload = this.input[inputKey]
        if (textUpload === undefined) throw new Error(`Unknown input key "${inputKey}"`)

        const apiMeta = this.inputMeta[inputKey]?.apis.find(api => api.endpointKey === apiKey)
        const expectedStatusCode = apiMeta?.statusKey === 'SUCCESS' ? 200 : 400
        const failOnStatusCode = expectedStatusCode === 200

        return this.uploadAndValidateStatus(textUpload, apiMeta.statusKey, failOnStatusCode, apiKey)
    }

     getResolvedApiAndStatus(inputMeta, apiIndex = 0) {
        const api = inputMeta.apis[apiIndex]
        return {
            endpointKey: api.endpointKey,
            statusKey: api.statusKey,
        }
    }

    getValidInputApiCombinations() {
        if (!this.inputMeta) this.initInputMeta()

        const combinations = []

        for (const inputKey in this.inputMeta) {
            const apis = this.inputMeta[inputKey].apis || []
            apis.forEach(api => {
                if (
                    api.statusKey === 'SUCCESS' ||
                    api.statusKey === 'NOT_FOUND' ||
                    api.statusKey === 'BAD_REQUEST'
                ) {
                    combinations.push([inputKey, api.endpointKey])
                }
            })
        }

        return combinations
    }

}
