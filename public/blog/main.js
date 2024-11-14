masterlist = [
    {"file":"2024-06-15-Banana-Overlord.html","alt":null,"tags":["comics","pictures"]},
    {"file":"2023-08-29-Pakka-Pets.html","alt":null,"tags":["games","pictures"]},
    {"file":"2023-08-28-Hotdog.html","alt":null,"tags":["comics","pictures"]},
    {"file":"2023-08-20-Meet-the-Fellas.html","alt":null,"tags":["pictures"]},
    {"file":"2023-08-19-Minecraft.html","alt":"Minecraft irl!?!?!?","tags":["pictures"]}
]

const url = window.location.pathname;
relativePath = "./";
urlPath = url.split('/');
if(urlPath.length > 2){for(i=0;i<urlPath.length-2;i++){relativePath+="../"}}

function addTo(item,input){
    if (item) {
        if(typeof input=="string"){
            item.innerHTML+=input;
        } else {
            item.append(input);
        }
    }
}

addToTag("head", '<link rel="icon" type="image/x-icon" href="'+relativePath+'meta/favicon.ico"></link>');
addToId("comments",' <div id="HCB_comment_box"><a href="http://www.htmlcommentbox.com">Beep Boop</a>, hold please!</div><link rel="stylesheet" type="text/css" href="https://www.htmlcommentbox.com/static/skins/bootstrap/twitter-bootstrap.css?v=0" /><style>#HCB_comment_box img{width:auto;display:inline-block;}.home-desc{display:none;}#HCB_comment_box h3:first-child{margin:0;}</style>');

window.onload = function(){
    if(document.getElementById("comments")){
        if(!window.hcb_user){hcb_user={};} (function(){var s=document.createElement("script"), l=hcb_user.PAGE || (""+window.location).replace(/'/g,"%27"), h="https://www.htmlcommentbox.com";s.setAttribute("type","text/javascript");s.setAttribute("src", h+"/jread?page="+encodeURIComponent(l).replace("+","%2B")+"&mod=%241%24wq1rdBcg%24lorU9Glfj8bQyg9yk9caG%2F"+"&opts=16798&num=10&ts=1699153972795");if (typeof s!="undefined") document.getElementsByTagName("head")[0].appendChild(s);})();
    }
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

getIndex(masterlist)
    if ( currentIndex > -1) {
        genNav(masterlist);
        currentTitle = getTitle(currentIndex, masterlist);
        currentDate = getDate(currentIndex, masterlist);
        if (document.title === "") {
            currentDate=currentDate.replaceAll("-00","")
            document.title = currentDate + " | Stupied";
        }
        currentDate = convDate(currentDate);
        addToId('blogTitle',currentTitle);
        addToId('blogDate',currentDate);
        addToId('nextprev',result);
    }else{
        addToId('blogTitle',"[Unlisted Post]");
        addToId('nextprev',"<a href='./index.html'>« Archive  »</a>")
        if (document.title === "") {document.title = "Unlisted Post | Stupied";}
        list=""
        for(i=0;i<masterlist.length;i++){
            date = getDate(i, masterlist);
            title = getTitle(i, masterlist);
			link= masterlist[i].file
			item='<li><a href="'+link+'"><span>'+date+" »</span> <span class='txt-darker-yellow'>"+title+'</span></a></li>'
            list+=item
        }
		list="<ul>"+list+"</ul>"
        addToId("blogList",list)
    }
    addToTag("nav",'<header>The Abyss</header><a href="'+relativePath+'blog/index.html" title="list of all the blog posts">Archive</a><a href="https://status.cafe/users/stupied" title="small random thoughts">Status</a><a href="'+relativePath+'index.html" title="head home">Surface ✮</a>')