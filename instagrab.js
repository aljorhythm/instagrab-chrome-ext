//assumes jquery loaded

var imgSelector = "img.-cx-PRIVATE-Photo__image";
var loadMoreSelector = "a:contains(Load more)";
var totalCountSelector = ".-cx-PRIVATE-PostsStatistic__count";

//scroll to bottom of page
function scrollBottom() {
    var body = document.querySelector("body");
    var html = document.querySelector("html");
    var height = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
    window.scrollTo(0, height);
}
//simulate click load more
function click() {
    try {
        $(loadMoreSelector).click();
        $(loadMoreSelector)[0].click();
    } catch (e) {}
}
//run
function run(callback) {
    var totalCount = parseInt($(totalCountSelector).text());
    var interval;
    // must click load more first
    click();
    var delay = 20;
    var stop = false;
    var recursiveScroll = function () {
        scrollBottom();
        // a slight delay is required for scroll up and scroll down to happen
        // one cannot be immediately after another
        setTimeout(function(){
            window.scrollTo(0, 0); //scroll back to the top
            var items = $(".-cx-PRIVATE-PostsGrid__item").length;
            //scroll until all items loaded
            if(stop){
                return;
            }
            console.log(items, totalCount);
            if (items >= totalCount) {
                callback = callback || show;
                stop = true;
                callback(Instagrab.getImageUrls());
            }else{
                setTimeout(recursiveScroll, delay);
            }
        }, delay);
    };
    recursiveScroll();
}
// returns image urls in json
function getImageUrls() {
    var urls = [];
    $(imgSelector).each(function (_, e) {
        urls.push(e.src);
    });
    return JSON.stringify(urls);
}
// if run as standalone script this will create a text area with urls in it
function show() {
    var $div = $("<textarea>").css({
        position: 'fixed',
        top: 0,
        left: 0,
        width: '200px',
        heigth: '300px'
    }).val(getImageUrls());
    $div.appendTo($("body"));
}

var Instagrab = {
    run : run,
    getImageUrls : getImageUrls
}