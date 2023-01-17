let cptLike = 0;
let cptPass = 0;

getStoredCptValues();

function getStoredCptValues()
{
    chrome.storage.local.get(['cptLike', 'cptPass'], function(result) {
        cptLike = result.cptLike || 0;
        cptPass = result.cptPass || 0;
    });
    chrome.runtime.sendMessage({type: "onSwipe", cptLike: cptLike, cptPass: cptPass});
}


function requestHandler(req){
    if(req.url.includes("https://api.gotinder.com/like/") && req.method == "POST"){
        cptLike ++;
        chrome.storage.local.set({cptLike: cptLike});
        getStoredCptValues();
    }
    else if(req.url.includes("https://api.gotinder.com/pass/") && req.method == "GET"){
        cptPass ++;
        chrome.storage.local.set({cptPass: cptPass});
        getStoredCptValues();
    }
}

chrome.runtime.onInstalled.addListener(() => {
    console.log("EXTENSION INSTALLED");
});

chrome.webNavigation.onDOMContentLoaded.addListener(() => {
    console.log("NOUVELLE PAGE OUVERTE")
})

chrome.webRequest.onBeforeSendHeaders.addListener(requestHandler,
    {urls: ["<all_urls>"]},
    ["requestHeaders"]);


/*

*/
