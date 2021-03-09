auth.onAuthStateChanged(user => {
    let newString = window.location.toString()
    let location = newString.slice(0, newString.lastIndexOf("src"))
    if(user){

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
        console.log("No profession checked")
    }
})

loginForm.addEventListener("submit", () => {
    let email = loginForm["email"].value
    let password = loginForm["password"].value
    auth.signInWithEmailAndPassword(email, password).then(()=> {

        let newString = window.location.toString()
        let location = newString.slice(0, newString.lastIndexOf("/"))
        window.location.assign(location + "/paths/student.html")

        loginCloseBtn.addEventListener("click", () => login.classList.add("visible"))
    })
})
/*Functions */