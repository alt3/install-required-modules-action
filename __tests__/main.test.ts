import * as cp from 'child_process'
import * as path from 'path'

describe('Main', function () {
  it('throws the expected error when RequiredModules data file cannot be found', async () => {
    const np = process.execPath
    const ip = path.join(__dirname, '..', 'dist', 'index.js')
    const spawn = cp.spawnSync(np, [ip])

    expect(spawn.status).toBe(1)

    expect(spawn.stdout.toString()).toMatch(
      "::error::Cannot find RequiredModules data file '' because it does not exist"
    )
  })
})
