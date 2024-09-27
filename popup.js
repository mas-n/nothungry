document.addEventListener("DOMContentLoaded", function () {
    const toggleSwitch = document.getElementById("toggleSwitch");
  
    // Load saved state
    chrome.storage.sync.get("feedHidden", (data) => {
      toggleSwitch.checked = data.feedHidden || false;
    });
  
    // Listen for toggle change
    toggleSwitch.addEventListener("change", function () {
      const isHidden = toggleSwitch.checked;
      chrome.storage.sync.set({feedHidden: isHidden});
  
      // Send message to content script to hide/show feed
      chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, {action: isHidden ? "hideFeed" : "showFeed"});
      });
    });
  });
  