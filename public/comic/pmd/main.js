comicTitle = "Working Title"
folders = [
    "character",
    "m","s"
]

masterlist = [
    {
        // main
        "volume":"m",
        "issues":[
            {"file":"test.html","alt":"Cover Page"},
        ]
    },
    {
        // side
        "volume":"s",
        "issues":[
            {"file":"independent.html"},
            {"file":"yapping.html"},
            {"file":"saved.html"},
            {"file":"letters.html"},
        ]
    }
]

// PAGE TEMPLATE
const url = window.location.pathname;
const urlSplit = url.split("/")
relativePath = getRelativePath() 

const template =`
<div class="main" id="container">
    <main></main>
</div>
`

const templateViewer =`
<div id="container">
    <div id="top">
        <header></header>
        <div id="nextprev"></div>
        <div id="extra">
            <a href="${relativePath}../../index.html">✮</a>
        </div>
    </div>

    <main class="default"></main>

    <div id="bottom">
        <aside>
            <nav id="next"></nav>
            <div id="info"></div>
        </aside>
        <div>
            <div id="c_widget"></div>
        </div>
    </div>

    <footer>
        <a href="${relativePath}../../about/index.html">about</a>
        <a href="${relativePath}../../map.html">map</a>
        <a href="${relativePath}../../feed.xml">rss</a>
    </footer>
</div>
`

e = document.querySelector("body")
if(e.id==="comicViewer"){
    e.innerHTML+=templateViewer
} else {
    e.innerHTML+=template
}

main=document.querySelectorAll(".main-content");
for(i=0; i<main.length; i++){
    document.querySelector("#container main").append(main[i]);
}

if(e = document.getElementById("info-content")){
    document.getElementById("info").append(e) 
}

// PAGE INFO
current = {
    folder: urlSplit[urlSplit.length-2],
    file: urlSplit[urlSplit.length-1]
}

if ( ! current.file.endsWith(".html") ) {current.file += ".html";}

current.obj = findVolume(current.folder)
if( current.obj !== undefined ){
    current.index = findIndex(current.obj, current.file)
}

if ( current.index > -1 ) {
    current.issue = getTitle(current.obj.issues[current.index])

    resultHeader = genHeader(current.index, current.obj)
    document.querySelector("header").innerHTML = resultHeader
    
    resultNav = genNav(current.index, current.obj)
    document.getElementById("nextprev").innerHTML = resultNav

    resultNext = genNext(current.index, current.obj)
    document.getElementById("next").innerHTML = resultNext

        document.title = current.issue
    document.onkeydown = function(event) {
        if( document.activeElement === document.querySelector("body") ){
            switch (event.keyCode) {
                case 37:
                 if(current.prev===true){document.getElementById("prev-button").click()}
                break;
                case 39:
                 if(current.next===true){document.getElementById("next-button").click()}
                break;
             }
        }
    };
}

// FUNCTIONS - What the func!
function getRelativePath(){
    s = urlSplit[urlSplit.length-2]
    for (i = 0; i < folders.length; i++){
        if (folders[i]===s){ return "./../"}

    } 
    return "./"
}

function findVolume (folder) {
    for(i = 0;i < masterlist.length; i++){
        if(masterlist[i].volume === folder){
            return masterlist[i]
		}        
    }
    return
}

function findIndex(volume,file){
    for( i = 0;i < volume.issues.length; i++ ){
        if( volume.issues[i].file === file ){
            return i
        }
    }
	return -1
}

function genHeader() {
    result=`
    <a href="` + relativePath + `index.html">` + comicTitle + `</a>
    <span>` + current.issue + `</span>
    `
    return result
}

function genNav(index,obj){
	result = `
    <a href="./#PREV" id="prev-button">«</a>
    <select id="top-list" onchange="changeIssue()">#LIST</select>
    <a href="./#NEXT" id="next-button">»</a>
	`
    
    if( obj.issues[index-1] ){
        prev=index-1
        result = result.replaceAll("#PREV", obj.issues[prev].file)
        current.prev=true
    }

    if( obj.issues[index+1] ){
        next=index+1
        result = result.replaceAll("#NEXT", obj.issues[next].file)
        current.next=true
    }

    list = ""
    for(i=0; i < obj.issues.length ;i++){
        title = getTitle(obj.issues[i])
        list += "<option value='" + i + "'>#" + i.toString().padStart(2, "0") + " - " + title + "</option>"
    }
    list = list.replaceAll("value='" + current.index + "'", "selected")

	result = result.replaceAll("#LIST",list)
    return result
}

function genNext(index,obj){
    if( obj.issues[index+1] ){
        title = getTitle(obj.issues[index+1])
        thumb = getThumbnail(obj.issues[index+1])
        txt = "<h4>Next Part</h4><span>" + title + "</span></div>"
        
        link = 'href="' + obj.issues[index+1].file + '"'
    } else {
        thumb = "#"
        txt = "<h4>You're All Caught Up!</h4><span>There's nothing else to show!</span></div>"
        link=""
    }

    result = `
    <a ` + link + `>
    <div>
        <div class="comicListThumbnail"><img src="` + thumb + `"></div>
        <div id="next-title"><div id="next-title-content">` + txt + `</div>
    </div>
    </a>
    `
    return result
}

function getTitle(e){
    if ( e.hasOwnProperty("alt") ){
        title = e.alt;
    } else {
        title = e.file;
        title = title.replaceAll("-"," ");
        title = title.replaceAll(".html","");
    }
return title;
}

function getThumbnail(e){
    if ( e.hasOwnProperty("thumb") ){
        result = relativePath + e.thumb;
    } else {
        result = "#"
    }
return result;
}

function writeVolume(id,volume,first,last){
    if(first===undefined){first=0}
    if(last===undefined){last=volume.issues.length}

    var result="";
    for(i= first ;i < last ;i++){
        result += writeIssue(volume,i)
    }
    if(e=document.getElementById(id)){e.innerHTML += result;}
}

function writeIssue(volume,ii){
    folder=volume.volume
    volume=volume.issues

    comicLink = folder + "/" + volume[ii].file
    comicTitle = getTitle(volume[ii])
    comicThumb = getThumbnail(volume[ii])
    result=`<a href="` + comicLink + `"><div class="comicListItem">
    <div class="comicListThumb"><img src="` + comicThumb + `"></div>
    <div class="comicListTitle"><span>` + comicTitle + `</span></div>
    <div class="comicListIndex"><span>#` + ii + `</span></div>
    </div></a>`
    return result
}

function changeIssue(){
    e = document.getElementById("top-list").value;
    window.location.href = current.obj.issues[e].file
}


// BEEP BOOP
if( document.title==="" ){ 
    document.title = comicTitle
} else {
    document.title += " | " + comicTitle
}

document.querySelector("head").innerHTML += `<meta name="keywords" content="stupied, stupiedidiot, stupied.idiot, stupied_idiot, art, original characters, ocs, fanart ">`
document.querySelector("head").innerHTML += '<link rel="icon" type="image/x-icon" href="'+relativePath+'img/favicon.ico"></link>'

// COMMENTS
if (document.getElementById("c_widget")){
  var script = document.createElement('script');
  script.src = "./../../meta/comment-widget.js";
  document.head.appendChild(script);
}