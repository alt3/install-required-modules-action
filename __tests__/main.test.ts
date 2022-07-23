import * as cp from 'child_process'
import * as path from 'path'

describe('Main', function () {
  it('throws an error when RequiredModules data file cannot be found', async () => {
    // process.env['INPUT_DATAFILE'] = 'Robbie'

    const np = process.execPath
    const ip = path.join(__dirname, '..', 'dist', 'index.js')

    // ------------------------------------------
    const options: cp.SpawnSyncOptions = {
      env: process.env
      // stdio: 'pipe'
      // encoding: 'utf-8'
      // stdio: ['pipe', 'pipe', 'inherit']
    }

    const ls = cp.spawnSync(np, [ip], options)

    console.log(ls)
  })
})
