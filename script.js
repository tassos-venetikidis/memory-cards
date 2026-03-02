const clearBtn = document.getElementById("clear");
const showOverlayBtn = document.getElementById("show");
const cardsContainer = document.getElementById("cards-container");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const current = document.getElementById("current");
const addContainer = document.getElementById("add-container");
const hideOverlayBtn = document.getElementById("hide");
const question = document.getElementById("question");
const answer = document.getElementById("answer");
const addBtn = document.getElementById("add-card");

function saveCard() {
  const card = {
    question: question.value,
    answer: answer.value,
  };
  cardsArray.push(card);
  localStorage.setItem("cards", JSON.stringify(cardsArray));
  currentCard = cardsArray.length;
  loadCards();
}

function createCard(cardObj) {
  const card = document.createElement("div");
  card.classList.add("card");
  card.innerHTML = `
          <div class="inner-card">
            <div class="inner-card-front">
              <p>Question:<br><br>${cardObj.question}</p>
            </div>
            <div class="inner-card-back">
              <p>Answer:<br><br>${cardObj.answer}</p>
            </div>
          </div>
  `;
  cardsContainer.append(card);
}

function loadCards() {
  if (!cardsArray || cardsArray.length === 0) return (cardsArray = []);
  cardsContainer.innerHTML = "";
  for (const card of cardsArray) {
    createCard(card);
  }
  document.querySelector(".card").classList.add("active");
  totalCards = cardsArray.length;
  currentCard = 1;
  current.textContent = `${currentCard} / ${totalCards}`;
}

function displayNextCard() {
  document.querySelectorAll(".card").forEach((card, idx) => {
    if (card.classList.contains("active")) {
      card.classList.remove("active");
      card.classList.add("left");
    }
    if (idx + 1 === currentCard) {
      card.classList.add("active");
    }
  });
  current.textContent = `${currentCard} / ${totalCards}`;
}

function displayPreviousCard() {
  document.querySelectorAll(".card").forEach((card, idx) => {
    if (idx + 1 === currentCard) {
      card.classList.remove("left");
      card.classList.add("active");
    } else if (card.classList.contains("active") && idx + 1 !== currentCard) {
      card.classList.remove("active");
    }
  });
  current.textContent = `${currentCard} / ${totalCards}`;
}

// Event Listeners

showOverlayBtn.addEventListener("click", () => {
  addContainer.classList.add("show");
});

hideOverlayBtn.addEventListener("click", () =>
  addContainer.classList.remove("show"),
);

addBtn.addEventListener("click", () => {
  if (!question.value.trim() || !answer.value.trim())
    return alert("You need to enter both a question and an answer!");
  saveCard();
  question.value = "";
  answer.value = "";
  addContainer.classList.remove("show");
});

prevBtn.addEventListener("click", () => {
  if (currentCard === 1) return;
  currentCard--;
  displayPreviousCard();
});

nextBtn.addEventListener("click", () => {
  if (currentCard === cardsArray.length) return;
  currentCard++;
  displayNextCard();
});

clearBtn.addEventListener("click", () => {
  cardsArray = [];
  totalCards = undefined;
  currentCard = undefined;
  localStorage.setItem("cards", JSON.stringify(cardsArray));
  cardsContainer.innerHTML = "";
  current.textContent = "";
});

cardsContainer.addEventListener("click", (e) => {
  e.target.closest(".card.active")?.classList.toggle("show-answer");
});

let cardsArray = JSON.parse(localStorage.getItem("cards"));
let currentCard;
let totalCards;

loadCards();
