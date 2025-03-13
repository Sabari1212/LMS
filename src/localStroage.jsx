

function StroageTockin(tockin){
    localStorage.setItem("user", tockin);
}
function Getlocalstorage(){
    return localStorage.getItem("user");
}
function Deletelocalstorage(){
        localStorage.removeItem("user");
}
export{StroageTockin,Getlocalstorage,Deletelocalstorage}