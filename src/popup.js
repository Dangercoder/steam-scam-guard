document.addEventListener('DOMContentLoaded', function() {
  chrome.storage.local.get('isScam', function(result) {
    const title = document.getElementById('title');
    const description = document.getElementById('description');

    if (result.isScam) {
      title.innerText = 'WARNING!';
      description.innerText = 'You are attempting to log into a non-Steam website.';
      title.style.color = 'red';
    } else {
      title.innerText = 'STEAM SCAM GUARD';
      description.innerText = 'Keep your Steam account safe.';
      title.style.color = '#4CAF50';
    }
  });
});
