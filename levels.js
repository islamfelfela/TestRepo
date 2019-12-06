var btn = document.getElementsByTagName("input")

    btn[0].addEventListener("click", function(){
        window.location = "index.html?character=1level=1"
    });

    btn[1].addEventListener("click", function(){
        window.location = "index.html?character=2level=2"
    });
       
    btn[2].addEventListener("click", function(){
        window.location = "index.html?character=3level=3"
    });

sessionStorage.setItem("char",window.location.search.substr(-1))