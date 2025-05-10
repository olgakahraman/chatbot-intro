const startBtn = document.getElementById('start-chat');
const chatBox = document.getElementById('chat-box');
const inputWrapper = document.getElementById('input-wrapper');
const userInput = document.getElementById('user-input');
const sendBtn = document.getElementById('send-btn');

let currentStep = 0;

const steps = [
  'Hi! Need help getting started?',
  "Step 1: What's your goal?",
  'Great! What do you already know?',
  "Awesome! Let's plan your next step!",
];

startBtn.addEventListener('click', async () => {
  chatBox.innerHTML = '';
  currentStep = 0;
  await assistantSay(steps[currentStep]);
  inputWrapper.classList.remove('hidden');
  userInput.focus();
});

sendBtn.addEventListener('click', handleUserMessage);
userInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') handleUserMessage();
});

async function handleUserMessage() {
  const input = userInput.value.trim();
  if (!input) return;

  appendMessage(`You: ${input}`);
  userInput.value = '';

  currentStep++;
  if (currentStep < steps.length) {
    await delay(1000);
    await assistantSay(steps[currentStep]);
  } else {
    await delay(800);
    await assistantSay('You are ready to go! Good luck!');
    inputWrapper.classList.add('hidden');
  }
}

function appendMessage(text) {
  const p = document.createElement('p');
  p.textContent = text;
  chatBox.appendChild(p);
  chatBox.ScrollTop = chatBox.scrollHeight;
}

async function assistantSay(message) {
  return new Promise(resolve => {
    setTimeout(() => {
      appendMessage(message);
      resolve();
    }, 1000);
  });
}

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
