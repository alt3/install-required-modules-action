[![Build Status](https://img.shields.io/endpoint.svg?url=https%3A%2F%2Factions-badge.atrox.dev%2Falt3%2Finstall-required-modules-action%2Fbadge%3Fref%3Dmain&style=flat-square)](https://actions-badge.atrox.dev/alt3/install-required-modules-action/goto?ref=main)

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
