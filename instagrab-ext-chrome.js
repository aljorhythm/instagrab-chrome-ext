function processUrls(urls){
        chrome.runtime.sendMessage({
            action: 'downloadUrls',
            params: JSON.parse(urls)
        });
}

$(document).ready(function(){
    alert('be patient!');
    Instagrab.run(processUrls);
});