import React, { useState, useRef, useEffect } from 'react';
import './App.css';

const App = () => {
	const [index, setIndex] = useState(0);
	const [dateTime, setDateTime] = useState(new Date());
	const [isPlaying, setIsPlaying] = useState(true);
	const audioRef = useRef(null);

	const phrases = [
		'No todo el mundo puede recibir las mismas cosas. Sé práctico.',
		'Alégrate, un camino de hermosas pasiones te espera y debes transitarlo.',
		'No olvides que un amigo es un regalo que te das a ti mismo.',
		'No te tomes la vida demasiado en serio. No saldrás de ella con vida.',
	];

	const images = ['/image1.jpg', '/image2.jpg', '/image3.jpg', '/image4.jpg'];

	const handleClick = () => {
		const newIndex = (index + 1) % phrases.length;
		setIndex(newIndex);
	};

	const togglePlayPause = () => {
		if (audioRef.current) {
			if (isPlaying) {
				audioRef.current.pause();
			} else {
				audioRef.current.play();
			}
			setIsPlaying(!isPlaying);
		}
	};

	useEffect(() => {
		const timer = setInterval(() => {
			setDateTime(new Date());
		}, 1000);
		return () => clearInterval(timer);
	}, []);

	useEffect(() => {
		const handleMouseUp = () => {
			const selection = window.getSelection();
			if (selection && selection.rangeCount > 0) {
				const range = selection.getRangeAt(0);
				if (range && range.toString().length > 0) {
					console.log('Texto seleccionado:', range.toString());
				}
			}
		};

		document.addEventListener('mouseup', handleMouseUp);

		return () => {
			document.removeEventListener('mouseup', handleMouseUp);
		};
	}, []);

	return (
		<div className="App">
			<header className="App-header">
				<h1 className="App-title">Galleta De La Fortuna</h1>
				<img
					src={images[index]}
					className="App-logo"
					alt="Galleta de la fortuna"
				/>
				<p className="App-phrase">{phrases[index]}</p>
				<div className="button-container">
					<button onClick={handleClick}>Tu Fortuna</button>
					<button onClick={togglePlayPause}>{isPlaying ? '⏸️' : '▶️'}</button>
				</div>
				<button className="date-time-button">
					{dateTime.toLocaleString()}
				</button>
				<audio
					ref={audioRef}
					src="https://www.bensound.com/bensound-music/bensound-sunny.mp3"
					autoPlay
					loop
				/>
			</header>
		</div>
	);
};

export default App;
