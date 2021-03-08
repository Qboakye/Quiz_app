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