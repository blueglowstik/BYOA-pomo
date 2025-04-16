class PomodoroTimer {
    constructor() {
        this.timeLeft = 25 * 60; // 25 minutes in seconds
        this.timerId = null;
        this.isRunning = false;
        
        // DOM elements
        this.timeDisplay = document.querySelector('.time-display');
        this.startButton = document.getElementById('start');
        this.pauseButton = document.getElementById('pause');
        this.resetButton = document.getElementById('reset');
        this.modeButtons = document.querySelectorAll('.mode-btn');
        
        // Mode times in minutes
        this.modes = {
            'pomodoro': { time: 25, name: 'Pomodoro' },
            'short': { time: 5, name: 'Short Break' },
            'long': { time: 15, name: 'Long Break' }
        };
        
        // Bind event listeners
        this.startButton.addEventListener('click', () => this.start());
        this.pauseButton.addEventListener('click', () => this.pause());
        this.resetButton.addEventListener('click', () => this.reset());
        
        // Mode button functionality
        this.modeButtons.forEach(button => {
            button.addEventListener('click', () => this.handleModeChange(button));
        });
        
        this.currentMode = 'pomodoro';
        this.updateDisplay();
    }
    
    handleModeChange(button) {
        // Remove active class from all buttons
        this.modeButtons.forEach(btn => btn.classList.remove('active'));
        
        // Add active class to clicked button
        button.classList.add('active');
        
        // Update current mode
        this.currentMode = button.dataset.mode;
        
        // Reset timer with new mode
        this.reset();
    }
    
    start() {
        if (!this.isRunning) {
            this.isRunning = true;
            this.timerId = setInterval(() => {
                this.timeLeft--;
                this.updateDisplay();
                
                if (this.timeLeft <= 0) {
                    this.reset();
                    // Play notification sound
                    const audio = new Audio('notification.mp3');
                    audio.play();
                }
            }, 1000);
        }
    }
    
    pause() {
        if (this.isRunning) {
            this.isRunning = false;
            clearInterval(this.timerId);
        }
    }
    
    reset() {
        this.pause();
        this.timeLeft = this.modes[this.currentMode].time * 60;
        this.updateDisplay();
    }
    
    updateDisplay() {
        const minutes = Math.floor(this.timeLeft / 60);
        const seconds = this.timeLeft % 60;
        this.timeDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
}

// Initialize the timer when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new PomodoroTimer();
}); 