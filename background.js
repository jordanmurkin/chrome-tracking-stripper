var utm_re = new RegExp('([\?\&]utm_(source|medium|term|campaign|content|cid|reader)=[^&#]+)', 'ig');

function cleanUrl(url, index) {
    if (url.charAt(index) === '&') {
        url = url.substr(0, index) + '?' + url.substr(index + 1);
    }
    return url;
}

chrome.webRequest.onBeforeRequest.addListener(function(details) {
    var url = details.url;
    
    var stripped = url.replace('?ref=producthunt', '');
    stripped = stripped.replace('&ref=producthunt', '');
    
    var queryStringIndex = url.indexOf('?');
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
    var queryStringIndex = url.indexOf('ref=');
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

var google_urls = [
    "*://*.google.com/search*",
    "*://*.google.ad/search*",
    "*://*.google.ae/search*",
    "*://*.google.com.af/search*",
    "*://*.google.com.ag/search*",
    "*://*.google.com.ai/search*",
    "*://*.google.al/search*",
    "*://*.google.am/search*",
    "*://*.google.co.ao/search*",
    "*://*.google.com.ar/search*",
    "*://*.google.as/search*",
    "*://*.google.at/search*",
    "*://*.google.com.au/search*",
    "*://*.google.az/search*",
    "*://*.google.ba/search*",
    "*://*.google.com.bd/search*",
    "*://*.google.be/search*",
    "*://*.google.bf/search*",
    "*://*.google.bg/search*",
    "*://*.google.com.bh/search*",
    "*://*.google.bi/search*",
    "*://*.google.bj/search*",
    "*://*.google.com.bn/search*",
    "*://*.google.com.bo/search*",
    "*://*.google.com.br/search*",
    "*://*.google.bs/search*",
    "*://*.google.bt/search*",
    "*://*.google.co.bw/search*",
    "*://*.google.by/search*",
    "*://*.google.com.bz/search*",
    "*://*.google.ca/search*",
    "*://*.google.cd/search*",
    "*://*.google.cf/search*",
    "*://*.google.cg/search*",
    "*://*.google.ch/search*",
    "*://*.google.ci/search*",
    "*://*.google.co.ck/search*",
    "*://*.google.cl/search*",
    "*://*.google.cm/search*",
    "*://*.google.cn/search*",
    "*://*.google.com.co/search*",
    "*://*.google.co.cr/search*",
    "*://*.google.com.cu/search*",
    "*://*.google.cv/search*",
    "*://*.google.com.cy/search*",
    "*://*.google.cz/search*",
    "*://*.google.de/search*",
    "*://*.google.dj/search*",
    "*://*.google.dk/search*",
    "*://*.google.dm/search*",
    "*://*.google.com.do/search*",
    "*://*.google.dz/search*",
    "*://*.google.com.ec/search*",
    "*://*.google.ee/search*",
    "*://*.google.com.eg/search*",
    "*://*.google.es/search*",
    "*://*.google.com.et/search*",
    "*://*.google.fi/search*",
    "*://*.google.com.fj/search*",
    "*://*.google.fm/search*",
    "*://*.google.fr/search*",
    "*://*.google.ga/search*",
    "*://*.google.ge/search*",
    "*://*.google.gg/search*",
    "*://*.google.com.gh/search*",
    "*://*.google.com.gi/search*",
    "*://*.google.gl/search*",
    "*://*.google.gm/search*",
    "*://*.google.gp/search*",
    "*://*.google.gr/search*",
    "*://*.google.com.gt/search*",
    "*://*.google.gy/search*",
    "*://*.google.com.hk/search*",
    "*://*.google.hn/search*",
    "*://*.google.hr/search*",
    "*://*.google.ht/search*",
    "*://*.google.hu/search*",
    "*://*.google.co.id/search*",
    "*://*.google.ie/search*",
    "*://*.google.co.il/search*",
    "*://*.google.im/search*",
    "*://*.google.co.in/search*",
    "*://*.google.iq/search*",
    "*://*.google.is/search*",
    "*://*.google.it/search*",
    "*://*.google.je/search*",
    "*://*.google.com.jm/search*",
    "*://*.google.jo/search*",
    "*://*.google.co.jp/search*",
    "*://*.google.co.ke/search*",
    "*://*.google.com.kh/search*",
    "*://*.google.ki/search*",
    "*://*.google.kg/search*",
    "*://*.google.co.kr/search*",
    "*://*.google.com.kw/search*",
    "*://*.google.kz/search*",
    "*://*.google.la/search*",
    "*://*.google.com.lb/search*",
    "*://*.google.li/search*",
    "*://*.google.lk/search*",
    "*://*.google.co.ls/search*",
    "*://*.google.lt/search*",
    "*://*.google.lu/search*",
    "*://*.google.lv/search*",
    "*://*.google.com.ly/search*",
    "*://*.google.co.ma/search*",
    "*://*.google.md/search*",
    "*://*.google.me/search*",
    "*://*.google.mg/search*",
    "*://*.google.mk/search*",
    "*://*.google.ml/search*",
    "*://*.google.com.mm/search*",
    "*://*.google.mn/search*",
    "*://*.google.ms/search*",
    "*://*.google.com.mt/search*",
    "*://*.google.mu/search*",
    "*://*.google.mv/search*",
    "*://*.google.mw/search*",
    "*://*.google.com.mx/search*",
    "*://*.google.com.my/search*",
    "*://*.google.co.mz/search*",
    "*://*.google.com.na/search*",
    "*://*.google.com.nf/search*",
    "*://*.google.com.ng/search*",
    "*://*.google.com.ni/search*",
    "*://*.google.ne/search*",
    "*://*.google.nl/search*",
    "*://*.google.no/search*",
    "*://*.google.com.np/search*",
    "*://*.google.nr/search*",
    "*://*.google.nu/search*",
    "*://*.google.co.nz/search*",
    "*://*.google.com.om/search*",
    "*://*.google.com.pa/search*",
    "*://*.google.com.pe/search*",
    "*://*.google.com.pg/search*",
    "*://*.google.com.ph/search*",
    "*://*.google.com.pk/search*",
    "*://*.google.pl/search*",
    "*://*.google.pn/search*",
    "*://*.google.com.pr/search*",
    "*://*.google.ps/search*",
    "*://*.google.pt/search*",
    "*://*.google.com.py/search*",
    "*://*.google.com.qa/search*",
    "*://*.google.ro/search*",
    "*://*.google.ru/search*",
    "*://*.google.rw/search*",
    "*://*.google.com.sa/search*",
    "*://*.google.com.sb/search*",
    "*://*.google.sc/search*",
    "*://*.google.se/search*",
    "*://*.google.com.sg/search*",
    "*://*.google.sh/search*",
    "*://*.google.si/search*",
    "*://*.google.sk/search*",
    "*://*.google.com.sl/search*",
    "*://*.google.sn/search*",
    "*://*.google.so/search*",
    "*://*.google.sm/search*",
    "*://*.google.sr/search*",
    "*://*.google.st/search*",
    "*://*.google.com.sv/search*",
    "*://*.google.td/search*",
    "*://*.google.tg/search*",
    "*://*.google.co.th/search*",
    "*://*.google.com.tj/search*",
    "*://*.google.tk/search*",
    "*://*.google.tl/search*",
    "*://*.google.tm/search*",
    "*://*.google.tn/search*",
    "*://*.google.to/search*",
    "*://*.google.com.tr/search*",
    "*://*.google.tt/search*",
    "*://*.google.com.tw/search*",
    "*://*.google.co.tz/search*",
    "*://*.google.com.ua/search*",
    "*://*.google.co.ug/search*",
    "*://*.google.co.uk/search*",
    "*://*.google.com.uy/search*",
    "*://*.google.co.uz/search*",
    "*://*.google.com.vc/search*",
    "*://*.google.co.ve/search*",
    "*://*.google.vg/search*",
    "*://*.google.co.vi/search*",
    "*://*.google.com.vn/search*",
    "*://*.google.vu/search*",
    "*://*.google.ws/search*",
    "*://*.google.rs/search*",
    "*://*.google.co.za/search*",
    "*://*.google.co.zm/search*",
    "*://*.google.co.zw/search*",
    "*://*.google.cat/search*"
];

var ggl_re = new RegExp('([\?\&](oq|aqs|sourceid|source|sa|ved|biw|bih|dpr|ie)=[^&#]+)', 'ig');
var ggl_has_re = new RegExp('(#q=[^&#]+)', 'ig');

chrome.webRequest.onBeforeRequest.addListener(function(details) {
    var url = details.url;
    var queryStringIndex = url.indexOf('?q=');
    
    if (queryStringIndex !== -1) {
        var stripped = url.replace(ggl_re, '');
        stripped = stripped.replace(ggl_has_re, '');
        stripped = stripped.replace('&*', '');
        if (stripped != url) {
            return {
                redirectUrl: stripped
            };
        }
    }
},
{urls: google_urls, types: ['main_frame']}, ['blocking']);