/**
 * Retrieve site configuration from the sites.json file.
 * 
 * In future this can be changed to a remote updating repository
 */
const getSites = () => {
  const sitesUrl = chrome.extension.getURL('sites.json');

  return new Promise((resolve, reject) => {
    fetch(sitesUrl)
      .then(response => {
        return response.json();
      })
      .then(json => {
        resolve(json);
      })
      .catch(error => {
        reject(error);
      });
  });
}

/*
 * Pattern matching the query string parameters (key=value) that will be
 * stripped from the final URL.
 */
const globalPattern = new RegExp(
  '([?&]' +
  '(icid|mkt_tok|(g|fb)clid|igshid|_hs(enc|mi)|mc_[ce]id|utm_(source|medium|term|campaign|content|cid|reader|referrer|name|social|social-type))' +
  '=[^&#]*)',
  'ig');

/**
 * Removes global tags from the query string
 * 
 * @param {string} queryString 
 */
const globalQueryStripper = (queryString) => {
  return queryString.replace(globalPattern, '');
}

/**
 * Removes the given tags from the query string
 * 
 * @param {Array} tags            tags to remove from the query string
 * @param {string} queryString    query string to be stripped
 */
const siteQueryStripper = (tags, queryString) => {
  let pattern = '([?&]';

  // open OR block
  pattern += '(';
  tags.forEach((tag, index) => {
    pattern += (index == tags.length - 1) ? tag : `${tag}|`;
  });
  // close OR block
  pattern += ')';
  // append search for =*
  pattern += '=[^&#]*)';

  const replacePattern = new RegExp(pattern, 'ig');

  return queryString.replace(replacePattern, '');
}

/**
 * Creates the event listeners for each site
 */
getSites()
  .then(sites => {
    sites.forEach(site => {
      chrome.extension.getBackgroundPage().console.log("Creating event listener for", site.urls);

      chrome.webRequest.onBeforeRequest.addListener(function (details) {
        // split url into url and query params
        const url = details.url;
        const queryStringIndex = url.indexOf('?');

        if (queryStringIndex > -1) {
          const path = url.substr(0, queryStringIndex);
          const queryString = url.substr(queryStringIndex);

          let strippedQueryString = globalQueryStripper(queryString);
          strippedQueryString = siteQueryStripper(site.tags, strippedQueryString);

          if (strippedQueryString.length > 1) {
            strippedQueryString = `?${strippedQueryString.substr(1)}`;
          }

          return { redirectUrl: `${path}${strippedQueryString}` };
        }
      }, { urls: site.urls, types: ['main_frame'] }, ['blocking']);
    });
  })
  .catch(error => {
    chrome.extension.getBackgroundPage().console.log(error);
  });

/**
 * LEGACY - global implementation
 * 
 * An alternate method will need to be added to handle stripping for all urls without duplication on the site specific configuration
 */
// chrome.webRequest.onBeforeRequest.addListener(function (details) {
//   // split url into url and query params
//   const url = details.url;
//   const queryStringIndex = url.indexOf('?');

//   if (queryStringIndex > -1) {
//     const path = url.substr(0, queryStringIndex);
//     const queryString = url.substr(queryStringIndex);

//     let strippedQueryString = globalQueryStripper(queryString);

//     if (strippedQueryString.length > 1) {
//       strippedQueryString = `?${strippedQueryString.substr(1)}`;
//     }

//     return { redirectUrl: `${path}${strippedQueryString}` };
//   }
//   // process global params

//   // process site params

//   // rebuild url

//   // chrome.extension.getBackgroundPage().console.log(location.search);
//   // var url = details.url;
//   // var queryStringIndex = url.indexOf('?');
//   // if (url.search(searchPattern) > queryStringIndex) {
//   //   var stripped = url.replace(replacePattern, '');
//   //   if (stripped.charAt(queryStringIndex) === '&') {
//   //     stripped = stripped.substr(0, queryStringIndex) + '?' +
//   //       stripped.substr(queryStringIndex + 1)
//   //   }
//   //   if (stripped != url) {
//   //     return { redirectUrl: stripped };
//   //   }
//   // }
// },
//   { urls: ['https://*/*?*', 'http://*/*?*'], types: ['main_frame'] }, ['blocking']);
