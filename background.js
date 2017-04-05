var utm_re = new RegExp('([\?\&]utm_(source|medium|term|campaign|content|cid|reader)=[^&#]+)', 'ig');

function cleanUrl(url, index) {
    if (url.charAt(index) === '&') {
        url = url.substr(0, index) + '?' + url.substr(index + 1);
    }
    return url;
}

chrome.webRequest.onBeforeRequest.addListener(function(details) {
    var url = details.url;
    var queryStringIndex = url.indexOf('?');
    var stripped = url.replace('?ref=producthunt', '');
    stripped = stripped.replace('&ref=producthunt', '');
    
    if (url.indexOf('utm_') > queryStringIndex) {
        stripped = stripped.replace(utm_re, '');
        stripped = cleanUrl(stripped, queryStringIndex);
    }
    
    if (stripped != url) {
        return {
            redirectUrl: stripped
        };
    }
},
{urls: ["<all_urls>"], types: ['main_frame']}, ['blocking']);

var amazon_urls = [
    '*://*.amazon.co.uk/*/dp/*',
    '*://*.amazon.co.uk/d/*',
    '*://*.amazon.co.uk/gp/*',
    '*://*.amazon.com/*/dp/*',
    '*://*.amazon.com/d/*',
    '*://*.amazon.com/gp/*',
];

chrome.webRequest.onBeforeRequest.addListener(function(details) {
    var url = details.url;
    var queryStringIndex = url.indexOf('ref');
    if (queryStringIndex !== -1) {
        var stripped = url.substr(0, queryStringIndex);
        if (stripped != url) {
            return {
                redirectUrl: stripped
            };
        }   
    }
},
{urls: amazon_urls, types: ['main_frame']}, ['blocking']);
