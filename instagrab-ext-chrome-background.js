function checkForValidUrl(tabId, changeInfo, tab) {
    if (tab.url.indexOf('instagram') > -1) {
        chrome.pageAction.show(tabId);
    }
};
chrome.pageAction.onClicked.addListener(function(){
    chrome.tabs.executeScript(null, {"file": "jquery.min.js"});
    chrome.tabs.executeScript(null, {"file": "instagrab.js"});
    chrome.tabs.executeScript(null, {"file": "instagrab-ext-chrome.js"});
});
function downloadUrls(urls) {
    chrome.downloads.setShelfEnabled(false);
    urls.forEach(function(url){
                chrome.downloads.download({
                    url: url,
                    filename: 'instagrab/' + url.substring(url.lastIndexOf('/')+1),
                    saveAs: false
                });
            }
    );
}
chrome.runtime.onMessage.addListener(function(msg, sender) {
    if ((msg.action === 'downloadUrls')
            && (msg.params !== undefined)) {
        downloadUrls(msg.params);
    }
});

chrome.tabs.onUpdated.addListener(checkForValidUrl);