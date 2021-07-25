const { withNxMetro } = require('nx-react-native-expo');
const { getDefaultConfig } = require('@expo/metro-config');
// const { mergeConfig } = require('metro-config');

const defaultConfig = getDefaultConfig(__dirname);


defaultConfig.resolver.resolverMainFields.push('sbmodern', 'main');
defaultConfig.transformer.getTransformOptions = async () => ({
  transform: {
    experimentalImportSupport: false,
    inlineRequires: false,
  }
})

module.exports = withNxMetro(defaultConfig);
