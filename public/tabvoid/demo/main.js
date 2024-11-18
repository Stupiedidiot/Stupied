// Tabvoid by Stupied: https://stupied.neocities.org

//TABLE OF CONTENTS
  // 1. User Info 
  // 2. Post List
  // 3. Settings
  // 4. Da Code!
  // 5. Functions

//-----------------------------

// [1] USER INFO
const blogname = "My Blog"
const username = "Juan Dela Cruz"
const userlink = "https://youtu.be/25OpUr04IBM?si=1ucX-ZcXlLN5ZPbG"

//-----------------------------

// [2] POST LIST 

const posts=[
	// Newest post should be at the top
	// For the sake of this tutorial it isn't haha
	// These are the different ways you can write it down
	{file:"2024-11-18-Page-Template.html"},
	{file:"2024-11-18-Different-Title.html",alt:"Attaching Files"},
	{
		file:"2024-11-00-Microblog.html",
		desc:"This post has a description!"
	},
	{
		file:"2024-11-18-Farewell.html",
		alt:"Till We Meet Again",
		desc:"All properties is filled out",
		img:"img/placeholder.png"
	}
	/*
	In summary
	{
		file:"",
		// optional stuff
		alt:"",
		desc:"",
		img:"",
	}
	*/
]

//-----------------------------

// [3] SETTINGS - The page's format!

const url = window.location.pathname;relativePath = "./";
if(url.includes("post")){relativePath="./../";}
// add "relativePath" to any anchor tags or file paths

const header='\
<img src="' + relativePath + 'img/banner.png">\
'

const navigation ='\
<div>\
    <a href="#"><img src="' + relativePath + 'img/pfp.png"></a>\
    <h3>'+ blogname +'</h3>\
	<nav>\
		<a href="' + relativePath + 'index.html">Home</a>\
		<a href="' + relativePath + 'about.html">About</a>\
		<a href="' + relativePath + 'archive.html"">Archive</a>\
		<a href="' + relativePath + '../index.html"">Head Back</a>\
	</nav>\
</div>\
'

const footer ='\
<p>\
'+blogname+' is written by <a href="'+userlink+'">'+username+'</a>. \
Created with <a href="https://stupied.neocities.org/tabvoid/">Tabvoid</a>\
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

// [4] DA CODE - You don't have to touch anything here (unless you really wanna)


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
	currentDate = convDate(currentDate) // converts to word
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
	date = date.replaceAll("00,","")
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