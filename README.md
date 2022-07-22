# Github Action - Install Required Modules

This action executes the
[Install-RequiredModule](https://github.com/Jaykul/RequiredModules)
script to install all PowerShell modules specified in your
 [`RequiredModules data file`](https://github.com/alt3/install-required-modules-action/blob/main/dev/RequiredModules.psd1)
.

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
