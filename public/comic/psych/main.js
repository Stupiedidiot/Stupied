const templateMain =`
    <div id="container">
        <main></main>
        <aside>
            <div id="aside-main">
                <span class="title outline"><a href="./index.html">PSYCH!</a></span>
                <nav>
                    <a href="./index.html">/ARCHIVE/</a>
                    <a href="./character.html">/CHARCTERS/</a>
                    <a href="./../../index.html">✮</a>
                </nav>
            </div>
            <img class="outline" src="./img/snail.png">
        </aside>
    </div>
`

document.querySelector("body").innerHTML+= templateMain;

main=document.querySelectorAll(".main-content");
for(i=0; i<main.length; i++){
    document.querySelector("#container main").append(main[i]);
}