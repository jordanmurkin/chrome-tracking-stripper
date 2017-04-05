var utm_re = new RegExp('([\?\&]utm_(source|medium|term|campaign|content|cid|reader)=[^&#]+)', 'ig');

chrome.webRequest.onBeforeRequest.addListener(function(details) {
    var url = details.url;
    var queryStringIndex = url.indexOf('?');
    if (url.indexOf('utm_') > queryStringIndex) {
        var stripped = url.replace(utm_re, '');
        if (stripped.charAt(queryStringIndex) === '&') {
            stripped = stripped.substr(0, queryStringIndex) + '?' +
                stripped.substr(queryStringIndex + 1)
        }
        if (stripped != url) {
            return {redirectUrl: stripped};
        }
    }
},
{urls: ['https://*/*?*', 'http://*/*?*'], types: ['main_frame']}, ['blocking']);

chrome.webRequest.onBeforeRequest.addListener(function(details) {
    var url = details.url;
    var queryStringIndex = url.indexOf('ref');
    if (queryStringIndex !== -1) {
        var stripped = url.substr(0, queryStringIndex);
        if (stripped != url) {
            return {redirectUrl: stripped};
        }   
    }
},
{urls: ['*://*.amazon.co.uk/*/dp/*', '*://*.amazon.com/*/dp/*', '*://*.amazon.ca/*/dp/*'], types: ['main_frame']}, ['blocking']);

chrome.webRequest.onBeforeRequest.addListener(function(details) {
    var url = details.url;
    var queryStringIndex = url.indexOf('?ref=producthunt');
    if (queryStringIndex !== -1) {
        var stripped = url.substr(0, queryStringIndex);
        if (stripped != url) {
            return {redirectUrl: stripped};
        }   
    }
},
{urls: ['https://*/*', 'http://*/*'], types: ['main_frame']}, ['blocking']);