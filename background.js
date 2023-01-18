let cptLike = 0;
let cptPass = 0;
let cptSentMessages = 0;
let cptReceivedMessages = 0;

function getStoredSwipeValues()
{
    chrome.storage.local.get(['cptLike', 'cptPass'], function(result) {
        cptLike = result.cptLike || 0;
        cptPass = result.cptPass || 0;
        chrome.runtime.sendMessage({type: "UpdateHtmlSwipeValues", cptLike: cptLike, cptPass: cptPass});
    });
}
function getStoredMessageValues()
{
    chrome.storage.local.get(['cptSentMessages', 'cptReceivedMessages'], function(result) {
        cptSentMessages = result.cptSentMessages || 0;
        cptReceivedMessages = result.cptReceivedMessages || 0;
        chrome.runtime.sendMessage({type: "UpdateHtmlMessageValues", cptSentMessages: cptSentMessages, cptReceivedMessages: cptReceivedMessages});
    });
}


function requestHandler(req){
    //Likes
    if(req.url.includes("https://api.gotinder.com/like/") && req.method == "POST"){
        cptLike ++;
        chrome.storage.local.set({cptLike: cptLike});
        getStoredSwipeValues();
    }
    //Pass
    else if(req.url.includes("https://api.gotinder.com/pass/") && req.method == "GET"){
        cptPass ++;
        chrome.storage.local.set({cptPass: cptPass});
        getStoredSwipeValues();
    }
    //Sent Messages
    else if(req.url.includes("https://api.gotinder.com/user/matches/") && req.method == "POST"){
        console.log("Sent Messages")
        cptSentMessages ++;
        chrome.storage.local.set({cptSentMessages: cptSentMessages});
        getStoredMessageValues();
    }
    //Received Messages
    else if(req.url.includes("POST https://api.gotinder.com/updates?locale=fr") && req.method == "POST"){
        console.log("Received Messages")
        cptSentMessages ++;
        chrome.storage.local.set({cptReceivedMessages: cptReceivedMessages});
        getStoredMessageValues();
    }
}

//#region Listener
chrome.runtime.onInstalled.addListener(() => {
    console.log("EXTENSION INSTALLED");
});

chrome.webNavigation.onDOMContentLoaded.addListener(() => {
    console.log("NEW PAGE")
})

chrome.webRequest.onBeforeSendHeaders.addListener(requestHandler,
    {urls: ["<all_urls>"]},
    ["requestHeaders"]);

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if( request.type === "getStoredSwipeValues" ) {
            getStoredSwipeValues();
        }
    });
chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if( request.type === "getStoredMessageValues" ) {
            getStoredMessageValues();
        }
    });
//#endregion

/*
Faire stat journaliere et stat totale
likes, pass, swipes, match/likes, temps passé, nombre de message envoyé, nombre de message recus
*/
