const { getDefaultConfig } = require('expo/metro-config');

// Fix for Radon IDE / React Native IDE cross-drive path bug on Windows.
// The IDE sets RADON_IDE_LIB_PATH using a VS Code URI-style path (e.g., /c:/Users/...)
// On Windows, Metro's path.resolve treats a leading slash as the root of the CURRENT drive.
// So if the project is on D:, path.resolve('D:\\', '/c:/Users/...') results in D:\c:\Users\...
// We must strip the leading slash from the environment variable if it precedes a drive letter.
if (process.platform === 'win32' && process.env.RADON_IDE_LIB_PATH) {
  // If it starts with a slash or backslash followed by a drive letter (e.g. /c:/ or \c:\)
  if (/^[\\/][a-zA-Z]:[\\/]/.test(process.env.RADON_IDE_LIB_PATH)) {
    process.env.RADON_IDE_LIB_PATH = process.env.RADON_IDE_LIB_PATH.substring(1);
  }
}

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

module.exports = config;
