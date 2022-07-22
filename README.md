# Github Action - Install Required Modules

This action installs all Powershell modules specified in a
[`RequiredModules data file`](https://github.com/alt3/install-required-modules-action/blob/main/dev/RequiredModules.psd1)
.

## Usage

```
- uses: alt3/install-required-modules-action@main
  with:
    dataFile: 'path/to/your/RequiredModules.psd1'
```

Input `dataFile` is optional and defaults to `${{github.workspace}}/RequiredModules.psd1`.

## Good to Know

This action uses the `Install-RequiredModule` script [found here](https://github.com/Jaykul/RequiredModules).

## Contributing

Development information found in the
[dev](https://github.com/alt3/install-required-modules-action/tree/main/dev)
folder.
