// Allinone Desktop App - Main Renderer

// State management
const state = {
  tools: [],
  userTools: [],
  preferences: {
    sidebarCollapsed: false,
    favorites: [],
    pinnedTools: [],
    lastSelectedTool: null,
    comparisonAutoSubmit: false
  },
  notes: [],
  currentNote: null,
  currentTool: null,
  comparisonMode: false,
  notepadMode: false,
  selectedLLMs: [],
  searchQuery: '',
  notesSearchQuery: '',
  autoSaveTimeout: null
};

// DOM Elements
const elements = {
  sidebar: document.getElementById('sidebar'),
  sidebarNav: document.getElementById('sidebar-nav'),
  searchInput: document.getElementById('search-input'),
  toggleSidebar: document.getElementById('btn-toggle-sidebar'),
  addToolBtn: document.getElementById('btn-add-tool'),
  notepadBtn: document.getElementById('btn-notepad'),
  compareLLMBtn: document.getElementById('btn-compare-llm'),
  homeScreen: document.getElementById('home-screen'),
  comparisonMode: document.getElementById('comparison-mode'),
  singleWebview: document.getElementById('single-webview'),
  notepadView: document.getElementById('notepad-view'),
  mainWebview: document.getElementById('main-webview'),
  webviewLoading: document.getElementById('webview-loading'),
  quickAccessGrid: document.getElementById('quick-access-grid'),
  inspector: document.getElementById('inspector'),
  inspectorContent: document.getElementById('inspector-content'),
  toggleInspector: document.getElementById('btn-toggle-inspector'),
  addToolModal: document.getElementById('add-tool-modal'),
  addToolForm: document.getElementById('add-tool-form'),
  closeModalBtn: document.getElementById('btn-close-modal'),
  cancelAddBtn: document.getElementById('btn-cancel-add'),
  comparisonInput: document.getElementById('comparison-input'),
  llmCheckboxes: document.getElementById('llm-checkboxes'),
  comparisonWebviews: document.getElementById('comparison-webviews'),
  exitComparisonBtn: document.getElementById('btn-exit-comparison'),
  compareBtn: document.getElementById('btn-compare'),
  autoSubmitToggle: document.getElementById('auto-submit-toggle'),
  minimizeBtn: document.getElementById('btn-minimize'),
  maximizeBtn: document.getElementById('btn-maximize'),
  closeBtn: document.getElementById('btn-close'),
  // Notepad elements
  notesList: document.getElementById('notes-list'),
  notesSearch: document.getElementById('notes-search'),
  noteTitle: document.getElementById('note-title'),
  noteContent: document.getElementById('note-content'),
  noteTimestamp: document.getElementById('note-timestamp'),
  noteStatus: document.getElementById('note-status'),
  newNoteBtn: document.getElementById('btn-new-note'),
  deleteNoteBtn: document.getElementById('btn-delete-note'),
  closeNotepadBtn: document.getElementById('btn-close-notepad')
};

// LLM Input Selectors for injection - Updated with more robust selectors
const LLM_SELECTORS = {
  'chatgpt': {
    input: '#prompt-textarea, div#prompt-textarea, div[id="prompt-textarea"], div.ProseMirror[contenteditable="true"], div[contenteditable="true"][class*="ProseMirror"], textarea[placeholder*="Message"], div[contenteditable="true"][data-placeholder*="Message"]',
    submit: 'button[data-testid="send-button"], button[aria-label="Send prompt"], form button[type="submit"], button[class*="send"]:not([disabled])',
    waitFor: '#prompt-textarea, div.ProseMirror',
    isContentEditable: true,
    needsLogin: false
  },
  'gemini': {
    // Gemini uses a contenteditable div with class "ql-editor" or inside rich-textarea
    input: '.ql-editor[contenteditable="true"], rich-textarea .ql-editor, div.ql-editor, div[contenteditable="true"][aria-label*="Enter"], div[contenteditable="true"][data-placeholder*="Enter"], div[contenteditable="true"].input-area, textarea.text-input, div[contenteditable="true"] p.ql-block',
    submit: 'button[aria-label="Send message"], button.send-button-container button, button[mattooltip="Send message"], button[aria-label*="Send"], button.mdc-icon-button[aria-label*="Send"], button[data-test-id="send-button"]',
    waitFor: '.ql-editor, div[contenteditable="true"]',
    isContentEditable: true,
    needsLogin: true
  },
  'claude': {
    // Claude uses ProseMirror editor
    input: 'div.ProseMirror[contenteditable="true"], div[contenteditable="true"].ProseMirror, div[contenteditable="true"][enterkeyhint="enter"], div[data-placeholder*="How can Claude help"], fieldset div[contenteditable="true"], div.prose-mirror-content, div[contenteditable="true"][class*="input"]',
    submit: 'button[aria-label="Send Message"], button[aria-label="Send message"], button.bg-accent-main-100, button[class*="send"]:not([disabled]), fieldset button:last-child, button svg[viewBox*="arrow"]',
    waitFor: 'div.ProseMirror, div[contenteditable="true"]',
    isContentEditable: true,
    needsLogin: true
  },
  'deepseek': {
    input: 'textarea#chat-input, textarea[placeholder*="Send a message"], textarea.chat-input, textarea[placeholder*="message"], div[contenteditable="true"]',
    submit: 'button#send-button, button[type="submit"], button.send-btn, button[class*="send"]:not([disabled]), div.ds-icon-button',
    waitFor: 'textarea',
    isContentEditable: false,
    needsLogin: false
  },
  'qwen': {
    input: 'textarea[placeholder], textarea.chat-input, textarea[class*="input"], div[contenteditable="true"], textarea',
    submit: 'button[type="submit"], button.send-button, button[class*="send"]:not([disabled]), button[aria-label*="send"]',
    waitFor: 'textarea',
    isContentEditable: false,
    needsLogin: false
  },
  'kimi': {
    input: 'textarea[placeholder], div[contenteditable="true"], textarea.chat-textarea, textarea',
    submit: 'button[type="submit"], button.send-btn, button[class*="send"]:not([disabled])',
    waitFor: 'textarea',
    isContentEditable: false,
    needsLogin: false
  },
  'zai': {
    input: 'textarea[placeholder], div[contenteditable="true"], textarea',
    submit: 'button[type="submit"], button.send-button, button[class*="send"]:not([disabled])',
    waitFor: 'textarea',
    isContentEditable: false,
    needsLogin: false
  },
  'metaai': {
    input: 'textarea[placeholder*="Message"], textarea[aria-label*="Message"], div[contenteditable="true"], textarea',
    submit: 'button[type="submit"], button[aria-label*="Send"], button[class*="send"]:not([disabled])',
    waitFor: 'textarea',
    isContentEditable: false,
    needsLogin: false
  },
  'smartattend': {
    input: '#prompt-textarea, div#prompt-textarea, div.ProseMirror[contenteditable="true"], div[contenteditable="true"][class*="ProseMirror"]',
    submit: 'button[data-testid="send-button"], button[aria-label="Send prompt"], form button[type="submit"]',
    waitFor: '#prompt-textarea, div.ProseMirror',
    isContentEditable: true,
    needsLogin: false
  }
};

// External domains that should open in browser (auth, OAuth, redirects)
const EXTERNAL_DOMAINS = [
  'accounts.google.com',
  'login.microsoftonline.com',
  'auth0.com',
  'oauth',
  'signin',
  'signup',
  'login',
  'authenticate',
  'sso.',
  'auth.',
  'id.google.com',
  'appleid.apple.com',
  'facebook.com/login',
  'github.com/login',
  'twitter.com/oauth',
  'linkedin.com/oauth',
  'discord.com/oauth',
  'accounts.anthropic.com',
  'clerk.',
  'supabase.co/auth',
  'firebase.google.com',
  'cognito',
  'okta.com',
  'onelogin.com',
  'captcha',
  'recaptcha',
  'hcaptcha',
  'challenge',
  'verify'
];

// Initialize app
async function init() {
  // Load tools
  state.tools = typeof PRE_INSTALLED_TOOLS !== 'undefined' ? PRE_INSTALLED_TOOLS : [];
  state.userTools = await window.electronAPI.getUserTools();
  state.preferences = await window.electronAPI.getPreferences();
  state.notes = await window.electronAPI.getNotes();

  // Apply preferences
  if (state.preferences.sidebarCollapsed) {
    elements.sidebar.classList.add('collapsed');
  }
  if (state.preferences.comparisonAutoSubmit && elements.autoSubmitToggle) {
    elements.autoSubmitToggle.checked = true;
  }

  // Render UI
  renderSidebar();
  renderQuickAccess();
  renderLLMCheckboxes();

  // Setup event listeners
  setupEventListeners();
  setupWebviewListeners();
  setupNotepadListeners();
}

// Render sidebar with categories and tools
function renderSidebar() {
  const categories = typeof CATEGORIES !== 'undefined' ? CATEGORIES : [];
  const allTools = [...state.tools, ...state.userTools];
  const filteredTools = filterTools(allTools);
  const pinnedToolIds = state.preferences.pinnedTools || [];

  let html = '';

  // Render pinned section first
  if (pinnedToolIds.length > 0) {
    const pinnedTools = pinnedToolIds
      .map(id => allTools.find(t => t.id === id))
      .filter(Boolean)
      .filter(t => filterTools([t]).length > 0);

    if (pinnedTools.length > 0) {
      html += `
            <div class="pinned-section">
              <div class="pinned-header">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
                Pinned
              </div>
              ${pinnedTools.map(tool => renderToolItem(tool, true)).join('')}
            </div>
            `;
    }
  }

  categories.forEach(category => {
    const categoryTools = filteredTools.filter(t => t.category === category && !pinnedToolIds.includes(t.id));
    if (categoryTools.length === 0) return;

    html += `
      <div class="category" data-category="${category}">
        <div class="category-header">
          <svg class="category-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M6 9l6 6 6-6"/>
          </svg>
          <span class="category-name">${category}</span>
          <span class="category-count">${categoryTools.length}</span>
        </div>
        <div class="category-tools" style="max-height: ${categoryTools.length * 40}px">
          ${categoryTools.map(tool => renderToolItem(tool, false)).join('')}
        </div>
      </div>
    `;
  });

  // Custom category for user tools
  const customTools = filteredTools.filter(t => t.category === 'Custom' && !pinnedToolIds.includes(t.id));
  if (customTools.length > 0) {
    html += `
      <div class="category" data-category="Custom">
        <div class="category-header">
          <svg class="category-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M6 9l6 6 6-6"/>
          </svg>
          <span class="category-name">Custom Tools</span>
          <span class="category-count">${customTools.length}</span>
        </div>
        <div class="category-tools" style="max-height: ${customTools.length * 40}px">
          ${customTools.map(tool => renderToolItem(tool, false)).join('')}
        </div>
      </div>
    `;
  }

  elements.sidebarNav.innerHTML = html;

  // Add category toggle listeners
  document.querySelectorAll('.category-header').forEach(header => {
    header.addEventListener('click', () => {
      header.parentElement.classList.toggle('collapsed');
    });
  });

  // Add tool click listeners
  document.querySelectorAll('.tool-item').forEach(item => {
    item.addEventListener('click', (e) => {
      if (e.target.closest('.pin-btn')) return; // Don't trigger if pin button clicked
      const toolId = item.dataset.toolId;
      const tool = [...state.tools, ...state.userTools].find(t => t.id === toolId);
      if (tool) {
        selectTool(tool);
      }
    });
  });

  // Add pin button listeners
  document.querySelectorAll('.pin-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const toolId = btn.dataset.toolId;
      togglePinTool(toolId);
    });
  });
}

function renderToolItem(tool, isPinned) {
  const isActive = state.currentTool?.id === tool.id;
  const initials = tool.name.slice(0, 2).toUpperCase();
  const pinnedClass = isPinned ? 'pinned' : '';

  return `
    <div class="tool-item ${isActive ? 'active' : ''} ${pinnedClass}" data-tool-id="${tool.id}">
      <div class="tool-icon">${initials}</div>
      <span class="tool-name">${tool.name}</span>
      ${tool.isPreInstalled ? '<span class="tool-badge">Curated</span>' : ''}
      <button class="pin-btn" data-tool-id="${tool.id}" title="${isPinned ? 'Unpin' : 'Pin'}">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="${isPinned ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>
      </button>
    </div>
  `;
}

function togglePinTool(toolId) {
  const pinnedTools = state.preferences.pinnedTools || [];
  const index = pinnedTools.indexOf(toolId);

  if (index === -1) {
    pinnedTools.push(toolId);
  } else {
    pinnedTools.splice(index, 1);
  }

  state.preferences.pinnedTools = pinnedTools;
  window.electronAPI.savePreferences(state.preferences);
  renderSidebar();
}

function filterTools(tools) {
  if (!state.searchQuery) return tools;
  const query = state.searchQuery.toLowerCase();
  return tools.filter(t =>
    t.name.toLowerCase().includes(query) ||
    t.category.toLowerCase().includes(query) ||
    (t.description && t.description.toLowerCase().includes(query))
  );
}

// Render quick access on home screen
function renderQuickAccess() {
  const popularTools = state.tools.filter(t => t.isLLM).slice(0, 8);

  elements.quickAccessGrid.innerHTML = popularTools.map(tool => `
    <div class="quick-access-card" data-tool-id="${tool.id}">
      <div class="quick-access-icon">${tool.name.slice(0, 2).toUpperCase()}</div>
      <span class="quick-access-name">${tool.name}</span>
    </div>
  `).join('');

  // Add click listeners
  document.querySelectorAll('.quick-access-card').forEach(card => {
    card.addEventListener('click', () => {
      const toolId = card.dataset.toolId;
      const tool = state.tools.find(t => t.id === toolId);
      if (tool) {
        selectTool(tool);
      }
    });
  });
}

// Render LLM checkboxes for comparison mode
function renderLLMCheckboxes() {
  const llmTools = state.tools.filter(t => t.isLLM);

  elements.llmCheckboxes.innerHTML = llmTools.map(tool => `
    <label class="llm-checkbox" data-tool-id="${tool.id}">
      <input type="checkbox" value="${tool.id}">
      <span>${tool.name}</span>
    </label>
  `).join('');

  // Add change listeners
  document.querySelectorAll('.llm-checkbox input').forEach(checkbox => {
    checkbox.addEventListener('change', () => {
      updateSelectedLLMs();
    });
  });
}

function updateSelectedLLMs() {
  const checkboxes = document.querySelectorAll('.llm-checkbox input:checked');
  state.selectedLLMs = Array.from(checkboxes).map(cb => cb.value);

  // Update checkbox styling
  document.querySelectorAll('.llm-checkbox').forEach(label => {
    const checkbox = label.querySelector('input');
    label.classList.toggle('selected', checkbox.checked);
  });

  // Limit to 5 selections
  if (state.selectedLLMs.length >= 5) {
    document.querySelectorAll('.llm-checkbox input:not(:checked)').forEach(cb => {
      cb.disabled = true;
    });
  } else {
    document.querySelectorAll('.llm-checkbox input').forEach(cb => {
      cb.disabled = false;
    });
  }

  // Render comparison webviews
  renderComparisonWebviews();
}

function renderComparisonWebviews() {
  if (state.selectedLLMs.length === 0) {
    elements.comparisonWebviews.innerHTML = `
      <div style="flex: 1; display: flex; flex-direction: column; align-items: center; justify-content: center; color: var(--text-muted); text-align: center; padding: 20px;">
        <p style="font-size: 16px; margin-bottom: 12px;">Select up to 5 LLMs to compare</p>
        <p style="font-size: 13px; opacity: 0.8;">⚠️ Some LLMs require you to sign in first</p>
        <p style="font-size: 13px; opacity: 0.8;">⚠️ Some may need manual input if auto-injection fails</p>
        <p style="font-size: 13px; opacity: 0.8;">🔗 Login pages will open in your browser automatically</p>
      </div>
    `;
    return;
  }

  const llmTools = state.selectedLLMs.map(id => state.tools.find(t => t.id === id)).filter(Boolean);

  elements.comparisonWebviews.innerHTML = llmTools.map(tool => `
    <div class="comparison-webview-wrapper" data-tool-id="${tool.id}">
      <div class="comparison-webview-header">
        <div class="tool-icon">${tool.name.slice(0, 2).toUpperCase()}</div>
        <span>${tool.name}</span>
      </div>
      <webview 
        src="${tool.url}" 
        partition="persist:allinone-${tool.id}" 
        id="webview-${tool.id}"
        webpreferences="contextIsolation=no, nodeIntegration=no, javascript=yes"
        allowpopups
      ></webview>
    </div>
  `).join('');

  // Setup webview listeners for external navigation
  setTimeout(() => {
    state.selectedLLMs.forEach(toolId => {
      const webview = document.getElementById(`webview-${toolId}`);
      if (webview) {
        setupComparisonWebviewListeners(webview, toolId);
      }
    });
  }, 100);
}

function setupComparisonWebviewListeners(webview, toolId) {
  webview.addEventListener('will-navigate', (e) => {
    if (shouldOpenExternal(e.url)) {
      e.preventDefault();
      window.electronAPI.openExternal(e.url);
    }
  });

  webview.addEventListener('new-window', (e) => {
    e.preventDefault();
    window.electronAPI.openExternal(e.url);
  });
}

function shouldOpenExternal(url) {
  try {
    const urlStr = url.toLowerCase();
    const urlObj = new URL(url);
    const hostname = urlObj.hostname.toLowerCase();

    return EXTERNAL_DOMAINS.some(domain => {
      const d = domain.toLowerCase();
      // If domain definition contains slash, check full URL
      if (d.includes('/')) {
        return urlStr.includes(d);
      }
      // Otherwise check hostname inclusion
      return hostname.includes(d);
    });
  } catch {
    return false;
  }
}

// Inject input into all selected LLM webviews
async function injectInputToLLMs() {
  const inputText = elements.comparisonInput.value.trim();
  if (!inputText) {
    showNotification('Please enter a prompt to compare', 'warning');
    return;
  }

  if (state.selectedLLMs.length === 0) {
    showNotification('Please select at least 2 LLMs to compare', 'warning');
    return;
  }

  // Update button state
  elements.compareBtn.disabled = true;
  elements.compareBtn.innerHTML = `
    <svg class="spinning" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <circle cx="12" cy="12" r="10" stroke-dasharray="30" stroke-dashoffset="10"/>
    </svg>
    <span>Sending...</span>
  `;

  const results = [];

  for (const toolId of state.selectedLLMs) {
    const webview = document.getElementById(`webview-${toolId}`);
    const wrapper = document.querySelector(`.comparison-webview-wrapper[data-tool-id="${toolId}"]`);

    if (!webview) {
      console.log(`Webview not found for ${toolId}`);
      results.push({ toolId, success: false });
      continue;
    }

    if (wrapper) {
      wrapper.classList.add('sending');
    }

    let success = false;
    const safeText = JSON.stringify(inputText);

    // Get LLM-specific selectors
    const llmConfig = LLM_SELECTORS[toolId] || {
      input: 'textarea, div[contenteditable="true"]',
      submit: 'button[type="submit"], button[class*="send"]',
      isContentEditable: false
    };

    try {
      // Build LLM-specific injection script
      const injectionScript = `
        (function() {
          try {
            const text = ${safeText};
            const llmId = "${toolId}";
            
            // LLM-specific selectors
            const inputSelectors = ${JSON.stringify(llmConfig.input.split(', '))};
            const submitSelectors = ${JSON.stringify(llmConfig.submit.split(', '))};
            
            // Find input element
            let inputEl = null;
            for (const sel of inputSelectors) {
              try {
                const el = document.querySelector(sel.trim());
                if (el && (el.offsetParent !== null || el.offsetHeight > 0)) {
                  inputEl = el;
                  console.log('[' + llmId + '] Found input:', sel);
                  break;
                }
              } catch(e) {}
            }
            
            // Fallback: try generic selectors
            if (!inputEl) {
              const fallbacks = ['#prompt-textarea', 'div.ProseMirror', '.ql-editor', 'div[contenteditable="true"]', 'textarea'];
              for (const sel of fallbacks) {
                const el = document.querySelector(sel);
                if (el && (el.offsetParent !== null || el.offsetHeight > 0)) {
                  inputEl = el;
                  console.log('[' + llmId + '] Found input via fallback:', sel);
                  break;
                }
              }
            }
            
            if (!inputEl) {
              console.log('[' + llmId + '] No input element found');
              return { success: false, error: 'No input found', llmId: llmId };
            }
            
            // Focus the input
            inputEl.focus();
            inputEl.click();
            
            // Inject text based on element type
            if (inputEl.contentEditable === 'true' || inputEl.isContentEditable) {
              // Contenteditable element
              inputEl.innerHTML = '';
              inputEl.focus();
              
              // Method 1: execCommand
              let inserted = document.execCommand('insertText', false, text);
              
              // Method 2: If execCommand failed, set directly
              if (!inputEl.textContent || inputEl.textContent.trim() === '') {
                if (inputEl.classList.contains('ql-editor')) {
                  // Gemini uses Quill
                  inputEl.innerHTML = '<p>' + text + '</p>';
                } else if (inputEl.classList.contains('ProseMirror')) {
                  // ChatGPT/Claude use ProseMirror
                  inputEl.innerHTML = '<p>' + text + '</p>';
                } else {
                  inputEl.textContent = text;
                }
                inserted = true;
              }
              
              // Dispatch events
              inputEl.dispatchEvent(new Event('input', { bubbles: true }));
              inputEl.dispatchEvent(new Event('change', { bubbles: true }));
              inputEl.dispatchEvent(new InputEvent('input', { bubbles: true, data: text, inputType: 'insertText' }));
              
            } else if (inputEl.tagName === 'TEXTAREA' || inputEl.tagName === 'INPUT') {
              // Textarea/input
              inputEl.value = text;
              
              // Try native setter for React
              const descriptor = Object.getOwnPropertyDescriptor(HTMLTextAreaElement.prototype, 'value') ||
                                 Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value');
              if (descriptor && descriptor.set) {
                descriptor.set.call(inputEl, text);
              }
              
              inputEl.dispatchEvent(new Event('input', { bubbles: true }));
              inputEl.dispatchEvent(new Event('change', { bubbles: true }));
            }
            
            // Verify text was inserted
            const hasText = inputEl.value === text || 
                           inputEl.textContent === text || 
                           inputEl.textContent.includes(text) ||
                           inputEl.innerHTML.includes(text);
            
            console.log('[' + llmId + '] Text inserted:', hasText, 'Content:', (inputEl.value || inputEl.textContent || '').substring(0, 50));
            
            if (!hasText) {
              return { success: false, error: 'Text not inserted', llmId: llmId };
            }
            
            return { success: true, llmId: llmId, tag: inputEl.tagName };
          } catch(e) {
            console.error('[${toolId}] Injection error:', e);
            return { success: false, error: e.message, llmId: "${toolId}" };
          }
        })()
      `;

      const result = await webview.executeJavaScript(injectionScript);
      console.log(`Injection result for ${toolId}:`, result);

      if (result && result.success) {
        // Wait for UI to update
        await new Promise(r => setTimeout(r, 800));

        // Click submit button
        const submitScript = `
          (function() {
            const llmId = "${toolId}";
            const submitSelectors = ${JSON.stringify(llmConfig.submit.split(', '))};
            
            // Try LLM-specific selectors first
            for (const sel of submitSelectors) {
              try {
                const btn = document.querySelector(sel.trim());
                if (btn && !btn.disabled && (btn.offsetParent !== null || btn.offsetHeight > 0)) {
                  console.log('[' + llmId + '] Clicking submit:', sel);
                  btn.click();
                  return { clicked: true, selector: sel };
                }
              } catch(e) {}
            }
            
            // Fallback selectors
            const fallbacks = [
              'button[data-testid="send-button"]',
              'button[aria-label*="Send"]',
              'button[type="submit"]',
              'button.send-button'
            ];
            
            for (const sel of fallbacks) {
              const btn = document.querySelector(sel);
              if (btn && !btn.disabled && (btn.offsetParent !== null || btn.offsetHeight > 0)) {
                console.log('[' + llmId + '] Clicking fallback submit:', sel);
                btn.click();
                return { clicked: true, selector: sel };
              }
            }
            
            // Last resort: Press Enter
            const input = document.querySelector('div[contenteditable="true"], textarea, #prompt-textarea');
            if (input) {
              console.log('[' + llmId + '] Pressing Enter');
              input.focus();
              ['keydown', 'keypress', 'keyup'].forEach(type => {
                input.dispatchEvent(new KeyboardEvent(type, {
                  key: 'Enter', code: 'Enter', keyCode: 13, which: 13, bubbles: true, cancelable: true
                }));
              });
              return { clicked: false, usedEnter: true };
            }
            
            console.log('[' + llmId + '] No submit button found');
            return { clicked: false, error: 'No submit found' };
          })()
        `;

        const submitResult = await webview.executeJavaScript(submitScript);
        console.log(`Submit result for ${toolId}:`, submitResult);

        // Only mark as success if we actually clicked or pressed enter
        success = submitResult && (submitResult.clicked || submitResult.usedEnter);
      }
    } catch (err) {
      console.error(`Injection failed for ${toolId}:`, err);
    }

    if (wrapper) {
      wrapper.classList.remove('sending');
      wrapper.classList.add(success ? 'sent' : 'error');
      setTimeout(() => wrapper.classList.remove('sent', 'error'), 2000);
    }

    results.push({ toolId, success });
  }

  // Reset button
  elements.compareBtn.disabled = false;
  elements.compareBtn.innerHTML = `
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
    </svg>
    <span>Send</span>
  `;

  const successCount = results.filter(r => r.success).length;
  const totalCount = results.length;

  if (successCount === totalCount) {
    showNotification(`Sent to all ${totalCount} LLMs!`, 'success');
  } else if (successCount > 0) {
    showNotification(`Sent to ${successCount}/${totalCount}. Some need manual input.`, 'warning');
  } else {
    showNotification('Could not send. Please type manually in each LLM.', 'error');
  }

  if (successCount > 0) {
    elements.comparisonInput.value = '';
    elements.comparisonInput.style.height = 'auto';
  }
}

// Notification helper function
function showNotification(message, type = 'info') {
  // Remove existing notifications
  const existing = document.querySelector('.app-notification');
  if (existing) existing.remove();

  const notification = document.createElement('div');
  notification.className = `app-notification ${type}`;
  notification.innerHTML = `
    <span>${message}</span>
    <button class="notification-close">&times;</button>
  `;

  document.body.appendChild(notification);

  // Auto remove after 4 seconds
  setTimeout(() => notification.remove(), 4000);

  // Manual close
  notification.querySelector('.notification-close').onclick = () => notification.remove();
}

// Select and load a tool
function selectTool(tool) {
  // Check if tool should open externally
  if (tool.openExternal) {
    window.electronAPI.openExternal(tool.url);
    return;
  }

  state.currentTool = tool;
  state.comparisonMode = false;
  state.notepadMode = false;

  // Update UI
  elements.homeScreen.classList.add('hidden');
  elements.comparisonMode.classList.add('hidden');
  elements.notepadView.classList.add('hidden');
  elements.singleWebview.classList.remove('hidden');

  // Show loading
  elements.webviewLoading.classList.add('visible');

  // Load URL in webview
  elements.mainWebview.src = tool.url;

  // Update sidebar active state
  document.querySelectorAll('.tool-item').forEach(item => {
    item.classList.toggle('active', item.dataset.toolId === tool.id);
  });

  // Update inspector
  renderInspector(tool);

  // Save preference
  state.preferences.lastSelectedTool = tool.id;
  window.electronAPI.savePreferences(state.preferences);
}

// Render inspector panel
function renderInspector(tool) {
  const initials = tool.name.slice(0, 2).toUpperCase();
  const isPinned = (state.preferences.pinnedTools || []).includes(tool.id);

  elements.inspectorContent.innerHTML = `
    <div class="inspector-tool-info">
      <div class="inspector-logo">${initials}</div>
      <h2 class="inspector-name">${tool.name}</h2>
      <p class="inspector-description">${tool.description || 'No description available'}</p>
      
      <div class="inspector-badges">
        ${tool.isPreInstalled ? `
          <span class="inspector-badge">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
            </svg>
            Pre-installed
          </span>
          <span class="inspector-badge founder">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>
            Founder Curated
          </span>
        ` : '<span class="inspector-badge">User Added</span>'}
      </div>

      <p class="inspector-url">${tool.url}</p>

      <div class="inspector-actions">
        <button class="btn-inspector" onclick="togglePinTool('${tool.id}')">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="${isPinned ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
          </svg>
          ${isPinned ? 'Unpin Tool' : 'Pin Tool'}
        </button>
        <button class="btn-inspector primary" onclick="window.electronAPI.openExternal('${tool.url}')">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/>
            <path d="M15 3h6v6M10 14L21 3"/>
          </svg>
          Open in Browser
        </button>
        ${!tool.isPreInstalled ? `
          <button class="btn-inspector danger" onclick="deleteUserTool('${tool.id}')">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"/>
            </svg>
            Delete Tool
          </button>
        ` : ''}
      </div>

      <div class="about-section" style="margin-top: 24px; padding-top: 16px; border-top: 1px solid var(--border-color);">
        <h3 style="font-size: 13px; font-weight: 600; margin-bottom: 8px; color: var(--text-primary);">About & Trust</h3>
        <p style="font-size: 12px; color: var(--text-secondary); line-height: 1.5; margin-bottom: 12px;">
          Created by Aniket Rajput — all tools are personally verified and sourced from trusted websites.
        </p>
        <div class="redirect-tip" style="background: rgba(234, 179, 8, 0.1); border: 1px solid rgba(234, 179, 8, 0.2); border-radius: 6px; padding: 10px;">
          <p style="font-size: 11px; color: var(--warning); display: flex; gap: 8px;">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="flex-shrink: 0;">
              <circle cx="12" cy="12" r="10"/>
              <line x1="12" y1="8" x2="12" y2="12"/>
              <line x1="12" y1="16" x2="12.01" y2="16"/>
            </svg>
            Some tools may redirect; for the best experience, open links in a browser.
          </p>
        </div>
      </div>
    </div>
  `;
}

// Delete user tool
async function deleteUserTool(toolId) {
  await window.electronAPI.deleteUserTool(toolId);
  state.userTools = await window.electronAPI.getUserTools();
  renderSidebar();

  // Go back to home if deleted current tool
  if (state.currentTool?.id === toolId) {
    showHome();
  }
}

// Make it globally accessible
window.deleteUserTool = deleteUserTool;
window.togglePinTool = togglePinTool;

// Show home screen
function showHome() {
  state.currentTool = null;
  state.comparisonMode = false;
  state.notepadMode = false;

  elements.homeScreen.classList.remove('hidden');
  elements.comparisonMode.classList.add('hidden');
  elements.singleWebview.classList.add('hidden');
  elements.notepadView.classList.add('hidden');

  // Clear active states
  document.querySelectorAll('.tool-item').forEach(item => {
    item.classList.remove('active');
  });

  // Clear inspector
  elements.inspectorContent.innerHTML = `
    <div class="inspector-empty">
      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1">
        <circle cx="12" cy="12" r="10"/>
        <path d="M12 16v-4M12 8h.01"/>
      </svg>
      <p>Select a tool to view details</p>
    </div>
  `;
}

// Enter comparison mode
function enterComparisonMode() {
  state.comparisonMode = true;
  state.currentTool = null;
  state.notepadMode = false;

  elements.homeScreen.classList.add('hidden');
  elements.singleWebview.classList.add('hidden');
  elements.notepadView.classList.add('hidden');
  elements.comparisonMode.classList.remove('hidden');

  // Clear active states
  document.querySelectorAll('.tool-item').forEach(item => {
    item.classList.remove('active');
  });

  // Reset selections
  state.selectedLLMs = [];
  document.querySelectorAll('.llm-checkbox input').forEach(cb => {
    cb.checked = false;
    cb.disabled = false;
  });
  document.querySelectorAll('.llm-checkbox').forEach(label => {
    label.classList.remove('selected');
  });

  renderComparisonWebviews();

  // Clear inspector
  elements.inspectorContent.innerHTML = `
    <div class="inspector-empty">
      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1">
        <rect x="3" y="3" width="7" height="7"/>
        <rect x="14" y="3" width="7" height="7"/>
        <rect x="3" y="14" width="7" height="7"/>
        <rect x="14" y="14" width="7" height="7"/>
      </svg>
      <p>LLM Comparison Mode</p>
      <p style="font-size: 11px; margin-top: 8px;">Select 2-3 LLMs and enter your prompt to compare responses</p>
    </div>
  `;
}

// Exit comparison mode
function exitComparisonMode() {
  showHome();
}

// ========================================
// NOTEPAD FUNCTIONALITY
// ========================================

function showNotepad() {
  state.notepadMode = true;
  state.currentTool = null;
  state.comparisonMode = false;

  elements.homeScreen.classList.add('hidden');
  elements.singleWebview.classList.add('hidden');
  elements.comparisonMode.classList.add('hidden');
  elements.notepadView.classList.remove('hidden');

  // Clear active states in sidebar
  document.querySelectorAll('.tool-item').forEach(item => {
    item.classList.remove('active');
  });

  // Render notes
  renderNotesList();

  // Select first note or create new one
  if (state.notes.length > 0) {
    selectNote(state.notes[0]);
  } else {
    createNewNote();
  }

  // Update inspector
  elements.inspectorContent.innerHTML = `
    <div class="inspector-empty">
      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1">
        <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
        <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8"/>
      </svg>
      <p>Notepad</p>
      <p style="font-size: 11px; margin-top: 8px;">Create and manage your notes</p>
    </div>
  `;
}

function hideNotepad() {
  showHome();
}

function renderNotesList() {
  const filteredNotes = filterNotes(state.notes);

  if (filteredNotes.length === 0) {
    elements.notesList.innerHTML = `
      <div class="notes-empty">
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1">
          <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
          <path d="M14 2v6h6M12 18v-6M9 15h6"/>
        </svg>
        <p>No notes yet</p>
        <p style="font-size: 11px; margin-top: 4px;">Click + to create one</p>
      </div>
    `;
    return;
  }

  elements.notesList.innerHTML = filteredNotes.map(note => `
    <div class="note-item ${state.currentNote?.id === note.id ? 'active' : ''}" data-note-id="${note.id}">
      <div class="note-item-title">${note.title || 'Untitled'}</div>
      <div class="note-item-preview">${getNotePlainText(note.content).slice(0, 50) || 'Empty note'}</div>
      <div class="note-item-date">${formatDate(note.updatedAt)}</div>
    </div>
  `).join('');

  // Add click listeners
  document.querySelectorAll('.note-item').forEach(item => {
    item.addEventListener('click', () => {
      const noteId = item.dataset.noteId;
      const note = state.notes.find(n => n.id === noteId);
      if (note) {
        selectNote(note);
      }
    });
  });
}

function filterNotes(notes) {
  if (!state.notesSearchQuery) return notes;
  const query = state.notesSearchQuery.toLowerCase();
  return notes.filter(n =>
    (n.title && n.title.toLowerCase().includes(query)) ||
    (n.content && getNotePlainText(n.content).toLowerCase().includes(query))
  );
}

function getNotePlainText(html) {
  const div = document.createElement('div');
  div.innerHTML = html || '';
  return div.textContent || div.innerText || '';
}

function formatDate(dateStr) {
  if (!dateStr) return '';
  const date = new Date(dateStr);
  const now = new Date();
  const diff = now - date;

  if (diff < 60000) return 'Just now';
  if (diff < 3600000) return `${Math.floor(diff / 60000)}m ago`;
  if (diff < 86400000) return `${Math.floor(diff / 3600000)}h ago`;
  if (diff < 604800000) return `${Math.floor(diff / 86400000)}d ago`;

  return date.toLocaleDateString();
}

function selectNote(note) {
  state.currentNote = note;

  // Update UI
  elements.noteTitle.value = note.title || '';
  elements.noteContent.innerHTML = note.content || '';
  elements.noteTimestamp.textContent = `Updated ${formatDate(note.updatedAt)}`;
  elements.noteStatus.textContent = 'Ready';

  // Update list selection
  document.querySelectorAll('.note-item').forEach(item => {
    item.classList.toggle('active', item.dataset.noteId === note.id);
  });
}

function createNewNote() {
  const newNote = {
    id: `note-${Date.now()}`,
    title: '',
    content: '',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  state.notes.unshift(newNote);
  state.currentNote = newNote;
  saveNotes();
  renderNotesList();
  selectNote(newNote);

  // Focus title input
  elements.noteTitle.focus();
}

function deleteCurrentNote() {
  if (!state.currentNote) return;

  const index = state.notes.findIndex(n => n.id === state.currentNote.id);
  if (index !== -1) {
    state.notes.splice(index, 1);
    saveNotes();
    renderNotesList();

    // Select next note or create new
    if (state.notes.length > 0) {
      selectNote(state.notes[0]);
    } else {
      createNewNote();
    }
  }
}

function autoSaveNote() {
  if (!state.currentNote) return;

  // Clear existing timeout
  if (state.autoSaveTimeout) {
    clearTimeout(state.autoSaveTimeout);
  }

  // Update status
  elements.noteStatus.textContent = 'Saving...';

  // Debounce save
  state.autoSaveTimeout = setTimeout(() => {
    state.currentNote.title = elements.noteTitle.value;
    state.currentNote.content = elements.noteContent.innerHTML;
    state.currentNote.updatedAt = new Date().toISOString();

    const index = state.notes.findIndex(n => n.id === state.currentNote.id);
    if (index !== -1) {
      state.notes[index] = state.currentNote;
    }

    saveNotes();
    renderNotesList();
    elements.noteTimestamp.textContent = `Updated ${formatDate(state.currentNote.updatedAt)}`;
    elements.noteStatus.textContent = 'Saved';
  }, 500);
}

async function saveNotes() {
  await window.electronAPI.saveNotes(state.notes);
}

function applyFormatting(format) {
  document.execCommand(getExecCommand(format), false, null);
  elements.noteContent.focus();
  autoSaveNote();
}

function getExecCommand(format) {
  switch (format) {
    case 'bold': return 'bold';
    case 'italic': return 'italic';
    case 'heading': return 'formatBlock';
    case 'ul': return 'insertUnorderedList';
    case 'ol': return 'insertOrderedList';
    case 'code': return 'formatBlock';
    default: return format;
  }
}

function setupNotepadListeners() {
  // New note button
  if (elements.newNoteBtn) {
    elements.newNoteBtn.addEventListener('click', createNewNote);
  }

  // Delete note button
  if (elements.deleteNoteBtn) {
    elements.deleteNoteBtn.addEventListener('click', deleteCurrentNote);
  }

  // Close notepad button
  if (elements.closeNotepadBtn) {
    elements.closeNotepadBtn.addEventListener('click', hideNotepad);
  }

  // Notes search
  if (elements.notesSearch) {
    elements.notesSearch.addEventListener('input', (e) => {
      state.notesSearchQuery = e.target.value;
      renderNotesList();
    });
  }

  // Note title input
  if (elements.noteTitle) {
    elements.noteTitle.addEventListener('input', autoSaveNote);
  }

  // Note content
  if (elements.noteContent) {
    elements.noteContent.addEventListener('input', autoSaveNote);

    // Handle keyboard shortcuts
    elements.noteContent.addEventListener('keydown', (e) => {
      if (e.ctrlKey || e.metaKey) {
        if (e.key === 'b') {
          e.preventDefault();
          applyFormatting('bold');
        } else if (e.key === 'i') {
          e.preventDefault();
          applyFormatting('italic');
        }
      }
    });
  }

  // Toolbar buttons
  document.querySelectorAll('.toolbar-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const format = btn.dataset.format;
      if (format === 'heading') {
        document.execCommand('formatBlock', false, '<h2>');
      } else if (format === 'code') {
        document.execCommand('formatBlock', false, '<pre>');
      } else {
        applyFormatting(format);
      }
    });
  });
}

// Setup event listeners
function setupEventListeners() {
  // Window controls
  elements.minimizeBtn.addEventListener('click', () => {
    window.electronAPI.minimizeWindow();
  });

  elements.maximizeBtn.addEventListener('click', () => {
    window.electronAPI.maximizeWindow();
  });

  elements.closeBtn.addEventListener('click', () => {
    window.electronAPI.closeWindow();
  });

  // Sidebar toggle
  elements.toggleSidebar.addEventListener('click', () => {
    elements.sidebar.classList.toggle('collapsed');
    state.preferences.sidebarCollapsed = elements.sidebar.classList.contains('collapsed');
    window.electronAPI.savePreferences(state.preferences);
  });

  // Inspector toggle
  elements.toggleInspector.addEventListener('click', () => {
    elements.inspector.classList.toggle('hidden');
  });

  // Search
  elements.searchInput.addEventListener('input', (e) => {
    state.searchQuery = e.target.value;
    renderSidebar();
  });

  // Add tool button
  elements.addToolBtn.addEventListener('click', () => {
    openAddToolModal();
  });

  // Notepad button
  if (elements.notepadBtn) {
    elements.notepadBtn.addEventListener('click', () => {
      showNotepad();
    });
  }

  // Compare LLM button
  elements.compareLLMBtn.addEventListener('click', () => {
    enterComparisonMode();
  });

  // Exit comparison
  elements.exitComparisonBtn.addEventListener('click', () => {
    exitComparisonMode();
  });

  // Compare button (inject input)
  if (elements.compareBtn) {
    elements.compareBtn.addEventListener('click', () => {
      injectInputToLLMs();
    });
  }

  // Auto-resize comparison input and Enter key support
  if (elements.comparisonInput) {
    elements.comparisonInput.addEventListener('input', () => {
      elements.comparisonInput.style.height = 'auto';
      elements.comparisonInput.style.height = Math.min(elements.comparisonInput.scrollHeight, 120) + 'px';
    });

    // Enter key to send (Shift+Enter for new line)
    elements.comparisonInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        injectInputToLLMs();
      }
    });
  }

  // Modal controls
  elements.closeModalBtn.addEventListener('click', closeAddToolModal);
  elements.cancelAddBtn.addEventListener('click', closeAddToolModal);
  document.querySelector('.modal-overlay')?.addEventListener('click', closeAddToolModal);

  // Add tool form
  elements.addToolForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = document.getElementById('tool-name').value;
    const url = document.getElementById('tool-url').value;
    const category = document.getElementById('tool-category').value;
    const description = document.getElementById('tool-description').value;

    const newTool = await window.electronAPI.addUserTool({
      name,
      url,
      category,
      description
    });

    state.userTools.push(newTool);
    renderSidebar();
    closeAddToolModal();
    selectTool(newTool);
  });

  // Keyboard shortcuts
  document.addEventListener('keydown', (e) => {
    // Ctrl/Cmd + K for search
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
      e.preventDefault();
      elements.searchInput.focus();
    }

    // Escape to close modal or exit modes
    if (e.key === 'Escape') {
      closeAddToolModal();
      if (state.comparisonMode) {
        exitComparisonMode();
      }
      if (state.notepadMode) {
        hideNotepad();
      }
    }
  });
}

// Setup webview listeners
function setupWebviewListeners() {
  elements.mainWebview.addEventListener('did-start-loading', () => {
    elements.webviewLoading.classList.add('visible');
  });

  elements.mainWebview.addEventListener('did-stop-loading', () => {
    elements.webviewLoading.classList.remove('visible');
  });

  elements.mainWebview.addEventListener('did-fail-load', (e) => {
    console.error('Webview failed to load:', e);
    elements.webviewLoading.classList.remove('visible');
  });

  // Handle external navigation
  elements.mainWebview.addEventListener('will-navigate', (e) => {
    if (shouldOpenExternal(e.url)) {
      e.preventDefault();
      window.electronAPI.openExternal(e.url);
    }
  });

  elements.mainWebview.addEventListener('new-window', (e) => {
    e.preventDefault();
    window.electronAPI.openExternal(e.url);
  });
}

// Modal functions
function openAddToolModal() {
  elements.addToolModal.classList.remove('hidden');
  document.getElementById('tool-name').focus();
}

function closeAddToolModal() {
  elements.addToolModal.classList.add('hidden');
  elements.addToolForm.reset();
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', init);
