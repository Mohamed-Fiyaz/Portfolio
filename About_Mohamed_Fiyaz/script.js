document.getElementById("current-year").innerText = new Date().getFullYear();

const textArray = [
  "a programmer",
  "an iOS developer",
  "a web developer",
  "a software engineer",
];
let index = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 150;
let deleteSpeed = 100;
let pauseBeforeDelete = 1000;
let pauseAfterDelete = 500;

function type() {
  const text = textArray[index];
  const typingElement = document.querySelector(".typing-animation");

  // Typing or deleting logic
  if (isDeleting) {
    typingElement.textContent = text.substring(0, charIndex);
    charIndex--;
    if (charIndex < 0) {
      isDeleting = false;
      index = (index + 1) % textArray.length; // Move to the next text
      setTimeout(type, pauseAfterDelete); // Pause before typing next text
      return;
    }
    setTimeout(type, deleteSpeed); // Continue deleting
  } else {
    typingElement.textContent = text.substring(0, charIndex + 1); // +1 ensures last letter is typed normally
    charIndex++;
    if (charIndex === text.length) {
      setTimeout(() => {
        isDeleting = true;
        setTimeout(type, deleteSpeed); // Start deleting after pause
      }, pauseBeforeDelete); // Pause before starting to delete
    } else {
      setTimeout(type, typingSpeed); // Continue typing normally
    }
  }
}

type(); // Start typing animation

// Scroll animations
const sections = document.querySelectorAll(".section");
const skillRows = document.querySelectorAll(".skill-row");

const observerOptions = {
  root: null,
  rootMargin: "0px",
  threshold: 0.1, // Trigger when 10% of the section is visible
};

const observerCallback = (entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    }
  });
};

const observer = new IntersectionObserver(observerCallback, observerOptions);
sections.forEach((section) => {
  observer.observe(section);
});

skillRows.forEach((row) => {
  observer.observe(row); // Observe skill rows as well
});
