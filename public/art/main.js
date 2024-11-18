function wrap(el, wrapper) {el.parentNode.insertBefore(wrapper, el);wrapper.appendChild(el);}

//template stuff
const navigation =
'<a href="./../about.html">\
  <img id="aside-1-img" src="./img/2024-raffidelle.png">\
</a>\
<nav>\
  <a href="./index.html">home</a>\
  <a href="./archive.html">archive</a>\
  <a href="#">code</a>\
  <a href="#">commissions</a>\
</nav>'

const footer =
'<a href="#">Sitemap</a>\
<a href="./../index.html">Home</a>\
<a href="./../chat.html">Chatbox</a>'

const template =
'<div id="container">\
  <header></header>\
  <div id="aside-1">'+navigation+'</div>\
  <main></main>\
  <div id="aside-2"></div>\
  <footer>'+footer+'</footer>\
</div>'

document.getElementsByTagName("body")[0].innerHTML+=template


if(e=document.getElementById("main-content")){document.querySelector("#container main").append(e)}
if(e=document.getElementById("aside-1-content")){document.querySelector("#container #aside-1").append(e)}
if(e=document.getElementById("aside-2-content")){document.querySelector("#container #aside-2").append(e)}

if(document.title===""){document.title="gallery // stupied"}else{document.title+= " - gallery // stupied";}

//adding links to iamges
images=document.querySelectorAll(".justified-gallery img")
for(i=0;i<images.length;i++){
  //get image links
  link=images[i].src
  link=link.lastIndexOf('/', link.lastIndexOf('/')-1)+1
  link="./viewer.html?item="+images[i].src.slice(link,link.length)
  link=link.replaceAll("img/","")

  //make n wrap anchor tag
  linkHTML=document.createElement("a")
  linkHTML.href=link
  linkHTML.style.setProperty("--width",images[i].style.getPropertyValue("--width"))
  linkHTML.style.setProperty("--height",images[i].style.getPropertyValue("--height"))
  wrap(images[i],linkHTML)
}

//comments
if (e=document.getElementById("comments")){e.innerHTML='<div id="HCB_comment_box"><a href="http://www.htmlcommentbox.com">Beep Boop</a>, hold please!</div><link rel="stylesheet" type="text/css" href="https://www.htmlcommentbox.com/static/skins/bootstrap/twitter-bootstrap.css?v=0" /><style>#HCB_comment_box img{width:auto;display:inline-block;}.home-desc{display:none;}#HCB_comment_box h3:first-child{margin:0;}</style>'}

window.onload = function(){
    if(document.getElementById("comments")){
        if(!window.hcb_user){hcb_user={};} (function(){var s=document.createElement("script"), l=hcb_user.PAGE || (""+window.location).replace(/'/g,"%27"), h="https://www.htmlcommentbox.com";s.setAttribute("type","text/javascript");s.setAttribute("src", h+"/jread?page="+encodeURIComponent(l).replace("+","%2B")+"&mod=%241%24wq1rdBcg%24lorU9Glfj8bQyg9yk9caG%2F"+"&opts=16798&num=10&ts=1699153972795");if (typeof s!="undefined") document.getElementsByTagName("head")[0].appendChild(s);})();
    }
}