// create main variable 
const startQuiz = document.querySelector('.start-quiz')
const exitQuiz =  document.querySelectorAll('.exit-quiz')
const continueQuiz = document.querySelector('.continue-quiz')
const replayQuiz = document.querySelector('.replay-quiz')
const optionsList = document.querySelector('.quiz__content__questions')
const timeSec = document.querySelector('.quiz__header__timer_time')
const timeLine = document.querySelector('.time__line')
const grade = document.querySelector('.congratulations__title h4 p')
const total = document.querySelector('.congratulations__title h4 span')

const rull = document.querySelector('.rulles')
const quiz = document.querySelector('.quiz')
const congratulations = document.querySelector('.congratulations')

// add event for start quiz
startQuiz.addEventListener('click', e => {
    rull.classList.add('active')
    startQuiz.classList.add('unshow')
})

// add event for rull of quiz
rull.addEventListener('click', e => {
    // check target
    exitQuiz.forEach(item => {
        if(e.target === item) {
            rull.classList.remove('active')
            startQuiz.classList.remove('unshow')
        }
    })
    // check target
    if(e.target === continueQuiz) {
        rull.classList.remove('active')
        quiz.classList.add('active')
        showQuiz(0);
        quizCounter(1)
        clearInterval(0)
        startTime(15)
        startTimeLine(0)
    }
})

// create variable for use in calculate
let current = 0;
let counter;
let counterLine;
let timeValue = 15;
let lineValue = 0;
let gradeValue = 0;
let totalQuestions = questions.length;

// create variable for move quiz
let nextBtn = document.querySelector('.next-quiz')

// add event for move quiz
nextBtn.addEventListener('click', () => {
    if(current < questions.length - 1) {
        current++
        showQuiz(current)
        quizCounter(1)
        clearInterval(counter)
        startTime(timeValue)
        clearInterval(counterLine)
        startTimeLine(lineValue)
    }   else {
        quiz.classList.remove('active')
        congratulations.classList.add('active')
        result()
    }
    // unshow button
    nextBtn.style.display = 'none'
})

// create icon, true / false
let correctIcon =  `<div class="quiz__content__questions__item__icon true"><i class="fa-solid fa-check icon"></i></div>`
let crossIcon = `<div class="quiz__content__questions__item__icon false"><i class="fa-solid fa-xmark"></i></div>`

// create function for show quiz
function showQuiz (index) {
    const quizText = document.querySelector('.quiz__content__title')
    const quizQuest = document.querySelector('.quiz__content__questions')
    // create main tag
    let liTag = `
    <li class="quiz__content__questions__item">
        ${questions[index].options[0]}
    </div>
    </li>
    <li class="quiz__content__questions__item">
        ${questions[index].options[1]}
    </li>
    <li class="quiz__content__questions__item">
        ${questions[index].options[2]}
    </li>`
    // create tag for title quiz
    const textTag = `<span>${questions[index].question}</span>`
    // past element
    quizText.innerHTML = textTag
    quizQuest.innerHTML = liTag
    // create variable for all quest
    const options = optionsList.querySelectorAll('.quiz__content__questions__item')

    // loop through the element and add the click event attribute
    for(let i = 0; i < options.length; i++) {
        options[i].setAttribute("onclick", "optionsSelect(this)");
    }
}

// сreate function for check correct or incorrect answer
function optionsSelect (a) {
    // clear interval when click answer
    clearInterval(counterLine)
    clearInterval(counter)
    // create variable for user answer
    let userAns = a.textContent.trim()
    // create variable for correct answer
    let correctAns = questions[current].answer
    let allOptions = optionsList.children.length

    // check whether the user's answer matches the correct one

    if(userAns == correctAns) {
        // do if matches
        a.classList.add('correct')
        a.insertAdjacentHTML('beforeend', correctIcon)
        gradeValue++
    }   else {
        // do if dont matches
        a.classList.add('incorrect')
        a.insertAdjacentHTML('beforeend', crossIcon)

        // show correct answer if user answer incorrect
        for(let i = 0; i < allOptions; i++) {
            if(optionsList.children[i].textContent.trim() == correctAns.trim()) {
                optionsList.children[i].setAttribute('class', 'correct quiz__content__questions__item')
                optionsList.children[i].insertAdjacentHTML('beforeend', correctIcon)
            }
        }
    }

    // once try
    for(let i = 0; i < allOptions; i++) {
        optionsList.children[i].classList.add('disabled')
    }
    // show button for next quiz
    nextBtn.style.display = 'block'
}

// create a function for viewing on which question
function quizCounter (index) {
    let quizCounter = document.querySelector('.quiz__footer__counter')
    let counterTag = `<span>${current + index} of ${totalQuestions} question</span>`

    quizCounter.innerHTML = counterTag
}

// create function for start timer
function startTime (time) {
    counter = setInterval(timer, 1000)

    function timer() {
        timeSec.textContent = time;
        time--
        if(time < 9) {
            let addZero = timeSec.textContent
            timeSec.textContent = `0${addZero}`
        }
        if(time < 0) {
            clearInterval(counter)
        }
    }
}

// create function for start time line
function startTimeLine (time) {
    counterLine = setInterval(timer, 23)

    function timer() {
        time += 1
        timeLine.style.width = `${time}px`
        if(time > 700) {
            clearInterval(counterLine)
        }

        // show correct answer if time stop
        if(time == 699) {
            for(let i = 0; i < optionsList.children.length; i++) {
                if(optionsList.children[i].textContent.trim() == questions[current].answer.trim()) {
                    optionsList.children[i].setAttribute('class', 'correct quiz__content__questions__item')
                    optionsList.children[i].insertAdjacentHTML('beforeend', correctIcon)
                }
            }
            // block answer
            for(let i = 0; i < optionsList.children.length; i++) {
                optionsList.children[i].classList.add('disabled')
            }
            // show button for next quiz
            nextBtn.style.display = 'block'
        }
    }
}

// create function for show result quiz
function result () {
    grade.textContent = gradeValue
    total.textContent = totalQuestions
    // reset the value to zero
    gradeValue = 0
    timeValue = 15
    lineValue = 0;

    // add event for exit quiz
    exitQuiz.forEach(item => {
        item.addEventListener('click', () => {
            congratulations.classList.remove('active')
            startQuiz.classList.remove('unshow')
        current = 0;
        })  
    })
    // add event for replay quiz
    replayQuiz.addEventListener('click', () => {
        congratulations.classList.remove('active')
        continueQuiz.click()
        current = 0;
    })
}

