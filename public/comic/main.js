masterlist = [
    {
        "folder":"muse-adriade",
        "title":"Muse Ariadne",
        "desc":"Stuff for a writing club thingy wohooo!!",
        "parts":[
            {"file":"2024-02-05","title":"Writing is Hard"},
            //{"file":"2024-02-12","title":"Foreign Film"},
            {"file":"2024-02-26","title":"Blue Bird","img":"blue-bird.png"},
            //{"file":"2024-04-08","title":"I Hate You"},
            //{"file":"2024-05-13","title":"Total Domination"},
            {"file":"2024-05-20","title":"The Odd Siblings","img":"odd-siblings.png"},
            //{"file":"2024-08-26","title":"Laundry Day"},
            {"file":"2024-10-07","title":"Seclusion"}
        ],
    },
    {
        "folder":"misfits",
        "title":"The Misfits",
        "desc":"OC comics loosely based on the Pokemon Dungeon Games",
        "parts":[
            {"file":"independent","title":"Independent","img":"independent.png"},
            {"file":"yapping","title":"Yapping"},
            {"file":"saved","title":"Saved"},
            //{"file":"letters","title":"Letters"},
            //{"file":"siblings","title":"Siblings"}
        ]
    },
    {
        "folder":"puyo",
        "title":"Maguro's Thing",
        "desc":"Idk some dumb Puyo comic I made,,"
    },
    {
        "folder":"84",
        "title":"84",
        "desc":"Ashley Dobrik attempts to commit suicide but is prevented by getting stuck in a time loop.",
        "parts":[
            {"file":"uniform","title":"Uniform"},
            {"file":"notes","title":"Note Taking"}
            //{"file":"haircut","title":"Haircut"},
            /*
            {"file":"cover","title":"Cover Art"},
            {"file":"sorry","title":"Sorry"},
            {"file":"breakfast","title":"Breakfast"},
            {"file":"break","title":"Take a Break"},
            {"file":"news","title":"Exciting News"}
            */
        ]
    },
    {
        "folder":"psych",
        "title":"Psych!",
        "desc":"Being a psychic sucks actually.",
        "parts":[
            //{"file":"tetris","title":"Tetris"},
            {"file":"grass","title":"Touch Grass"},
            {"file":"icecream","title":"Ice Cream"},
            {"file":"man-down","title":"But, Psyyy--","img":"man-down.png"},
            {"file":"hell","title":"I like You"}
        ]
    },
    {
        "folder":"adrift",
        "title":"Adrift",
        "desc":"It's clearance signing and Adrina has an essay to finish."
    },
    {
        "folder":"hat",
        "title":"LiteralHat",
        "desc":"Random LiteralHat related Comics",
        "parts":[
            {"file":"index","title":"Clipper"},
            {"file":"lost","title":"Lost","img":"0A01-00.png"}
        ]
    },
    {
        "folder":"penny",
        "title":"Penny's Perfect Present",
        "desc":"She wants to get her mom a gift for an upcoming event."
    },
    {
        "folder":"misc",
        "title":"Miscellaneous Comics",
        "desc":"Dumping random comics n stuff that aren't for anything specific",
                "parts":[
            {"file":"2022-04-08","title":"Birthday"},
            {"file":"2023-08-31","title":"Excuse"},
            {"file":"2023-09-05","title":"Never Satisfied"},
            {"file":"2024-08-21","title":"Tummy Ache"}
        ]
    },
    {
        "folder":"howto",
        "title":"How To Not",
        "desc":"A guide on how to do stuff by telling you how not to",
        "parts":[
            {"file":"0A00","title":"Make a Webcomic"},
            {"file":"0A01","title":"Befriend the Internet"},
            {"file":"0A02","title":"Be Original"},
            {"file":"0A03","title":"Procastinate"},
            {"file":"0A04","title":"Do Projects"},
            {"file":"0A05","title":"Feel Motivated"},
            {"file":"0A06","title":"Walk Your Pet Fish"},
            {"file":"0A07","title":"Study"}
        ]
    }
]

const url = window.location.pathname;
relativePath = "./";
urlPath = url.split('/');
if(urlPath.length > 2){for(i=0;i<urlPath.length-2;i++){relativePath+="../"}}

const footer = '\
<a href="#">Sitemap</a>\
<a href="'+relativePath+'comic/index.html">Home</a>\
<a href="'+relativePath+'chat.html">Chatbox</a>\
'

const template ='\
<div id="container">\
    <div id="top"></div>\
    <main class="default"></main>\
    <div id="bottom">\
        <aside>\
            <nav id="next"></nav>\
            <div id="info"></div>\
        </aside>\
        <div id="comments"></div>\
    </div>\
    <footer>' + footer + '</footer>\
</div>\
'

if(document.querySelector("body").id==="comicViewer"){
    document.querySelector("body").innerHTML+=template
}

main=document.querySelectorAll(".main-content");
for(i=0; i<main.length; i++){
    document.querySelector("#container main").append(main[i]);
}

if(e=document.getElementById("info-content")){document.getElementById("info").append(e)}

document.querySelector("head").innerHTML+='<link rel="icon" type="image/x-icon" href="'+relativePath+'../meta/favicon.ico"></link>'

maxParts=0
searchComicIndex()
if ( currentIndex > -1) {
    // Check if viewing a comic
    if(currentPartIndex > -1){
        result = document.createElement("header")

        comicTitle = document.createElement("a")
        comicTitle.innerHTML = masterlist[currentIndex].title
        comicTitle.href = "./index.html"

        partTitle = document.createElement("span")
        partTitle.innerHTML = masterlist[currentIndex].parts[currentPartIndex].title

        result.append(comicTitle)
        result.append(partTitle)

        if(e=document.getElementById("top")){e.append(result)}
        
        writeComicNextprev(masterlist[currentIndex].parts)
        writeComicNext(masterlist[currentIndex].parts)
        
        if (document.title==="") {document.title = masterlist[currentIndex].parts[currentPartIndex].title + " | " + masterlist[currentIndex].title;}
    } else {
        console.log("woof")
        writePartsArchive("comicList", currentIndex, 0, maxParts)

        result = document.createElement("header")

        comicTitle = document.createElement("a")
        comicTitle.innerHTML = "Stupied"
        comicTitle.href = "./../index.html"

        partTitle = document.createElement("span")
        partTitle.innerHTML = masterlist[currentIndex].title

        result.append(comicTitle)
        result.append(partTitle)

        if(e=document.getElementById("top")){e.append(result)}

        if (document.title==="") {document.title = masterlist[currentIndex].title + " | " + "Stupied"}
    }
    if(e=document.getElementById("top")){e.innerHTML+='<nav id="extra"><a href="'+relativePath+'index.html">✮</a></nav>'}
} else {
    writeComicArchive()
    if(e=document.getElementById("comicList")){e.append(list)}
}

function searchComicIndex(){
    currentIndex = -1;
    currentPartIndex = -1;
    
    // Setup stuff
    fileList = url.split("/");
    if(fileList[fileList.length-1]===""){fileList[fileList.length-1]="index"}
    currentFolder=fileList[fileList.length-1]
    currentFolder = currentFolder.replaceAll(".html","")
    currentFile=currentFolder
    
    // Check if inside folder
    if(fileList.length>3){
        currentFolder=fileList[fileList.length-2]
    }
    
    // Find Index
    for (i = 0; i < masterlist.length; i++) {
        if ( masterlist[i].folder===currentFolder) {
            currentIndex = i;
        }
    }
    
    // Find Index of Part
    if(fileList.length > 3 && masterlist[currentIndex].parts!== undefined){
        maxParts= masterlist[currentIndex].parts.length
        for (i = 0; i < maxParts; i++) {
            if ( masterlist[currentIndex].parts[i].file===currentFile) {
                currentPartIndex = i;
            }
        }
    }
}

function writeComicArchive(){
    list=document.createElement("ul")
    for(i=0;i<masterlist.length;i++){
        // Checks if there's an index
        link="./view.html?item="+masterlist[i].folder

        listItem = document.createElement("li")
        itemLink = document.createElement("a")
        itemLink.innerHTML = "<span>"+masterlist[i].title+"</span>"
        itemLink.href = link

        listItem.append(itemLink)
        list.append(listItem)
    }
}

// Change how the archive looks cuz it's ugly >:(
function writePartsArchive(id,folder,first,last){
    var result="";
    for(i=first;i<last;i++){
        result += getPart(folder,i)
    }
    if(e=document.getElementById(id)){e.innerHTML += result}
}

function getPart(folder,x){
        comicLink=masterlist[folder].parts[x].file+".html"
        comicTitle=masterlist[folder].parts[x].title
        result='<a href="'+comicLink+'"><div class="comicListItem">'+
        '<div class="comicListTitle"><h4>'+comicTitle+'</h4></div>'+
        '<div class="comicListIndex"><span>#'+x+'</span></div>'+
        '</div></a>'
        return result
}

function writeComicNextprev(){
    result = document.createElement("div")
    result.id = "nextprev"

    span = document.createElement("span")
    span.innerHTML = "#"+currentPartIndex

    if ( masterlist[currentIndex].parts.length < 2 ) {
        result.append(span)
	} else if ( currentPartIndex === 0 ) {
        nextI = document.createElement("a")
        nextI.innerHTML = "<button title='next part'>►</button>"
        nextI.href = masterlist[currentIndex].parts[currentPartIndex+1].file+".html"

        result.append(span)
        result.append(nextI)
	} else if ( currentPartIndex === masterlist[currentIndex].parts.length-1 ) {
        prevI = document.createElement("a")
        prevI.innerHTML = "<button title='previous part'>◄</button>"
        prevI.href = masterlist[currentIndex].parts[currentPartIndex-1].file+".html"

        result.append(prevI)
        result.append(span)
	} else if ( 0 < currentPartIndex && currentPartIndex < masterlist[currentIndex].parts.length - 1 ) {
        nextI = document.createElement("a")
        nextI.innerHTML = "<button title='next part'>►</button>"
        nextI.href = masterlist[currentIndex].parts[currentPartIndex+1].file+".html"

        prevI = document.createElement("a")
        prevI.innerHTML = "<button title='previous part'>◄</button>"
        prevI.href = masterlist[currentIndex].parts[currentPartIndex-1].file+".html"

        result.append(prevI)
        result.append(span)
        result.append(nextI)

	}
    document.getElementById("top").append(result)
}

function writeComicNext(){
    if ( masterlist[currentIndex].parts.length < 2 || currentPartIndex === masterlist[currentIndex].parts.length-1 ) {
        result = "<div>You're all caught up :3</div>"
	} else {
        var comicThumb="";
        if(masterlist[currentIndex].parts[currentPartIndex+1].img!==undefined){
            comicThumb="./img/"+masterlist[currentIndex].parts[currentPartIndex+1].img
            comicThumb='<div class="comicListThumbnail"><img src="'+comicThumb+'"></div>'
        }
        nextI= masterlist[currentIndex].parts[currentPartIndex+1].file+".html"
        comicTitle=masterlist[currentIndex].parts[currentPartIndex+1].title

        result='<a href="'+nextI+'"><div>'+comicThumb+'<div id="next-title"><div id="next-title-content"><h4>Next Part</h4><span>'+comicTitle+'</span></div></div></div></a>'
	}
    document.getElementById("next").innerHTML=result
}

// COMMENTS
if (e=document.getElementById("comments")){e.innerHTML='<div id="HCB_comment_box"><a href="http://www.htmlcommentbox.com">Beep Boop</a>, hold please!</div><link rel="stylesheet" type="text/css" href="https://www.htmlcommentbox.com/static/skins/bootstrap/twitter-bootstrap.css?v=0" /><style>#HCB_comment_box img{width:auto;display:inline-block;}.home-desc{display:none;}#HCB_comment_box h3:first-child{margin:0;}</style>'}

window.onload = function(){
    if(document.getElementById("comments")){
        if(!window.hcb_user){hcb_user={};} (function(){var s=document.createElement("script"), l=hcb_user.PAGE || (""+window.location).replace(/'/g,"%27"), h="https://www.htmlcommentbox.com";s.setAttribute("type","text/javascript");s.setAttribute("src", h+"/jread?page="+encodeURIComponent(l).replace("+","%2B")+"&mod=%241%24wq1rdBcg%24lorU9Glfj8bQyg9yk9caG%2F"+"&opts=16798&num=10&ts=1699153972795");if (typeof s!="undefined") document.getElementsByTagName("head")[0].appendChild(s);})();
    }
}

if(url.includes("https://stupied.neocities.org/chez/jigsaws/view")){
  if(url.includes(".html")){
    window.location.pathname=window.location.pathname.replaceAll(".html","")
  }
}