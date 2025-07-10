function wrap(el, wrapper) {el.parentNode.insertBefore(wrapper, el);wrapper.appendChild(el);}

//template stuff
const navigation =
`<a href="./index.html">
  <img id="aside-1-img" alt="" src="./../meta/pfp-transparent.png">
</a>
<nav>
  <a href="./index.html">🏠︎</a>
  <a href="./../about.html#from-art">about me</a>
  <a href="./archive.html">archive</a>
  <a href="#" id="random-art" onclick="randomArt()">random</a>
  <a href="./../index.html">✮ head back »</a>
</nav>`

const footer =
'<a href="#">Sitemap</a>\
<a href="./../index.html">Head Back</a>\
<a href="./../chat.html">Chatbox</a>'

const lightbox =`
    <div id="lightbox" onclick="closeLightBox()">
        <div id="lightbox-content">
            <a href="#" id="lightbox-prev"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path fill="#000000" d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z"/></svg></a>

            <img src="#" alt="">
            
            <a href="#" id="lightbox-next"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path fill="#000000" d="M278.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-160 160c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L210.7 256 73.4 118.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l160 160z"/></svg></a>

            <div id="lightbox-info">
                <a href="#"></a>
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

document.querySelector("head").innerHTML+='<link rel="icon" type="image/x-icon" href="./../favicon.ico"></link>'

//adding links to images
images = document.querySelectorAll(".justified-gallery img")
fetch("./main.json")
.then((response) => response.json())
.then((art) => {
  for(i=0;i<images.length;i++){
    linkHTML=document.createElement("a")
    linkHTML.style.setProperty("--width",images[i].style.getPropertyValue("--width"))
    linkHTML.style.setProperty("--height",images[i].style.getPropertyValue("--height"))
    linkHTML.setAttribute("onclick",'openImg('+i+')')
    linkHTML.href="#"

    trueIndex = getIndex(art,images[i].src.split("img/")[1])
    images[i].style.setProperty("--trueIndex",trueIndex)

    wrap(images[i],linkHTML)
  }
})

function getIndex(json,current){
  for(x=0;x<json.length;x++){
    // checks the usual image
    if(json[x].img===current){
      index = x
      return index
    }
    
    // checks the extras
    if( json[x].extra !== undefined ){
      for(xx=0; xx<json.length; xx++){
        if(json[x].extra[xx] === current){
          index = x
          return index
        } 
      }
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

lb_open = false
lb_e = document.getElementById("lightbox")
lb_c = document.getElementById("lightbox-content")
lb_i = document.getElementById("lightbox-info")

lb_height = getComputedStyle(lb_e).getPropertyValue("--default-height")
lb_color = getComputedStyle(lb_e).getPropertyValue("--default-color")
lb_img = getComputedStyle(lb_e).getPropertyValue("--default-img")
lb_time = parseFloat(getComputedStyle(lb_e).getPropertyValue("--time")) * 1500

function closeLightBox() {
    if (lb_c.contains(event.target) === false) {
      lb_open = false
      lb_e.style.background = "unset"
      lb_e.style.height = "0vh"
      lb_e.querySelector("img").style.maxHeight = "0"
    }
}

function openImg(i){
  lb_open = true

  lb_e.style.background = lb_color
  lb_e.style.height = lb_height
  lb_e.querySelector("img").style.maxHeight = lb_img

  lb_e.querySelector("img").src = images[i].src

  if(images[i-1]){prev=i-1}else{prev=images.length-1}
  if(images[i+1]){next=i+1}else{next=0}
  document.getElementById("lightbox-prev").setAttribute("onclick",'openImg('+prev+')')
  document.getElementById("lightbox-next").setAttribute("onclick",'openImg('+next+')')

  fetch("./main.json")
    .then((response) => response.json())
    .then((art) => {
      trueIndex = images[i].style.getPropertyValue("--trueIndex")
      lb_link = "./~?" + art[trueIndex].img
      title = getTitle(art, trueIndex)

      // if(art[trueIndex].desc!==undefined){
      //   desc = art[trueIndex].desc
      // } else { desc = "" }

      lb_i.querySelector("a").href = lb_link  
      lb_i.querySelector("a").innerHTML = title 
  })
}

// navigation
document.onkeydown = function(event) {
  if( lb_open == true ){
    switch (event.keyCode) {
        case 37:
          document.getElementById("lightbox-prev").click()
        break;
        case 39:
          document.getElementById("lightbox-next").click()
        break;
        case 27:
          lb_e.click()
        break;
        case 13:
          lb_i.querySelector("a").click()
        break;
      }
  }
  switch (event.keyCode) {
    case 82:
      document.getElementById("random-art").click()
    break;
  }
}

// random art
function randomArt(){
    fetch("./main.json")
    .then((response) => response.json())
    .then((art) => {
      randomNum = Math.floor(Math.random() * art.length);
      window.location.href = "./~?" + art[randomNum].img
  })
}


// tags
document.querySelector("head").innerHTML+=`<meta name="keywords" content="stupied, stupiedidiot, stupied.idiot, stupied_idiot, art, original characters, ocs, fanart ">`

// COMMENTS
if (document.getElementById("c_widget")){
  var script = document.createElement('script');
  script.src = "./../meta/comment-widget.js";
  document.head.appendChild(script);
}

// erm
urlHref=window.location.href
if(urlHref.includes("https://stupied.neocities.org/")){
  if(urlHref.includes(".html")){
    window.location.pathname = window.location.pathname.replaceAll(".html","")
  }
}