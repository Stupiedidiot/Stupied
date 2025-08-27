masterlist = [
    {
        "volume":"muse-adriade",
        "title":"muse ariadne",
        "desc":"My entries for a writing club that posts new prompts weekly!! ",
        "issues":[
            {"file":"2024-02-05.html","alt":"Writing is Hard"},
            //{"file":"2024-02-12.html","alt":"Foreign Film"},
            {"file":"2024-02-26.html","alt":"Blue Bird","img":"blue-bird.png"},
            //{"file":"2024-04-08.html","alt":"I Hate You"},
            //{"file":"2024-04-22.html","alt":"Whiteboard"},
            //{"file":"2024-05-13.html","alt":"Total Domination"},
            {"file":"2024-05-20.html","alt":"The Odd Siblings","img":"odd-siblings.png"},
            {"file":"2024-08-26.html","alt":"Laundry Day"},
            {"file":"2024-10-28.html","alt":"50th Anniversary"},
            {"file":"2024-10-07.html","alt":"Selective Seclusion","img":"birthday.png"},
            {"file":"2024-12-09.html","alt":"Electrodynamics"},
            //{"file":"2024-12-16.html","alt":"She Made You a Pinterest Board"}
            {"file":"2025-01-27.html","alt":"You Suck Ass at Apologies"}
        ],
    },
    {
        "volume":"psych",
        "title":"Psych!",
        "desc":"Being a psychic sucks actually."
    },
    {
        "volume":"pmd",
        "title":"PMD: Spirits of the Lake",
        "desc":"OC comics loosely based on the Pokemon Dungeon Games"
    },
    {
        "volume":"84",
        "title":"84",
        "desc":"Ashley Dobrik attempts to commit suicide but is prevented by getting stuck in a time loop.",
        "issues":[
            {"file":"notes.html","alt":"Note Taking"},
            {"file":"uniform.html","alt":"Uniform"}
        ]
    },
    {
        "volume":"askal",
        "title":"askal",
        "desc":"Autobiographical comics :3",
        "issues":[
            {"file":"intro.html"},
            {"file":"patronizing.html"},
            {"file":"fit-in.html"},
            //{"file":"grad-ball.html"}
            //{"file":"gone.html"},
            //{"file":"morality.html"},
            //{"file":"graduation.html"}
        ]
    },
    {
        "volume":"adrift",
        "title":"Adrift",
        "desc":"It's clearance signing and Adrina has an essay to finish.",
        "issues":[]
    },
    {
        "volume":"puyo",
        "title":"Maguro's Thing",
        "desc":"Idk some dumb Puyo comic I made,,",
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
        "desc":"Dumping random comics n stuff that aren't for anything specific",
        "issues":[
            {"file":"2019-yes.html","alt":"Yes"},
            {"file":"2019-bye.html","alt":"Bye"},
            {"file":"2019-one-stroke.html","alt":"One Stroke"},
            {"file":"2019-pokemon.html","alt":"Pokemon Logic"},
            {"file":"2020-comic-idea.html","alt":"A Cool Comic Idea"},
            {"file":"2022-04-08.html","alt":"Birthday"},
            {"file":"2023-08-31.html","alt":"Excuse"},
            {"file":"2023-09-05.html","alt":"Never Satisfied"},
            {"file":"2024-08-21.html","alt":"Tummy Ache"},
            {"file":"2025-04-19.html","alt":"Easy Way Out"},
            {"file":"2025-05-02.html","alt":"Deep Frying"},
            {"file":"2025-08-16.html","alt":"Introverted"}
        ]
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
        <a href="./../../about/index.html">about</a>
        <a href="./../../map.html">map</a>
        <a href="./../../feed.xml">rss</a>
    </footer>
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

if ( current.file === "" ) {current.file = "index";}
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
    if( e = document.querySelector("header") ) { e.innerHTML = resultHeader }
    if( document.title==="" ){ 
        document.title = current.title + " | Stupied"
    }

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
    if ( e.hasOwnProperty("img") ){
        result = relativePath + "img/" + e.img;
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
document.querySelector("head").innerHTML += '<link rel="icon" type="image/x-icon" href="'+relativePath+'../../favicon.ico"></link>'

// COMMENTS
if (document.getElementById("c_widget")){
  var script = document.createElement('script');
  script.src = "./../../meta/comment-widget.js";
  document.head.appendChild(script);
}