document.addEventListener("DOMContentLoaded", () => {

    // ==========================
    // STATE
    // ==========================

    const state = {
        noCount: 0
    };

    // ==========================
    // ELEMENTS
    // ==========================

    const bgMusic = document.getElementById("bgMusic");
    const musicToggle = document.getElementById("musicToggle");

    const screen1 = document.getElementById("screen1");
    const screen2 = document.getElementById("screen2");
    const screen3 = document.getElementById("screen3");

    const yesBtn = document.getElementById("yesBtn");
    const noBtn = document.getElementById("noBtn");
    const dialogue = document.getElementById("dialogue");

    const yesBtn2 = document.getElementById("yesBtn2");
    const noBtn2 = document.getElementById("noBtn2");

    const openLetterBtn = document.getElementById("openLetterBtn");
    const letterModal = document.getElementById("letterModal");
    const closeLetter = document.getElementById("closeLetter");

    const heartsContainer = document.getElementById("heartsContainer");

    // ==========================
    // SCREEN SWITCH
    // ==========================

    function switchScreen(from, to) {
        from.classList.remove("active");
        setTimeout(() => {
            to.classList.add("active");
        }, 300);
    }

    // ==========================
    // SCREEN 1
    // ==========================

    const noDialogues = [
        "Are you sure? 😢",
        "Why would you say nooo? 💔",
        "Think again... this could be important 😏",
        "O bhaisab karo na yess 😭",
        "Last chance… don't break my tiny heart 🥺"
    ];

    function handleNoClick() {
        state.noCount++;

        yesBtn.style.padding =
            `${12 + state.noCount * 5}px ${30 + state.noCount * 10}px`;

        yesBtn.style.fontSize =
            `${16 + state.noCount * 2}px`;

        const index = Math.min(
            state.noCount - 1,
            noDialogues.length - 1
        );

        dialogue.innerHTML = noDialogues[index];
    }

    function handleYesClick() {
        switchScreen(screen1, screen2);
    }

    // ==========================
    // SCREEN 2
    // ==========================

    function moveNoButton() {
        const container = screen2.getBoundingClientRect();
        const btnRect = noBtn2.getBoundingClientRect();

        const maxX = container.width - btnRect.width - 40;
        const maxY = container.height - btnRect.height - 40;

        const randomX = Math.random() * maxX;
        const randomY = Math.random() * maxY;

        noBtn2.style.position = "absolute";
        noBtn2.style.left = `${randomX}px`;
        noBtn2.style.top = `${randomY}px`;
    }

    function handleYesClick2() {
        launchConfetti();

        if (bgMusic) {
            bgMusic.loop = true;
            bgMusic.play().catch(() => {});
        }

        switchScreen(screen2, screen3);
    }

    // ==========================
    // CONFETTI
    // ==========================

function launchConfetti() {

    const colors = ["#ff4d6d", "#ff758c", "#ffd6e0", "#ffb3c6", "#ffffff"];

    for (let i = 0; i < 120; i++) {

        const confetti = document.createElement("div");

        confetti.style.position = "fixed";
        confetti.style.width = "8px";
        confetti.style.height = "14px";
        confetti.style.backgroundColor =
            colors[Math.floor(Math.random() * colors.length)];

        confetti.style.top = "-20px";
        confetti.style.left = Math.random() * 100 + "vw";

        confetti.style.opacity = Math.random();

        confetti.style.transform =
            `rotate(${Math.random() * 360}deg)`;

        confetti.style.animation =
            `confettiFall ${2 + Math.random() * 2}s linear forwards`;

        confetti.style.zIndex = 999;

        document.body.appendChild(confetti);

        setTimeout(() => confetti.remove(), 4000);
    }
}

    // ==========================
    // FLOATING HEARTS
    // ==========================

    function createHeart() {
        const heart = document.createElement("div");
        heart.classList.add("heart");
        heart.innerHTML = "💖";

        heart.style.left = Math.random() * 100 + "vw";
        heart.style.animationDuration = 4 + Math.random() * 3 + "s";
        heart.style.fontSize = 15 + Math.random() * 20 + "px";

        heartsContainer.appendChild(heart);
        setTimeout(() => heart.remove(), 7000);
    }

    setInterval(createHeart, 400);

    // ==========================
    // LETTER MODAL
    // ==========================

    openLetterBtn.addEventListener("click", () => {
        letterModal.classList.add("active");
    });

    closeLetter.addEventListener("click", () => {
        letterModal.classList.remove("active");
    });

    // ==========================
    // MUSIC TOGGLE
    // ==========================

    let isPlaying = false;

    musicToggle.addEventListener("click", () => {
        if (!bgMusic) return;

        if (isPlaying) {
            bgMusic.pause();
            musicToggle.innerHTML = "🔇 Music Off";
        } else {
            bgMusic.play().catch(() => {});
            musicToggle.innerHTML = "🔊 Music On";
        }

        isPlaying = !isPlaying;
    });

    // ==========================
    // EVENTS
    // ==========================

    yesBtn.addEventListener("click", handleYesClick);
    noBtn.addEventListener("click", handleNoClick);

    noBtn2.addEventListener("mouseenter", moveNoButton);
    noBtn2.addEventListener("click", moveNoButton);

    yesBtn2.addEventListener("click", handleYesClick2);

});
