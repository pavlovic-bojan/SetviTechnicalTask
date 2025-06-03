import UploadFreeText from '../modules/UploadFreeText.js'

const uploadFreeText = new UploadFreeText()

describe('UploadFreeText API tests - individual - valid inputs', () => {

    it(`should upload text and validate success response with matched items input1 = ${uploadFreeText.input.input1}`, () => {
        return uploadFreeText.uploadAndValidateMatchedProducts(uploadFreeText.input.input1.toString(), uploadFreeText.inputStatusMap.input1.toString())
    })

    it(`should upload text and validate success response with matched items input2 = ${uploadFreeText.input.input2}`, () => {
        return uploadFreeText.uploadAndValidateMatchedProducts(uploadFreeText.input.input2.toString(), uploadFreeText.inputStatusMap.input2.toString())
    })

})

describe('UploadFreeText API tests - individual - invalid inputs', () => {

    it(`should upload text and validate success response with matched items input3 = ${uploadFreeText.input.input3.toString()}`, () => {
        return uploadFreeText.uploadAndValidateStatus(uploadFreeText.input.input3.toString(), uploadFreeText.inputStatusMap.input3.toString(), false)
    })

})

describe('UploadFreeText API tests - parametrized', () => {
    Object.keys(uploadFreeText.input).forEach(inputKey => {
        const testText = uploadFreeText.getTestTextForInputKey(inputKey)
        const statusKey = uploadFreeText.getStatusKeyForInputKey(inputKey)
        const preview = testText.slice(0, 40).replace(/\n/g, ' ') + '...'

        it(`should validate ${statusKey} for input "${preview}"`, () => {
            return uploadFreeText.validateInputKey(inputKey)
        })
    })
})
