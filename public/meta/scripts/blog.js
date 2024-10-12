masterlist = [
    {"file":"2024-06-15-Banana-Overlord.html","alt":null,"tags":["comics","pictures"]},
    {"file":"2023-08-29-Pakka-Pets.html","alt":null,"tags":["games","pictures"]},
    {"file":"2023-08-28-Hotdog.html","alt":null,"tags":["comics","pictures"]},
    {"file":"2023-08-20-Meet-the-Fellas.html","alt":null,"tags":["pictures"]},
    {"file":"2023-08-19-Minecraft.html","alt":"Minecraft irl!?!?!?","tags":["pictures"]}
]

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
    getIndex(masterlist)
    if ( currentIndex > -1) {
        genNav(masterlist);
        currentTitle = getTitle(currentIndex, masterlist);
        currentDate = getDate(currentIndex, masterlist);
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
        for(i=0;i<masterlist.length;i++){
            listItem = createItem("li",{})
            date = getDate(i, masterlist);
            title = getTitle(i, masterlist);
            addTo(listItem,createItem("a",{input:'<span style="font-family:grandstander;">'+date+" »</span> <span class='txt-darker-yellow'>"+title+"</span>",href:masterlist[i].file}))
            addTo(list,listItem)
        }
        addToId("blogList",list)
    }
    addToTag("nav",'<header>The Abyss</header><a href="'+relativePath+'blog/index.html" title="list of all the blog posts">Archive</a><a href="'+relativePath+'blog/micro.html" title="small random thoughts">Micro</a><a href="'+relativePath+'index.html" title="head home">Surface ✮</a>')
}

if(url.includes("/micro")===true){
    fetch(relativePath+"/meta/scripts/micro.json")
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
