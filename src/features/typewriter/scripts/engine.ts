interface LetterObject {
  letter: string;
  x: number;
  y: number;
  color?: number;
  witeout?: boolean;
}

interface TypewriterText {
  typewriterX: number;
  typewriterY: number;
  letters: LetterObject[];
}
const TYPEWRITER_LETTER_WIDTH = 8;
const TYPEWRITER_LETTER_HEIGHT = 18;
const TYPEWRITER_LINE_HEIGHT = 16;
const TYPEWRITER_MARGIN_LEFT = 60;
const TYPEWRITER_MARGIN_RIGHT = 60;
const TYPEWRITER_PAPER_WIDTH = 794;
const TYPEWRITER_MAX_X = TYPEWRITER_PAPER_WIDTH - TYPEWRITER_MARGIN_RIGHT;

const ALLOWED_TYPEWRITER = 
  'abcdefghijklmnopqrstuvwxyz' +
  'ABCDEFGHIJKLMNOPQRSTUVWXYZ' +
  '0123456789' +
  '.,;:!?\'"()[]{}@#$%^&*-_=+/\\|<>~`' +
  ' ' +
  'ěščřžýáíéůúďťňĚŠČŘŽÝÁÍÉŮÚĎŤŇ';

let sounds: HTMLAudioElement[] = [];
let curSlide: HTMLElement | null = null;
let currentColor = 1;
let followCursorMode = false;

let typewriterX = TYPEWRITER_MARGIN_LEFT;
let typewriterY = 80;
let typewriterCursorX = TYPEWRITER_MARGIN_LEFT;
let typewriterCursorY = 80;
let typewriterPaperY = -80;
let typewriterPaperAngle = 0;

let typewriterTexts: TypewriterText[] = [];

let cheatMyLayout = true;
let cheatArrowKeys = true;
let cheatComputerBackspace = false;
let cheatMulticolor = false;

function initSounds(): void {
  const soundFiles = [
    '/assets/typewriter/sounds/key-down-1.mp3',
    '/assets/typewriter/sounds/key-down-2.mp3',
    '/assets/typewriter/sounds/key-down-new.mp3',
    '/assets/typewriter/sounds/key-up-new.mp3',
    '/assets/typewriter/sounds/key-down-non-printing.mp3',
    '/assets/typewriter/sounds/carriage-return.mp3',
    '/assets/typewriter/sounds/bell.mp3',
    '/assets/typewriter/sounds/line-up-down.mp3',
  ];

  sounds = soundFiles.map(src => {
    const audio = new Audio(src);
    audio.volume = 0.25;
    return audio;
  });
}

function playSound(id: string): void {
  let soundIndex = 0;

  switch (id) {
    case 'key-down':
      soundIndex = Math.random() < 0.5 ? 0 : Math.random() < 0.5 ? 1 : 2;
      break;
    case 'key-up':
      soundIndex = 3;
      break;
    case 'non-printing':
      soundIndex = 4;
      break;
    case 'carriage-return':
      soundIndex = 5;
      break;
    case 'bell':
      soundIndex = 6;
      break;
    case 'line-up-down':
      soundIndex = 7;
      break;
  }

  if (sounds[soundIndex]) {
    sounds[soundIndex].currentTime = 0;
    sounds[soundIndex].play().catch(() => {});
  }
}

function updateTypewriterCursor(slideEl: HTMLElement | null): void {
  if (!slideEl) return;

  const cursorEl = slideEl.querySelector('.typewriter-cursor') as HTMLElement;
  if (!cursorEl) return;

  const cursorY = typewriterY + TYPEWRITER_LINE_HEIGHT - 5;
  
  typewriterCursorX = typewriterX;
  typewriterCursorY = cursorY;

  cursorEl.style.transform = `translate(${typewriterX}px, ${cursorY}px)`;

  if (followCursorMode) {
    updateCursorFollow();
  }
}

function updateCursorFollow(): void {
  if (!curSlide || !followCursorMode) return;

  const presentation = document.querySelector('.presentation') as HTMLElement;
  const cursor = curSlide.querySelector('.typewriter-cursor') as HTMLElement;
  if (!presentation) return;

  const viewportHeight = window.innerHeight;
  const viewportWidth = window.innerWidth;
  
  const paper = curSlide.querySelector('.paper') as HTMLElement;
  if (!paper) return;
  
  const paperRect = paper.getBoundingClientRect();
  const cursorRect = cursor.getBoundingClientRect();
  const paperCenterX = paperRect.left + paperRect.width / 2;
  const paperCenterY = cursorRect.top - cursorRect.height / 2;
  
  const cursorAbsoluteX = paperCenterX + typewriterCursorX - (TYPEWRITER_PAPER_WIDTH / 2);
  
  const offsetX = viewportWidth / 2 - cursorAbsoluteX;
  const offsetY = viewportHeight - paperCenterY;

  presentation.style.transition = 'transform 0.8s cubic-bezier(0.25, 0.1, 0.25, 1)';
  presentation.style.transform = `translate(${offsetX}px, ${offsetY}px) scale(2.5)`;
}

function scrollToCursor(): void {
  followCursorMode = !followCursorMode;

  const presentation = document.querySelector('.presentation') as HTMLElement;
  if (!presentation) return;

  if (followCursorMode) {
    updateCursorFollow();
  } else {
    presentation.style.transition = 'transform 0.8s cubic-bezier(0.25, 0.1, 0.25, 1)';
    presentation.style.transform = 'translate(0, 0) scale(1)';
  }
}

function showVisualBell(text: string): void {
  const bellOuter = document.querySelector('.visual-bell-outer') as HTMLElement;
  if (!bellOuter) return;

  const bell = document.createElement('div');
  bell.className = 'visual-bell visible';
  bell.textContent = text;
  bellOuter.appendChild(bell);

  setTimeout(() => {
    bell.classList.remove('visible');
    bell.classList.add('invisible');
    setTimeout(() => bell.remove(), 500);
  }, 2000);
}

function getLetterElement(letterObject: LetterObject): HTMLElement {
  const el = document.createElement('div');
  el.className = 'letter';
  el.textContent = letterObject.letter;
  
  const cx = 0;
  const cy = 0;

  el.style.transform = `translate(${letterObject.x + cx}px, ${letterObject.y + cy}px)`;

  if (letterObject.color !== undefined && letterObject.color !== 1) {
    el.setAttribute('data-color', letterObject.color.toString());
  }

  if (letterObject.witeout) {
    el.setAttribute('data-witeout', 'true');
  }

  return el;
}

function updateTypewriterText(slideEl: HTMLElement | null, startFromScratch: boolean): void {
  if (!slideEl) return;

  const lettersEl = slideEl.querySelector('.letters-inner-inner') as HTMLElement;
  if (!lettersEl) return;

  if (startFromScratch) {
    lettersEl.innerHTML = '';
  }

  typewriterTexts.forEach(text => {
    text.letters.forEach(letterObj => {
      const letterEl = getLetterElement(letterObj);
      lettersEl.appendChild(letterEl);
    });
  });
}

function typeIntoTypewriter(event: KeyboardEvent): void {
  if (!curSlide) return;

  const key = event.key;
  const code = event.code;

  if (key === 'Escape') {
    event.preventDefault();
    scrollToCursor();
    return;
  }

  if (key === 'F1') {
    event.preventDefault();
    cheatMulticolor = !cheatMulticolor;
    if (cheatMulticolor) {
      currentColor = (currentColor % 5) + 1;
    } else {
      currentColor = 1;
    }
    return;
  }

  if (key === 'F10') {
    event.preventDefault();
    clearPage();
    return;
  }

  if (key === 'Enter') {
    event.preventDefault();
    playSound('carriage-return');
    typewriterX = TYPEWRITER_MARGIN_LEFT;
    typewriterY += TYPEWRITER_LINE_HEIGHT;
    // updateTypewriterCursor(curSlide);
    // if (followCursorMode) {
    //   updateCursorFollow();
    // }

    updateTypewriterCursor(curSlide);
    updateTypewriterCursor(curSlide);
    return;
  }

  if (cheatArrowKeys && (key === 'ArrowUp' || key === 'ArrowDown')) {
    event.preventDefault();
    const goingDown = key === 'ArrowDown';
    playSound('line-up-down');
    
    if (event.shiftKey) {
      typewriterY += goingDown ? (TYPEWRITER_LINE_HEIGHT / 3) : -(TYPEWRITER_LINE_HEIGHT / 3);
    } else {
      typewriterY += goingDown ? TYPEWRITER_LINE_HEIGHT : -TYPEWRITER_LINE_HEIGHT;
    }
    
    updateTypewriterCursor(curSlide);
    return;
  }

  if (cheatArrowKeys && (key === 'ArrowLeft' || key === 'ArrowRight')) {
    event.preventDefault();
    const goingRight = key === 'ArrowRight';
    playSound('non-printing');
    
    if (goingRight) {
      if (typewriterX + TYPEWRITER_LETTER_WIDTH <= TYPEWRITER_MAX_X) {
        typewriterX += TYPEWRITER_LETTER_WIDTH;
      } else {
        playSound('bell');
        showVisualBell('End of line reached');
      }
    } else {
      typewriterX = Math.max(TYPEWRITER_MARGIN_LEFT, typewriterX - TYPEWRITER_LETTER_WIDTH);
    }
    
    updateTypewriterCursor(curSlide);
    return;
  }

  if (key === 'Backspace') {
    event.preventDefault();
    
    if (event.shiftKey || cheatComputerBackspace) {
    } else {
      if (typewriterTexts.length > 0) {
        const lastSection = typewriterTexts[typewriterTexts.length - 1];
        if (lastSection.letters.length > 0) {
          lastSection.letters.pop();
          updateTypewriterText(curSlide, true);
        }
      }
    }
    
    typewriterX = Math.max(TYPEWRITER_MARGIN_LEFT, typewriterX - TYPEWRITER_LETTER_WIDTH);
    playSound('non-printing');
    updateTypewriterCursor(curSlide);
    return;
  }

  if ((event.ctrlKey || event.metaKey) && key === 'p') {
    event.preventDefault();
    window.print();
    return;
  }

  if (key.length === 1 && (cheatMyLayout || ALLOWED_TYPEWRITER.includes(key))) {
    event.preventDefault();
    
    if (typewriterX + TYPEWRITER_LETTER_WIDTH > TYPEWRITER_MAX_X) {
      playSound('bell');
      showVisualBell('End of line reached');
      return;
    }
    
    playSound('key-down');

    const letterObj: LetterObject = {
      letter: key,
      x: typewriterX,
      y: typewriterY,
      color: cheatMulticolor ? currentColor : 1,
    };

    if (typewriterTexts.length === 0) {
      typewriterTexts.push({
        typewriterX,
        typewriterY,
        letters: [],
      });
    }

    typewriterTexts[typewriterTexts.length - 1].letters.push(letterObj);

    typewriterX += TYPEWRITER_LETTER_WIDTH;

    updateTypewriterText(curSlide, true);
    updateTypewriterCursor(curSlide);

    document.body.classList.add('key-pressed');
  }
}

function typeIntoTypewriterUp(event: KeyboardEvent): void {
  const key = event.key;

  if (key.length === 1) {
    playSound('key-up');
    document.body.classList.remove('key-pressed');
  }
}

function clearPageValues(): void {
  typewriterX = TYPEWRITER_MARGIN_LEFT;
  typewriterY = 80;
  typewriterCursorX = TYPEWRITER_MARGIN_LEFT;
  typewriterPaperY = -typewriterY;
  typewriterPaperAngle = 0;
  typewriterTexts = [];
}

function clearPage(): void {
  if (!curSlide) return;

  clearPageValues();
  updateTypewriterText(curSlide, true);
  updateTypewriterCursor(curSlide);
}

function onKeyDown(event: KeyboardEvent): void {
  typeIntoTypewriter(event);
}

function onKeyUp(event: KeyboardEvent): void {
  typeIntoTypewriterUp(event);
}

export function initTypewriter(): void {
  curSlide = document.querySelector('.slide-typewriter');

  clearPageValues();
  updateTypewriterText(curSlide, true);
  updateTypewriterCursor(curSlide);

  initSounds();

  document.body.addEventListener('keydown', onKeyDown);
  document.body.addEventListener('keyup', onKeyUp);
}

export function destroyTypewriter(): void {
  document.body.removeEventListener('keydown', onKeyDown);
  document.body.removeEventListener('keyup', onKeyUp);
  
  if (followCursorMode) {
    scrollToCursor();
  }
}
