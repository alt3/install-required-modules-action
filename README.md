# Github Action - Install Required Modules

This action installs all PowerShell modules specified in a
[`Required Modules data file`](https://github.com/alt3/install-required-modules-action/blob/main/dev/RequiredModules.psd1)
by executing the
[Install-RequiredModule](https://github.com/Jaykul/RequiredModules)
script.

## Usage

```
- uses: alt3/install-required-modules-action@main
  with:
    dataFile: 'path/to/your/RequiredModules.psd1'
```

To use the default data file path `${{github.workspace}}/RequiredModules.psd1`:

```
- uses: alt3/install-required-modules-action@main
```

## Devs

Development information found in the
[dev](https://github.com/alt3/install-required-modules-action/tree/main/dev)
folder.
