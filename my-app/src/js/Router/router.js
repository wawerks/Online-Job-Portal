function setRouter(){
    switch (window.location.pathname){
        // if you are logged in you can't access outside pages; redirect to dashboard
        case "/":
        case "/index.html":
        case "/reg.html":
            if(localStorage.getItem ("access_token")){
                window.location.pathname = "/home.html";
            }
            break;
        // if you are not logged in you can't access dashboard pages; redirect to
        case "/home.html":
        case "/about.html":
        case "/Accounting.html":
        case "/Agriculture.html":    
        case "/Application.html":
        case "/ComputerRelated.html":
        case "/Education.html":
        case "/Engineering.html":
        case "/Freelancing.html":
        case "/notif.html":
        case "/Post.html":
        case "/profile.html":
        case "/terms.html":
        // add existing pages
            if(!localStorage.getItem("access_token")){
                window.location.pathname = "/index.html";

            }
        break;

        default:
            break;
    }
}

export{setRouter};