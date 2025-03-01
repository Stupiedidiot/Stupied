function wrap(el, wrapper) {el.parentNode.insertBefore(wrapper, el);wrapper.appendChild(el);}

//template stuff
const navigation =
`<a href="./index.html">
  <img id="aside-1-img" alt="" src="./../meta/pfp-transparent.png">
</a>
<nav>
  <a href="./../about.html#from-art">about me</a>
  <a href="./archive.html">archive</a>
  <a href="./commission.html">comms</a>
  <a href="./../index.html">head back</a>
</nav>`

const footer =
'<a href="#">Sitemap</a>\
<a href="./../index.html">Head Back</a>\
<a href="./../chat.html">Chatbox</a>'

const lightbox =`
<div id="lightbox">
    <div id="lightbox-container">
        <div id="lightbox-img">
            <img src="">
        </div>
        <div id="lightbox-side">
            <div id="lightbox-header">
                <button onclick="closeLightBox()">X</button>
                <h2></h2>
            </div>
            <div id="lightbox-info"></div>
            <div id="lightbox-navigation">
              <div id="lightbox-comments">
                <a  href="#">View Comments</a>
              </div>
              <div id="lightbox-buttons">
                  <button id="lightbox-prev">«</button>
                  <button id="lightbox-next">»</button>
              </div>
            </div>
        </div>
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
</div>`

document.getElementsByTagName("body")[0].innerHTML+=template

main=document.querySelectorAll(".main-content");
for(i=0; i<main.length; i++){
    document.querySelector("#container main").append(main[i]);
}

if(e=document.getElementById("aside-1-content")){document.querySelector("#container #aside-1").append(e)}

if(document.title===""){document.title="gallery // stupied"}else{document.title+= " - gallery // stupied";}

document.querySelector("head").innerHTML+='<link rel="icon" type="image/x-icon" href="./../meta/favicon.ico"></link>'

//adding links to images
images=document.querySelectorAll(".justified-gallery img")
fetch("./main.json")
.then((response) => response.json())
.then((art) => {
  for(i=0;i<images.length;i++){
    linkHTML=document.createElement("a")
    linkHTML.style.setProperty("--width",images[i].style.getPropertyValue("--width"))
    linkHTML.style.setProperty("--height",images[i].style.getPropertyValue("--height"))
    linkHTML.setAttribute("onclick",'openImg('+i+')')

    trueIndex=getIndex(art,images[i].src.split("img/")[1])
    images[i].style.setProperty("--trueIndex",trueIndex)

    wrap(images[i],linkHTML)
  }
})

function getIndex(json,current){
  for(x=0;x<json.length;x++){
        if(json[x].img===current){
          index=x
          return index
        }
    }
    return -1
}

function getTitle(art,x){
  if(art[x].title!==undefined){
    title=art[x].title
    return title
  } else {
    e = art[x].img
    fauxTitle = e
    if(e.includes("/")){fauxTitle = e.slice(e.indexOf("/"),e.length)}
    fauxTitle = fauxTitle.slice(5,fauxTitle.length-4)
    fauxTitle = fauxTitle.replaceAll("-"," ")
    return fauxTitle
  }
}

function openImg(i){  
  document.getElementsByTagName("body")[0].classList.add("lightbox-activated")
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
  document.querySelector("#lightbox-comments a").href=link  

  fetch("./main.json")
    .then((response) => response.json())
    .then((art) => {
      trueIndex=images[i].style.getPropertyValue("--trueIndex")
      document.querySelector("#lightbox-header h2").innerHTML=getTitle(art, trueIndex)

      if(art[trueIndex].desc!==undefined){
        document.getElementById("lightbox-info").innerHTML=art[trueIndex].desc
      } else { document.getElementById("lightbox-info").innerHTML=""}
  })
}

function closeLightBox(){
  document.getElementById("lightbox").style.height=0;
  document.querySelector("body").classList.remove("lightbox-activated");
}

// tags
document.querySelector("head").innerHTML+=`<meta name="keywords" content="stupied, stupiedidiot, stupied.idiot, stupied_idiot, art, original characters, ocs, fanart ">`

// COMMENTS
if (e=document.getElementById("comments")){
	e.innerHTML='<div id="HCB_comment_box"><a href="http://www.htmlcommentbox.com">Beep Boop</a>, hold please!</div><link rel="stylesheet" type="text/css" href="https://www.htmlcommentbox.com/static/skins/bootstrap/twitter-bootstrap.css?v=0" /><style>#HCB_comment_box img{width:auto;display:inline-block;}.home-desc{display:none;}#HCB_comment_box h3:first-child{margin:0;} .comment img[src*="https://www.htmlcommentbox.com/storage/"] {max-width:100%;}</style>';
	loadcomments()
}
function loadcomments(){
	if(!window.hcb_user){hcb_user={};} (function(){var s=document.createElement("script"), l=hcb_user.PAGE || (""+window.location).replace(/'/g,"%27"), h="https://www.htmlcommentbox.com";s.setAttribute("type","text/javascript");s.setAttribute("src", h+"/jread?page="+encodeURIComponent(l).replace("+","%2B")+"&mod=%241%24wq1rdBcg%24lorU9Glfj8bQyg9yk9caG%2F"+"&opts=16798&num=10&ts=1699153972795");if (typeof s!="undefined") document.getElementsByTagName("head")[0].appendChild(s);})();
}

// erm
urlHref=window.location.href
if(urlHref.includes("https://stupied.neocities.org/")){
  if(urlHref.includes(".html")){
    window.location.pathname=window.location.pathname.replaceAll(".html","")
  }
}