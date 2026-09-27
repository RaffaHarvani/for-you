/**
 * Special Confession Website for Maya
 * Logic & Interactions
 */

document.addEventListener('DOMContentLoaded', () => {
  // Correct PIN required (8 digits)
  const CORRECT_PIN = '11111111';
  let enteredPin = '';

  // DOM Elements
  const screens = {
    loading: document.getElementById('screen-loading'),
    pin: document.getElementById('screen-pin'),
    letter: document.getElementById('screen-letter'),
    question: document.getElementById('screen-question'),
    celebration: document.getElementById('screen-celebration'),
  };

  const loadingProgress = document.getElementById('loading-progress');
  const pinDots = document.querySelectorAll('.pin-dot');
  const pinMessage = document.getElementById('pin-message');
  const lockIcon = document.getElementById('lock-icon');
  const lockCircle = document.querySelector('.lock-circle');
  const hintBtn = document.getElementById('hint-btn');
  const hintDisplay = document.getElementById('hint-display');
  const deleteBtn = document.getElementById('delete-btn');
  const keypadBtns = document.querySelectorAll('.key-btn[data-key]');
  
  const letterNextBtn = document.getElementById('letter-next-btn');
  const letterDate = document.getElementById('letter-current-date');

  const questionCard = document.getElementById('question-card');
  const yesBtn = document.getElementById('yes-btn');
  const noBtn = document.getElementById('no-btn');
  const playfulMessage = document.getElementById('playful-message');

  const mayaMessageInput = document.getElementById('maya-message');
  const charCount = document.getElementById('char-count');
  const sendBtn = document.getElementById('send-btn');

  const modal = document.getElementById('custom-alert-modal');
  const modalUserText = document.getElementById('modal-user-text');
  const closeModalBtn = document.getElementById('close-modal-btn');
  const shareWaBtn = document.getElementById('share-wa-btn');

  const musicToggleBtn = document.getElementById('music-toggle-btn');
  const heartBgContainer = document.getElementById('heart-bg-container');

  // Format today's date in Indonesian style for the letter
  if (letterDate) {
    const now = new Date();
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    try {
      letterDate.textContent = now.toLocaleDateString('id-ID', options);
    } catch (e) {
      letterDate.textContent = 'Hari ini & Selamanya';
    }
  }

  /* ==========================================================
     1. SCREEN SWITCHER HELPER
     ========================================================== */
  function switchScreen(targetScreenName) {
    Object.keys(screens).forEach((name) => {
      const screen = screens[name];
      if (screen) {
        screen.classList.remove('active');
        screen.style.display = 'none';
      }
    });

    const targetScreen = screens[targetScreenName];
    if (targetScreen) {
      targetScreen.style.display = 'flex';
      // Slight delay for CSS animation trigger
      setTimeout(() => {
        targetScreen.classList.add('active');
      }, 30);
    }
  }

  /* ==========================================================
     2. FLOATING BACKGROUND HEARTS GENERATOR
     ========================================================== */
  const heartEmojis = ['💖', '💕', '💗', '🌸', '✨', '💐', '💌'];
  function createFloatingHeart() {
    if (!heartBgContainer) return;
    const heart = document.createElement('div');
    heart.classList.add('floating-heart');
    heart.innerText = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.fontSize = Math.floor(Math.random() * 18 + 14) + 'px';
    const duration = Math.random() * 4 + 6; // 6s - 10s
    heart.style.animationDuration = duration + 's';
    heart.style.animationDelay = Math.random() * 2 + 's';
    heartBgContainer.appendChild(heart);

    setTimeout(() => {
      heart.remove();
    }, (duration + 2) * 1000);
  }

  // Create initial hearts and continuous interval
  for (let i = 0; i < 12; i++) {
    setTimeout(createFloatingHeart, i * 400);
  }
  setInterval(createFloatingHeart, 900);

  /* ==========================================================
     3. SCREEN 1: 4-SECOND LOADING ANIMATION
     ========================================================== */
  function initLoadingScreen() {
    // Fill the progress bar smoothly over 4 seconds
    setTimeout(() => {
      if (loadingProgress) {
        loadingProgress.style.width = '100%';
      }
    }, 100);

    // After exactly 4 seconds (4000ms), transition to PIN screen
    setTimeout(() => {
      switchScreen('pin');
    }, 4000);
  }

  initLoadingScreen();

  /* ==========================================================
     4. SCREEN 2: PIN LOGIC (8 DIGITS: 12012009)
     ========================================================== */
  function updatePinDots() {
    pinDots.forEach((dot, index) => {
      if (index < enteredPin.length) {
        dot.classList.add('filled');
      } else {
        dot.classList.remove('filled');
      }
    });
  }

  function handlePinInput(digit) {
    if (enteredPin.length >= 8) return;
    
    enteredPin += digit;
    updatePinDots();
    pinMessage.textContent = '';
    playSoftBeep(440 + enteredPin.length * 40);

    if (enteredPin.length === 8) {
      validatePin();
    }
  }

  function deletePinDigit() {
    if (enteredPin.length > 0) {
      enteredPin = enteredPin.slice(0, -1);
      updatePinDots();
      pinMessage.textContent = '';
      playSoftBeep(320);
    }
  }

  function validatePin() {
    if (enteredPin === CORRECT_PIN) {
      // SUCCESS!
      pinMessage.style.color = '#10b981';
      pinMessage.textContent = 'Yeay! PIN benar, membuka rahasia... 💖';
      lockCircle.classList.add('unlocked');
      lockIcon.classList.remove('fa-lock');
      lockIcon.classList.add('fa-lock-open');

      playSuccessSound();

      setTimeout(() => {
        switchScreen('letter');
      }, 1100);
    } else {
      // WRONG PIN
      const pinCard = document.querySelector('.pin-card');
      pinCard.classList.add('shake');
      pinMessage.style.color = '#ef4444';
      pinMessage.textContent = 'Upss! PIN salah, coba lagi yaa sayang 🥺✨';
      playErrorBeep();

      setTimeout(() => {
        pinCard.classList.remove('shake');
        enteredPin = '';
        updatePinDots();
      }, 700);
    }
  }

  // Keypad click listeners
  keypadBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const key = btn.getAttribute('data-key');
      if (key !== null) {
        handlePinInput(key);
      }
    });
  });

  if (deleteBtn) {
    deleteBtn.addEventListener('click', (e) => {
      e.preventDefault();
      deletePinDigit();
    });
  }

  if (hintBtn && hintDisplay) {
    hintBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const isHidden = window.getComputedStyle(hintDisplay).display === 'none';
      hintDisplay.style.display = isHidden ? 'inline-block' : 'none';
    });
  }

  // Keyboard physical listener for desktop PC users
  document.addEventListener('keydown', (e) => {
    const isPinActive = screens.pin.classList.contains('active');
    if (!isPinActive) return;

    if (e.key >= '0' && e.key <= '9') {
      handlePinInput(e.key);
    } else if (e.key === 'Backspace') {
      deletePinDigit();
    }
  });

  /* ==========================================================
     5. SCREEN 3: LOVE LETTER NARRATIVE
     ========================================================== */
  if (letterNextBtn) {
    letterNextBtn.addEventListener('click', (e) => {
      e.preventDefault();
      switchScreen('question');
    });
  }

  /* ==========================================================
     6. SCREEN 4: QUESTION & DODGING 'NO' BUTTON
     ========================================================== */
  const playfulQuotes = [
    "Eits, gak bisa dipencet wkwk 😜",
    "Tombol NO nya kabur pas kamu pencet! 🏃‍♂️💨",
    "Tombol ini lagi libur, pilih YES aja yaa 🥰",
    "Yakin mau nolak? Coba kejar lagi kalau bisa 🥺",
    "Hahaha kabur lagi tombolnya! 😝",
    "Semesta aja pengen kamu bilang YES lhoo! ❤️",
    "Layar HP kamu anti tombol NO kayaknya 🙈",
    "Gaboleh nolak yaa, pencet YES aja sayang 💖",
    "Tuh kan loncat lagi! Pencet YES dong pleaseee 🥺👉👈"
  ];

  let quoteIndex = 0;
  let dodgeCount = 0;
  let yesScale = 1;
  let lastX = null;
  let lastY = null;

  function dodgeNoButton(e) {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }

    // Gentle tactile haptic vibration for Android phones
    if (navigator.vibrate) {
      try {
        navigator.vibrate(40);
      } catch (err) {}
    }

    dodgeCount++;
    noBtn.classList.add('dodging');

    // Get boundaries of the questionCard
    const cardRect = questionCard.getBoundingClientRect();
    const btnW = noBtn.offsetWidth || 115;
    const btnH = noBtn.offsetHeight || 50;

    // Relative bounds of YES button
    const yesRect = yesBtn.getBoundingClientRect();
    const yesRelLeft = yesRect.left - cardRect.left;
    const yesRelTop = yesRect.top - cardRect.top;
    const yesRelRight = yesRelLeft + yesRect.width;
    const yesRelBottom = yesRelTop + yesRect.height;

    // Safe boundaries inside questionCard
    const minX = 18;
    const maxX = Math.max(minX, cardRect.width - btnW - 18);
    const minY = 90; // Avoid top title
    const maxY = Math.max(minY, cardRect.height - btnH - 35); // Avoid bottom text

    let randomX = minX;
    let randomY = minY;
    let attempts = 0;

    // Pick a position that doesn't overlap YES button and is sufficiently far from last position
    while (attempts < 25) {
      attempts++;
      randomX = Math.floor(Math.random() * (maxX - minX)) + minX;
      randomY = Math.floor(Math.random() * (maxY - minY)) + minY;

      const dist = (lastX !== null && lastY !== null)
        ? Math.hypot(randomX - lastX, randomY - lastY)
        : 120;

      // Check overlap with YES button (with safe padding)
      const overlapsYes = !(
        randomX + btnW < yesRelLeft - 20 ||
        randomX > yesRelRight + 20 ||
        randomY + btnH < yesRelTop - 15 ||
        randomY > yesRelBottom + 15
      );

      if (!overlapsYes && dist > 75) {
        break;
      }
    }

    lastX = randomX;
    lastY = randomY;

    // Apply new position
    noBtn.style.left = `${randomX}px`;
    noBtn.style.top = `${randomY}px`;

    // Make the YES button subtly bigger & more enticing
    if (yesScale < 1.45) {
      yesScale += 0.05;
      yesBtn.style.transform = `scale(${yesScale})`;
    }

    // Shrink the NO button slightly (min 0.72)
    const currentNoScale = Math.max(0.72, 1 - dodgeCount * 0.025);
    noBtn.style.transform = `scale(${currentNoScale})`;

    // Update playful quote
    if (playfulMessage) {
      playfulMessage.textContent = playfulQuotes[quoteIndex % playfulQuotes.length];
      quoteIndex++;
      playfulMessage.style.transform = 'scale(1.08)';
      setTimeout(() => {
        playfulMessage.style.transform = 'scale(1)';
      }, 200);
    }

    playDodgeSfx();
  }

  // Handle touch and click events for both mobile phones and PC
  if (noBtn) {
    // Mobile touch events: triggers immediately the instant finger presses or touches down
    noBtn.addEventListener('touchstart', dodgeNoButton, { passive: false });
    noBtn.addEventListener('touchend', (e) => { e.preventDefault(); }, { passive: false });
    noBtn.addEventListener('pointerdown', dodgeNoButton);

    // Desktop hover & click
    noBtn.addEventListener('mouseenter', dodgeNoButton);
    noBtn.addEventListener('click', dodgeNoButton);
  }

  // YES button clicked
  if (yesBtn) {
    yesBtn.addEventListener('click', (e) => {
      e.preventDefault();
      triggerConfettiExplosion();
      playCelebrationSound();

      setTimeout(() => {
        switchScreen('celebration');
      }, 700);
    });
  }

  /* ==========================================================
     7. SCREEN 5: CELEBRATION & USER MESSAGE INPUT
     ========================================================== */
  if (mayaMessageInput && charCount) {
    mayaMessageInput.addEventListener('input', () => {
      charCount.textContent = mayaMessageInput.value.length;
    });
  }

  if (sendBtn) {
    sendBtn.addEventListener('click', (e) => {
      e.preventDefault();
      let userText = mayaMessageInput ? mayaMessageInput.value.trim() : '';
      
      if (!userText) {
        userText = "Aku mau jadi pacar kamu! Makasih yaa udah hadir di hidup aku ❤️";
      }

      // Populate modal alert with Maya's message
      modalUserText.textContent = userText;

      // Update WhatsApp share link
      const encodedMsg = encodeURIComponent(
        `Hai! Ini jawaban aku untuk kamu:\n\n"${userText}"\n\nI say YES! 💖`
      );
      if (shareWaBtn) {
        shareWaBtn.onclick = () => {
          window.open(`https://api.whatsapp.com/send?text=${encodedMsg}`, '_blank');
        };
      }

      // Show modal alert
      modal.classList.add('active');
      triggerConfettiExplosion();
    });
  }

  if (closeModalBtn) {
    closeModalBtn.addEventListener('click', () => {
      modal.classList.remove('active');
    });
  }

  // Close modal when tapping overlay background
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.remove('active');
      }
    });
  }

  /* ==========================================================
     8. CONFETTI PARTICLES EXPLOSION
     ========================================================== */
  function triggerConfettiExplosion() {
    if (typeof confetti === 'function') {
      // Big romantic confetti blast
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#ff2a6d', '#ff85a2', '#ffccd5', '#ffd166', '#a78bfa']
      });

      setTimeout(() => {
        confetti({
          particleCount: 50,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: ['#ff2a6d', '#ff659c', '#10b981']
        });
        confetti({
          particleCount: 50,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: ['#ff2a6d', '#ff659c', '#10b981']
        });
      }, 250);
    }
  }

  /* ==========================================================
     9. SYNTHESIZED ROMANTIC SOUND EFFECTS & BGM
     (Zero external audio file dependencies - 100% works everywhere)
     ========================================================== */
  let audioCtx = null;
  let bgmPlaying = false;
  let bgmInterval = null;

  function getAudioContext() {
    if (!audioCtx) {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (AudioContextClass) {
        audioCtx = new AudioContextClass();
      }
    }
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
    return audioCtx;
  }

  function playSoftBeep(freq = 440) {
    try {
      const ctx = getAudioContext();
      if (!ctx) return;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.15);
    } catch (e) {}
  }

  function playErrorBeep() {
    try {
      const ctx = getAudioContext();
      if (!ctx) return;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(180, ctx.currentTime);
      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.3);
    } catch (e) {}
  }

  function playSuccessSound() {
    try {
      const ctx = getAudioContext();
      if (!ctx) return;
      const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
      notes.forEach((freq, idx) => {
        setTimeout(() => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, ctx.currentTime);
          gain.gain.setValueAtTime(0.12, ctx.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.4);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start();
          osc.stop(ctx.currentTime + 0.4);
        }, idx * 120);
      });
    } catch (e) {}
  }

  function playDodgeSfx() {
    try {
      const ctx = getAudioContext();
      if (!ctx) return;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(320, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(640, ctx.currentTime + 0.12);
      gain.gain.setValueAtTime(0.06, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.12);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.12);
    } catch (e) {}
  }

  function playCelebrationSound() {
    try {
      const ctx = getAudioContext();
      if (!ctx) return;
      const fanfare = [523.25, 659.25, 783.99, 1046.50, 1318.51];
      fanfare.forEach((freq, i) => {
        setTimeout(() => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(freq, ctx.currentTime);
          gain.gain.setValueAtTime(0.15, ctx.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.6);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start();
          osc.stop(ctx.currentTime + 0.6);
        }, i * 140);
      });
    } catch (e) {}
  }

  // Romantic Lofi Chords Melody Loop (Sweet & Peaceful)
  const romanticMelody = [
    { note: 261.63, dur: 0.8 }, // C4
    { note: 329.63, dur: 0.8 }, // E4
    { note: 392.00, dur: 0.8 }, // G4
    { note: 493.88, dur: 0.8 }, // B4
    { note: 440.00, dur: 0.8 }, // A4
    { note: 349.23, dur: 0.8 }, // F4
    { note: 392.00, dur: 0.8 }, // G4
    { note: 329.63, dur: 1.2 }, // E4
  ];

  let melodyIndex = 0;
  function startRomanticBgm() {
    const ctx = getAudioContext();
    if (!ctx) return;
    bgmPlaying = true;
    musicToggleBtn.classList.add('playing');

    bgmInterval = setInterval(() => {
      if (!bgmPlaying) return;
      const current = romanticMelody[melodyIndex % romanticMelody.length];
      melodyIndex++;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(current.note, ctx.currentTime);
      gain.gain.setValueAtTime(0.04, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + current.dur);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + current.dur);
    }, 700);
  }

  function stopRomanticBgm() {
    bgmPlaying = false;
    musicToggleBtn.classList.remove('playing');
    if (bgmInterval) {
      clearInterval(bgmInterval);
      bgmInterval = null;
    }
  }

  const bgAudio = document.getElementById('bg-audio');
  let isMusicPlaying = false;

  function playMusic() {
    isMusicPlaying = true;
    musicToggleBtn.classList.add('playing');
    musicToggleBtn.setAttribute('title', 'Jeda Musik ⏸️');

    if (bgAudio) {
      bgAudio.volume = 0.65;
      const playPromise = bgAudio.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            // Audio file played successfully
          })
          .catch(() => {
            // If audio file is missing or blocked, fallback to synthesized melody
            startRomanticBgm();
          });
        return;
      }
    }
    startRomanticBgm();
  }

  function pauseMusic() {
    isMusicPlaying = false;
    musicToggleBtn.classList.remove('playing');
    musicToggleBtn.setAttribute('title', 'Putar Musik 🎵');

    if (bgAudio) {
      bgAudio.pause();
    }
    stopRomanticBgm();
  }

  if (musicToggleBtn) {
    musicToggleBtn.addEventListener('click', (e) => {
      e.preventDefault();
      if (isMusicPlaying) {
        pauseMusic();
      } else {
        playMusic();
      }
    });
  }

  // Auto-play music on the first user interaction (touch/tap or click)
  function handleFirstUserInteraction() {
    getAudioContext();
    if (!isMusicPlaying) {
      playMusic();
    }
    document.removeEventListener('click', handleFirstUserInteraction);
    document.removeEventListener('touchstart', handleFirstUserInteraction);
  }

  document.addEventListener('click', handleFirstUserInteraction, { once: true });
  document.addEventListener('touchstart', handleFirstUserInteraction, { once: true });
});
