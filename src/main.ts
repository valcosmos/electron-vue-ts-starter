import path from 'node:path'
import process from 'node:process'
import { app, BrowserWindow, ipcMain } from 'electron'
import start from 'electron-squirrel-startup'
// import puppeteer from 'puppeteer'
import puppeteer from 'puppeteer-core'
import { getChromeExecutablePath } from './util'

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (start) {
  app.quit()
}

function createWindow() {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      preload: path.join(__dirname, 'preload.js'),
    },
  })

  // and load the index.html of the app.
  if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL)
  }
  else {
    mainWindow.loadFile(path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`))
  }

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()
}

async function runPuppeteerTask(url: string) {
  const browser = await puppeteer.launch({
    headless: false,
    executablePath: getChromeExecutablePath(),
    args: [
      '--window-size=1920,1080', // Set the desired window size
    ],
  })

  // Get the default opened page
  const pages = await browser.pages()
  const page = pages[0] // Use the first page which is the default blank page

  await page.setViewport({ width: 1920, height: 1080 })

  await page.goto(url)
  const title = await page.title()
  // await browser.close()
  return title
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

ipcMain.handle('run-puppeteer', async (event, url) => {
  try {
    const title = await runPuppeteerTask(url)
    // const title = 'hello world'
    return title
  }
  catch (error) {
    console.error('Puppeteer error:', error)
    throw error
  }
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
