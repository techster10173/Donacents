chrome.tabs.onActivated.addListener(function(activeInfo){
    chrome.tabs.query({
        active: true,
        currentWindow: true
    },function(tab){
        console.log(tab);
        if(tab[0].url.includes("https://www.amazon.com/gp/cart/view.html?ref_=nav_cart") || tab[0].url.includes("https://cart.ebay.com/")) {
            chrome.browserAction.setBadgeText({text: "✓"});
        }else{
            chrome.browserAction.setBadgeText({text: ""});
        }
    });
});

var amount;

chrome.runtime.onMessage.addListener(function(request, sender) {
    if (request.action == "getSource") {
        amount = request.source.substring(1);
        amount = cents(amount);
        message.innerText = "$" + amount;
    }
});

function onWindowLoad(){
    var message = document.querySelector('#message');

    chrome.tabs.executeScript(null, {
        file: "getPagesSource.js"
    }, function() {
        // If you try and inject into an extensions page or the webstore/NTP you'll get an error
        if (chrome.runtime.lastError) {
            // message.innerText = 'There was an error injecting script : \n' + chrome.runtime.lastError.message;
            message.innerText = "$0.00";
        }
    });

}

window.onload = onWindowLoad;

function cents(amount){
    return (Math.ceil(amount) - amount).toFixed(2);
}

document.getElementById("fullMenu").addEventListener("click",function () {
    chrome.tabs.create({url: chrome.extension.getURL('menu.html')});
});

document.getElementById("saveAmount").addEventListener("click", function () {
    if(parseFloat(localStorage.getItem("lastAmount")) !== parseFloat(amount)){
        localStorage.setItem("lastAmount",amount);
        var totalAmount = (parseFloat(localStorage.getItem("totalAmount"),10) + parseFloat(amount,10)).toFixed(2);
        localStorage.setItem("totalAmount", totalAmount);
    }
});