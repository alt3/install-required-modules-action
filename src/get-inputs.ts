import * as core from '@actions/core'
import * as path from 'path'

interface Inputs {
  dataFile: string // Path to the Required Modules data file
}

export function getInputs(): Inputs {
  const result = {} as unknown as Inputs

  result.dataFile = core.getInput('dataFile') || 'RequiredModules.psd1'

  // if (!result.dataFile) {
  //   result.dataFile = process.env['GITHUB_WORKSPACE']
  //     ? path.join(process.env['GITHUB_WORKSPACE'], 'RequiredModules.psd1')
  //     : 'RequiredModules.psd1'
  // }

  return result
}
