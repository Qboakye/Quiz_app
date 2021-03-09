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
        document.querySelector(".profession").innerText = "No profession checked"
        setTimeout(() => document.querySelector(".profession").innerText = "",4000)
    }
})

loginForm.addEventListener("submit", () => {
    let email = loginForm["email"].value
    let password = loginForm["password"].value
    auth.signInWithEmailAndPassword(email, password).then(cred => {

        console.log(cred.user.uid)
        db.collection("teacher").doc(cred.user.uid).get().then(doc => {
            if (doc.exists) {
                let newString = window.location.toString()
                let location = newString.slice(0, newString.lastIndexOf("/"))
                window.location.assign(`${location}/paths/${doc.data().title}.html`)
            } else {
                console.log("No such document!");
            }
        }).catch((error) => {
            console.log("Error getting document:", error);
        });

        db.collection("student").doc(cred.user.uid).get().then(doc => {
            if (doc.exists) {
                let newString = window.location.toString()
                let location = newString.slice(0, newString.lastIndexOf("/"))
                window.location.assign(`${location}/paths/${doc.data().title}.html`)
            } else {
                console.log("No such document!");
            }
        }).catch((error) => {
            console.log("Error getting document:", error);
        });
        
        let newString = window.location.toString()
        let location = newString.slice(0, newString.lastIndexOf("/"))
        //window.location.assign(location + "/paths/student.html")
        login.classList.add("visible")

    })
})
/*Functions */