chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.action === "checkUrl") {
        const currentUrl = window.location.href;
        const isScam = detectScamPage(currentUrl);
        sendResponse({ isScam: isScam });
    }
});

function detectScamPage(url) {
    // Check if the URL is the legitimate Steam URL
    const isLegitSteam = url.startsWith('https://steamcommunity.com/');

    // Check for specific keywords in the inner text of the page
    const pageText = document.body.innerText.toLowerCase();
    const containsSteamLoginButton = pageText.includes('login with steam');
    const containsSteamKeywords = pageText.includes('steam') && pageText.includes('login');

    return !isLegitSteam && !containsSteamLoginButton && containsSteamKeywords;
}