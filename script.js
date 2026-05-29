const noBtn = document.getElementById("noBtn");
const yesBtn = document.getElementById("yesBtn");
const continueBtn = document.getElementById("continueBtn");
const questionBox = document.querySelector(".question-box");

let yesSize = 20;
let noClicks = 0;

const messages = [
  "No 😭",
  "Please 🥺",
  "Think Again 💔",
  "Please Say Yes 🌸",
  "Don't Do This 😭",
  "Pretty Please 💖",
  "Why Though 😭",
  "I'm Begging 😭",
  "Last Chance 😭"
];

function moveNoButton(){

  noClicks++;

  // RANDOM POSITION
  const x =
    Math.floor(Math.random() * 500) - 250;

  const y =
    Math.floor(Math.random() * 300) - 150;

  noBtn.style.left = `${x}px`;
  noBtn.style.top = `${y}px`;

  // YES BUTTON GETS BIGGER
  yesSize += 10;

  yesBtn.style.fontSize =
    `${yesSize}px`;

  yesBtn.style.padding =
    `${yesSize / 2}px ${yesSize / 2}px`;

  // CHANGE NO TEXT
  const randomMessage =
    messages[
      Math.floor(
        Math.random() * messages.length
      )
    ];

  noBtn.innerText = randomMessage;

  // SHRINK NO BUTTON
  let currentScale =
    1 - (noClicks * 0.08);

  if(currentScale < 0.1){
    currentScale = 0.1;
  }

  noBtn.style.transform =
    `scale(${currentScale})`;

  // DISAPPEAR
  if(noClicks >= 12){

    noBtn.style.display = "none";

    const text =
      document.createElement("h2");

    text.innerHTML =
      "😭 Fine... You Win 💖";

    text.style.color = "#9b59b6";

    document
      .querySelector(".question-box")
      .appendChild(text);
  }
}

noBtn.addEventListener(
  "mouseover",
  moveNoButton
);

noBtn.addEventListener(
  "click",
  moveNoButton
);

continueBtn.addEventListener(
  "click",
  () => {

    const girlName =
      document.getElementById("girlName").value;

    const place =
      document.getElementById("place").value;

    const datePick =
      document.getElementById("datePick").value;

    // VALIDATION
    if(
      girlName === "" ||
      place === "" ||
      datePick === ""
    ){

      alert(
        "Fill up muna everything 😭💖"
      );

      return;
    }

    // SHOW QUESTION BOX
    questionBox.classList.remove("hidden");
    continueBtn.style.display = "none";
  }
);

yesBtn.addEventListener(
  "click",
  () => {

    const girlName =
      document.getElementById("girlName").value;

    const place =
      document.getElementById("place").value;

    const datePick =
      document.getElementById("datePick").value;

    alert(
      "YAYYYY 💖 SEE YOU SOON 💖"
    );

    generatePDF(
      girlName,
      place,
      datePick
    );
  }
);

function generatePDF(
  girlName,
  place,
  datePick
){

  const { jsPDF } = window.jspdf;

  const doc = new jsPDF();

  // Add image
  const img = new Image();
  img.onload = function() {
    doc.addImage(img, 'PNG', 75, 10, 60, 60);

    doc.setFontSize(25);

    doc.text(
      "💖 Date Invitation 💖",
      20,
      90
    );

    doc.setFontSize(18);

    doc.text(
      `Hello Ms. ${girlName} 🌸`,
      20,
      130
    );

    doc.text(
      `Place: ${place}`,
      20,
      160
    );

    doc.text(
      `Preferred Date: ${datePick}`,
      20,
      190
    );

    doc.text(
      `Thank you ${girlName}`,
      20,
      220
    );

    doc.save(
      `${girlName}_Date_Invitation.pdf`
    );
  };
  img.src = 'assets/images/ms-nikki.png';
}

// LOADING SCREEN - Hide when all content is loaded
window.addEventListener('load', () => {
  const loadingScreen = document.getElementById('loadingScreen');
  setTimeout(() => {
    loadingScreen.classList.add('hidden');
  }, 1500);
});
