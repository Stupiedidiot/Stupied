function wrap(el, wrapper) {el.parentNode.insertBefore(wrapper, el);wrapper.appendChild(el);}

//template stuff
const navigation =
`<a href="./index.html">
  <img id="aside-1-img" src="./../meta/pfp-transparent.png">
</a>
<nav>
  <a href="./../about.html#from-art">about</a>
  <a href="./archive.html">archive</a>
  <a href="./commission.html">commissions</a>
</nav>`

const footer =
'<a href="#">Sitemap</a>\
<a href="./../index.html">Head Back</a>\
<a href="./../chat.html">Chatbox</a>'

const lightbox =`
<div id="lightbox">
  <button onclick="closeLightBox()">X</button>
  <div id="lightbox-img">
    <img src="#">
  </div>

  <div id="lightbox-nav">
    <a id="lightbox-prev">« Prev</a> |
    <a href="#" id="lightbox-details">View Details</a> |
    <a id="lightbox-next">Next »</a>
  </div>
</div>
`

const template =lightbox + `
<div id="container">
  <header></header>
  <div id="aside-container">
    <div id="aside-1">
      `+navigation+`
    </div>
  </div>
  <main></main>
  <footer>`+footer+`</footer>
</div>`

document.getElementsByTagName("body")[0].innerHTML+=template

main=document.querySelectorAll(".main-content");
for(i=0; i<main.length; i++){
    document.querySelector("#container main").append(main[i]);
}

if(e=document.getElementById("aside-1-content")){document.querySelector("#container #aside-1").append(e)}

if(document.title===""){document.title="gallery // stupied"}else{document.title+= " - gallery // stupied";}

document.querySelector("head").innerHTML+='<link rel="icon" type="image/x-icon" href="./../meta/favicon.ico"></link>'

//adding links to iamges
images=document.querySelectorAll(".justified-gallery img")
for(i=0;i<images.length;i++){
  linkHTML=document.createElement("a")
  linkHTML.style.setProperty("--width",images[i].style.getPropertyValue("--width"))
  linkHTML.style.setProperty("--height",images[i].style.getPropertyValue("--height"))  
  linkHTML.setAttribute("onclick",'openImg('+i+')')
  
  wrap(images[i],linkHTML)
}

function openImg(i){  
  document.querySelector("#lightbox img").src=images[i].src

  document.getElementById("lightbox").style.height="100vh"

  if(images[i-1]){prev=i-1}else{prev=images.length-1}
  if(images[i+1]){next=i+1}else{next=0}
  document.getElementById("lightbox-prev").setAttribute("onclick",'openImg('+prev+')')
  document.getElementById("lightbox-next").setAttribute("onclick",'openImg('+next+')')

  link=images[i].src
  link=link.lastIndexOf('/', link.lastIndexOf('/')-1)+1
  link="./view.html?item="+images[i].src.slice(link,link.length)
  link=link.replaceAll("img/","")
  document.getElementById("lightbox-details").href=link  
}

function closeLightBox(){
  document.getElementById("lightbox").style.height=0
}

//comments
if (e=document.getElementById("comments")){e.innerHTML='<div id="HCB_comment_box"><a href="http://www.htmlcommentbox.com">Beep Boop</a>, hold please!</div><link rel="stylesheet" type="text/css" href="https://www.htmlcommentbox.com/static/skins/bootstrap/twitter-bootstrap.css?v=0" /><style>#HCB_comment_box img{width:auto;display:inline-block;}.home-desc{display:none;}#HCB_comment_box h3:first-child{margin:0;}</style>'}

window.onload = function(){
    if(document.getElementById("comments")){
        if(!window.hcb_user){hcb_user={};} (function(){var s=document.createElement("script"), l=hcb_user.PAGE || (""+window.location).replace(/'/g,"%27"), h="https://www.htmlcommentbox.com";s.setAttribute("type","text/javascript");s.setAttribute("src", h+"/jread?page="+encodeURIComponent(l).replace("+","%2B")+"&mod=%241%24wq1rdBcg%24lorU9Glfj8bQyg9yk9caG%2F"+"&opts=16798&num=10&ts=1699153972795");if (typeof s!="undefined") document.getElementsByTagName("head")[0].appendChild(s);})();
    }
}

// erm
urlHref=window.location.href
if(urlHref.includes("https://stupied.neocities.org/")){
  if(urlHref.includes(".html")){
    window.location.pathname=window.location.pathname.replaceAll(".html","")
  }ur
}