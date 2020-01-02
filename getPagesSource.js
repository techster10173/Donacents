// @author Rob W <http://stackoverflow.com/users/938089/rob-w>
// Demo: var serialized_html = DOMtoString(document);

function DOMtoString(document_root){
    var html = '', node;
    if(location.href.includes("https://www.amazon.com/gp/cart/view.html?ref_=nav_cart")) {
        node = document_root.getElementsByClassName("a-size-medium a-color-price sc-price sc-white-space-nowrap sc-price-sign");
        html += node[0].innerText;
    }else if(location.href.includes("https://cart.ebay.com/")) {
        html = document_root.getElementsByClassName("val-col total-row")[0].firstElementChild.firstElementChild;
        html = html.innerText;
    }
    return html;
}

chrome.runtime.sendMessage({
    action: "getSource",
    source: DOMtoString(document)
});