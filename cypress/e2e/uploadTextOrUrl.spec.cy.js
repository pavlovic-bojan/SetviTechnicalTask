import UploadTextOrUrl from '../modules/UploadTextOrUrl'

const uploadTextOrUrl = new UploadTextOrUrl()

describe('UploadFreeText API tests - individual - valid inputs', () => {
    const validInputs = ['input1', 'input2', 'input3', 'input4']

    validInputs.forEach(inputKey => {
        it(`should upload text and validate success response with matched items ${inputKey}`, () => {
            const meta = uploadTextOrUrl.inputMeta[inputKey]
            const { endpointKey, statusKey } = uploadTextOrUrl.getResolvedApiAndStatus(meta, 0)
            const expectedProductKey = meta.expectedProductKey
            const inputText = uploadTextOrUrl.input[inputKey]

            return uploadTextOrUrl.uploadAndValidateMatchedProducts(
                inputText,
                expectedProductKey,
                statusKey,
                endpointKey
            )
        })
    })
})

describe('UploadFreeText API tests - individual - invalid inputs', () => {
    it(`should upload text and validate failure response with invalid input5`, () => {
        const meta = uploadTextOrUrl.inputMeta.input5
        const { endpointKey, statusKey } = uploadTextOrUrl.getResolvedApiAndStatus(meta, 0)
        const inputText = uploadTextOrUrl.input.input5

        return uploadTextOrUrl.uploadAndValidateStatus(
            inputText,
            statusKey,
            false,
            endpointKey
        )
    })
})

describe('UploadFreeText API tests - only valid combinations', () => {
    const validCombinations = uploadTextOrUrl.getValidInputApiCombinations()

    validCombinations.forEach(([inputKey, apiKey]) => {
        it(`should validate ${inputKey} with ${apiKey}`, () => {
            return uploadTextOrUrl.validateInputKey(inputKey, apiKey)
        })
    })
})
