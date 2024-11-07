import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import process from 'node:process'

export function getChromeExecutablePath() {
  const platform = os.platform()

  switch (platform) {
    case 'win32': {
      const localAppData = process.env.LOCALAPPDATA || ''
      const programFiles = process.env['PROGRAMFILES(X86)'] || process.env.PROGRAMFILES || ''
      const possiblePaths = [
        path.join(localAppData, 'Google\\Chrome\\Application\\chrome.exe'),
        path.join(programFiles, 'Google\\Chrome\\Application\\chrome.exe'),
      ]
      return possiblePaths.find(fs.existsSync) || 'Chrome executable not found'
    }
    case 'darwin': {
      const macPath = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
      return fs.existsSync(macPath) ? macPath : 'Chrome executable not found'
    }
    case 'linux': {
      const linuxPaths = [
        '/usr/bin/google-chrome',
        '/usr/local/bin/google-chrome',
        '/usr/bin/chromium-browser',
        '/usr/bin/chromium',
      ]
      return linuxPaths.find(fs.existsSync) || 'Chrome executable not found'
    }
    default:
      return 'Unsupported platform'
  }
}

// Example usage
// const chromePath = getChromeExecutablePath()
// console.log(`Chrome executable path: ${chromePath}`)
