# Developers

## Requirements

- [nektos/act](https://github.com/nektos/act) - Run your GitHub Actions locally!
- [Docker](https://www.docker.com/get-started/)
- [Node.js](https://nodejs.org/) 18 or higher

## Installation

```
git clone git@github.com:alt3/install-required-modules-action.git
cd install-required-modules-action.git
npm run install
```

## Workflow

### 1. Make code changes

Make TypeScript code changes in `src/`.

### 2. Compile the action

Always re-build the action package to `dist/`:

```
npm run compile
```

### 3. Run action locally!

Run the newly built action package using act and the `act.yml` workflow in this folder.

```
act -W dev
```

### 4. Run code tests

To run tests against the TypeScript code:

```
npm run test
```

### 5. Run linting

To run eslint and prettier against `*.ts` files in `src` and `__tests__`:

```
npm run test
```

### 6. Commit changes

Files in `dist` are the actual Github Action so make sure to include them along with your code changes.
