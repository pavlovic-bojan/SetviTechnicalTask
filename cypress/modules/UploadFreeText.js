import statusCodes from '../fixtures/statusCodes.json'

class UploadFreeText {
    constructor() {
        this.endpoint = '/rfq/upload-free-text'

        this.expectedTermsMap = {
            SUCCESS: ['Cutting Board'],
            SUCCESS2: ['4 Qt Container', 'Food Storage Container']
        }

        this.input = {
            input1: ['Choice 24" x 18" x 1/2" Green Polyethylene Cutting Board'],
            input2: ['Choice 4 Qt. White Square Polypropylene Food Storage Container and Green Lid - 6/Pack'],
            input3: ['']
        }

        this.inputStatusMap = {
            input1: 'SUCCESS',
            input2: 'SUCCESS2',
            input3: 'BAD_REQUEST'
        }
    }

    getTestTextForInputKey(inputKey) {
        return this.input[inputKey][0] || ''
    }

    getStatusKeyForInputKey(inputKey) {
        return this.inputStatusMap[inputKey]
    }

    upload(text, failOnStatusCode = true) {
        const requestBody = {
            text,
            topK: 3,
            threshold: 0.8,
            enablePrivateLabelRanking: false,
            enableStockProductRanking: false,
            enableVendorRanking: false
        }
        return cy.postApi(this.endpoint, requestBody, { failOnStatusCode })
    }

    uploadAndValidateStatus(text, expectedStatusKey) {
        const failOnStatusCode = expectedStatusKey !== this.inputStatusMap.input3.toString()

        return this.upload(text, failOnStatusCode).then(response => {
            const expected = statusCodes[expectedStatusKey]

            expect(response.status).to.eq(expected.httpStatus)

            if (expectedStatusKey === this.inputStatusMap.input3.toString()) {
                expect(response.body.error_code).to.eq(expected.apiStatus)
                expect(response.body.IsSuccess).to.eq(expected.isSuccess)
            } else {
                expect(response.body.status).to.eq(expected.apiStatus)
                expect(response.body.isSuccess).to.eq(expected.isSuccess)
            }

            return response
        })
    }

    uploadAndValidateMatchedProducts(text, statusKey = this.inputStatusMap.input1.toString()) {
        const expectedTerms = this.expectedTermsMap[statusKey] || []

        return this.uploadAndValidateStatus(text, statusKey).then(response => {
            const matchedItems = response.body.result.matchedItems
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

    validateInputKey(inputKey) {
        const text = this.getTestTextForInputKey(inputKey)
        const statusKey = this.getStatusKeyForInputKey(inputKey)

        if (statusKey === this.inputStatusMap.input1 || statusKey === this.inputStatusMap.input2) {
            return this.uploadAndValidateMatchedProducts(text, statusKey)
        } else {
            const failOnStatus = statusKey !== this.inputStatusMap.input3.toString()
            return this.uploadAndValidateStatus(text, statusKey, failOnStatus)
        }
    }

}

export default UploadFreeText
