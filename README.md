# Nx Expo + Storybook React Native

Works on iOS, and Android (but obscured by status bar). Web doesn't work, yet -- nor does MDX style stories.

Note: Also works with bare-bones RN apps very handily!

![Recording of Storybook in iOS simulator](screen-recording.gif)

## Steps to Recreate

### 1. Generate Environment

Create normal `nx-react-native-expo` workspace + expo app, by [following the instructions](https://github.com/JacopoPatroclo/nx-react-native-expo):

### 2. Adapt RN Storybook Setup Instructions

Then `cd` into your app directory and follow the really excellent [`storybookjs/react-native instructions`](https://github.com/storybookjs/react-native/blob/next-6.0/v6README.md), with a couple modifications

Note: Install the Storybook dependencies to the root `package.json`

Adapt the metro config:

```
const { withNxMetro } = require('nx-react-native-expo');
const { getDefaultConfig } = require('@expo/metro-config');

const defaultConfig = getDefaultConfig(__dirname);


defaultConfig.resolver.resolverMainFields.push('sbmodern', 'main');
defaultConfig.transformer.getTransformOptions = async () => ({
  transform: {
    experimentalImportSupport: false,
    inlineRequires: false,
  }
})

module.exports = withNxMetro(defaultConfig);
```

### 3. Create Nx workspace command for 'prestart'

Add the `prestart` command from the `storybookjs/react-native `instructions as a workspace command with a `cwd` definition pointing to your app directory

```
        "prestart": {
          "executor": "@nrwl/workspace:run-commands",
          "options": {
            "commands": ["sbn-get-stories"],
            "cwd": "apps/expo-test-app"
          }
        },
```

## Next Steps

- [ ] try with library
- [ ] try with root level config inheritance (like @nrwl/storybook)
- [ ] look into MDX support
- [ ] look into web support
- [ ] create generator/schematic?
