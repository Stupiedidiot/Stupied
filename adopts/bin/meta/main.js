function wrap(el, wrapper) {el.parentNode.insertBefore(wrapper, el);wrapper.appendChild(el);}

/*
const navigation =
`<a href="./index.html">
  <img id="aside-1-img" alt="" src="./../meta/pfp-transparent.png">
</a>
<nav>
  <a href="./index.html">🏠︎</a>
  <a href="./../about/index.html#from-art">about me</a>
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
**/

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

document.querySelector("body").innerHTML = lightbox + document.querySelector("body").innerHTML
if(document.title===""){document.title="stupied guys!"}else{document.title+= " | stupied guys!";}

document.querySelector("head").innerHTML+='<link rel="icon" type="image/x-icon" href="https://stupied.neocities.org/favicon.ico"></link>'

//adding links to images
images = document.querySelectorAll(".guys img")
fetch("./meta/main.json")
.then((response) => response.json())
.then((art) => {
  for(i = 0; i < images.length; i++){
    item = {}
    item.result = document.createElement("a")
    item.result.setAttribute("onclick",'openImg('+i+')')
    item.result.href="#"

    item.raw = images[i].src.split("img/")[1] 
    item.id = item.raw.substring(0, item.raw.indexOf("-"))
    item.index = getIndex(art, item.id)

    item.result.style.setProperty("--width", art[item.index].dime[0])
    item.result.style.setProperty("--height", art[item.index].dime[1])
    item.result.style.setProperty("--link", art[item.index].id)
    item.result.style.setProperty("--title", art[item.index].name)

    images[i].style.setProperty("--trueIndex",item.index)
    wrap(images[i],item.result)
  }

  // for the archive
  for(i = 0; i < 3; i++){
    item = {}
    item.name = art[i].name
    console.log(art[i])
  }

})

function getIndex(json,current){
  for(x=0;x<json.length;x++){
    // checks the usual image
    if(json[x].id===current){
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

lb_open = false
lb_e = document.getElementById("lightbox")
lb_e_prop = getComputedStyle(lb_e)
lb_c = document.getElementById("lightbox-content")
lb_i = document.getElementById("lightbox-info")

lb_height = lb_e_prop.getPropertyValue("--default-height")
lb_color = lb_e_prop.getPropertyValue("--default-color")
lb_img = lb_e_prop.getPropertyValue("--default-img")
lb_time = parseFloat(lb_e_prop.getPropertyValue("--time")) * 1500

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

  lb_item = document.querySelectorAll(".justified-gallery a")[i]
  lb_item_prop = getComputedStyle(lb_item)
  
  lb_i.querySelector("a").innerHTML = lb_item_prop.getPropertyValue("--title") + " | View More »"
  lb_i.querySelector("a").href = " ./~?" + lb_item_prop.getPropertyValue("--link")
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
      window.location.href = "./~?" + art[randomNum].id
  })
}


// tags
document.querySelector("head").innerHTML+=`<meta name="keywords" content="stupied, stupiedidiot, stupied.idiot, stupied_idiot, art, adopts, adoptables, snails">`

// COMMENTS
if (document.getElementById("c_widget")){
  var script = document.createElement('script');
  script.src = "https://stupied.neocities.org/meta/comment-widget.js";
  document.head.appendChild(script);
}