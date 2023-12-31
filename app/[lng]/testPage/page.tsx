/* eslint-disable @next/next/no-img-element */
"use client";

import { useRouter } from "next/navigation";

import {
	useContext,
	useEffect,
	useState,
	useLayoutEffect,
	useRef,
} from "react";
import { GlobalContext } from "@/app/globalContext";
import type { Question } from "@/app/globalContext";

import { gsap } from "gsap";

import type { RootLayoutParams } from "../layout";
import Button from "../components/Button";
import Arrow from "../components/svgs/Arrow";

import styles from "../../css/testPage.module.css";

// components: progress bar, card, estimator
// propgress bar
const ProgressBar = ({
	questNumber,
	dataLength,
}: {
	questNumber: number;
	dataLength: number;
}) => {
	const width = (questNumber / dataLength) * 100;

	return (
		<div className={styles.progressBar}>
			<div
				className={styles.progressBar__inner}
				style={{ width: `${width}%` }}
			></div>
		</div>
	);
};
// card
const Card = ({ quest }: { quest: Question }) => {
	return (
		<div className={styles.card}>
			{/* image */}
			<div className={styles.card__imgOuterContainer}>
				<div className={styles.card__imageContainer}>
					<img
						className={styles.card__image}
						src={quest.imageURL}
						alt=""
					/>
				</div>
				<div className={styles.card__imageContainerClone}>
					<img
						className={styles.card__imageClone}
						src={quest.imageURL}
						alt=""
					/>
				</div>
			</div>

			{/* text */}
			<p className={styles.card__text}>{quest.text}</p>
		</div>
	);
};
// estimator
const Estimator = ({
	currValue,
	goNext,
	setGoNext,
}: {
	currValue: React.MutableRefObject<number>;
	goNext: boolean;
	setGoNext: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
	const [xOffset, setXOffset] = useState(5);
	const [mousePressed, setMousePressed] = useState(false);

	const boxRef = useRef(null);
	const contRef = useRef(null);

	useEffect(() => {
		if (!goNext) {
			setXOffset(5);
		}
	}, [goNext]);

	useEffect(() => {
		const keyDownHandler = (event: KeyboardEvent) => {
			if (event.key === "1") {
				event.preventDefault();

				const value = 1;
				const width = (contRef.current as any).offsetWidth - 5;
				let offset = (value / 7) * width;

				offset += 1;

				currValue.current = value;
				setGoNext(true);
				setXOffset(offset);
			} else if (event.key === "2") {
				event.preventDefault();

				const value = 2;
				const width = (contRef.current as any).offsetWidth - 5;
				let offset = (value / 7) * width;

				offset += 1;

				currValue.current = value;
				setGoNext(true);
				setXOffset(offset);
			} else if (event.key === "3") {
				event.preventDefault();

				const value = 3;
				const width = (contRef.current as any).offsetWidth - 5;
				let offset = (value / 7) * width;

				currValue.current = value;
				setGoNext(true);
				setXOffset(offset);
			} else if (event.key === "4") {
				event.preventDefault();

				const value = 4;
				const width = (contRef.current as any).offsetWidth - 5;
				let offset = (value / 7) * width;

				currValue.current = value;
				setGoNext(true);
				setXOffset(offset);
			} else if (event.key === "5") {
				event.preventDefault();

				const value = 5;
				const width = (contRef.current as any).offsetWidth - 5;
				let offset = (value / 7) * width;

				currValue.current = value;
				setGoNext(true);
				setXOffset(offset);
			} else if (event.key === "6") {
				event.preventDefault();

				const value = 6;
				const width = (contRef.current as any).offsetWidth - 5;
				let offset = (value / 7) * width;

				currValue.current = value;
				setGoNext(true);
				setXOffset(offset);
			}
		};

		document.addEventListener("keydown", keyDownHandler);

		return () => {
			document.removeEventListener("keydown", keyDownHandler);
		};
	}, []);

	const changeOffset = (e: React.MouseEvent<HTMLDivElement>) => {
		const target = contRef.current as any;
		if (target && mousePressed) {
			const width = target.offsetWidth - 5;
			let offset = e.clientX - target.offsetLeft - 30;
			const value = Math.round((offset / width) * 7);
			offset = (value / 7) * width;

			if (value == 1 || value == 2) {
				offset += 1;
			}

			if (offset < 5) {
				offset = 5;
			} else if (offset > width - 5) {
				offset = width - 5;
			}

			currValue.current = value;
			setGoNext(true);
			setXOffset(offset);
		}
	};

	useLayoutEffect(() => {
		const ctx = gsap.context(() => {
			gsap.to(boxRef.current, {
				duration: 0.1,
				left: `${xOffset}px`,
			});
			return () => ctx.revert();
		});
	}, [xOffset]);

	return (
		<div className={styles.estimator} ref={contRef}>
			<div
				className={styles.estimator__mask}
				onMouseDown={(e) => {
					setMousePressed(true);
				}}
				onMouseUp={(e) => {
					changeOffset(e);
					setMousePressed(false);
				}}
				onMouseMove={changeOffset}
			></div>
			<div
				className={styles.estimator__value}
				style={{
					backgroundColor: !goNext ? "#29A9FF" : "#FFD243",
				}}
				ref={boxRef}
			></div>
			<div className={styles.estimator__block}>
				<Arrow
					width={30}
					height={20}
					currentcolor={goNext ? "#E8E8E8" : "black"}
				/>
			</div>
			<div className={styles.estimator__block}>
				<div
					className={styles.estimator__text}
					style={{
						color: !goNext ? "#D1D3D4" : "#29A9FF",
					}}
				>
					1
				</div>
			</div>
			<div className={styles.estimator__delimiter}></div>
			<div className={styles.estimator__block}>
				<div
					className={styles.estimator__text}
					style={{
						color: !goNext ? "#D1D3D4" : "#29A9FF",
					}}
				>
					2
				</div>
			</div>
			<div className={styles.estimator__delimiter}></div>
			<div className={styles.estimator__block}>
				<div
					className={styles.estimator__text}
					style={{
						color: !goNext ? "#D1D3D4" : "#29A9FF",
					}}
				>
					3
				</div>
			</div>
			<div className={styles.estimator__delimiter}></div>
			<div className={styles.estimator__block}>
				<div
					className={styles.estimator__text}
					style={{
						color: !goNext ? "#D1D3D4" : "#29A9FF",
					}}
				>
					4
				</div>
			</div>
			<div className={styles.estimator__delimiter}></div>
			<div className={styles.estimator__block}>
				<div
					className={styles.estimator__text}
					style={{
						color: !goNext ? "#D1D3D4" : "#29A9FF",
					}}
				>
					5
				</div>
			</div>
			<div className={styles.estimator__delimiter}></div>
			<div className={styles.estimator__block}>
				<div
					className={styles.estimator__text}
					style={{
						color: !goNext ? "#D1D3D4" : "#29A9FF",
					}}
				>
					6
				</div>
			</div>
		</div>
	);
};

export default function TestPage({ params }: { params: RootLayoutParams }) {
	const [local, setLocal] = useState({} as any);
	const [questNumber, setQuestNumber] = useState(0);
	const [goNext, setGoNext] = useState(false);

	const router = useRouter();

	const { dataForTest, setDataForTest } = useContext(GlobalContext);
	const currValue = useRef(-1);
	const currData = useRef(dataForTest);

	// on page load : set localization, set data for test
	useEffect(() => {
		// set localization for page
		let jsonString: string = "";
		const language = params.lng.slice(0, 2);
		switch (language) {
			case "ru":
				jsonString = require("../../i18n/locales/ru/test-page.json");
				break;
			case "en":
				jsonString = require("../../i18n/locales/en/test-page.json");
				break;
			case "es":
				jsonString = require("../../i18n/locales/es/test-page.json");
				break;
			default:
				jsonString = require("../../i18n/locales/en/test-page.json");
		}
		const local = JSON.parse(JSON.stringify(jsonString));
		setLocal(local);

		// set dataForTest
		if (dataForTest.length > 1) {
			return;
		}
		let jsonData: string = "";
		switch (language) {
			case "ru":
				jsonData = require("../../i18n/locales/ru/questionsRU.json");
				break;
			case "en":
				jsonData = require("../../i18n/locales/en/questionsEN.json");
				break;
			case "es":
				jsonData = require("../../i18n/locales/es/questionsES.json");
				break;
			default:
				jsonData = require("../../i18n/locales/en/questionsEN.json");
		}
		let questions = JSON.parse(JSON.stringify(jsonData));
		let tempData: Question[] = [];
		questions = questions[language].forEach((question: any) => {
			tempData.push({
				number: question.number,
				text: question.text,
				type: question.type,
				imageURL: question.imageURL,
				value: -1,
			});
		});
		tempData.slice(1);
		setDataForTest(tempData);

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const keyDownHandlerNext = (event: KeyboardEvent) => {
		console.log("User pressed: ", event.key);

		if (event.key === "Enter") {
			event.preventDefault();

			goNextHandler();
		}
	};

	const goNextHandler = () => {
		if (!goNext) {
			return;
		}
		if (questNumber >= dataForTest.length - 1) {
			// set dataForTest
			setDataForTest(currData.current);
			// redirect to result page
			router.replace(`/${params.lng}/resultPage`);
			return;
		}

		currData.current[questNumber].value = currValue.current;
		setQuestNumber((prev) => prev + 1);
		currValue.current = -1;
		setGoNext(false);
		// set value for current question
	};

	return (
		<main
			onKeyDown={(e) => {
				keyDownHandlerNext;
			}}
			className={styles.main}
		>
			<div className={styles.progressBarTitle}>
				{local.questionsNumber} {questNumber}
				{" ("}
				{dataForTest.length - 1}
				{")"}
			</div>
			<ProgressBar
				questNumber={questNumber}
				dataLength={dataForTest.length}
			/>
			<Card quest={dataForTest[questNumber] as Question} />
			<Estimator
				currValue={currValue}
				goNext={goNext}
				setGoNext={setGoNext}
			/>
			<Button
				onClick={() => {
					goNextHandler();
				}}
				style={
					!goNext
						? {
								backgroundColor: "#E8E8E8",
								transform: "translateY(10px)",
								color: "darkgray",
						  }
						: null
				}
			>
				{local.nextQuestion ? local.nextQuestion.toUpperCase() : ""}
			</Button>
		</main>
	);
}
