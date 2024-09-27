let feedState = 'visible'; // Default state

// Function to update the icon based on the feed state
function updateIcon() {
  let iconPath;
  
  // Determine the icon to set based on the current state
  if (feedState === "hidden") {
    iconPath = 'hungry.png'; // Feed hidden
  } else if (feedState === 'visible') {
    iconPath = 'full.png'; // Feed visible
  } else {
    iconPath = 'icon.png'; // Default icon
  }

  chrome.action.setIcon({ path: iconPath });
}

// Listen for icon clicks to toggle feed state
chrome.action.onClicked.addListener((tab) => {
  // Toggle state between hidden and visible
  if (feedState === 'hidden') {
    feedState = 'visible';
  } else {
    feedState = 'hidden';
  }

  // Save the new state in storage
  chrome.storage.sync.set({ feedState: feedState });

  // Send a message to the content script to hide or show the feed
  chrome.tabs.sendMessage(tab.id, { action: feedState === 'hidden' ? 'hideFeed' : 'showFeed' }, (response) => {
    console.log(response.status);
  });

  updateIcon(); // Update the icon after changing the state
});

// Load the initial feed state from storage
chrome.storage.sync.get('feedState', function(data) {
  if (data.feedState) {
    feedState = data.feedState; // Set the initial feed state
  }
  updateIcon(); // Set the initial icon based on the state
});