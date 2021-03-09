/*Functions */
function checkDB(info, id){
    db.collection(info).doc(id).get().then(doc => {
            if (doc.exists) {
                if(!(window.location.href == `${location}/paths/${doc.data().title}.html`)){
                    let newString = window.location.toString()
                    let location = newString.slice(0, newString.lastIndexOf("/"))
                    window.location.assign(`${location}/paths/${doc.data().title}.html`)
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

/*Selectors */
let signupForm = document.querySelector("#signup-form")
let loginForm = document.querySelector("#login-form")

/* EventListeners */
signupForm.addEventListener("submit", () => {
    let email = signupForm["email"].value
    let password = signupForm["password"].value
    let teacher = signupForm["teacher"].checked && signupForm["teacher"].value
    let student = signupForm["student"].checked && signupForm["student"].value
    let category = teacher || student

    if(category){
        auth.createUserWithEmailAndPassword(email, password).then(cred=> {
            db.collection(category).doc(cred.user.uid).set({
                title: category
            }).then(() => {
                let newString = window.location.toString()
                let location = newString.slice(0, newString.lastIndexOf("/"))
                window.location.assign(`${location}/paths/${category}.html`)
            })
            signupForm.reset()
            signup.classList.add("visible")
        })
    } else{
        document.querySelector(".profession").innerText = "No profession checked"
        setTimeout(() => document.querySelector(".profession").innerText = "",4000)
    }
})

loginForm.addEventListener("submit", () => {
    let email = loginForm["email"].value
    let password = loginForm["password"].value
    auth.signInWithEmailAndPassword(email, password).then(cred => {        
        checkDB("teacher", cred.user.uid)
        checkDB("student", cred.user.uid)
        login.classList.add("visible")
    })
})