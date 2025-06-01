images=document.querySelectorAll(".selected > img")

window.onload = function(){
    for(i=0;i<images.length;i++){
        imgWidth=images[i].offsetWidth
        imgHeight=images[i].offsetHeight
        images[i].style.setProperty("--width", imgWidth);
        images[i].style.setProperty("--height", imgHeight);
    }
}

document.onkeydown = function(event) {
  if( document.activeElement === document.querySelector("body") ){
    switch (event.keyCode) {
        case 32:
            copyText()
        break;
        }
  }
}

function copyText(){
    text = document.querySelectorAll(".selected").innerHTML
    navigator.clipboard.writeText(text);
    alert("text copied")
}

function copyTextArray(){
navigator.clipboard.writeText(test);
alert("text copied")
}
