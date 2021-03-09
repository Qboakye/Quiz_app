let questionBox = document.querySelector(".question-box")

let user = auth.currentUser;
var name, email, photoUrl, uid, emailVerified;

console.log(user)

if (user != null) {
  uid = user.uid;  
}

//console.log(user.uid)

questionBox.addEventListener("submit", () => {
    const{question, a, b, c, d, answer} = questionBox
    db.collection("quizzes").add({
        question: question.value,
        a: a.value,
        b: b.value,
        c: c.value,
        d: d.value,
        answer: answer.value
    })
    console.log(question.value, a.value, b.value, c.value, d.value, answer.value)
})



