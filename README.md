# lerna rollup yarn library starter

- Produces ES modules and CJS modules for node
- UMD bundles for client-side

## Making library edits

Edit and save changes to components and util source files

Updated cross-repo imports to newest versions

`lerna bootstrap`

Run linting on all packages

`lerna run lint`

Run tests on all packages

`lerna run test`

Compile libraries with Rollup

`yarn build`

Commit changes to libraries

`git commit -am “commit message”`

Publish updated packages to NPM

`lerna publish`

### For CI build environment

Remove existing compiled packages, lint and test

`lerna run check-packages`
