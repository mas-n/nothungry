// Function to hide the feed
function hideFeed() {
    if (window.location.host.includes("twitter.com")) {
      const feed = document.querySelector('[aria-label="Timeline: Your Home Timeline"]');
      if (feed) feed.style.display = "none";
    } else if (window.location.host.includes("instagram.com")) {
      const feed = document.querySelector('[role="feed"]');
      if (feed) feed.style.display = "none";
    }
  }
  
  // Function to show the feed
  function showFeed() {
    if (window.location.host.includes("twitter.com")) {
      const feed = document.querySelector('[aria-label="Timeline: Your Home Timeline"]');
      if (feed) feed.style.display = "block";
    } else if (window.location.host.includes("instagram.com")) {
      const feed = document.querySelector('[role="feed"]');
      if (feed) feed.style.display = "block";
    }
  }
  
  // Listen for messages from the popup or background
  chrome.runtime.onMessage.addListener((message) => {
    if (message.action === "hideFeed") {
      hideFeed();
    } else if (message.action === "showFeed") {
      showFeed();
    } else if (message.action === "toggleFeed") {
      const feed = document.querySelector('[role="feed"], [aria-label="Timeline: Your Home Timeline"]');
      if (feed && feed.style.display === "none") {
        showFeed();
      } else {
        hideFeed();
      }
    }
  });
  
  // Check the saved state on page load
  chrome.storage.sync.get("feedHidden", (data) => {
    if (data.feedHidden) {
      hideFeed();
    }
  });
  