"use client";

import Image from "next/image";

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

import type { TFunction } from "i18next";
import { useTranslation } from "@/app/i18n";

import { CountResults } from "../components/CountResults/CountResults";

import { gsap } from "gsap";
import { ReactSVG } from "react-svg";

import { ProgressBar } from "../testPage/page";
import Button from "@/app/[lng]/components/Button";

import styles from "@/app/css/resultPage.module.css";
import Artist from "@/public/resultPage/artist.svg";
import Body from "@/public/resultPage/body.svg";
import Book from "@/public/resultPage/book.svg";
import Communication from "@/public/resultPage/communication.svg";
import Diamond from "@/public/resultPage/diamond.svg";
import Explorer from "@/public/resultPage/explorer.svg";
import Music from "@/public/resultPage/Music.svg";
import Nature from "@/public/resultPage/nature.svg";
import Philosophy from "@/public/resultPage/philosophy.svg";
import SadFace from "@/public/resultPage/sad_face.svg";
import HappyFace from "@/public/resultPage/happy_face.svg";
import { RootLayoutParams } from "../layout";

export default function ResultPage({ params }: { params: RootLayoutParams }) {
    // global state : dataForTest, resultPage
    const { dataForTest, resultPage } = useContext(GlobalContext);

    // local state : modalVisible, localStrings (for FullResult card)
    const [modalVisible, setModalVisible] = useState(false);
    const [localStrings, setLocalStrings] = useState({
        ...resultPage,
        svg: Artist,
    });

    // on page load : count results, set local strings, set resultArray
    useEffect(() => {
        // count results
        const tempArray = CountResults(dataForTest);

        // set local strings
        let tempStrings = localStrings;

        let max = 0;
        let maxIndex = 0;
        let maxCategory = "";
        for (let i = 0; i < tempArray.length; i++) {
            if (tempArray[i].weight > max) {
                max = tempArray[i].weight;
                maxIndex = i;
                maxCategory = tempArray[i].category;
            }
        }

        for (let i = 0; i < resultPage.categories.length; i++) {
            if (resultPage.categories[i].type == maxCategory) {
                tempStrings = {
                    ...tempStrings,
                    categories: [resultPage.categories[i]],
                    svg: Book,
                };
            }
        }

        switch (maxCategory) {
            case resultPage.categories[0].type:
                tempStrings.svg = Book;
                break;
            case resultPage.categories[1].type:
                tempStrings.svg = Explorer;
                break;
            case resultPage.categories[2].type:
                tempStrings.svg = Artist;
                break;
            case resultPage.categories[3].type:
                tempStrings.svg = Music;
                break;
            case resultPage.categories[4].type:
                tempStrings.svg = Communication;
                break;
            case resultPage.categories[5].type:
                tempStrings.svg = Body;
                break;
            case resultPage.categories[6].type:
                tempStrings.svg = Nature;
                break;
            case resultPage.categories[7].type:
                tempStrings.svg = Philosophy;
                break;

            default:
                tempStrings.svg = Book;
        }

        tempStrings.categories[0].type = maxCategory;

        setLocalStrings(tempStrings);
    }, []);

    return (
        <div className={styles.main}>
            <div className={styles.progressBarTitle}>
                {localStrings.title.toUpperCase()}
            </div>
            <ProgressBar
                questNumber={dataForTest.length}
                dataLength={dataForTest.length}
            />

            <div className={styles.card}>
                <div className={styles.rarity}>
                    <Image src={Diamond} alt="" width={12} height={10} />
                    <div style={{ marginLeft: 2 }}>3{localStrings.rarity}</div>
                </div>

                <div className={styles.card__imgOuterContainer}>
                    <div className={styles.card__imageContainer}>
                        <Image
                            src={localStrings.svg}
                            style={{ marginTop: 10 }}
                            alt=""
                            fill={true}
                        />
                    </div>
                </div>

                <div className={styles.card__title} style={{ marginTop: 16 }}>
                    {localStrings.categories[0].card__title}
                </div>
                <div
                    className={styles.card__subtitle}
                    style={{ marginTop: 16 }}
                >
                    {localStrings.categories[0].card__subtitle}
                </div>
                <div className={styles.card__text} style={{ marginTop: 11 }}>
                    {localStrings.categories[0].description}
                </div>
            </div>

            <div className={styles.doYouAgree} style={{ marginTop: 18 }}>
                {localStrings.doYouAgree}
            </div>

            <div
                style={{
                    display: "flex",
                    flexDirection: "row",
                    gap: 15,
                    marginTop: 12,
                }}
            >
                <div className={styles.YesNo}>
                    <Image
                        src={SadFace}
                        alt="Picture of the author"
                        width={56}
                        height={65}
                    />

                    <div style={{ fontFamily: "Nunito", fontSize: 20 }}>
                        {localStrings.no}
                    </div>
                </div>

                <div
                    className={styles.YesNo}
                    style={{ backgroundColor: "#FFAC00" }}
                >
                    <div style={{ fontFamily: "Nunito", fontSize: 20 }}>
                        {localStrings.yes}
                    </div>
                    <Image
                        src={HappyFace}
                        alt="Picture of the author"
                        width={56}
                        height={65}
                    />
                </div>
            </div>

            <Button
                classNameContainer={styles.buttonContainer}
                classNameInner={styles.buttonInner}
                styleContainer={{
                    marginTop: 27,
                    borderWidth: 1,
                }}
            >
                {" "}
                {localStrings.button1.toUpperCase()}
            </Button>

            <Button styleContainer={{ marginTop: 12 }}>
                {localStrings.button2.toUpperCase()}
            </Button>

            {/* You will need to replace FullResult with your own implementation */}
            {/* <FullResult
                strings={strings}
                localStrings={localStrings}
                modalVisible={modalVisible}
                setModalVisible={setModalVisible}
                width={width}
                height={height}
                resultArray={resultArray}
            /> */}
        </div>
    );
}
