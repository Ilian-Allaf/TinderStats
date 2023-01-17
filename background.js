let cptLike = 0;
let cptPass = 0;


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

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if( request.type === "getStoredCptValues" ) {
            getStoredCptValues();
        }
    });
/*
Faire stat journaliere et stat totale
likes, pass, swipes, match/likes, temps passé, nombre de message envoyé, nombre de message recus
*/
