url = window.location.pathname;
    relativePath = "./";
    urlPath = url.split('/');
    if(urlPath.length > 2){for(i=0;i<urlPath.length-2;i++){relativePath+="../"}}
json = relativePath+"meta/lists/";
keywords="Stupied, Stupied Idiot, StupiedIdiot"
function addTo(item,input){
    if (item) {
        if(typeof input=="string"){
            item.innerHTML+=input;
        } else {
            item.append(input);
        }
    }
}
function createItem(item,{id,style,input,src,href,title}){
    item = document.createElement(item)
    if(id!==undefined){item.id = id}
    if(style!==undefined){item.classList.add(style)}
    if(src!==undefined){item.src = src}
    if(href!==undefined){item.href = href}
    if(title!==undefined){item.title = title}
    if(input!==undefined){addTo(item,input)}
    return item
}
function addToTag(tag,input) {
    tag = document.getElementsByTagName(tag)[0]
    addTo(tag,input)
}
function addToId(id,input) {
    id = document.getElementById(id)
    addTo(id,input)
}
function addToQuery(query,input) {
    query = document.querySelector(query)
    addTo(query,input)
}
function wrap(el, wrapper) {
    el.parentNode.insertBefore(wrapper, el);
    wrapper.appendChild(el);
}
function viewerGenerate(selector,name){
	if(name===undefined){
		name="general"
	}
    selector += " > img"
    var images = document.querySelectorAll(selector);
        for (var i = 0; i < images.length; ++i){
			source = images[i].src;
            link=createItem("a",{href:source})
			imageHref = wrap(images[i],link);
        }
}
addToTag("head", '<link rel="icon" type="image/x-icon" href="'+relativePath+'meta/media/favicon.ico"></link>');
var COMICS
if(url.includes("/comic")===true){
fetch(json+"comics.json")
    .then((response) => response.json())
    .then((comics) => {
        COMICS=comics
        getComicIndex(comics)
        if ( currentIndex > -1) {
            if(currentPartIndex> -1){
                result=createItem("header",{input:createItem("a",{input:comics[currentIndex].alt,href:"./index.html"})})
                addTo(result,createItem("span",{input:comics[currentIndex].parts[currentPartIndex].alt}))
                addToId("top",result)

                genComicNextprev(comics[currentIndex].parts)
                genComicNext(comics[currentIndex].parts)

                addToId("top",'<nav id="extra"><a href="'+relativePath+'index.html">✮</a></nav>')

                if (document.title==="") {document.title = comics[currentIndex].parts[currentPartIndex].alt + " | " + comics[currentIndex].alt;}
            } else {
                comicExtra=-1
                genComicArchive(comics[currentIndex].parts)
                if(url.includes("/84")){
                    comicExtra=findComicIndex(comics,"!84-extras")
                    genComicArchive(comics[comicExtra].parts,"84-extras")
                }
            }

            keywords+=", "+comics[currentIndex].alt+", "+comics[currentIndex].alt+" Stupied"
            if(typeof document.querySelector('meta[name="description"]'==null)){
                addToTag("head", '<meta name="desc" content="'+comics[currentIndex].desc+'">');
            }
        } else {
            list=createItem("ul",{})
            for(i=0;i<comics.length;i++){
                if (comics[i].parts==null){link=comics[i].file+".html" 
                } else { link=comics[i].file+"/index.html" }
                if(comics[i].file[0]!=="!"){
                    listItem = createItem("li",{})
                    addTo(listItem,createItem("a",{input:"<span style='font-family:grandstander'>"+comics[i].alt+"</span> » ",href:link}))
                    addTo(listItem, comics[i].desc)
                    addTo(list,listItem)
                }
            }
            addToId("comicList",list)
        }
    })
    keywords+=", Stupied Comics"
    addToTag("footer",'<a href="#">Sitemap</a><a href="'+relativePath+'index.html">Home</a><a href="'+relativePath+'chat.html">Chatbox</a>')
}

function getComicIndex(z){
    currentIndex = -1;
    currentPartIndex = -1;
	fileList = url.split("/");
    currentFolder=fileList[fileList.length-1]
    currentFile=currentFolder
    
    if(currentFile.includes(".html")==false){
      currentFile+=".html"
    }

	if(fileList.length>3){currentFolder=fileList[fileList.length-2]}
    currentFolder = currentFolder.replaceAll(".html","")

    for (i = 0; i < z.length; i++) {
		if ( z[i].file===currentFolder) {
			currentIndex = i;
		}
	}

    if (fileList.length>3 && z[currentIndex].parts!==null){
        for (i = 0; i < z[currentIndex].parts.length; i++) {
            if ( z[currentIndex].parts[i].file===currentFile) {
                currentPartIndex = i;
            }
        }
    }
}
function findComicIndex(z,item){
    for(i=0;i<z.length;i++){
        if(z[i].file==item){
            return i
        }
    }
}
function genComicArchive(z,destination){
    if(destination===undefined){destination="comicList"}
    if(comicExtra===-1){extraPath=""}else{extraPath="./../!"+destination+"/"}
    var result="";
    for(i=0;i<z.length;i++){
        var comicThumb="";
        if(z[i].img!==undefined){
            comicThumb=relativePath+"meta/media/"+z[i].img
            comicThumb='<div class="comicListThumbnail"><img src="'+comicThumb+'"></div>'
        }

        comicLink=extraPath+z[i].file
        comicTitle=z[i].alt
        result+='<a href="'+comicLink+'"><div class="comicListItem">'+comicThumb+'<div class="comicListTitle"><h4>'+comicTitle+'</h4></div><div class="comicListIndex">#'+i+'</div></div></a>'
    }
    addToId(destination,result)
}
function genComicNextprev(z){
    result=createItem("div",{id:"nextprev"})
    span=createItem("span",{input:"#"+currentPartIndex})
    if ( z.length < 2 ) {
		addTo(result,span)
	} else if ( currentPartIndex === 0 ) {
		nextI= z[currentPartIndex+1].file;
		addTo(result,span)
        addTo(result,createItem("a",{href:nextI,input:"<button title='next part'>►</button>"}))
	} else if ( currentPartIndex === z.length-1 ) {
        prevI= z[currentPartIndex-1].file;
        addTo(result,createItem("a",{href:prevI,input:"<button title='previous part'>◄</button>"}))

		addTo(result,span)
	} else if ( 0 < currentPartIndex && currentPartIndex < z.length - 1 ) {
		prevI= z[currentPartIndex-1].file;
		nextI= z[currentPartIndex+1].file;
        addTo(result,createItem("a",{href:prevI,input:"<button title='previous part'>◄</button>"}))
        addTo(result,span)
        addTo(result,createItem("a",{href:nextI,input:"<button title='next part'>►</button>"}))
	}
    addToId("top",result)
}
//should probably change this sad face emoji
function genComicNext(z){
    if ( z.length < 2 || currentPartIndex === z.length-1 ) {
		result = createItem("div",{input:"You're all caught up :3"})
	} else {
        var comicThumb="";
        if(z[currentPartIndex+1].img!==undefined){
            comicThumb=relativePath+"meta/media/"+z[currentPartIndex+1].img
            comicThumb='<div class="comicListThumbnail"><img src="'+comicThumb+'"></div>'
        }
        nextI= z[currentPartIndex+1].file
        comicTitle=z[currentPartIndex+1].alt

        result='<a href="'+nextI+'"><div>'+comicThumb+'<div id="next-title"><div id="next-title-content"><h4>Next Part</h4><span>'+comicTitle+'</span></div></div></div></a>'
	}
    addToId("next",result)
}

addToId("comments",' <div id="HCB_comment_box"><a href="http://www.htmlcommentbox.com">Beep Boop</a>, hold please!</div><link rel="stylesheet" type="text/css" href="https://www.htmlcommentbox.com/static/skins/bootstrap/twitter-bootstrap.css?v=0" /><style>#HCB_comment_box img{width:auto;display:inline-block;}.home-desc{display:none;}#HCB_comment_box h3:first-child{margin:0;}</style>');

window.onload = function(){
    if(document.getElementById("comments")){
        if(!window.hcb_user){hcb_user={};} (function(){var s=document.createElement("script"), l=hcb_user.PAGE || (""+window.location).replace(/'/g,"%27"), h="https://www.htmlcommentbox.com";s.setAttribute("type","text/javascript");s.setAttribute("src", h+"/jread?page="+encodeURIComponent(l).replace("+","%2B")+"&mod=%241%24wq1rdBcg%24lorU9Glfj8bQyg9yk9caG%2F"+"&opts=16798&num=10&ts=1699153972795");if (typeof s!="undefined") document.getElementsByTagName("head")[0].appendChild(s);})();
    }
}
function getIndex(z){
	currentIndex = -1;
	currentFile = url.substring(url.lastIndexOf('/'));
	currentFile = currentFile.replaceAll("/","")
	if ( ! currentFile.endsWith(".html") ) {
		currentFile += ".html";
	}

	for (i = 0; i < z.length; i++) {
		if ( z[i].file === currentFile ) {
			currentIndex = i;
            break
		}
	}
}
function getTitle(i, z){
        if ( z[i].alt !== null){
            title = z[i].alt;
        } else {
            title = z[i].file;
            title = title.slice(11, title.lenght);
            title = title.replaceAll("-"," ");
            title = title.replaceAll(".html","");
        }
	return title;
}
function getDate(i, z){
	date = z[i].file.slice(0,10);
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

function genNav(z){
	if ( z.length < 2) {
		result = "<a href='./index.html'>« Archive  »</a>";
	} else if ( currentIndex === 0 ) {
		prevI= z[currentIndex+1].file;
		result = "<a href='./index.html'>Archive</a> | <a href='./" + prevI + "'>Prev »</a>";
	} else if ( currentIndex === z.length - 1 ) {
		nextI= z[currentIndex-1].file;
		result = "<a href='./" + nextI + "'>« Next</a> | <a href='./index.html'>Archive</a>";
		
	} else if ( 0 < currentIndex && currentIndex < z.length - 1 ) {
		prevI= z[currentIndex+1].file;
		nextI= z[currentIndex-1].file;
		result = "<a href='./" + nextI + "'>« Next</a> | <a href='./index.html'>Archive</a> | <a href='./" + prevI + "'>Prev »</a>";
	}
}

if(url.includes("/blog")===true){
    fetch(json+"blogs.json")
        .then((response) => response.json())
        .then((blogs) => {
            getIndex(blogs)
            if ( currentIndex > -1) {
                genNav(blogs);
                currentTitle = getTitle(currentIndex, blogs);
                currentDate = getDate(currentIndex, blogs);
                if (document.title === "") {
                    currentDate=currentDate.replaceAll("-00","")
                    document.title = currentDate + " | Stupied Stuff";
                }
                currentDate = convDate(currentDate);
                addToId('blogTitle',currentTitle);
                addToId('blogDate',currentDate);
                addToId('nextprev',result);
            }else{
                addToId('blogTitle',"[Unlisted Post]");
                addToId('nextprev',"<a href='./index.html'>« Archive  »</a>")
                if (document.title === "") {document.title = "Unlisted Post | Stupied Stuff";}
                list=createItem("ul",{})
                for(i=0;i<blogs.length;i++){
                    listItem = createItem("li",{})
                    date = getDate(i, blogs);
                    title = getTitle(i, blogs);
                    addTo(listItem,createItem("a",{input:'<span style="font-family:grandstander;">'+date+" »</span> <span class='txt-darker-yellow'>"+title+"</span>",href:blogs[i].file}))
                    addTo(list,listItem)
                }
                addToId("blogList",list)
            }
        })
        addToTag("nav",'<header>The Abyss</header><a href="'+relativePath+'blog/index.html" title="list of all the blog posts">Archive</a><a href="'+relativePath+'blog/micro.html" title="small random thoughts">Micro</a><a href="'+relativePath+'index.html" title="head home">Surface ✮</a>')
}

if(url.includes("/micro")===true){
    fetch(json+"micro.json")
        .then((response) => response.json())
        .then((micro) => {
            microPostCont=createItem("div",{style:"cont"});
            for(i=1, prevMonth=micro[i].date.substr(5,2);i<micro.length;i++){
                currentMonth=micro[i].date.substr(5,2)

                getMicroPost(micro,i);
                if(currentMonth===prevMonth){
                    addTo(microPostCont,microPost)
                } else {
                    addToId("microPosts",microPostCont)
                    microPostCont=createItem("div",{style:"cont"});
                    prevMonth=currentMonth
                    addTo(microPostCont,microPost)
                }
            }
            addToId("microPosts",microPostCont)
            x=document.querySelectorAll("#microPosts div > div:not(:first-child)")
            for(i=0;i<x.length;i++){
                x[i].prepend(createItem("hr",{}))
            }
    })
}

//remember to change this
function getDateMicro(micro,i){
    microDate=(new Date().getTime()-new Date(micro[i].date).getTime())/1000
    if (microDate<60){microDate=Math.floor(microDate); if(microDate===1){microDate+=" second ago"}else{microDate+=" seconds ago"}}
    if (microDate<3600){microDate=Math.floor(microDate/60);if(microDate===1){microDate+=" minute ago"}else{microDate+=" minutes ago"}}
    if (microDate<86400){microDate=Math.floor((microDate/60)/60);if(microDate===1){microDate+=" hour ago"}else{microDate+=" hours ago"}}
    if (microDate<31540000){microDate=Math.floor(((microDate/60)/60)/24);if(microDate===1){microDate+=" day ago"}else{microDate+=" days ago"}}
    if (microDate>31540000){microDate=Math.floor((((microDate/60)/60)/24)/365.25);if(microDate===1){microDate+=" year ago"}else{microDate+=" years ago"}}

    microDate=createItem("a",{input:createItem("h4",{input:micro[i].status+" "+microDate,title:micro[i].date.replaceAll("T"," | ")}),id:"microBlogLink"})
}

function getMicroPost(micro,i){
    getDateMicro(micro,i)
    microTxt= createItem("p",{input:micro[i].txt})
    microPost=createItem("div",{input:""})
    addTo(microPost,microDate)
    addTo(microPost,microTxt)
}

window.addEventListener("load", function(){
    if(document.querySelector('meta[name="keywords"]')){
        document.querySelector('meta[name="keywords"]').content+=keywords
    } else {
        addToTag("head", '<meta name="keywords" content="'+keywords+'">');
    }
});