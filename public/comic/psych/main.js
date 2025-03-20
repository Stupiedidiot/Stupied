comicTitle = "Psych!"
folders = [
    "character",
    "m", "s"
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
            //{"file":"tetris.html","alt":"Tetris"},
            {"file":"grass.html","alt":"Touch Grass"},
            //{"file":"icecream.html","alt":"Ice Cream"},
            {"file":"man-down.html","alt":"But, Psyyy--","img":"man-down.png"},
            {"file":"hell.html","alt":"I like You"}
        ]
    }
]

// PAGE TEMPLATE
const url = window.location.pathname;
const urlSplit = url.split("/")
relativePath = getRelativePath() 

const template =`
<div id="container">
    <main></main>
    <aside>
        <div id="aside-main">
            <span class="title outline"><a href="./index.html">PSYCH!</a></span>
            <nav>
                <a href="` + relativePath + `index.html">/ARCHIVE/</a>
                <a href="` + relativePath + `character/index.html">/CHARCTERS/</a>
                <a href="` + relativePath + `../../index.html">✮</a>
            </nav>
        </div>
        <img class="outline" src="` + relativePath + `img/snail.png">
    </aside>
</div>
`

const templateViewer =`
<div id="container">
    <div id="top">
        <header></header>
        <div id="nextprev"></div>
        <div id="extra">
            <a href="` + relativePath + `../../index.html">✮</a>
        </div>
    </div>

    <main></main>

    <div id="bottom">
        <aside>
            <nav id="next"></nav>
            <div id="info"></div>
        </aside>
        <div>
            <div id="comments"></div>
        </div>
    </div>
</div>
`

e = document.querySelector("body")
if(e.id==="comicViewer"){
    e.innerHTML+=templateViewer
} else {
    e.id = "main"
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
        console.log(i)
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
    <a href="./#PREV">«</a>
    <select id="top-list" onchange="changeIssue()">#LIST</select>
    <a href="./#NEXT">»</a>
	`
    
    if( obj.issues[index-1] ){
        prev=index-1
        result = result.replaceAll("#PREV", obj.issues[prev].file)
    }

    if( obj.issues[index+1] ){
        next=index+1
        result = result.replaceAll("#NEXT", obj.issues[next].file)
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
hcb_user = {
    comments_header : 'Comments',
    name_label : 'Name / Website',
    submit : 'Comment!!',
    mod_label:'(real!)'
};

if (e=document.getElementById("comments")){
	e.innerHTML='<div id="HCB_comment_box"><a href="http://www.htmlcommentbox.com">Beep Boop</a>, hold please!</div><link rel="stylesheet" type="text/css" href="https://www.htmlcommentbox.com/static/skins/bootstrap/twitter-bootstrap.css?v=0" /><style>#HCB_comment_box img{width:auto;display:inline-block;}.home-desc{display:none;}#HCB_comment_box h3:first-child{margin:0;} .comment img[src*="https://www.htmlcommentbox.com/storage/"] {max-width:100%;}</style>';
	loadcomments()
}
function loadcomments(){
	if(!window.hcb_user){hcb_user={};} (function(){var s=document.createElement("script"), l=hcb_user.PAGE || (""+window.location).replace(/'/g,"%27"), h="https://www.htmlcommentbox.com";s.setAttribute("type","text/javascript");s.setAttribute("src", h+"/jread?page="+encodeURIComponent(l).replace("+","%2B")+"&mod=%241%24wq1rdBcg%24lorU9Glfj8bQyg9yk9caG%2F"+"&opts=16798&num=10&ts=1699153972795");if (typeof s!="undefined") document.getElementsByTagName("head")[0].appendChild(s);})();
}