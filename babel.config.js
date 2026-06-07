// Fix for Radon IDE / React Native IDE cross-drive path bug on Windows.
// Strip the leading slash from URI-style paths so Babel and Metro don't resolve them to the wrong drive.
if (process.platform === 'win32') {
  const envVarsToFix = ['RADON_IDE_LIB_PATH', 'EXPO_ROUTER_IMPORT_MODE_PLUGIN'];
  envVarsToFix.forEach((key) => {
    if (process.env[key] && /^[\\/][a-zA-Z]:[\\/]/.test(process.env[key])) {
      process.env[key] = process.env[key].substring(1);
    }
  });
}

module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
  };
};
