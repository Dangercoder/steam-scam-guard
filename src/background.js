chrome.webNavigation.onCompleted.addListener(function(details) {
  chrome.tabs.sendMessage(details.tabId, {action: "checkUrl"}, function(response) {
    if (response && response.isScam) {
      chrome.action.setIcon({
        path: {
          "16": "logo_danger.png",
          "48": "logo_danger.png",
          "128": "logo_danger.png"
        }
      });

      chrome.notifications.create({
        type: 'basic',
        iconUrl: 'logo_danger.png',
        title: 'Warning!',
        message: 'You are attempting to log into a non-Steam website.',
        priority: 2
      });
    } else {
      chrome.action.setIcon({
        path: {
          "16": "logo_normal.png",
          "48": "logo_normal.png",
          "128": "logo_normal.png"
        }
      });
    }
  });
}, {url: [{urlMatches : 'https://*/*'}]});