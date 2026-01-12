// Minimal Electron test - main.js
console.log('=== Electron Diagnostics ===');
console.log('Node version:', process.version);
console.log('Chrome version:', process.versions.chrome);
console.log('Electron version:', process.versions.electron);
console.log('process.type:', process.type);
console.log('process.resourcesPath:', process.resourcesPath);
console.log('');

// Try require without node_modules override
console.log('Attempting to require electron...');
var path = require('path');

// Check if we can access internal electron
try {
    var electron = require('electron');
    console.log('require("electron") result:', typeof electron, electron);
} catch (e) {
    console.log('require("electron") failed:', e.message);
}

// For Node.js 22 compatibility, try using process.electronBinding
console.log('');
console.log('Checking process bindings...');
console.log('process.electronBinding:', typeof process.electronBinding);

if (typeof process.electronBinding === 'function') {
    try {
        var app = process.electronBinding('app');
        console.log('App binding:', app);
    } catch (e) {
        console.log('App binding failed:', e.message);
    }
}

// Check module resolution
console.log('');
console.log('Module resolution paths:');
console.log('  module.paths:', module.paths ? module.paths.slice(0, 3) : 'N/A');
console.log('  __dirname:', __dirname);

// Try direct path resolution
console.log('');
console.log('Checking for electron/common/reset-search-paths...');
try {
    require('electron/common/reset-search-paths');
    console.log('reset-search-paths loaded successfully');
} catch (e) {
    console.log('reset-search-paths not found:', e.message);
}

process.exit(0);
