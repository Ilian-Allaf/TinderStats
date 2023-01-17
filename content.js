likes  = document.getElementById('likesId');
pass =  document.getElementById("passId");
swipes = document.getElementById("swipesId");

function onSwipe(cptLike, cptPass){
    console.log("onSwipe Methode")
    likes.innerHTML = cptLike.toString();
    pass.innerHTML = cptPass.toString();
    swipes.innerHTML = (cptLike + cptPass).toString();
}

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if( request.type === "onSwipe" ) {
            onSwipe(request.cptLike, request.cptPass);
        }
    });