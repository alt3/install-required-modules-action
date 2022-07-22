# DEV

Requirements:

- [Act](https://github.com/nektos/act)
- [Docker (for Windows)](https://docs.docker.com/desktop/install/windows-install/)

To run act using the local repository as the action:

```bash
act -W dev
```

To build a new version of the local action in folder `dist`:

```bash
npm run build && npm run package
```
