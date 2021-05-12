const electron = require('electron');
// Module to control application life.
const app = electron.app;
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow;

const path = require('path');
const url = require('url');

// //import SQLite3 and Bluebird
// const { sqlite3 } = require('sqlite3')
// const Promise = require('bluebird');


// import the following to deal with pdf
const fs = require('fs');
const os = require('os');
const ipc = electron.ipcMain;
const shell = electron.shell;

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

function createWindow() {
    // Create the browser window.
    mainWindow = new BrowserWindow({ width: 800, height: 600, webPreferences: { nodeIntegration: true } });

    // and load the index.html of the app.
    const startUrl = process.env.ELECTRON_START_URL || url.format({
        pathname: path.join(__dirname, '/../../build/index.html'),
        protocol: 'file:',
        slashes: true
    });
    mainWindow.loadURL(startUrl);
    // Open the DevTools.
    mainWindow.webContents.openDevTools();

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
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', function () {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit()
    }
});

app.on('activate', function () {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (mainWindow === null) {
        createWindow()
    }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.




// *Boom* Create PDF
ipc.on('print-to-pdf', event => {
    const pdfPath = path.join(os.tmpdir(), 'result.pdf');
    const win = BrowserWindow.fromWebContents(event.sender);

    win.webContents.printToPDF({
        marginsType: 0,
        printBackground: false,
        printSelectionOnly: false,
        landscape: false,
        pageSize: 'A4',
        scaleFactor: 100
    }, (error, data) => {
        if (error) return console.log(error.message);

        fs.writeFile(pdfPath, data, err => {
            if (err) return console.log(err.message);
            shell.openExternal('file://' + pdfPath);
            event.sender.send('wrote-pdf', pdfPath);
        })

    })
});

        //SNIPPET FOR OUTPUTTING CURRENT WEB CONTENT TO PDF 
        // ipcRenderer.send('print-to-pdf');
        // ipcRenderer.on('wrote-pdf', (event, path) => {
        //     const message = `Wrote pdf to : ${path}`;
        //     alert(message);
        // })
