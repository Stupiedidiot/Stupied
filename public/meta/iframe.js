meep = window.self
meow = window.location.toString()

if ( meep == window.top && meow.includes("stupied") ){
    window.location.replace("./index.html")
}