chrome.action.onClicked.addListener(async (tab) => {
  if (!tab.id) return;

  // Inject CSS into the current (active) tab
  await chrome.scripting.insertCSS({
    target: { tabId: tab.id },
    css: `
      * {
        -webkit-filter: none !important;
        filter: none !important;
      }
    `
  });
});