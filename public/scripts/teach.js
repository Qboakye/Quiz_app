let questionBox = document.querySelector(".question-box")

questionBox.addEventListener("submit", () => {
    const {question, a, b, c, d, answer} = questionBox
    if(a.value && b.value && c.value && d.value && question.value && answer.value){
        auth.onAuthStateChanged(user => {
            if(user){
                db.collection("quizzes").add({
                    creator: user.email,
                    question: question.value,
                    a: a.value,
                    b: b.value,
                    c: c.value,
                    d: d.value,
                    answer: answer.value
                }).then(() => {
                    questionBox.reset()
                    questionBox.innerHTML = "<h3>SUBMITTED 👍</h3>"
                    setTimeout(()=>{
                        questionBox.innerHTML = `
                            <div class="question-field">
                                <label>Question:</label>
                                <textarea placeholder="Kindly Enter your question." name="question"></textarea>
                            </div>
                            <div class="answer-box">
                                <h3>Possible answers</h3>
                                <div class="answer-list">
                                    <label for="a">a.<input type="text" name="a" autocomplete="off"></label>
                                    <label for="b">b.<input type="text" name="b" autocomplete="off"></label>
                                    <label for="c">c.<input type="text" name="c" autocomplete="off"></label>
                                    <label for="d">d.<input type="text" name="d" autocomplete="off"></label>
                                </div>
                            </div>
                            <div>
                                <label for="answer" style="font-weight: 500; letter-spacing: .5px;">Correct answer letter</label>
                                <input type="text" class="ans" name="answer" autocomplete="off">
                            </div>
                            <div class="enter">
                                <button type="submit" class="enter">Submit</button>
                            </div>
                        `
                    },1300)
                })
                .catch(err => console.log(err))
            }
        })  
    }
})






