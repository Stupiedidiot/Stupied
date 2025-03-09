masterlist = [
    {
        "volume":"muse-adriade",
        "title":"muse ariadne",
        "desc":"Stuff for a writing club thingy wohooo!!",
        "issues":[
            {"file":"2024-02-05.html","alt":"Writing is Hard"},
            //{"file":"2024-02-12.html","alt":"Foreign Film"},
            {"file":"2024-02-26.html","alt":"Blue Bird","img":"blue-bird.png"},
            //{"file":"2024-04-08.html","alt":"I Hate You"},
            //{"file":"2024-05-13.html","alt":"Total Domination"},
            {"file":"2024-05-20.html","alt":"The Odd Siblings","img":"odd-siblings.png"},
            {"file":"2024-08-26.html","alt":"Laundry Day"},
            {"file":"2024-10-07.html","alt":"Seclusion"}
        ],
    },
    {
        "volume":"psych",
        "title":"Psych!",
        "desc":"Being a psychic sucks actually."
    },
    {
        "volume":"pmd",
        "title":"Working Title",
        "desc":"OC comics loosely based on the Pokemon Dungeon Games - Still deciding a title"
    },
    {
        "volume":"84",
        "title":"84",
        "desc":"Ashley Dobrik attempts to commit suicide but is prevented by getting stuck in a time loop.",
        "issues":[
            //{"file":"uniform.html","alt":"Uniform"},
            {"file":"notes.html","alt":"Note Taking"}
            //{"file":"haircut.html","alt":"Haircut"},
            /*
            {"file":"cover.html","alt":"Cover Art"},
            {"file":"sorry.html","alt":"Sorry"},
            {"file":"breakfast.html","alt":"Breakfast"},
            {"file":"break.html","alt":"Take a Break"},
            {"file":"news.html","alt":"Exciting News"}
            */
        ]
    },
    {
        "volume":"puyo",
        "title":"Maguro's Thing",
        "desc":"Idk some dumb Puyo comic I made,,",
        "issues":[]
    },
    {
        "volume":"adrift",
        "title":"Adrift",
        "desc":"It's clearance signing and Adrina has an essay to finish.",
        "issues":[]
    },
    {
        "volume":"hat",
        "title":"LiteralHat",
        "desc":"Random LiteralHat related Comics",
        "issues":[
            {"file":"index.html","alt":"Clipper"},
            {"file":"lost.html","alt":"Lost","img":"0A01-00.png"}
        ]
    },
    {
        "volume":"penny",
        "title":"Penny's Perfect Present",
        "desc":"She wants to get her mom a gift for an upcoming event.",
        "issues":[]
    },
    {
        "volume":"misc",
        "title":"Miscellaneous Stuff",
        "desc":"Dumping random comics n stuff that aren't for anything specific"
    },
    {
        "volume":"howto",
        "title":"How To Not",
        "desc":"A guide on how to do stuff by telling you how not to",
        "issues":[
            {"file":"0A00.html","alt":"Make a Webcomic"},
            {"file":"0A01.html","alt":"Befriend the Internet"},
            {"file":"0A02.html","alt":"Be Original"},
            {"file":"0A03.html","alt":"Procastinate"},
            {"file":"0A04.html","alt":"Do Projects"},
            {"file":"0A05.html","alt":"Feel Motivated"},
            {"file":"0A06.html","alt":"Walk Your Pet Fish"},
            {"file":"0A07.html","alt":"Study"}
        ]
    }
]

// PAGE TEMPLATE
const url = window.location.pathname;
const urlSplit = url.split("/")
relativePath = getRelativePath() 

const templateViewer =`
<div id="container">
    <div id="top">
        <header></header>
        <div id="nextprev"></div>
        <div id="extra">
            <a href="` + relativePath + `../../index.html">✮</a>
        </div>
    </div>

    <main class="default"></main>

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
    if( document.title==="" ){ 
        document.title = current.title
    } else {
        document.title += " | " + current.title
    }
} else {

    resultHeader = `
    <a href="` + relativePath + `../index.html">Stupied</a>
    <span>` + current.title + `</span>
    `
    document.querySelector("header").innerHTML = resultHeader
}

// FUNCTIONS - What the func!
function getRelativePath(){
    return "./"
}

function findVolume (folder) {
    for(i = 0;i < masterlist.length; i++){
        if(masterlist[i].volume === folder){
            current.title = masterlist[i].title
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
    <a href="` + relativePath + `index.html">` + current.title + `</a>
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

    comicLink = volume[ii].file
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

document.querySelector("head").innerHTML += `<meta name="keywords" content="stupied, stupiedidiot, stupied.idiot, stupied_idiot, art, original characters, ocs, fanart ">`
document.querySelector("head").innerHTML += '<link rel="icon" type="image/x-icon" href="'+relativePath+'../../meta/favicon.ico"></link>'

// COMMENTS
if (e=document.getElementById("comments")){
	e.innerHTML='<div id="HCB_comment_box"><a href="http://www.htmlcommentbox.com">Beep Boop</a>, hold please!</div><link rel="stylesheet" type="text/css" href="https://www.htmlcommentbox.com/static/skins/bootstrap/twitter-bootstrap.css?v=0" /><style>#HCB_comment_box img{width:auto;display:inline-block;}.home-desc{display:none;}#HCB_comment_box h3:first-child{margin:0;} .comment img[src*="https://www.htmlcommentbox.com/storage/"] {max-width:100%;}</style>';
	loadcomments()
}
function loadcomments(){
	if(!window.hcb_user){hcb_user={};} (function(){var s=document.createElement("script"), l=hcb_user.PAGE || (""+window.location).replace(/'/g,"%27"), h="https://www.htmlcommentbox.com";s.setAttribute("type","text/javascript");s.setAttribute("src", h+"/jread?page="+encodeURIComponent(l).replace("+","%2B")+"&mod=%241%24wq1rdBcg%24lorU9Glfj8bQyg9yk9caG%2F"+"&opts=16798&num=10&ts=1699153972795");if (typeof s!="undefined") document.getElementsByTagName("head")[0].appendChild(s);})();
}