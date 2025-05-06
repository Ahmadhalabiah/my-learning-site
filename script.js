const lettersData = [
  { letter: 'أ', name: 'alif', example: 'أَسَدٌ', image: 'lion.jpg' },
  { letter: 'ب', name: 'ba', example: 'بَطَّةٌ', image: 'duck.jpg' },
  { letter: 'ت', name: 'taa', example: 'تُفَّاحَةٌ', image: 'apple.jpg' },
  { letter: 'ث', name: 'tha', example: 'ثَعْلَبٌ', image: 'fox.jpg' },
  { letter: 'ج', name: 'jeem', example: 'جَمَلٌ', image: 'camel.jpg' },
  { letter: 'ح', name: 'haa', example: 'حِصَانٌ', image: 'horse.jpg' },
  { letter: 'خ', name: 'khaa', example: 'خَرُوفٌ', image: 'sheep.jpg' },
  { letter: 'د', name: 'dal', example: 'دُلْفِينٌ', image: 'dolphin.jpg' },
  { letter: 'ذ', name: 'dhal', example: 'ذِئْبٌ', image: 'wolf.jpg' },
  { letter: 'ر', name: 'raa', example: 'رُمَّانٌ', image: 'pomegranate.jpg' },
  { letter: 'ز', name: 'zeen', example: 'زَرَافَةٌ', image: 'giraffe.jpg' },
  { letter: 'س', name: 'seen', example: 'سُلَحْفَاةٌ', image: 'turtle.jpg' },
  { letter: 'ش', name: 'sheen', example: 'شَجَرَةٌ', image: 'tree.jpg' },
  { letter: 'ص', name: 'saad', example: 'صَقْرٌ', image: 'hawk.jpg' },
  { letter: 'ض', name: 'dhaad', example: 'ضِفْدَعٌ', image: 'frog.jpg' },
  { letter: 'ط', name: 'toa', example: 'طَاوُوسٌ', image: 'peacock.jpg' },
  { letter: 'ظ', name: 'dhaa', example: 'ظَبْيٌ', image: 'antelope.jpg' },
  { letter: 'ع', name: 'ain', example: 'عُصْفُورٌ', image: 'bird.jpg' },
  { letter: 'غ', name: 'ghain', example: 'غَزَالٌ', image: 'gazelle.jpeg' },
  { letter: 'ف', name: 'faa', example: 'فِيلٌ', image: 'elephant.jpg' },
  { letter: 'ق', name: 'qaaf', example: 'قِرْدٌ', image: 'monkey.jpg' },
  { letter: 'ك', name: 'kaaf', example: 'كَلْبٌ', image: 'dog.jpg' },
  { letter: 'ل', name: 'laam', example: 'لَبْوَةٌ', image: 'lioness.jpg' },
  { letter: 'م', name: 'meem', example: 'نَمِرٌ', image: 'tiger.jpg' },
  { letter: 'ن', name: 'noon', example: 'نَحْلَةٌ', image: 'bee.jpg' },
  { letter: 'هـ', name: 'ha', example: 'هُدْهُدٌ', image: 'hudhud.jpg' },
  { letter: 'و', name: 'waw', example: 'وَرْدَةٌ', image: 'flower.jpg' },
  { letter: 'ي', name: 'yaa', example: 'يَمَامَةٌ', image: 'dove.jpg' }
];

const lettersContainer = document.getElementById('letters');
const popup = document.getElementById('popup');
const overlay = document.getElementById('overlay');
const popupLetter = document.getElementById('popup-letter');
const popupExample = document.getElementById('popup-example');

let currentAudio;
let currentExample;

lettersData.forEach(item => {
  const box = document.createElement('div');
  box.className = 'letter-box';
  const img = document.createElement('img');
  img.src = `images/${item.image}`;
  img.alt = item.letter;
  box.appendChild(img);
  box.onclick = () => showPopup(item);
  lettersContainer.appendChild(box);
});

function showPopup({ letter, name, example }) {
  popupLetter.textContent = letter;
  popupExample.innerHTML = highlightLetterInExample(letter, example);
  popup.style.display = 'block';
  overlay.style.display = 'block';

  currentAudio = new Audio(`audio/${name}.mp3`);
  currentExample = example;

  currentAudio.play();
  currentAudio.onended = () => speak(example);
}

function highlightLetterInExample(letter, word) {
  // highlight all occurrences of the letter in red
  const highlighted = word.replaceAll(letter, `<span class="highlight-letter">${letter}</span>`);
  return highlighted;
}

function closePopup() {
  popup.style.display = 'none';
  overlay.style.display = 'none';
  if (currentAudio) currentAudio.pause();
}

function repeatAudio() {
  if (currentAudio) {
    currentAudio.currentTime = 0;
    currentAudio.play();
    currentAudio.onended = () => speak(currentExample);
  }
}

function speak(text) {
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'ar-SA';
  utterance.rate = 0.9;
  speechSynthesis.speak(utterance);
}
