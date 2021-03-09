let forms = document.querySelectorAll("form")
forms.forEach(form => form.addEventListener("submit",(e) => e.preventDefault()))

let logoutBtn = document.querySelector(".nav-logout-btn")
logoutBtn.addEventListener("click", ()=> {
    auth.signOut().then(()=>{
        let newString = window.location.toString()
        let location = newString.slice(0, newString.lastIndexOf("src"))
        window.location.assign(location + "src/index.html")
    })
})

function checkDB(info, id){
    db.collection(info).doc(id).get().then(doc => {
            if (doc.exists) {
                let newString = window.location.toString()
                let location = newString.slice(0, newString.lastIndexOf("src"))
                if(!(window.location.href == `${location}src/paths/${doc.data().title}.html`)){
                    return window.location.assign(`${location}src/paths/${doc.data().title}.html`)
                }                
            } 
    }).catch((error) => {
        console.log("Error getting document:", error);
    });
}

auth.onAuthStateChanged(user => {
    let newString = window.location.toString()
    let location = newString.slice(0, newString.lastIndexOf("src"))
    if(user){
        checkDB("teacher", user.uid)
        checkDB("student", user.uid)
    }else{
        if(!(window.location.href === location + "src/index.html")){
            window.location.href = location + "src/index.html"
        }
    }
})