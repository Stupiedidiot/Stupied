// Tabvoid by Stupied: https://stupied.neocities.org

//TABLE OF CONTENTS
  // 1. User Info 
  // 2. Post List
  // 3. Settings
  // 4. Da Code!
  // 5. Functions

//-----------------------------

// [1] USER INFO
const blogname = "Da Blog!!"
const username = "Stupied"
const userlink = "https://stupied.neocities.org/about#from-blog"

//-----------------------------

// [2] POST LIST 

const posts=[
	// SPOILERS - Stuff I might write about???  
	// {"file":"2025-00-00-Coloring-Tutorial.html"},
	// {"file":"2025-00-00-Ctrl-Alt-Delete,html"},
	{
		"file":"2025-02-28-Anbernic-RG35XXSP.html",
		"img":"img/anbernic-folders.gif"
	},
	{"file":"2025-02-01-Hourly-Comic.html"},
	{"file":"2025-01-00-Movie-Reviews.html"},
	{
		"file":"2025-01-26-Crochet.html",
		"alt":"Unfinished Crochet Projects",
		"img":"img/crochet-01.jpg"
	},
	{"file":"2024-06-15-Banana-Overlord.html"},
    {
		"file":"2023-08-29-Pakka-Pets.html",
		"img":"img/pakkapets-5.jpg"
	},
    {"file":"2023-08-28-Hotdog.html"},
    {"file":"2023-08-20-Meet-the-Fellas.html"},
    {"file":"2023-08-19-Minecraft.html","alt":"Minecraft irl!?!?!?","img":"img/steve-3.jpg	"}
]

//-----------------------------

// [3] SETTINGS - The page's format!

const url = window.location.pathname;
if(url.includes("/blog")){relativePath = "./";}
else{relativePath="./blog/"}
// add "relativePath" to any anchor tags or file paths

const header=`
`

const navigation =`
<div>
    <a href="` + relativePath + `index.html"><img src="` + relativePath + `../meta/pfp-transparent.png"></a>
	<h3>`+ blogname +`</h3>
	<nav>
		<a href="` + relativePath + `../about.html#from-blog">About Me</a>
		<a href="` + relativePath + `archive.html">Archive</a>
		<a href="` + relativePath + `../index.html"">Head Back</a>
	</nav>
</div>
`

const footer =`
<p>
` + blogname + ` is written by <a href="` + userlink + `">` + username + `</a>.
	Created with <a href="https://stupied.neocities.org/tabvoid/">Tabvoid</a>\
</p>
`

const template =`
<div id="container">
	<header>`+ header +`</header>
	<div id="nav">` + navigation + `</div>
	<main></main>
	<footer>` + footer + `</footer>
</div>
`

//-----------------------------

// [4] DA CODE - You don't have to touch anything here (unless you really wanna)


document.querySelector("body").innerHTML+= template;

main=document.querySelectorAll(".main-content");
for(i=0; i<main.length; i++){
    document.querySelector("#container main").append(main[i]);
}

document.querySelector("head").innerHTML+='<link rel="icon" type="image/x-icon" href="'+relativePath+'../favicon.ico"></link>'

current = {
	file:getFile(),
	index:getIndex(self.file)
}

if( current.index > -1){
	current.title = getTitle(current.index)
	current.date =  getDate(current.file)
	current.date = convDate(current.date) // converts to word

	if(document.title===""){document.title=current.title;}
	
	titleHTML = "<h1>" + current.title + "</h1>"
	dateHTML =  "<h4>" + current.date + "</h4>"
	navHTML = genNav(posts)

	if(e=document.querySelector("#blog-title")){e.innerHTML=(titleHTML);}
	if(e=document.querySelector("#blog-date")){e.innerHTML=(dateHTML);}
	if(e=document.querySelector("#nextprev")){e.innerHTML=(navHTML);}
} else {
	if(e=document.querySelector("#blog-title")){e.innerHTML="<h1>[Unlisted Post]</h1>";}

	postRecent=""
	postArchive=""
	for (i=0; i < posts.length; i++){
		itemLink = relativePath + posts[i].file

		itemTitle=getTitle(i)
		itemDate=getDate(posts[i].file)
		itemDesc=getDesc(i)
		itemImg=getImg(i)

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

if( document.title==="" ){ document.title=blogname;
}else{ document.title+= " | " + blogname; }

//-----------------------------

// [5] FUNCTION - what the funk!

function getFile(){
	file = url.substring(url.lastIndexOf('/'));
	file = file.replaceAll("/","");
	if ( ! file.endsWith(".html") ) {
		file += ".html";
	}
	return file
}

function getIndex(e){
	for (i = 0; i < posts.length; i++) {
		if ( posts[i].file === e ) {
			return i
		}
	}
	return -1
}
function getTitle(i){
    if ( posts[i].hasOwnProperty("alt") ){
        title = posts[i].alt;
    } else {
        title = posts[i].file;
        title = title.slice(11, title.lenght);
        title = title.replaceAll("-"," ");
        title = title.replaceAll(".html","");
    }
return title;
}

function getDate(e){
date = e.slice(0,10);
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

function getDesc(i){
	if ( posts[i].hasOwnProperty("desc") ){
		return posts[i].desc;
	}
	return ''
}

function getImg(i){
	if ( posts[i].hasOwnProperty("img") ){
		return relativePath + posts[i].img;
	}
	return relativePath + ''
}

function genNav(){
	result=""
	if( e = posts[current.index-1] ){
		nextI= e.file;
		result+="<a href='./" + nextI + "'>« Next</a> | " 
	}

	result+='<a href="'+relativePath+'archive.html">Archive'

	if(e = posts[current.index+1]){
		prevI= e.file;
		result+=" | <a href='./" + prevI + "'>Prev »</a>"
	}
	return result
}

// COMMENTS
hcb_user = {
    comments_header : 'Comments',
    name_label : 'Name / Website',
    submit : 'Comment!!',
    mod_label:'(real!)'
};

if (e=document.getElementById("comments")){
	e.innerHTML='<div id="HCB_comment_box"><a href="http://www.htmlcommentbox.com">Beep Boop</a>, hold please!</div><link rel="stylesheet" type="text/css" href="https://www.htmlcommentbox.com/static/skins/bootstrap/twitter-bootstrap.css?v=0" /><style>#HCB_comment_box img{width:auto;display:inline-block;}.home-desc{display:none;}#HCB_comment_box h3:first-child{margin:0;} .comment img[src*="https://www.htmlcommentbox.com/storage/"] {max-width:100%;border-radius:8px;}</style>';
	loadcomments()
}
function loadcomments(){
	if(!window.hcb_user){hcb_user={};} (function(){var s=document.createElement("script"), l=hcb_user.PAGE || (""+window.location).replace(/'/g,"%27"), h="https://www.htmlcommentbox.com";s.setAttribute("type","text/javascript");s.setAttribute("src", h+"/jread?page="+encodeURIComponent(l).replace("+","%2B")+"&mod=%241%24wq1rdBcg%24lorU9Glfj8bQyg9yk9caG%2F"+"&opts=16798&num=10&ts=1699153972795");if (typeof s!="undefined") document.getElementsByTagName("head")[0].appendChild(s);})();
}