import {getInputs} from '../src/get-inputs'

describe('getInputs()', function () {
  it("input 'dataFile' defaults to 'RequiredModules.psd1'", async () => {
    const inputs = getInputs()

    expect(inputs.dataFile).toEqual(
      expect.stringMatching('RequiredModules.psd1$')
    )
  })

  it("input 'dataFile' respects provided value", async () => {
    process.env['INPUT_DATAFILE'] = 'some/custom/DataFile.psd1'
    const inputs = getInputs()

    expect(inputs.dataFile).toEqual('some/custom/DataFile.psd1')
  })
})
