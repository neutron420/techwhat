// Background service worker - handles extension lifecycle and data storage
chrome.runtime.onInstalled.addListener(() => {
    console.log('Tech Stack Detective extension installed');
    
    // Create context menu for quick access
    chrome.contextMenus.create({
        id: 'detectTechStack',
        title: 'Detect Tech Stack',
        contexts: ['page']
    });
});

// Storage for detection results
let detectionResults = {};

// Listen for messages from content scripts
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'storeResults') {
        // Store results with tab ID as key
        if (sender.tab) {
            detectionResults[sender.tab.id] = request.results;
        }
        sendResponse({ success: true });
    }
    
    if (request.action === 'updateBadge' && sender.tab) {
        const count = request.count || 0;
        chrome.action.setBadgeText({
            text: count > 0 ? count.toString() : '',
            tabId: sender.tab.id
        });
        chrome.action.setBadgeBackgroundColor({
            color: '#667eea'
        });
    }
});

// Context menu click handler
chrome.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId === 'detectTechStack') {
        // Send message to content script to re-run detection
        chrome.tabs.sendMessage(tab.id, { action: 'redetect' });
    }
});

// Clean up stored results when tabs are closed
chrome.tabs.onRemoved.addListener((tabId) => {
    delete detectionResults[tabId];
});

// Listen for tab updates to clear badge when navigating
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === 'loading') {
        chrome.action.setBadgeText({
            text: '',
            tabId: tabId
        });
    }
});