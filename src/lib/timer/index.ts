enum TimerMode {
	Basic = 0,
	Zen = 1
}

enum TimerState {
	Idle = 0,
	Focus = 1,
	Rest = 2,
	Paused = 3
}

class PomodoroTimer {
	private timerMode: TimerMode = TimerMode.Basic;
	private timerState: TimerState = TimerState.Idle;
	private secondsRemaining = 0;
	private timerId: number | null = null;
	private startTime = 0;
	private pausedTimeRemaining = 0;

	// Duration configs in seconds
	private readonly durations = {
		[TimerMode.Basic]: {
			[TimerState.Focus]: 25 * 60, // 25 minutes
			[TimerState.Rest]: 5 * 60 // 5 minutes
		},
		[TimerMode.Zen]: {
			[TimerState.Focus]: 50 * 60, // 50 minutes
			[TimerState.Rest]: 10 * 60 // 10 minutes
		}
	};

	// DOM elements
	private timerLabel: HTMLElement;
	private timeLeft: HTMLElement;
	private startButton: HTMLElement;
	private pauseButton: HTMLElement;
	private resumeButton: HTMLElement;
	private resetButton: HTMLElement;
	private basicModeButton: HTMLElement;
	private zenModeButton: HTMLElement;
	private container: HTMLElement;

	constructor() {
		// Get DOM elements
		this.timerLabel = document.getElementById('timer-label')!;
		this.timeLeft = document.getElementById('time-left')!;
		this.startButton = document.getElementById('start-btn')!;
		this.pauseButton = document.getElementById('pause-btn')!;
		this.resumeButton = document.getElementById('resume-btn')!;
		this.resetButton = document.getElementById('reset-btn')!;
		this.basicModeButton = document.getElementById('basic-mode')!;
		this.zenModeButton = document.getElementById('zen-mode')!;
		this.container = document.querySelector('.container')!;

		// Set up event listeners
		this.startButton.addEventListener('click', () => this.startFocusTimer());
		this.pauseButton.addEventListener('click', () => this.pauseTimer());
		this.resumeButton.addEventListener('click', () => this.resumeTimer());
		this.resetButton.addEventListener('click', () => this.resetTimer());
		this.basicModeButton.addEventListener('click', () => this.setTimerMode(TimerMode.Basic));
		this.zenModeButton.addEventListener('click', () => this.setTimerMode(TimerMode.Zen));

		// Load saved mode from localStorage
		this.loadSettings();

		// Initialize UI
		this.updateDisplay();

		// Request notification permission
		this.requestNotificationPermission();
	}

	private loadSettings(): void {
		const savedMode = localStorage.getItem('timerMode');
		if (savedMode) {
			this.timerMode = Number.parseInt(savedMode, 10);
			this.updateModeButtons();
		}
	}

	private saveSettings(): void {
		localStorage.setItem('timerMode', this.timerMode.toString());
	}

	private setTimerMode(mode: TimerMode): void {
		this.timerMode = mode;
		this.updateModeButtons();
		this.saveSettings();
	}

	private updateModeButtons(): void {
		this.basicModeButton.classList.toggle('active', this.timerMode === TimerMode.Basic);
		this.zenModeButton.classList.toggle('active', this.timerMode === TimerMode.Zen);
	}

	private startFocusTimer(): void {
		this.startTimer(TimerState.Focus);
	}

	private startRestTimer(): void {
		this.startTimer(TimerState.Rest);
	}

	private startTimer(state: TimerState): void {
		this.timerState = state;
		this.secondsRemaining = this.durations[this.timerMode][state];
		this.startTime = Date.now();

		this.updateDisplay();
		this.updateButtons();

		// Clear any existing timer
		if (this.timerId !== null) {
			window.clearInterval(this.timerId);
		}

		// Start a new timer
		this.timerId = window.setInterval(() => this.tick(), 1000);
	}

	private tick(): void {
		const currentTime = Date.now();
		const elapsedSeconds = Math.floor((currentTime - this.startTime) / 1000);
		this.secondsRemaining = Math.max(
			0,
			this.durations[this.timerMode][this.timerState] - elapsedSeconds
		);

		this.updateDisplay();

		if (this.secondsRemaining <= 0) {
			this.handleTimerComplete();
		}
	}

	private handleTimerComplete(): void {
		if (this.timerId !== null) {
			window.clearInterval(this.timerId);
			this.timerId = null;
		}

		this.showNotification();
		this.playSound();

		if (this.timerState === TimerState.Focus) {
			this.startRestTimer();
		} else {
			this.timerState = TimerState.Idle;
			this.updateDisplay();
			this.updateButtons();
		}
	}

	private pauseTimer(): void {
		if (this.timerId !== null) {
			window.clearInterval(this.timerId);
			this.timerId = null;
			this.pausedTimeRemaining = this.secondsRemaining;
			this.timerState = TimerState.Paused;
			this.updateButtons();
		}
	}

	private resumeTimer(): void {
		if (this.timerState === TimerState.Paused) {
			this.secondsRemaining = this.pausedTimeRemaining;
			this.startTime =
				Date.now() -
				(this.durations[this.timerMode][
					this.timerState === TimerState.Paused ? TimerState.Focus : this.timerState
				] -
					this.secondsRemaining) *
					1000;
			this.timerState = this.timerState === TimerState.Paused ? TimerState.Focus : this.timerState;
			this.timerId = window.setInterval(() => this.tick(), 1000);
			this.updateButtons();
		}
	}

	private resetTimer(): void {
		if (this.timerId !== null) {
			window.clearInterval(this.timerId);
			this.timerId = null;
		}

		this.timerState = TimerState.Idle;
		this.secondsRemaining = 0;
		this.updateDisplay();
		this.updateButtons();
	}

	private updateDisplay(): void {
		// Update timer display
		const minutes = Math.floor(this.secondsRemaining / 60);
		const seconds = this.secondsRemaining % 60;
		this.timeLeft.textContent = `${minutes
			.toString()
			.padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

		// Update label
		switch (this.timerState) {
			case TimerState.Focus:
				this.timerLabel.textContent = 'Focus Time';
				this.container.classList.remove('rest');
				this.container.classList.add('focus');
				break;
			case TimerState.Rest:
				this.timerLabel.textContent = 'Rest Time';
				this.container.classList.remove('focus');
				this.container.classList.add('rest');
				break;
			case TimerState.Paused:
				this.timerLabel.textContent = 'Paused';
				break;
			default:
				this.timerLabel.textContent = 'Ready';
				this.container.classList.remove('focus', 'rest');
				break;
		}
	}

	private updateButtons(): void {
		// Hide all buttons first
		this.startButton.classList.add('hidden');
		this.pauseButton.classList.add('hidden');
		this.resumeButton.classList.add('hidden');
		this.resetButton.classList.add('hidden');

		// Show appropriate buttons based on state
		if (this.timerState === TimerState.Idle) {
			this.startButton.classList.remove('hidden');
		} else if (this.timerState === TimerState.Paused) {
			this.resumeButton.classList.remove('hidden');
			this.resetButton.classList.remove('hidden');
		} else {
			this.pauseButton.classList.remove('hidden');
			this.resetButton.classList.remove('hidden');
		}
	}

	private async requestNotificationPermission(): Promise<void> {
		if ('Notification' in window) {
			await Notification.requestPermission();
		}
	}

	private showNotification(): void {
		if ('Notification' in window && Notification.permission === 'granted') {
			const title =
				this.timerState === TimerState.Focus ? 'Focus session completed!' : 'Rest time completed!';

			const body =
				this.timerState === TimerState.Focus
					? 'Time for a break.'
					: 'Ready for another focus session?';

			new Notification(title, { body });
		}
	}

	private playSound(): void {
		const audio = new Audio(
			'data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YWoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBhxQo9rprGYcBRRLm9nqqGUcBgkwdrzTpGYcBAUbb6fNomkcAwMSXpW8oW0cAgMLSYawm3AcAQQNQXeolnMcAQUPPGyfkXIcAAsXLV+UiW4cABUiKVuNhGkcACUuKFiFfmYcADk9LVV+d2AcAE1NMlJ3b1sZAGFdOFBwZ1UXAHJtP05oYE4VAIBzQkphWkYUAIx6R0haU0ATAJaDTEZTTDoRAKGKUkVLRzEPAKuRWERDQCkNALOYXkM8OiQMALmeYkI2NR8LAMGkZkEwMBsKAMaoakEsKxgJAMWrb0EnKBUJAMOsdEEkJRMIAL+seUAgIxIIALmsf0AeIBEHALOsgUAdHhEHAK2rhUAbHBEHAKirmUAZGhAGAKSpnkAYGRAGAKGopEAXGBAGAJ+oqEAWFxAGAJ2orUAVFg8GAJuotUAUFQ8GAJioukATFA8GAJaovUASFA8FAJSowUARFBAFAJOoxkAQEw8FAJCozUAPEw8FAI+o0wAOEg8FAI2o2QANEg8FAIyo3gAMEQ8FAIuo4wALEQ8FAImo5gAKEA8FAIio6gAJEA8FAIeo7QAIEA8FAIao8AAHEA8FAIWo8wAGEA8FAISo9gAFEA8FAIOo+QAEEA8FAIKo+wADEA8FAIGo/gACEA8FAICo/wABEA8FAICo/wABEA8FAICo/wABEA8FAICo/wABEA8FAICo/wABEA8FAICo/wABEA8FAICo/wABEA8FAICo/wABEA8FAICo/wABEA8FAICo/wABEA8FAICo/wABEA8FAICo/wABEA8FAICo/wABEA8FAICo/wABEA8FAICo/wABEA8FAICo/wABEA8FAICo/wABEA8FAICo/wABEA8FAICo/wABEA8FAICo/wABEA8FAICo/wABEA8FAICo/wABEA8FAICo/wABEA8FAICo/wABEA8FAICo/wABEA8FAICo/wABEA8FAICo/wABEA8FAICo/wABEA8FAICo/wABEA8FAICo/wABEA8FAICo/wABEA8FAICo/wABEA8FAICo/wABEA8FAICo/wABEA8FAICo/wABEA8FAICo/wABEA8FAICo/wABEA8FAICo/wABEA8FAICo/wABEA8FAICo/wABEA8FAICo/wABEA8FAICo/wABEA8FAICo/wABEA8FAICo/wABEA8FAICo/wABEA8FAICo/wABEA8FAICo/wABEA8FAICo/wABEA8FAICo/wABEA8FAICo/wABEA8FAICo/wABEA8FAICo/wABEA8FAICo/wABEA8FAICo/wABEA8FAICo/wABEA8FAICo/wABEA8FAICo/wABEA8FAICo/wABEA8FAICo/wABEA8FAICo/wABEA8FAICo/wABEA8FAICo/wABEA8FAICo/wABEA8FAICo/wABEA8FAICo/wABEA8FAICo/wABEA8FAICo/wABEA8FAICo/wABEA8FAICo/wABEA8FAICo/wABEA8FAICo/wABEA8FAICo/wABEA8FAICo/wABEA8FAICo/wABEA8FAICo/wABEA8FAICo/wABEA8FAICo/wABEA8FAICo/wABEA8FAICo/wABEA8FAICo/wABEA8FAICo/wABEA8FAICo/wABEA8FAICo/wABEA8FAICo/wABEA8FAICo/wABEA8FAICo/wABEA8FAICo/wABEA8FAICo/wABEA8FAICo/wABEA8FAICo/wABEA8FAICo/wABEA8FAICo/wABEA8FAICo/wABEA8FAICo/wABEA8FAICo/wABEA8FAICo/wABEA8FAICo/wABEA8FAICo/wABEA8FAICo/wABEA8FAICo/wABEA8FAICo/wABEA8FAICo/wABEA8FAICo/wABEA8FAICo/wABEA8FAICo/wABEA8FAICo/wABEA8FAICo/wABEA8F'
		);
		audio.play();
	}
}

// Initialize the app when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
	new PomodoroTimer();
});
