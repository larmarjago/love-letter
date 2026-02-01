// 1. Initialize EmailJS
(function () {
  // REPLACE WITH YOUR ACTUAL PUBLIC KEY (e.g., "user_xyz...")
  emailjs.init("AABxan_w6h82xA5rs");
})();

// 2. Handle Overlay & Audio
const overlay = document.getElementById("overlay");
const audio = document.getElementById("voice-note");
const video = document.getElementById("main-video");

if (video) {
  video.play().catch((error) => {
    console.log("Video play failed: ", error);
  });
}

// Only add event listener if elements exist (prevents errors)
if (overlay && audio) {
  overlay.addEventListener("click", () => {
    // Fade out overlay
    overlay.style.opacity = "0";
    setTimeout(() => {
      overlay.style.display = "none";
    }, 500); 

    // Play Audio
    audio.play().catch((error) => {
      console.log("Audio play failed: ", error);
    });
  });
}

// Toggle audio if she clicks the text
function toggleAudio() {
  if (audio.paused) {
    audio.play();
  } else {
    audio.pause();
  }
}

// 3. Make "No" button run away
function moveButton() {
  const noBtn = document.getElementById("no-btn");
  const x = Math.random() * (window.innerWidth - noBtn.offsetWidth);
  const y = Math.random() * (window.innerHeight - noBtn.offsetHeight);

  noBtn.style.position = "fixed";
  noBtn.style.left = `${x}px`;
  noBtn.style.top = `${y}px`;
}

// 4. Function when she says YES
function acceptLove() {
  const yesBtn = document.getElementById("yes-btn");
  const noBtn = document.getElementById("no-btn");
  const title = document.getElementById("question");
  const img = document.getElementById("main-image");
  const loading = document.getElementById("loading");
  const musicControl = document.querySelector(".music-control");

  // Hide music control if it exists
  if (musicControl) musicControl.style.display = "none";

  // UI Changes
  yesBtn.style.display = "none";
  noBtn.style.display = "none";
  loading.style.display = "block";

  // Change text and image
  title.innerText = "YAY! I love you! ❤️";
  img.src = "https://media.giphy.com/media/T86i6yDyOYz7J6dPhf/giphy.gif";

  // Confetti
  confetti({
    particleCount: 150,
    spread: 70,
    origin: { y: 0.6 },
  });

  // *** WRITE YOUR LETTER HERE ***
  // Use backticks (`) so you can write on multiple lines
  const myLoveLetter = `
    My Dearest Valentine,

    I am so happy you said yes! You make every day brighter just by being in it.
    
    I promise to always be there for you, to make you laugh, and to cherish every moment we share.
    
    This is just the beginning of our beautiful story.

    I love you more than words can say.
  `;

  // Send Email
  var templateParams = {
    to_email: "obiblessingchinonye@gmail.com", // Put her email here
    love_message: myLoveLetter, // This sends the letter above
  };

  // REPLACE 'YOUR_SERVICE_ID' AND 'YOUR_TEMPLATE_ID'
  emailjs.send("service_w3k2hks", "template_bxcto45", templateParams).then(
    function (response) {
      console.log("SUCCESS!", response.status, response.text);
      loading.innerHTML =
        "<p>I just sent a love letter to your inbox... go read it! 💌</p>";

      setInterval(() => {
        confetti({ particleCount: 50, spread: 60, origin: { y: 0.6 } });
      }, 2000);
    },
    function (error) {
      console.log("FAILED...", error);
      loading.innerHTML =
        "<p>Oops! I tried to email you a letter but it failed. But know that I love you! (Check console for error)</p>";
    },
  );
}

// 5. Floating Hearts
function createHearts() {
  const heartsContainer = document.querySelector(".hearts");
  // Check if container exists to prevent errors
  if (!heartsContainer) return;

  for (let i = 0; i < 20; i++) {
    const heart = document.createElement("div");
    heart.classList.add("heart");
    heart.style.left = Math.random() * 100 + "vw";
    heart.style.width = Math.random() * 30 + 20 + "px";
    heart.style.height = heart.style.width;
    heart.style.animationDuration = Math.random() * 5 + 5 + "s";
    heart.style.backgroundColor = `rgba(255, ${Math.random() * 100 + 100}, ${Math.random() * 100 + 100}, 0.6)`;
    heartsContainer.appendChild(heart);
  }
}
createHearts();
