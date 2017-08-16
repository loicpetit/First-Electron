import * as electron from 'electron';
// Module to control application life.
const app = electron.app
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow

const path = require('path')
const url = require('url')

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow: Electron.BrowserWindow

let createWindow = () => {
  // Create the browser window.
  mainWindow = new BrowserWindow({width: 600, height: 400})

  // and load the index.html of the app.
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, '../renderer/index.html'),
    protocol: 'file:',
    slashes: true
  }))

  // Open the DevTools.
  mainWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

var ipc = electron.ipcMain;

//  Taches
let taches: any = [];
function sendTaches(sender: any){
  sender.send('taches', taches);
}
ipc.on('taches', function (event: any, arg: any) {
  sendTaches(event.sender);
})
ipc.on('taches.create', function (event: any, arg: any) {
  let tache = arg;
  tache.id = computeTacheId();
  taches.push(tache);
  sendTaches(event.sender);
})

function computeTacheId(){
    let maxId = 0;
    for(let tache of taches){
      if(tache.id > maxId){
        maxId = tache.id;
      }
    }
    return maxId + 1;
}