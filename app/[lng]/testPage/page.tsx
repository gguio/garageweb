"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

import {
    useContext,
    useEffect,
    useState,
    useLayoutEffect,
    useRef,
    useMemo,
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
export const ProgressBar = ({
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
                    <Image
                        className={styles.card__image}
                        fill={true}
                        src={quest.imageURL}
                        alt=""
                    />
                </div>
                <div className={styles.card__imageContainerClone}>
                    <Image
                        className={styles.card__imageClone}
                        fill={true}
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
    setCurrValue,
}: {
    currValue: number;
    setCurrValue: Function;
}) => {
    const [xOffset, setXOffset] = useState(5);
    const [mousePressed, setMousePressed] = useState(false);

    const boxRef = useRef(null);
    const contRef = useRef(null);

    useEffect(() => {
        if (currValue < 0) {
            setXOffset(5);
        }
    }, [currValue]);

    const changeOffset = (e: React.MouseEvent<HTMLDivElement>) => {
        const target = contRef.current as any;
        if (target && mousePressed) {
            const width = target.offsetWidth - 5;
            let offset = e.clientX - target.offsetLeft - 30;
            const value = Math.round((offset / width) * 7);
            offset = (value / 7) * width;

            if (value == 1 || value == 2) {
                offset += 5;
            }

            if (offset < 5) {
                offset = 5;
            } else if (offset > width - 5) {
                offset = width - 5;
            }

            setCurrValue(value);
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
                    backgroundColor: currValue < 0 ? "#29A9FF" : "#FFD243",
                }}
                ref={boxRef}
            ></div>
            <div className={styles.estimator__block}>
                <Arrow
                    width={30}
                    height={20}
                    currentcolor={currValue >= 0 ? "#E8E8E8" : "black"}
                />
            </div>
            <div className={styles.estimator__block}>
                <div
                    className={styles.estimator__text}
                    style={{
                        color: currValue < 0 ? "#D1D3D4" : "#29A9FF",
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
                        color: currValue < 0 ? "#D1D3D4" : "#29A9FF",
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
                        color: currValue < 0 ? "#D1D3D4" : "#29A9FF",
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
                        color: currValue < 0 ? "#D1D3D4" : "#29A9FF",
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
                        color: currValue < 0 ? "#D1D3D4" : "#29A9FF",
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
                        color: currValue < 0 ? "#D1D3D4" : "#29A9FF",
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
    const [currValue, setCurrValue] = useState(-1);

    const router = useRouter();

    const { dataForTest, setDataForTest } = useContext(GlobalContext);
    const currData = useRef(dataForTest);
    console.log("main render");

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

    return (
        <main className={styles.main}>
            <ProgressBar
                questNumber={questNumber}
                dataLength={dataForTest.length}
            />
            <Card quest={dataForTest[questNumber] as Question} />
            <Estimator setCurrValue={setCurrValue} currValue={currValue} />
            <Button
                onClick={() => {
                    if (currValue < 0) {
                        return;
                    }
                    setQuestNumber((prev) => prev + 1);
                    setCurrValue(-1);
                    // set value for current question
                    currData.current[questNumber].value = currValue;
                    // if last question
                    if (questNumber >= dataForTest.length - 40) {
                        // set dataForTest
                        setDataForTest(currData.current);
                        // redirect to result page
                        router.replace(`/${params.lng}/resultPage`);
                    }
                }}
                style={
                    currValue < 0
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
