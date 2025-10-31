let activeColorTabs = new Set();

chrome.action.onClicked.addListener(async (tab) => {
  if (!tab.id) return;
  
  // Apply CSS immediately
  await chrome.scripting.insertCSS({
    target: { tabId: tab.id },
    css: `
      * {
        -webkit-filter: none !important;
        filter: none !important;
      }
    `
  });

  // Remember that this tab has "color restore" active
  activeColorTabs.add(tab.id);
});

// When navigation finishes in a tab we marked as active, re-apply the CSS
chrome.webNavigation.onCompleted.addListener(async (details) => {
  if (activeColorTabs.has(details.tabId)) {
    try {
      await chrome.scripting.insertCSS({
        target: { tabId: details.tabId },
        css: `
          * {
            -webkit-filter: none !important;
            filter: none !important;
          }
        `
      });
    } catch (e) {
      console.warn('Reinjection failed', e);
    }
  }
});

// Clean up when tab closes
chrome.tabs.onRemoved.addListener((tabId) => {
  activeColorTabs.delete(tabId);
});