function wrap(el, wrapper) {el.parentNode.insertBefore(wrapper, el);wrapper.appendChild(el);}

folders = [ "c", "a" ]
const url = window.location.pathname;
const urlSplit = url.split("/")
relativePath = getRelativePath() 

//template stuff
const navigation =`
  <nav>
      <h1>Stupied</h1>
      <a href="#" class="open hidden" onclick="mobileNav('open')">≡</a>
      <a href="#" class="close hidden" onclick="mobileNav('close')">X</a>
      <a href="#">Portfolio</a>
      <a href="#">Commission</a>
      <a href="#">Adopt</a>
      <a href="#">Contact</a>
  </nav>
`

const footer =`
  <nav>
      <a href="">Terms of Service</a>
  </nav>
`

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

const template =`${lightbox}
<div id="container">
  <header id="close" class="outline" style="--color: black;--width: 4px;">${navigation}</header>
  <main></main>
  <footer class="outline" style="--color: black;--width: 4px;">${footer}</footer>
    <img src="https://psych-comic.neocities.org/img/pix-psy.png" alt="">
</div>
`

document.getElementsByTagName("body")[0].innerHTML+=template

main=document.querySelectorAll(".main-content");
for(i=0; i<main.length; i++){
    document.querySelector("#container main").append(main[i]);
}

document.querySelector("head").innerHTML+=`<link rel="icon" type="image/x-icon" href="${relativePath}favicon.ico"></link>`

function mobileNav (state) {
  document.getElementsByTagName('header')[0].id = state
}

//adding links to images
images = document.querySelectorAll(".justified-gallery img")
for(i=0;i<images.length;i++){
    item = {}
    item.result = document.createElement("a")
    item.result.style.setProperty("--width",images[i].style.getPropertyValue("--width"))
    item.result.style.setProperty("--height",images[i].style.getPropertyValue("--height"))
    item.result.setAttribute("onclick",'openImg('+i+')')
    item.result.href="#"

    item.result.dataset.link = getLink(images[i])
    item.result.dataset.title = getTitle(images[i])

    //images[i].style.setProperty("--trueIndex",item.index)
    wrap(images[i],item.result)
}

function getLink (x){
    if(x.dataset.link!==undefined){
        title = x.dataset.link
        return title
    } else {
        return x.src 
    }
}

function getTitle(x){
    if(x.dataset.title!==undefined){
        title = x.dataset.title
        return title
    } else {
        e = x.src.split("img/")[1]
        fauxTitle = e
        if(e.includes("/")){fauxTitle = e.slice(e.indexOf("/")+1,e.length)}
        fauxTitle = fauxTitle.slice(5,fauxTitle.length-4)
        fauxTitle = fauxTitle.replaceAll("-"," ")
        return fauxTitle
    }
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
  
  lb_i.querySelector("a").innerHTML = lb_item.dataset.title + " »"
  lb_i.querySelector("a").href = lb_item.dataset.link
}

function getRelativePath(){
    s = urlSplit[urlSplit.length-2]
    for (i = 0; i < folders.length; i++){
        if (folders[i]===s){ return "./../"}

    } 
    return "./"
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
}

// tags
document.querySelector("head").innerHTML+=`<meta name="keywords" content="stupied, stupiedidiot, stupied.idiot, stupied_idiot, art, commissions, webdesign, frontend, css, js">`