const url = window.location.pathname;
    relativePath = "./";
    urlPath = url.split('/');
    if(urlPath.length > 2){for(i=0;i<urlPath.length-2;i++){relativePath+="../"}}

function addTo(item,input){
    if (item) {
        if(typeof input=="string"){
            item.innerHTML+=input;
        } else {
            item.append(input);
        }
    }
}

function addToTag(tag,input) {
    tag = document.getElementsByTagName(tag)[0]
    addTo(tag,input)
}
function addToId(id,input) {
    id = document.getElementById(id)
    addTo(id,input)
}
function addToQuery(query,input) {
    query = document.querySelector(query)
    addTo(query,input)
}
function wrap(el, wrapper) {
    el.parentNode.insertBefore(wrapper, el);
    wrapper.appendChild(el);
}

function createItem(item,{id,style,input,src,href,title}){
    item = document.createElement(item)
    if(id!==undefined){item.id = id}
    if(style!==undefined){item.classList.add(style)}
    if(src!==undefined){item.src = src}
    if(href!==undefined){item.href = href}
    if(title!==undefined){item.title = title}
    if(input!==undefined){addTo(item,input)}
    return item
}
addToTag("head", '<link rel="icon" type="image/x-icon" href="'+relativePath+'meta/media/favicon.ico"></link>');
addToId("comments",' <div id="HCB_comment_box"><a href="http://www.htmlcommentbox.com">Beep Boop</a>, hold please!</div><link rel="stylesheet" type="text/css" href="https://www.htmlcommentbox.com/static/skins/bootstrap/twitter-bootstrap.css?v=0" /><style>#HCB_comment_box img{width:auto;display:inline-block;}.home-desc{display:none;}#HCB_comment_box h3:first-child{margin:0;}</style>');

window.onload = function(){
    if(document.getElementById("comments")){
        if(!window.hcb_user){hcb_user={};} (function(){var s=document.createElement("script"), l=hcb_user.PAGE || (""+window.location).replace(/'/g,"%27"), h="https://www.htmlcommentbox.com";s.setAttribute("type","text/javascript");s.setAttribute("src", h+"/jread?page="+encodeURIComponent(l).replace("+","%2B")+"&mod=%241%24wq1rdBcg%24lorU9Glfj8bQyg9yk9caG%2F"+"&opts=16798&num=10&ts=1699153972795");if (typeof s!="undefined") document.getElementsByTagName("head")[0].appendChild(s);})();
    }
}

addToTag("footer",'<a href="#">Sitemap</a><a href="'+relativePath+'index.html">Home</a><a href="'+relativePath+'chat.html">Chatbox</a>')