// Function to hide the feed
function hideFeed() {
    let feed = document.querySelector('[aria-label="Timeline: Your Home Timeline"]');
    if (!feed) {
        feed = document.querySelector('div[data-testid="primaryColumn"] section');
    }
    if (feed) {
        feed.style.visibility = "hidden"; // Hide feed using visibility
        console.log("Feed hidden.");
    } else {
        console.log("Feed not found!");
    }
}

// Function to show the feed
function showFeed() {
    let feed = document.querySelector('[aria-label="Timeline: Your Home Timeline"]');
    if (!feed) {
        feed = document.querySelector('div[data-testid="primaryColumn"] section');
    }
    if (feed) {
        feed.style.visibility = "visible"; // Show feed by restoring visibility
        console.log("Feed shown.");
    } else {
        console.log("Feed not found!");
    }
}

// Listen for messages from the background script to hide or show the feed
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'hideFeed') {
        hideFeed();
        sendResponse({ status: "Feed hidden" });
    } else if (message.action === 'showFeed') {
        showFeed();
        sendResponse({ status: "Feed shown" });
    }
});

// Check and apply feed state from Chrome storage when the page loads
function applyFeedState() {
    chrome.storage.sync.get('feedState', function(data) {
        if (data.feedState === 'hidden') {
            hideFeed(); // Hide the feed if stored state is 'hidden'
        } else {
            showFeed(); // Show the feed if stored state is 'visible'
        }
    });
}

// Apply the stored feed state when the page loads
applyFeedState();
