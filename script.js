let player1Score = 0;
let player2Score = 0;
let gameActive = false;
let timer;
const WINNING_SCORE = 100;

const player1ScoreElement = document.getElementById('player1-score');
const player2ScoreElement = document.getElementById('player2-score');
const startButton = document.getElementById('start-btn');
const winnerDisplay = document.getElementById('winner-display');
const car1 = document.querySelector('.car1');
const car2 = document.querySelector('.car2');

startButton.addEventListener('click', startGame);

document.addEventListener('keyup', (event) => {
    if (!gameActive) return;

    if (event.key === 'Shift') {
        if (event.location === KeyboardEvent.DOM_KEY_LOCATION_LEFT) {
            updateScore(1);
        } else if (event.location === KeyboardEvent.DOM_KEY_LOCATION_RIGHT) {
            updateScore(2);
        }
    }
});

function updateScore(player) {
    if (player === 1) {
        player1Score++;
        player1ScoreElement.textContent = player1Score;
        car1.style.bottom = `${(player1Score / WINNING_SCORE) * 90}%`;
    } else {
        player2Score++;
        player2ScoreElement.textContent = player2Score;
        car2.style.bottom = `${(player2Score / WINNING_SCORE) * 90}%`;
    }

    if (player1Score >= WINNING_SCORE || player2Score >= WINNING_SCORE) {
        endGame();
    }
}

function createFirework() {
    const colors = ['#FF0000', '#FFD700', '#FF00FF', '#00FF00', '#00FFFF', '#FFA500'];
    const fireworksContainer = document.querySelector('.fireworks-container');
    
    function createBurst(x, y) {
        const particleCount = 36; // Number of particles per burst
        const angleStep = (2 * Math.PI) / particleCount;
        const speed = 100; // Base speed of particles

        for (let i = 0; i < particleCount; i++) {
            const angle = angleStep * i;
            const dx = Math.cos(angle) * speed;
            const dy = Math.sin(angle) * speed;
            
            const particle = document.createElement('div');
            particle.className = 'firework-particle';
            particle.style.left = `${x}px`;
            particle.style.top = `${y}px`;
            particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            particle.style.setProperty('--dx', `${dx}px`);
            particle.style.setProperty('--dy', `${dy}px`);
            
            fireworksContainer.appendChild(particle);
            
            // Remove particle after animation
            setTimeout(() => {
                particle.remove();
            }, 1000);
        }
    }

    // Create multiple bursts
    for (let i = 0; i < 5; i++) {
        setTimeout(() => {
            const x = Math.random() * (window.innerWidth - 200) + 100;
            const y = Math.random() * (window.innerHeight - 200) + 100;
            createBurst(x, y);
        }, i * 300);
    }
}

function endGame() {
    gameActive = false;
    startButton.disabled = false;

    // Determine winner
    let winnerMessage;
    if (player1Score >= WINNING_SCORE) {
        winnerMessage = 'Player 1 wins the race! 🏆';
        document.querySelector('.player:first-child h2').textContent = 'Player 1 👑';
        createFirework();
    } else if (player2Score >= WINNING_SCORE) {
        winnerMessage = 'Player 2 wins the race! 🏆';
        document.querySelector('.player:last-child h2').textContent = 'Player 2 👑';
        createFirework();
    }

    winnerDisplay.textContent = winnerMessage;
}

// Add cleanup function for when starting a new game
function startGame() {
    // Reset game state
    player1Score = 0;
    player2Score = 0;
    gameActive = true;
    
    // Reset display
    player1ScoreElement.textContent = '0';
    player2ScoreElement.textContent = '0';
    winnerDisplay.textContent = '';
    startButton.disabled = true;
    car1.style.bottom = '0';
    car2.style.bottom = '0';
    
    // Reset player titles (remove crown)
    document.querySelector('.player:first-child h2').textContent = 'Player 1';
    document.querySelector('.player:last-child h2').textContent = 'Player 2';
    
    // Clear any remaining fireworks
    const fireworksContainer = document.querySelector('.fireworks-container');
    fireworksContainer.innerHTML = '';
} 