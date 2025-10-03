import React, { Children, useEffect, useState, useRef } from "react";
import "./style.css";

export default function Swiper({ children, autoPlay, duration }) {
	const [index, setIndex] = useState(0);
	const slides = Children.toArray(children);
	const timerRef = useRef(null);
	const prevHandler = () => {
		setIndex((p) => Math.abs((p - 1 + slides.length) % slides.length));
	};
	const nextHandler = () => {
		setIndex((p) => (p + 1) % slides.length);
	};

	useEffect(() => {
		if (autoPlay) {
			timerRef.current = setInterval(nextHandler, duration);
		}
		return () => {
			if (timerRef.current) {
				clearInterval(timerRef.current);
			}
		};
	}, []);

	return (
		<div className={"SwiperContainer"} role="region" aria-roledescription="carousel" aria-label="Featured products">
			<button onClick={prevHandler} aria-label="Previous slide">
				Prev
			</button>

			<div className="slides" onMouseEnter={()=>{
                if(timerRef.current){
                    clearInterval(timerRef.current)
                }
            }}>
				<div className="track" style={{ transform: `translateX(-${index * 100}%)` }}>
					{slides.map((slide, i) => (
						<div
							key={i}
							className="slide"
							role="group"
							aria-roledescription="slide"
							aria-label={`Slide ${i + 1} of ${slides.length}`}
							aria-hidden={i !== index}
						>
							{slide}
						</div>
					))}
				</div>
				<div className="SwiperIndicators" role="tablist">
					{slides.map((_, i) => (
						<button key={i} role="tab" aria-selected={i === index} aria-label={`Go to slide ${i + 1}`} onClick={() => setIndex(i)}>
							•
						</button>
					))}
				</div>
			</div>

			<button onClick={nextHandler} aria-label="Next slide">
				Next
			</button>
		</div>
	);
}