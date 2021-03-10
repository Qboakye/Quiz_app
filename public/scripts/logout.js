let forms = document.querySelectorAll("form")
forms.forEach(form => form.addEventListener("submit",(e) => e.preventDefault()))

let logoutBtn = document.querySelector(".nav-logout-btn")
logoutBtn.addEventListener("click", ()=> {
    auth.signOut().then(() => {
        let newString = window.location.toString()
        let location = newString.slice(0, newString.indexOf("public"))
        window.location.assign(location + "public/index.html")
    })
})

function checkDB(info, id){
    db.collection(info).doc(id).get().then(doc => {
            if (doc.exists) {
                let newString = window.location.toString()
                let location = newString.slice(0, newString.indexOf("public"))
                if(!(window.location.href == `${location}public/paths/${doc.data().title}.html`)){
                   return window.location.assign(`${location}public/paths/${doc.data().title}.html`)
                }                
            } 
    }).catch((error) => {
        console.log("Error getting document:", error);
    });
}

auth.onAuthStateChanged(user => {
    let newString = window.location.toString()
    let location = newString.slice(0, newString.indexOf("public"))
    if(user){
        checkDB("teacher", user.uid)
        checkDB("student", user.uid)
    }else{
        if(!(window.location.href === location + "public/index.html")){
            window.location.href = location + "public/index.html"
        }
    }
})