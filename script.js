const chatContainer = document.getElementById('chat-container');
const chatForm = document.getElementById('chat-form');
const userInput = document.getElementById('user-input');

const questions = [
  "👋 Welcome! I'm ChatAura 🤖 Let's begin your registration.\nWhat's your first name?",
  "✨ Awesome! What's your last name?",
  "📧 Could you share your email? I promise no spam, only elegance.",
  "🔐 Now set a strong password (letters & numbers, 6+ chars).",
  "🧐 Confirm that password, please."
];

let answers = [];
let currentStep = 0;

function showTyping() {
  const typing = document.createElement('div');
  typing.className = 'message bot typing';
  typing.textContent = "ChatAura is typing...";
  chatContainer.appendChild(typing);
  chatContainer.scrollTop = chatContainer.scrollHeight;
  return typing;
}

function addMessage(text, sender = 'bot') {
  const msg = document.createElement('div');
  msg.className = `message ${sender}`;
  msg.textContent = text;
  chatContainer.appendChild(msg);
  chatContainer.scrollTop = chatContainer.scrollHeight;
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isStrongPassword(pwd) {
  return pwd.length >= 6 && /[a-zA-Z]/.test(pwd) && /\d/.test(pwd);
}

function askNextQuestion() {
  if (currentStep < questions.length) {
    const typing = showTyping();
    setTimeout(() => {
      typing.remove();
      addMessage(questions[currentStep]);
    }, 1000);
  } else {
    const typing = showTyping();
    setTimeout(() => {
      typing.remove();
      addMessage(`🎉 All done, ${answers[0]}! Redirecting you to elegance... 🚀`);
    }, 1000);
    setTimeout(() => {
      window.location.href = "https://comfy-panda-e698d4.netlify.app";
    }, 3000);
  }
}

chatForm.addEventListener('submit', function (e) {
  e.preventDefault();
  const input = userInput.value.trim();
  if (!input) return;

  addMessage(input, 'user');
  userInput.value = '';

  if (currentStep === 2 && !isValidEmail(input)) {
    setTimeout(() => addMessage("❗ Hmm... that doesn’t seem like a valid email."), 700);
    return;
  }

  if (currentStep === 3 && !isStrongPassword(input)) {
    setTimeout(() => addMessage("❗ Password must be 6+ chars, with letters & numbers."), 700);
    return;
  }

  if (currentStep === 4 && input !== answers[3]) {
    currentStep = 3;
    setTimeout(() => addMessage("❗ Oops! Passwords don’t match. Try again."), 700);
    return;
  }

  answers[currentStep] = input;
  currentStep++;
  askNextQuestion();
});

// Start chat
askNextQuestion();

// Theme Toggle
function toggleTheme() {
  document.body.classList.toggle('light');
  const icon = document.getElementById('theme-icon');
  icon.textContent = document.body.classList.contains('light') ? '☀️' : '🌙';
}
