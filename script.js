document.addEventListener('DOMContentLoaded', () => {
    const coin = document.getElementById('coin');
    const flipButton = document.getElementById('flip-button');
    const settingsButton = document.getElementById('settings-button');
    const popup = document.getElementById('popup');
    const closeButton = document.querySelector('.close-button');
    const saveButton = document.getElementById('save-button');
    const headsPopupInput = document.getElementById('heads-popup');
    const tailsPopupInput = document.getElementById('tails-popup');
    const historyList = document.getElementById('history-list');
    const statsDisplay = document.getElementById('stats');
    const flipSound = document.getElementById('flip-sound');
  
    let headsOutcome = localStorage.getItem('headsOutcome') || '';
    let tailsOutcome = localStorage.getItem('tailsOutcome') || '';
    headsPopupInput.value = headsOutcome;
    tailsPopupInput.value = tailsOutcome;
  
    let flipHistory = [];
    let headsCount = 0;
    let tailsCount = 0;
  
    function showPopup() {
      popup.style.display = 'block';
    }
  
    function closePopup() {
      popup.style.display = 'none';
    }
  
    function logFlip(result) {
      flipHistory.push(result);
      if (result === 'Heads') headsCount++;
      if (result === 'Tails') tailsCount++;
      updateHistoryList();
      updateStats();
    }
  
    function updateStats() {
      statsDisplay.textContent = `Heads: ${headsCount} | Tails: ${tailsCount}`;
    }
  
    function updateHistoryList() {
      historyList.innerHTML = '';
      flipHistory.forEach((result, index) => {
        const listItem = document.createElement('li');
        listItem.textContent = `Flip ${index + 1}: ${result}`;
        historyList.appendChild(listItem);
      });
    }
  
    flipButton.addEventListener('click', () => {
      flipButton.disabled = true;
      coin.classList.add('flipping');
      coin.textContent = '?';
      coin.style.backgroundColor = '#ccc';
      if (flipSound) flipSound.play();
  
      const isHeads = Math.random() < 0.5;
  
      setTimeout(() => {
        coin.classList.remove('flipping');
        const resultText = isHeads ? 'Heads' : 'Tails';
        coin.textContent = resultText;
        coin.style.backgroundColor = isHeads ? 'var(--gold)' : 'var(--slate)';
        logFlip(resultText);
        flipButton.disabled = false;
      }, 1000);
    });
  
    settingsButton.addEventListener('click', showPopup);
    closeButton.addEventListener('click', closePopup);
  
    saveButton.addEventListener('click', () => {
      headsOutcome = headsPopupInput.value;
      tailsOutcome = tailsPopupInput.value;
      localStorage.setItem('headsOutcome', headsOutcome);
      localStorage.setItem('tailsOutcome', tailsOutcome);
      closePopup();
    });
  
    window.addEventListener('click', (event) => {
      if (event.target === popup) {
        closePopup();
      }
    });
  
    // Final Girl Easter Egg -- just type finalgirl for this to show
    let buffer = '';
    document.addEventListener('keydown', function (e) {
      buffer += e.key.toLowerCase();
      if (!'finalgirl'.startsWith(buffer)) buffer = '';
      if (buffer === 'finalgirl') {
        buffer = '';
        document.body.classList.add('finalgirl');
        coin.textContent = '✨';
        coin.style.backgroundColor = 'hotpink';
        coin.classList.add('flipping');
        setTimeout(() => {
          coin.classList.remove('flipping');
        }, 1000);
        alert('Easter egg unlocked 💅 Final Girl Mode!');
      }
    });
  });  