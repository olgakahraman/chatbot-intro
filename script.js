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
  'Awesome! Now, tell me a city to check the weather!',
];

const weatherEmoji = {
  clear: '☀️',
  clouds: '☁️',
  rain: '🌧️',
  snow: '❄️',
};

startBtn.addEventListener('click', async () => {
  chatBox.innerHTML = '';
  currentStep = 0;
  await assistantSay(steps[currentStep]);
  inputWrapper.classList.remove('hidden');
  userInput.focus();
});

sendBtn.addEventListener('click', handleUserMessage);
userInput.addEventListener('keydown', e => {
  if (e.key === 'Enter') handleUserMessage();
});

async function fetchWeather(city) {
  const API_KEY = 'API_KEY';
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error('City not found');
    const data = await response.json();
    const weatherType = data.weather[0].main.toLowerCase();
    const emoji = weatherEmoji[weatherType] || '🌈';
    console.log(data);
    return `${emoji} Weather in ${data.name}: ${Math.round(data.main.temp)}℃, ${
      data.weather[0].description
    }`;
  } catch (error) {
    return `❌ Error: ${error.message} Please try another city`;
  }
}

async function handleUserMessage() {
  const input = userInput.value.trim();
  if (!input) return;

  appendMessage(`You: ${input}`);
  userInput.value = '';

  if (currentStep === 3) {
    appendMessage('Bot: Checking weather...⏳');
    const weather = await fetchWeather(input);
    appendMessage(`Bot:${weather}`);
    inputWrapper.classList.add('hidden');
  }

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
      appendMessage(`Bot:${message}`);
      resolve();
    }, 1000);
  });
}

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
