import * as cache from '@actions/cache'
import * as core from '@actions/core'
import * as cp from 'child_process'
import * as fs from 'fs'

async function run(): Promise<void> {
  try {
    // Make sure the data file exists
    const dataFile = core.getInput('dataFile')
    core.debug(`inputs.dataFile = ${dataFile}`)

    if (!fs.existsSync(dataFile)) {
      throw new Error(
        `Cannot find Required Modules data file '${core.getInput(
          'dataFile'
        )}' because it does not exist`
      )
    }

    // Use Powershell to calculate hash of data file
    const hash = String(
      cp.execFileSync('pwsh', [
        '-noprofile',
        '-nologo',
        '-noninteractive',
        '-command',
        `$(Get-FileHash "${dataFile}").Hash`
      ])
    ).trim()

    core.debug(`dataFile hash = ${hash}`)

    // Use Powershell to detect psModulePath
    const psModulePath = String(
      cp.execFileSync('pwsh', [
        '-noprofile',
        '-nologo',
        '-noninteractive',
        '-command',
        '$Env:PSModulePath.Split([IO.Path]::PathSeparator).Where({$_.StartsWith($Home)})'
      ])
    ).trim()

    core.debug(`psModulePath = ${psModulePath}`)

    // Determine cache key
    const os =
      process.env['ImageOS'] ||
      process.env['RUNNER_OS'] ||
      process.env['OS'] ||
      ''
    const cacheKey = [os, 'psmodules', hash.trim()].join('-')

    core.debug(`Cache key = ${cacheKey}`)

    // ---------------------------------------------------------
    // Try to restore modules from cache UNLESS we are using act
    // because they do not support actions.cache (yet).
    // ---------------------------------------------------------
    let cacheHit

    if (process.env['ACT']) {
      core.debug(
        `ACT detected: skipping cache restore (https://github.com/nektos/act/issues/285)`
      )
    } else {
      core.debug(`Attempting cache restore`)
      cacheHit = await cache.restoreCache([psModulePath], cacheKey)
    }

    if (cacheHit) {
      core.debug(`Modules restored successfully: ${cacheHit}`)

      return
    }

    // ---------------------------------------------------------
    // still here so no cache hit
    // ---------------------------------------------------------
    core.debug(`Downloading the Install-RequiredModule script`)

    core.debug(
      cp
        .execFileSync('pwsh', [
          '-noprofile',
          '-nologo',
          '-noninteractive',
          '-command',
          `Install-Script Install-RequiredModule`,
          '-Scope CurrentUser',
          '-MinimumVersion 5.0.0'
        ])
        .toString()
        .trim()
    )

    // Use Powershell to get path to the installer script
    const scriptPath = String(
      cp.execFileSync('pwsh', [
        '-noprofile',
        '-nologo',
        '-noninteractive',
        '-command',
        `Join-Path -Path (Get-InstalledScript -Name Install-RequiredModule).InstalledLocation -ChildPath Install-RequiredModule.ps1`
      ])
    ).trim()

    core.debug(`Script path = ${scriptPath}`)

    // install modules
    core.debug(`Installing modules`)

    core.debug(
      cp
        .execFileSync('pwsh', [
          '-noprofile',
          '-nologo',
          '-noninteractive',
          `-file`,
          scriptPath,
          '-RequiredModulesFile',
          dataFile,
          '-TrustRegisteredRepositories',
          '-Scope',
          'CurrentUser'
        ])
        .toString()
    )

    // List installed modules
    core.debug(`Installed modules:`)

    cp.execFileSync(
      'pwsh',
      [
        '-noprofile',
        '-nologo',
        '-noninteractive',
        '-command',
        `Get-InstalledModule | Select-Object -Property Name, Version, Repository`
      ],
      {
        stdio: 'inherit'
      }
    )

    // ---------------------------------------------------------
    // Create cache UNLESS we are using act
    // ---------------------------------------------------------
    if (process.env['ACT']) {
      core.debug(`ACT detected: skipping cache creation`)

      return
    }

    // create cache key
    core.debug(`Caching module path`)
    const cacheId = await cache.saveCache([psModulePath], cacheKey)

    core.debug(`Cache created successfully: ${cacheId}`)
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)
  }
}

run()
