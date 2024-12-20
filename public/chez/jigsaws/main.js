/*
    {
        "name":"",
        "company":"",
        "pieces":"",
        "dimensions":"",
        "date":"",
        "price":"",
        "imgs":[
            "",
            ""
        ],
        "desc":""
    },
*/
document.querySelector("head").innerHTML+='<link rel="icon" type="image/x-icon" href="./../../meta/favicon.ico"></link>'

function wrap(el, wrapper) {el.parentNode.insertBefore(wrapper, el);wrapper.appendChild(el);}

//adding links to images
images=document.querySelectorAll("#archive img")
for(i=0;i<images.length;i++){
  linkHTML=document.createElement("a")
  linkHTML.style.setProperty("--width",images[i].style.getPropertyValue("--width"))
  linkHTML.style.setProperty("--height",images[i].style.getPropertyValue("--height"))  

  link=images[i].src
  link=link.lastIndexOf('/', link.lastIndexOf('/')-1)+1
  link="./view.html?item="+images[i].src.slice(link,link.length)
  link=link.replaceAll("img/","")

  linkHTML.href=link
  
  wrap(images[i],linkHTML)
}


//comments
if (e=document.getElementById("comments")){e.innerHTML='<div id="HCB_comment_box"><a href="http://www.htmlcommentbox.com">Beep Boop</a>, hold please!</div><link rel="stylesheet" type="text/css" href="https://www.htmlcommentbox.com/static/skins/bootstrap/twitter-bootstrap.css?v=0" /><style>#HCB_comment_box img{width:auto;display:inline-block;}.home-desc{display:none;}#HCB_comment_box h3:first-child{margin:0;}</style>'}

window.onload = function(){
    if(document.getElementById("comments")){
        if(!window.hcb_user){hcb_user={};} (function(){var s=document.createElement("script"), l=hcb_user.PAGE || (""+window.location).replace(/'/g,"%27"), h="https://www.htmlcommentbox.com";s.setAttribute("type","text/javascript");s.setAttribute("src", h+"/jread?page="+encodeURIComponent(l).replace("+","%2B")+"&mod=%241%24wq1rdBcg%24lorU9Glfj8bQyg9yk9caG%2F"+"&opts=16798&num=10&ts=1699153972795");if (typeof s!="undefined") document.getElementsByTagName("head")[0].appendChild(s);})();
    }
}

url=window.location.href
if(url.includes("https://stupied.neocities.org/chez/jigsaws/view")){
  if(url.includes(".html")){
    window.location.pathname=window.location.pathname.replaceAll(".html","")
  }
}