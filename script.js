const profileTab = document.getElementById("profile-tab");
const quizTab = document.getElementById("quiz-tab");

const profileSection = document.getElementById("profile-section");
const quizSection = document.getElementById("quiz-section");

profileTab.addEventListener("click", () => {
  profileSection.classList.remove("hidden");
  quizSection.classList.add("hidden");
});

quizTab.addEventListener("click", () => {
  profileSection.classList.add("hidden");
  quizSection.classList.remove("hidden");
})