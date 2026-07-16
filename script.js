const quizData = [
  {
        question: "たいやき丸の出身地は？",
        choices: [
            "たいやき村",
            "たいやき王国",
            "たいやき星"
        ],
        answer: 2
    },

    {
        question: "好きな食べ物は？",
        choices: [
            "たいやき",
            "ジネンジョ",
            "ぶどう"
        ],
        answer: 2
    },

    {
        question: "趣味は？",
        choices: [
            "絵を描く",
            "絵を見る",
            "絵を食べる"
        ],
        answer: 0
    },

    {
        question: "好きなゲームは？",
        choices: [
            "RPG",
            "パズル",
            "アクション"
        ],
        answer: 2
    },

    {
        question: "好きな楽器は？",
        choices: [
            "カスタネット",
            "ピアノ",
            "ギター"
        ],
        answer: 1
    }
];

let selectedQuestions = [];
let score = 0;
let currentQuestion = 0;
let answered = false;

function selectQuestions() {
  const shuffled = [...quizData].sort(() => Math.random() - 0.5);
  selectedQuestions = shuffled.slice(0, 3);
  
  console.log(selectedQuestions);
}

const profileTab = document.getElementById("profile-tab");
const quizTab = document.getElementById("quiz-tab");

const profileSection = document.getElementById("profile-section");
const quizSection = document.getElementById("quiz-section");

const submitButton = document.getElementById("submit-button");
const result = document.getElementById("result");
const answerResult = document.getElementById("answer-result");

profileTab.addEventListener("click", () => {
  profileSection.classList.remove("hidden");
  quizSection.classList.add("hidden");
});

quizTab.addEventListener("click", () => {
  profileSection.classList.add("hidden");
  quizSection.classList.remove("hidden");

  selectQuestions();
  currentQuestion = 0;
  score = 0;

  displayQuestion();
})

submitButton.addEventListener("click", () => {
  if (answered === false) {
    checkAnswer();
  } else {
    nextQuestion();
  }
})

function displayQuestion() {
  const quizContainer = document.getElementById("quiz-container");
  quizContainer.innerHTML = "";
  const quiz = selectedQuestions[currentQuestion];

    quizContainer.innerHTML = `
        <h3>${currentQuestion + 1}. ${quiz.question}</h3>

        ${quiz.choices.map((choice, choiceIndex) => `
            <label>
                <input 
                    type="radio" 
                    name="answer" 
                    value="${choiceIndex}">
                ${choice}
            </label>
            <br>
        `).join("")}
    `;
}

function checkAnswer() {

    const selected = document.querySelector(
        'input[name="answer"]:checked'
    );

    if (!selected) {
        alert("答えを選んでください！");
        return;
    }


    const quiz = selectedQuestions[currentQuestion];


    if (Number(selected.value) === quiz.answer) {

    score++;

    answerResult.innerHTML = `
        <p>正解！</p>
    `;

} else {

    answerResult.innerHTML = `
        <p>ざんねん</p>
        <p>正解は「${quiz.choices[quiz.answer]}」です</p>
    `;

}


    answered = true;

    submitButton.textContent = "次へ";

}

function nextQuestion() {

    currentQuestion++;

    if (currentQuestion < selectedQuestions.length) {

        answered = false;

        answerResult.textContent = "";

        submitButton.textContent = "回答する";

        displayQuestion();

    } else {

        showResult();

    }

}

function checkAnswers() {
  store = 0;
  selectedQuestions.forEach((quiz, index) => {
    const selected = document.querySelector(
      `input[name="question${index}"]:checked`
    );
    if (selected && Number(selected.value) === quiz.answer) {
      score++;
    }
  })
  showResult();
}

function showResult() {

    const percentage = Math.round(
        (score / selectedQuestions.length) * 100
    );

    const quizContainer = document.getElementById("quiz-container");

    answerResult.textContent = "";

    quizContainer.innerHTML = `
        <h3>結果発表！</h3>
        <p>${selectedQuestions.length}問中 ${score}問正解！</p>
        <p>正答率 ${percentage}%</p>
    `;

    submitButton.style.display = "none";

}