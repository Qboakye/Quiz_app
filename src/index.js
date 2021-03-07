/*Selectors*/
const navSignupBtn = document.querySelector(".nav-signup-btn")
const navLoginBtn = document.querySelector(".nav-login-btn")
let signup = document.querySelector(".signup")
let login = document.querySelector(".login")
let signupCloseBtn = signup.querySelector(".close")
let loginCloseBtn = login.querySelector(".close")
let forms = document.querySelectorAll("form")

/*EventListeners */
navSignupBtn.addEventListener("click", () => signup.classList.remove("visible"))
navLoginBtn.addEventListener("click", () => login.classList.remove("visible"))
signupCloseBtn.addEventListener("click", () => signup.classList.add("visible"))
loginCloseBtn.addEventListener("click", () => login.classList.add("visible"))
forms.forEach(form => form.addEventListener("submit",(e) =>e.preventDefault()))
/*Functions */