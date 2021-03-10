let studentArea = document.querySelector(".student-area")
let arr = []
let index = 0
let data
let score = 0
let num = 0
db.collection("quizzes").get().then(snapshot => {
    snapshot.docs.forEach(doc => {
        arr.push(doc.data())      
    });
}).then(() => {
    questions()
})

function questions(){
    data = arr[index]
    num = index 
    studentArea.innerHTML = `
        <p class="question"> <span class="">${num + 1}.</span> ${data.question}</p>
        <div class="possible-ans">
            <label><input type="radio" name="a" value="${data.a}" id="a">${data.a}</label>
            <label><input type="radio" name="b" value="${data.b}" id="b">${data.b}</label>
            <label><input type="radio" name="c" value="${data.c}" id="c">${data.c}</label>
            <label><input type="radio" name="d" value="${data.d}" id="d">${data.d}</label>	
        </div>
        
        <button class="submit" type="Submit">Submit</button>
        <p class="num">${num + 1}</p>
    `
}

studentArea.addEventListener("submit", () => {
    
    index++
    const{a, b, c, d} = studentArea
    console.log(a.value, b.value, c.value, d.value)
   if(index == arr.length){
        studentArea.innerHTML = `
            <div class="centre-text">
                <h3>You scored ${score}/${arr.length}</h3>
                <button class="submit">Retry</button>
            </div>
        `
   } else {
        
       console.log(a.value, b.value, c.value, d.value)

    
        console.log(1)
        auth.onAuthStateChanged(user => {
            if(user){ 
                if(a.checked || b.checked || c.checked || d.checked){
                    let answerA = a.checked && a.value
                    let answerB = b.checked && b.value
                    let answerC = c.checked && c.value
                    let answerD = d.checked && d.value
        
                    let answered = answerA || answerB || answerC || answerD
                    // console.log(answered)
                    //console.log(data.answer)
                    questions()
                    if(data.answer === answered){
                        score + 1
                    }
                }
            }
        })
    } 
})