const { contextBridge, ipcRenderer } = require('electron');

// Expose safe APIs to the renderer process
contextBridge.exposeInMainWorld('electronAPI', {
    // User tools management
    getUserTools: () => ipcRenderer.invoke('get-user-tools'),
    addUserTool: (tool) => ipcRenderer.invoke('add-user-tool', tool),
    updateUserTool: (toolId, updates) => ipcRenderer.invoke('update-user-tool', toolId, updates),
    deleteUserTool: (toolId) => ipcRenderer.invoke('delete-user-tool', toolId),

    // Preferences
    getPreferences: () => ipcRenderer.invoke('get-preferences'),
    savePreferences: (prefs) => ipcRenderer.invoke('save-preferences', prefs),

    // Notes management
    getNotes: () => ipcRenderer.invoke('get-notes'),
    saveNotes: (notes) => ipcRenderer.invoke('save-notes', notes),

    // External links
    openExternal: (url) => ipcRenderer.invoke('open-external', url),

    // Window controls
    minimizeWindow: () => ipcRenderer.send('window-minimize'),
    maximizeWindow: () => ipcRenderer.send('window-maximize'),
    closeWindow: () => ipcRenderer.send('window-close'),
    isMaximized: () => ipcRenderer.invoke('window-is-maximized')
});
