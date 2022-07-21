import * as core from '@actions/core'
import * as cache from '@actions/cache'
import {wait} from './wait'
import {restoreCache} from './restoreCache' // custom function used for Install-RequiredModules

const path = require('path')
const fs = require('fs')
const {execFileSync} = require('child_process')

async function run(): Promise<void> {
  try {
    const ms: string = core.getInput('milliseconds')
    core.debug(`Waiting ${ms} milliseconds ...`) // debug is only output if you set the secret `ACTIONS_STEP_DEBUG` to true

    core.debug(new Date().toTimeString())
    await wait(parseInt(ms, 10))
    core.debug(new Date().toTimeString())

    core.setOutput('time', new Date().toTimeString())

    // try finding the RequiredModules.psd1 where they said it would be
    var requiredModules = [
      core.getInput('requiredModules-path'),
      path.resolve('RequiredModules.psd1'),
      path.resolve('RequiredModules', 'RequiredModules.psd1')
    ].filter(file => fs.existsSync(file))[0]

    const hash = String(
      execFileSync('pwsh', [
        '-noprofile',
        '-nologo',
        '-noninteractive',
        '-command',
        '$(Get-FileHash "' + requiredModules + '").Hash'
      ])
    ).trim()
    const psModulePath = String(
      execFileSync('pwsh', [
        '-noprofile',
        '-nologo',
        '-noninteractive',
        '-command',
        '$Env:PSModulePath.Split([IO.Path]::PathSeparator).Where({$_.StartsWith($Home)})'
      ])
    ).trim()

    const os =
      process.env['RUNNER_OS'] ||
      process.env['OS'] ||
      process.env['ImageOS'] ||
      ''
    var key = [os, 'psmodules', hash.trim()].join('-')
    core.info("Restore: '" + psModulePath + "' from cache: " + key)
    var cacheKey = await restoreCache([psModulePath], key)
    if (cacheKey) {
      core.info('Cache hit: ' + cacheKey)
    } else {
      const command = path.resolve(__dirname, 'Install-RequiredModule.ps1')
      core.info('PS> ' + command + ' -RequiredModulesFile ' + requiredModules)
      core.info(
        execFileSync('pwsh', [
          '-noprofile',
          '-nologo',
          '-noninteractive',
          '-file',
          command,
          '-RequiredModulesFile',
          requiredModules,
          '-TrustRegisteredRepositories',
          '-Scope',
          'CurrentUser'
        ])
      )
      cacheKey = await cache.saveCache([psModulePath], key)
      core.info('New cache [' + cacheKey + '] for: ' + psModulePath)
    }
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)
  }
}

run()
