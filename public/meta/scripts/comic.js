masterlist = [
    {
        "folder":"muse-adriade",
        "alt":"Muse Ariadne",
        "desc":"Writing club thingy wohooo",
        "parts":[
            {"file":"2024-02-05","alt":"Writing is Hard"},
            //{"file":"2024-04-08","alt":"I Hate You"},
            {"file":"2024-05-20","alt":"Evidence"},
            {"file":"2024-10-07","alt":"Seclusion"}
        ]
    },
    {
        "folder":"misfits",
        "alt":"The Misfits",
        "desc":"OC comics loosely based on the Pokemon Dungeon Games",
        "parts":[
            {"file":"independent","alt":"Independent","img":"comics/misfits/independent.png"},
            {"file":"yapping","alt":"Yapping"},
            {"file":"saved","alt":"Saved"},
            //{"file":"letters","alt":"Letters"},
            //{"file":"siblings","alt":"Siblings"}
        ]
    },
    {
        "folder":"puyo",
        "alt":"Maguro's Thing",
        "desc":"Idk some dumb Puyo comic I made,,"
    },
    {
        "folder":"84",
        "alt":"84",
        "desc":"Ashley Dobrik attempts to commit suicide but is prevented by getting stuck in a time loop.",
        "parts":[
            {"file":"uniform","alt":"Uniform"},
            {"file":"notes","alt":"Note Taking"},
            //{"file":"haircut","alt":"Haircut"},
            /*
            {"file":"cover","alt":"Cover Art"},
            {"file":"sorry","alt":"Sorry"},
            {"file":"breakfast","alt":"Breakfast"},
            {"file":"break","alt":"Take a Break"},
            {"file":"news","alt":"Exciting News"}
            */
        ]
    },
    {
        "folder":"psych",
        "alt":"Psych!",
        "desc":"Being a psychic sucks actually.",
        "parts":[
            {"file":"tetris","alt":"Tetris"},
            {"file":"grass","alt":"Touch Grass"},
            {"file":"icecream","alt":"Ice Cream"},
            //{"file":"man-down","alt":"But, Psyyy--"},
            //{"file":"hell","alt":"I like You"}
        ]
    },
    {
        "folder":"adrift",
        "alt":"Adrift",
        "desc":"It's clearance signing and Adrina has an essay to finish.",
    },
    {
        "folder":"hat",
        "alt":"LiteralHat",
        "desc":"Random LiteralHat related Comics",
        "parts":[
            {"file":"index","alt":"Clipper"},
            {"file":"lost","alt":"Lost","img":"comics/hat/0A01-00.png"}
        ]
    },
    {
        "folder":"penny",
        "alt":"Penny's Perfect Present",
        "desc":"She wants to get her mom a gift for an upcoming event.",
    },
    {
        "folder":"howto-original",
        "alt":"How To Not (Original)",
        "desc":"A guide on how to do stuff by telling you how not to",
        "parts":[
            {"file":"0A00","alt":"Make a Webcomic"},
            {"file":"0A01","alt":"Befriend the Internet"},
            {"file":"0A02","alt":"Be Original"},
            {"file":"0A03","alt":"Procastinate"},
            {"file":"0A04","alt":"Do Projects"},
            {"file":"0A05","alt":"Feel Motivated"},
            {"file":"0A06","alt":"Walk Your Pet Fish"},
            {"file":"0A07","alt":"Study"}
        ]
    }
]
maxParts=0
searchComicIndex()
if ( currentIndex > -1) {
    // Check if viewing a comic
    if(currentPartIndex > -1){
        result=createItem("header",{input:createItem("a",{input:masterlist[currentIndex].alt,href:"./index.html"})})
        addTo(result,createItem("span",{input:masterlist[currentIndex].parts[currentPartIndex].alt}))
        addToId("top",result)
        
        writeComicNextprev(masterlist[currentIndex].parts)
        writeComicNext(masterlist[currentIndex].parts)
        
        addToId("top",'<nav id="extra"><a href="'+relativePath+'index.html">✮</a></nav>')
        if (document.title==="") {document.title = masterlist[currentIndex].parts[currentPartIndex].alt + " | " + masterlist[currentIndex].alt;}
    } else {
        writePartsArchive("comicList", currentIndex, 0, maxParts)

        result=createItem("header",{input:createItem("a",{input:"Stupied",href:"./index.html"})})
        addTo(result,createItem("span",{input:masterlist[currentIndex].alt}))
        addToId("top",result)

        addToId("top",'<nav id="extra"><a href="'+relativePath+'index.html">✮</a></nav>')
        if (document.title==="") {document.title = masterlist[currentIndex].alt + " | " + "Stupied"}
    }
} else {
    writeComicArchive()
    addToId("comicList",list)
}

function searchComicIndex(){
    currentIndex = -1;
    currentPartIndex = -1;
    
    // Setup stuff
    fileList = url.split("/");
    if(fileList[fileList.length-1]===""){fileList[fileList.length-1]="index"}
    currentFolder=fileList[fileList.length-1]
    currentFolder = currentFolder.replaceAll(".html","")
    currentFile=currentFolder
    
    // Check if inside folder
    if(fileList.length>3){
        currentFolder=fileList[fileList.length-2]
    }
    
    // Find Index
    for (i = 0; i < masterlist.length; i++) {
        if ( masterlist[i].folder===currentFolder) {
            currentIndex = i;
        }
    }
    
    // Find Index of Part
    if(fileList.length>3 && masterlist[currentIndex].parts!==null){
        maxParts= masterlist[currentIndex].parts.length
        for (i = 0; i < maxParts; i++) {
            if ( masterlist[currentIndex].parts[i].file===currentFile) {
                currentPartIndex = i;
            }
        }
    }
}

function writeComicArchive(){
    list=createItem("ul",{})
    for(i=0;i<masterlist.length;i++){
        // Checks if there's an index
        if (masterlist[i].parts==null){link=masterlist[i].folder+".html" 
        } else { link=masterlist[i].folder+"/index.html" }
        
        // Hides anything starting with !
        if(masterlist[i].folder[0]!=="!"){
            listItem = createItem("li",{})
            addTo(listItem,createItem("a",{input:"<span style='font-family:grandstander'>"+masterlist[i].alt+"</span> » ",href:link}))
            addTo(listItem, masterlist[i].desc)
            addTo(list,listItem)
        }
    }
}

// Change how the archive looks cuz it's ugly >:(
function writePartsArchive(id,folder,first,last){
    var result="";
    for(i=first;i<last;i++){
        result += getPart(folder,i)
    }
    addToId(id,result)
}

function getPart(folder,x){
        comicLink=masterlist[folder].parts[x].file+".html"
        comicTitle=masterlist[folder].parts[x].alt
        result='<a href="'+comicLink+'"><div class="comicListItem">'+
        '<div class="comicListTitle"><h4>'+comicTitle+'</h4></div>'+
        '<div class="comicListIndex"><span>#'+x+'</span></div>'+
        '</div></a>'
        return result
}

function writeComicNextprev(){
    result=createItem("div",{id:"nextprev"})
    span=createItem("span",{input:"#"+currentPartIndex})
    if ( masterlist[currentIndex].parts.length < 2 ) {
		addTo(result,span)
	} else if ( currentPartIndex === 0 ) {
		nextI= masterlist[currentIndex].parts[currentPartIndex+1].file+".html";
		addTo(result,span)
        addTo(result,createItem("a",{href:nextI,input:"<button title='next part'>►</button>"}))
	} else if ( currentPartIndex === masterlist[currentIndex].parts.length-1 ) {
        prevI= masterlist[currentIndex].parts[currentPartIndex-1].file+".html";
        addTo(result,createItem("a",{href:prevI,input:"<button title='previous part'>◄</button>"}))

		addTo(result,span)
	} else if ( 0 < currentPartIndex && currentPartIndex < masterlist[currentIndex].parts.length - 1 ) {
		prevI= masterlist[currentIndex].parts[currentPartIndex-1].file+".html";
		nextI= masterlist[currentIndex].parts[currentPartIndex+1].file+".html";
        addTo(result,createItem("a",{href:prevI,input:"<button title='previous part'>◄</button>"}))
        addTo(result,span)
        addTo(result,createItem("a",{href:nextI,input:"<button title='next part'>►</button>"}))
	}
    addToId("top",result)
}

function writeComicNext(){
    if ( masterlist[currentIndex].parts.length < 2 || currentPartIndex === masterlist[currentIndex].parts.length-1 ) {
		result = createItem("div",{input:"You're all caught up :3"})
	} else {
        var comicThumb="";
        if(masterlist[currentIndex].parts[currentPartIndex+1].img!==undefined){
            comicThumb=relativePath+"meta/media/"+masterlist[currentIndex].parts[currentPartIndex+1].img
            comicThumb='<div class="comicListThumbnail"><img src="'+comicThumb+'"></div>'
        }
        nextI= masterlist[currentIndex].parts[currentPartIndex+1].file+".html"
        comicTitle=masterlist[currentIndex].parts[currentPartIndex+1].alt

        result='<a href="'+nextI+'"><div>'+comicThumb+'<div id="next-title"><div id="next-title-content"><h4>Next Part</h4><span>'+comicTitle+'</span></div></div></div></a>'
	}
    addToId("next",result)
}