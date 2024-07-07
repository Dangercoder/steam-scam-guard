chrome.webNavigation.onCompleted.addListener(function(details) {
  chrome.tabs.sendMessage(details.tabId, { action: "checkUrl" }, function(response) {
    if (response && response.isScam) {
      chrome.action.setIcon({
        path: {
          "16": "logo_danger_16x16.png",
          "48": "logo_danger_48x48.png",
          "128": "logo_danger_128x128.png"
        }
      }, () => {
        if (chrome.runtime.lastError) {
          console.error('Error setting icon to danger:', chrome.runtime.lastError.message);
        }
      });

      chrome.storage.local.set({ isScam: true });

      chrome.notifications.create({
        type: 'basic',
        iconUrl: 'logo_danger_128x128.png',
        title: 'Warning!',
        message: 'You are attempting to log into a non-Steam website.',
        priority: 2
      }, (notificationId) => {
        if (chrome.runtime.lastError) {
          console.error('Error creating notification:', chrome.runtime.lastError.message);
        } else {
          console.log('Notification created with ID:', notificationId);
        }
      });
    } else {
      chrome.action.setIcon({
        path: {
          "16": "logo_normal_16x16.png",
          "48": "logo_normal_48x48.png",
          "128": "logo_normal_128x128.png"
        }
      }, () => {
        if (chrome.runtime.lastError) {
          console.error('Error setting icon to normal:', chrome.runtime.lastError.message);
        }
      });

      chrome.storage.local.set({ isScam: false });
    }
  });
}, { url: [{ urlMatches: 'https://*/*' }] });
