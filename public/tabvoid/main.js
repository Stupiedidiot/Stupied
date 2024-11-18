// Tabvoid by Stupied: https://stupied.neocities.org

//TABLE OF CONTENTS
  // 1. User Info 
  // 2. Post List
  // 3. Settings
  // 4. Da Code!
  // 5. Functions

//-----------------------------

// [1] USER INFO
const blogname = "Tabvoid"
const username = "Stupied"
const userlink = "https://stupied.neocities.org"

//-----------------------------

// [2] POST LIST 


const posts=[
	{file:"2024-11-17-Set-Up.html",},
	{file:"2024-11-18-Live-Demo.html",},
	//{file:"2024-11-19-Customization.html",},
	{
		file:"0000-00-00-Themes.html",
		img:"img/themes.png",
		desc:"[Under Construction] Preset designs"
	}
]

//-----------------------------

// [3] SETTINGS

const url = window.location.pathname;relativePath = "./";
if(url.includes("post")){relativePath="./../";}
// add "relativePath" to any anchor tags or file paths

const header=''

const navigation ='\
<div>\
    <img src="' + relativePath + 'img/pfp.png">\
	<nav>\
		<a href="' + relativePath + 'index.html">Home</a>\
		<a href="' + relativePath + 'about.html">About</a>\
		<a href="' + relativePath + 'post/2024-11-17-Set-Up.html">Set Up</a>\
		<a href="' + relativePath + 'demo/index.html">Live Demo</a>\
		<a href="' + relativePath + 'post/0000-00-00-Themes.html"">Themes</a>\
		<a href="' + relativePath + 'archive.html"">Archive</a>\
	</nav>\
</div>\
'

const footer ='\
<p>\
'+blogname+' was created by <a href="'+userlink+'">'+username+'</a>\
</p>\
'

const template ='\
<div id="container">\
	<header>'+ header +'</header>\
	<div id="nav">'+ navigation +'</div>\
	<main></main>\
	<footer>'+ footer +'</footer>\
</div>\
\
'

//-----------------------------

// [4] DA CODE - beep boop

document.querySelector("body").innerHTML+= template;

main=document.querySelectorAll(".main-content");
for(i=0; i<main.length; i++){
    document.querySelector("#container main").append(main[i]);
}

if(e=document.querySelector("header")){e.innerHTML=(header);}
if(e=document.querySelector("#nav")){e.innerHTML=(navigation);}
if(e=document.querySelector("footer")){e.innerHTML=(footer);}

document.querySelector("head").innerHTML+='<link rel="icon" type="image/x-icon" href="'+relativePath+'style/favicon.ico"></link>'

currentIndex = getIndex(posts)
if(currentIndex>-1){
	currentTitle = getTitle(currentIndex,posts)
	if(document.title===""){document.title=currentTitle;}
	
	currentTitle = "<h1>" + currentTitle + "</h1>"
	
	currentDate =  getDate(currentIndex,posts)
	currentDate =  "<h4>" + currentDate + "</h4>"

	currentNav = genNav(posts)

	if(e=document.querySelector("#blog-title")){e.innerHTML=(currentTitle);}
	if(e=document.querySelector("#blog-date")){e.innerHTML=(currentDate);}
	if(e=document.querySelector("#nextprev")){e.innerHTML=(currentNav);}
} else {
	if(e=document.querySelector("#blog-title")){e.innerHTML="[Unlisted Post]";}

	postRecent=""
	postArchive=""
	for (i=0; i < posts.length; i++){
		itemLink=relativePath + "post/" + posts[i].file

		itemTitle=getTitle(i,posts)
		itemDate=getDate(i,posts)
		itemDesc=getDesc(i,posts)
		itemImg=getImg(i,posts)

		item='\
		<a href="' + itemLink + '">\
		<div class="blog-item">\
			<div class="item-title">' + itemTitle + '</div>\
			<div class="item-date">' + itemDate + '</div>\
			<div class="item-desc">' + itemDesc + '</div>\
			<div class="item-img"><img src="' + itemImg +'"></div>\
		</div>\
		</a>\
		'	
		postArchive+=item
		if(i<3){postRecent+=item}
	}
	if(e=document.querySelector("#blog-archive")){e.innerHTML=postArchive;}
	if(e=document.querySelector("#blog-recent")){e.innerHTML=postRecent;}
}

if(document.title===""){
	document.title=blogname;
}else{
	document.title+= " | " + blogname;
}

//-----------------------------

// [5] FUNCTION - what the funk!

function getIndex(e){
	currentFile = url.substring(url.lastIndexOf('/'));
	currentFile = currentFile.replaceAll("/","");
	if ( ! currentFile.endsWith(".html") ) {
		currentFile += ".html";
	}

	for (i = 0; i < e.length; i++) {
		if ( e[i].file === currentFile ) {
			return i
		}
	}
	return -1
}
function getTitle(i, e){
    if ( e[i].hasOwnProperty("alt") ){
        title = e[i].alt;
    } else {
        title = e[i].file;
        title = title.slice(11, title.lenght);
        title = title.replaceAll("-"," ");
        title = title.replaceAll(".html","");
    }
return title;
}

function getDate(i, e){
date = e[i].file.slice(0,10);
return date
}

function convDate(i){
	month = i.slice(5,7);
	day = i.slice(8,10);
	year = i.slice(0,4);
		switch (month) {
			case "01":
				month = "January";
			break;
			case "02":
				month = "Febuary";
			break;
			case "03":
				month = "March";
			break;
			case "04":
				month = "April";
			break;
			case "05":
				month = "May";
			break;
			case "06":
				month = "June";
			break;
			case "07":
				month = "July";
			break;
			case "08":
				month = "August";
			break;
			case "09":
				month = "September";
			break;
			case "10":
				month = "October";
			break;
			case "11":
				month = "November";
			break;
			case "12":
				month = "December";
			break;
		}
	date = month + " " + day + ", " + year;
	return date;
}

function getDesc(i,e){
	if (e[i].hasOwnProperty("desc")){
		return e[i].desc;
	}
	return ''
}

function getImg(i,e){
	if (e[i].hasOwnProperty("img")){
		return relativePath + e[i].img;
	}
	return relativePath + ''
}

function genNav(e){
	if ( e.length < 2) {
		result = "<a href='" + relativePath + "archive.html'>« Archive  »</a>";
	} else if ( currentIndex === 0 ) {
		prevI= e[currentIndex+1].file;
		result = "<a href='" + relativePath + "archive.html'>Archive</a> | <a href='./" + prevI + "'>Prev »</a>";
	} else if ( currentIndex === e.length - 1 ) {
		nextI= e[currentIndex-1].file;
		result = "<a href='./" + nextI + "'>« Next</a> | <a href='" + relativePath + "archive.html'>Archive</a>";
		
	} else if ( 0 < currentIndex && currentIndex < e.length - 1 ) {
		prevI= e[currentIndex+1].file;
		nextI= e[currentIndex-1].file;
		result = "<a href='./" + nextI + "'>« Next</a> | <a href='" + relativePath + "archive.html'>Archive</a> | <a href='./" + prevI + "'>Prev »</a>";
	}
	return result
}

//comments
if (e=document.getElementById("comments")){e.innerHTML='<div id="HCB_comment_box"><a href="http://www.htmlcommentbox.com">Beep Boop</a>, hold please!</div><link rel="stylesheet" type="text/css" href="https://www.htmlcommentbox.com/static/skins/bootstrap/twitter-bootstrap.css?v=0" /><style>#HCB_comment_box img{width:auto;display:inline-block;}.home-desc{display:none;}#HCB_comment_box h3:first-child{margin:0;}</style>'}

window.onload = function(){
    if(document.getElementById("comments")){
        if(!window.hcb_user){hcb_user={};} (function(){var s=document.createElement("script"), l=hcb_user.PAGE || (""+window.location).replace(/'/g,"%27"), h="https://www.htmlcommentbox.com";s.setAttribute("type","text/javascript");s.setAttribute("src", h+"/jread?page="+encodeURIComponent(l).replace("+","%2B")+"&mod=%241%24wq1rdBcg%24lorU9Glfj8bQyg9yk9caG%2F"+"&opts=16798&num=10&ts=1699153972795");if (typeof s!="undefined") document.getElementsByTagName("head")[0].appendChild(s);})();
    }
}