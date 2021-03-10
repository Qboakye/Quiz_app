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
    if(a.checked || b.checked || c.checked || d.checked){
        auth.onAuthStateChanged(user => {
            if(user){ 
                const{a, b, c, d} = studentArea
                let answerA = a.checked && a.name
                let answerB = b.checked && b.name
                let answerC = c.checked && c.name
                let answerD = d.checked && d.name

                let answered = answerA || answerB || answerC || answerD
                
                if(data.answer == answered){
                    score = score + 1
                    console.log(score)
                }

                index++
                if(index < arr.length){
                    questions()
                } else {
                    studentArea.innerHTML = `
                        <div class="centre-text">
                            <h3>You scored ${score}/${arr.length}</h3>
                            <button class="submit reload">Retry</button>
                        </div>
                    `
                    let reload = studentArea.querySelector(".reload")
                    reload.addEventListener("click", ()=> window.location.reload())
                } 
            }
        })
    }
    
})