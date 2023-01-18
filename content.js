chrome.runtime.sendMessage({type: "getStoredSwipeValues"});
chrome.runtime.sendMessage({type: "getStoredMessageValues"});

likes  = document.getElementById('likesId');
pass =  document.getElementById("passId");
swipes = document.getElementById("swipesId");
sentMessages = document.getElementById("sentMessagesId");
receivedMessages = document.getElementById("receivedMessagesId");

function UpdateHtmlSwipeValues(cptLike, cptPass){
    likes.innerHTML = cptLike.toString();
    pass.innerHTML = cptPass.toString();
    swipes.innerHTML = (cptLike + cptPass).toString();
}

function UpdateHtmlMessageValues(cptSentMessages, cptReceivedMessages){
    sentMessages.innerHTML = cptSentMessages.toString();
    receivedMessages.innerHTML = cptReceivedMessages.toString();
}

//#region Listener
chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if( request.type === "UpdateHtmlMessageValues" ) {
            UpdateHtmlMessageValues(request.cptSentMessages, request.cptReceivedMessages);
        }
    });

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if( request.type === "UpdateHtmlSwipeValues" ) {
            UpdateHtmlSwipeValues(request.cptLike, request.cptPass);
        }
    });
//#endregion


//envoyer un message: POST https://api.gotinder.com/user/matches/634470e5cd3ff90100e87dd0638b27ebb0ef270100631eae?locale=fr
//recevoir un message: POST https://api.gotinder.com/updates?locale=fr