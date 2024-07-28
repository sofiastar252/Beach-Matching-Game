document.addEventListener('DOMContentLoaded', () => {
    const grid = document.getElementById('grid');
    const startButton = document.getElementById('startButton');
    const restartButton = document.getElementById('restart');
    const timerDisplay = document.getElementById('timer');
    const beachItems = ["beach-ball.png", 'bucket.png', 'flip-flops.png',
        'palm-tree.png', 'sand-castle.png', 'sun-umbrella.png',
        'surfboard.png', 'waves.png'];
    let flippedCards = [];
    let matchedPairs = 0;
    let timerInterval;
    let startTime;

    const shuffleArray = array => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    };

    const createBoard = () => {
        const duplicatedItems = beachItems.concat(beachItems); // Duplicate the array to ensure each item has a matching pair
        shuffleArray(duplicatedItems);
        for (let i = 0; i < duplicatedItems.length; i++) {
            const card = document.createElement('div');
            card.classList.add('card');
            card.dataset.name = duplicatedItems[i];
            card.innerHTML =
                `<div class="front"></div><div class="back"><img src="imagesMatch/${duplicatedItems[i]}" alt="Beach Item"></div>`;
            grid.appendChild(card);
        }
    };

    const flipCard = e => {
        const clickedCard = e.target.closest('.card');
        if (clickedCard && !clickedCard.classList.contains('flipped') && flippedCards.length < 2) {
            clickedCard.classList.add('flipped');
            flippedCards.push(clickedCard);
            if (flippedCards.length === 2) {
                setTimeout(checkForMatch, 500);
            }
        }
    };

    const checkForMatch = () => {
        const [card1, card2] = flippedCards;
        if (card1.dataset.name === card2.dataset.name) {
            matchedPairs++;
            if (matchedPairs === beachItems.length) {
                clearInterval(timerInterval);
                setTimeout(() => alert(`Congratulations! You found all the pairs in ${calculateTimeElapsed()} seconds!`), 500);
                restartButton.style.display = 'inline'; // Show restart button
            }
        } else {
            card1.classList.remove('flipped');
            card2.classList.remove('flipped');
        }
        flippedCards = [];
    };

    const restartGame = () => {
        clearInterval(timerInterval);
        timerDisplay.textContent = ''; // Clear timer display
        grid.innerHTML = '';
        flippedCards = [];
        matchedPairs = 0;
        startButton.style.display = 'inline'; // Show start button
        restartButton.style.display = 'none'; // Hide restart button
    };

    const calculateTimeElapsed = () => {
        const endTime = new Date();
        const timeDiff = endTime - startTime; // Time difference in milliseconds
        const seconds = Math.floor(timeDiff / 1000); // Convert milliseconds to seconds
        return seconds;
    };

    const startGame = () => {
        createBoard();
        startButton.style.display = 'none'; // Hide start button
        restartButton.style.display = 'inline'; // Show restart button
        startTime = new Date(); // Record start time
        timerInterval = setInterval(updateTimer, 1000); // Start timer
    };

    const updateTimer = () => {
        const timeElapsed = calculateTimeElapsed();
        timerDisplay.textContent = `Time elapsed: ${timeElapsed} seconds`;
    };

    grid.addEventListener('click', flipCard);
    startButton.addEventListener('click', startGame);
    restartButton.addEventListener('click', restartGame);
});

