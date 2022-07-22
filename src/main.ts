import * as core from '@actions/core'

async function run(): Promise<void> {
  try {
    const dataFile = core.getInput('dataFile')

    core.info(`DATA_FILE = ${dataFile}`)
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)
  }
}

run()
