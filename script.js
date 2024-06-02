document.addEventListener('DOMContentLoaded', () => {
    const coin = document.getElementById('coin');
    const result = document.getElementById('result');
    const flipButton = document.getElementById('flip-button');
    const settingsButton = document.getElementById('settings-button');
    const popup = document.getElementById('popup');
    const closeButton = document.querySelector('.close-button');
    const saveButton = document.getElementById('save-button');
    const headsPopupInput = document.getElementById('heads-popup');
    const tailsPopupInput = document.getElementById('tails-popup');
    const historyList = document.getElementById('history-list');

    let headsOutcome = '';
    let tailsOutcome = '';

    let flipHistory = []; // Array to track flip history

    function showPopup() {
        popup.style.display = 'block';
    }

    function closePopup() {
        popup.style.display = 'none';
    }

    // Function to log flip result to flip history
    function logFlip(result) {
        flipHistory.push(result);
        updateHistoryList();
    }

    // Function to update the history list
    function updateHistoryList() {
        historyList.innerHTML = '';
        flipHistory.forEach((result, index) => {
            const listItem = document.createElement('li');
            listItem.textContent = `Flip ${index + 1}: ${result}`;
            historyList.appendChild(listItem);
        });
    }

    flipButton.addEventListener('click', () => {
        coin.classList.add('flipping');

        // Determine the result of the coin flip
        const isHeads = Math.random() < 0.5;

        // Update the result after the animation
        setTimeout(() => {
            coin.classList.remove('flipping');
            if (isHeads) {
                coin.style.transform = 'rotateY(0deg)';
                result.textContent = `Heads wins: ${headsOutcome || 'Heads wins'}`;
                logFlip('Heads'); // Log flip result to flip history
            } else {
                coin.style.transform = 'rotateY(180deg)';
                result.textContent = tailsOutcome ? `Tails wins: ${tailsOutcome}` : 'Tails wins';
                logFlip('Tails'); // Log flip result to flip history
            }
        }, 2000);
    });

    settingsButton.addEventListener('click', showPopup);

    closeButton.addEventListener('click', closePopup);

    saveButton.addEventListener('click', () => {
        headsOutcome = headsPopupInput.value;
        tailsOutcome = tailsPopupInput.value;
        closePopup();
    });

    // Close the popup if user clicks outside of it
    window.addEventListener('click', (event) => {
        if (event.target == popup) {
            closePopup();
        }
    });
});
