// Allinone Desktop Application - Main Process
const { app, BrowserWindow, ipcMain, shell } = require('electron');
const path = require('path');
const fs = require('fs');

let mainWindow;
let userDataPath;
let userToolsPath;
let preferencesPath;
let notesPath;

function initPaths() {
    userDataPath = app.getPath('userData');
    userToolsPath = path.join(userDataPath, 'user-tools.json');
    preferencesPath = path.join(userDataPath, 'preferences.json');
    notesPath = path.join(userDataPath, 'notes.json');
}

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 1400,
        height: 900,
        minWidth: 1000,
        minHeight: 700,
        frame: false,
        titleBarStyle: 'hidden',
        backgroundColor: '#0a0a0f',
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
            webviewTag: true,
            preload: path.join(__dirname, 'preload.js')
        },
        icon: path.join(__dirname, 'assets', 'icon.png')
    });

    mainWindow.loadFile('index.html');

    if (process.argv.includes('--dev')) {
        mainWindow.webContents.openDevTools();
    }

    mainWindow.on('closed', () => {
        mainWindow = null;
    });
}

function loadUserTools() {
    try {
        if (fs.existsSync(userToolsPath)) {
            const data = fs.readFileSync(userToolsPath, 'utf-8');
            return JSON.parse(data);
        }
    } catch (error) {
        console.error('Error loading user tools:', error);
    }
    return [];
}

function saveUserTools(tools) {
    try {
        fs.writeFileSync(userToolsPath, JSON.stringify(tools, null, 2));
        return true;
    } catch (error) {
        console.error('Error saving user tools:', error);
        return false;
    }
}

function loadPreferences() {
    try {
        if (fs.existsSync(preferencesPath)) {
            const data = fs.readFileSync(preferencesPath, 'utf-8');
            return JSON.parse(data);
        }
    } catch (error) {
        console.error('Error loading preferences:', error);
    }
    return {
        sidebarCollapsed: false,
        favorites: [],
        pinnedTools: [],
        lastSelectedTool: null,
        comparisonAutoSubmit: false
    };
}

function savePreferences(prefs) {
    try {
        fs.writeFileSync(preferencesPath, JSON.stringify(prefs, null, 2));
        return true;
    } catch (error) {
        console.error('Error saving preferences:', error);
        return false;
    }
}

// Notes functions
function loadNotes() {
    try {
        if (fs.existsSync(notesPath)) {
            const data = fs.readFileSync(notesPath, 'utf-8');
            return JSON.parse(data);
        }
    } catch (error) {
        console.error('Error loading notes:', error);
    }
    return [];
}

function saveNotes(notes) {
    try {
        fs.writeFileSync(notesPath, JSON.stringify(notes, null, 2));
        return true;
    } catch (error) {
        console.error('Error saving notes:', error);
        return false;
    }
}

function setupIpcHandlers() {
    ipcMain.handle('get-user-tools', () => loadUserTools());

    ipcMain.handle('add-user-tool', (event, tool) => {
        const tools = loadUserTools();
        const newTool = {
            ...tool,
            id: `user-${Date.now()}`,
            isPreInstalled: false,
            isLLM: false,
            createdAt: new Date().toISOString()
        };
        tools.push(newTool);
        saveUserTools(tools);
        return newTool;
    });

    ipcMain.handle('update-user-tool', (event, toolId, updates) => {
        const tools = loadUserTools();
        const index = tools.findIndex(t => t.id === toolId);
        if (index !== -1) {
            tools[index] = { ...tools[index], ...updates };
            saveUserTools(tools);
            return tools[index];
        }
        return null;
    });

    ipcMain.handle('delete-user-tool', (event, toolId) => {
        const tools = loadUserTools();
        const filtered = tools.filter(t => t.id !== toolId);
        saveUserTools(filtered);
        return true;
    });

    ipcMain.handle('get-preferences', () => loadPreferences());
    ipcMain.handle('save-preferences', (event, prefs) => savePreferences(prefs));

    // Notes handlers
    ipcMain.handle('get-notes', () => loadNotes());
    ipcMain.handle('save-notes', (event, notes) => saveNotes(notes));

    // External URL handler
    ipcMain.handle('open-external', (event, url) => shell.openExternal(url));

    ipcMain.on('window-minimize', () => mainWindow?.minimize());
    ipcMain.on('window-maximize', () => {
        mainWindow?.isMaximized() ? mainWindow.unmaximize() : mainWindow?.maximize();
    });
    ipcMain.on('window-close', () => mainWindow?.close());
    ipcMain.handle('window-is-maximized', () => mainWindow?.isMaximized() || false);
}

app.whenReady().then(() => {
    initPaths();
    setupIpcHandlers();
    createWindow();
    console.log('Allinone app ready!');
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
});

app.on('web-contents-created', (event, contents) => {
    contents.setWindowOpenHandler(({ url }) => {
        if (contents.getType() === 'webview') return { action: 'allow' };
        shell.openExternal(url);
        return { action: 'deny' };
    });
});
