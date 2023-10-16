"use client";

import { createContext, useState, useEffect } from "react";

export type Question = {
    number: number;
    text: string;
    type: string;
    imageURL: string;
    value: number;
};

export const GlobalContext = createContext({
    dataForTest: [{ number: 0, text: "", type: "", imageURL: "", value: -1 }],
    setDataForTest: null as any,
    resultPage: {
        title: "Your result",

        rarity: "% - very rarely",

        card__title: "Explorer",

        doYouAgree: "Do you agree with the result?",

        no: "No",
        yes: "Yes",

        button1: "Get a full beautiful report",
        button2: "courses related to this profession",

        share: "Share on social media",
        download: "Download to device",

        professions: "Professions",
        courses: "Courses",
        categories: [
            {
                type: "linguistic talents",
                card__title: "Linguistic talents",
                card__subtitle: "Journalist, Film Writer, Writer",
                description:
                    "Your strong point is the ability to express your thoughts in words so as to convince and lead the interlocutors or readers, as well as easily master new languages",
                professions:
                    "Theater and film director, writer, screenwriter, Clips, advertising, television series creator, copywriter, Journalist, TV presenter, blogger, PR specialist, marketer",
                courses:
                    "Introductory Course on Film Making\nWork with text and word\nCreating a WOW script",
                imgURL: "https://plus.unsplash.com/premium_photo-1663047291494-b29cb4f0df9d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
            },
            {
                type: "logical-mathematical abilities",
                card__title: "Explorer",
                card__subtitle: "Programmer, Engineer, Scientist",
                description:
                    "Your talent is the ability to analyze and create order, and any, even the most complex concepts of 'decompose on the shelves'",
                professions:
                    "Programmer, developer of games and applications, Data Analyst, System Administrator, Architect, graphic designer, design engineer",
                courses:
                    "Introduction to the Profession Game Design\nMain programming languages\nPrograms for video processing and editing",
                imgURL: "https://images.unsplash.com/photo-1580982181126-aefa590a41c8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
            },
            {
                type: "artist's talent",
                card__title: "Artist",
                card__subtitle: "Designer, Operator, Artist",
                description:
                    "Your gift-imagination, the ability to visualize, or create pictures and images will be in demand in a variety of directions-from game design to the film industry, architecture or contemporary art",
                professions:
                    "Artist, Illustrator, Designer, creator of dolls and decorations, Art teacher, clothing and footwear designer, Architect, graphic designer, landscape design, Producer and organizer of exhibitions, Video operator, creator of clips and films, photographer, photo artist",
                courses:
                    "Introduction to the Profession Game Design\nDigital Art and 3D modeling\nCreating images of game heroes",
                imgURL: "https://images.unsplash.com/photo-1501084817091-a4f3d1d19e07?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
            },
            {
                type: "musical abilities",
                card__title: "Musical abilities",
                card__subtitle: "Sound engineer, Singer, DJ",
                description:
                    "Sense of rhythm, subtle hearing, artistry and creativity-all these qualities make you not only a welcome party guest, but give you a sea of opportunities to realize yourself in fashion professions",
                professions:
                    "DJ, arranger, sound design director, Singer, musician, composer, conductor, music producer, Game music creator, dubbing actor, special effects creator, Music journalist, music teacher, Sound engineer, radio presenter, TV presenter",
                courses:
                    "Introductory Course on Film Making\nMusic that makes cinema live\nCareer for successful musicians",
                imgURL: "https://images.unsplash.com/photo-1593697820910-a2b68670c1e1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
            },
            {
                type: "communication genius",
                card__title: "communication genius",
                card__subtitle:
                    "Blogger, Game Project Manager, Film Producer Projects",
                description:
                    "Such people easily get to know and build relationships, find common interests, it is easy and pleasant to communicate with them, since childhood they know how to convince that it is important for them",
                professions:
                    "Diplomat, public figure, politician, Blogger, TV presenter, producer of TV-video channel, Entrepreneur, Business Manager, Teacher, mentor, coach, motivator speaker, Administrator, project manager, exhibition coordinator, event organizer, PR specialist, marketer, SMM specialist",
                courses:
                    "Introductory Course on Film Making\nIntroduction to the Profession Game Design\nCreating a WOW script",
                imgURL: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
            },
            {
                type: "bodily-kinesthetic talent",
                card__title: "Kinesthetic talent",
                card__subtitle:
                    "Actor, Art scenery creator, Film director of projects",
                description:
                    "Your way to express yourself in the world is through movement, sports, dancing. Tactile contact (feel with skin) and the aesthetics of what you do is important to you",
                professions:
                    "Actor, director, choreographer, dancer, circus performer, photo model, Sculptor, creator of Art objects, jewelry, Builder, carpenter, blacksmith, restorer, Professional athlete, trainer, physical education teacher, choreographer, Surgeon, cosmetologist, massage therapist",
                courses:
                    "Introductory Course on Film Making\nWork with text and word\nCreating images of game heroes",
                imgURL: "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8c3BvcnR8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=600&q=60",
            },
            {
                type: "nature understanding",
                card__title: "Nature understanding",
                card__subtitle: "Ecologist, Veterinarian, Zoologist",
                description:
                    "Your source of strength and inspiration is wildlife, communication and observation of flora and fauna, friendship with animals, the study of the natural sciences. It is in these areas that you will be interested in developing your career",
                professions:
                    "Biologist, bioengineer, pharmacist, Researcher and fighter for solving environmental problems, oceanologist, Anthropologist, seismologist, soil scientist, Engineer-surveyor, archaeologist, geographer, Biology, Geography Teacher, Farmer, forest caretaker, agronomist, livestock breeder, zoo employee, veterinarian, Landscape designer, florist",
                courses:
                    "Introductory Course on Film Making\nWork with text and word\nDigital Art and 3D Modeling",
                imgURL: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2074&q=80",
            },
            {
                type: "philosopher's gift",
                card__title: "Philosopher",
                card__subtitle:
                    "Film director of projects, Screenwriter, Data Analyst",
                description:
                    "You are among those few people who, from early childhood, know how to recognize and control emotions, think about the meaning of life, are interested in religion, reasonably talk about serious phenomena, subtly feel your own and other people's experiences",
                professions:
                    "Scientist in social sciences, history, pedagogy, Film director, screenwriter, theater director, Psychologist, psychotherapist, motivator coach, Religious figure, philosopher, creator of political concepts and programs of political parties, Teacher, mentor, Journalist, writer, researcher, Head of Research Projects",
                courses:
                    "Introductory Course on Film Making\nWork with text and word\nCreating images of game heroes",
                imgURL: "https://images.unsplash.com/photo-1620662736427-b8a198f52a4d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGhpbG9zb3BoeXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=600&q=60",
            },
        ],
    },
    setResultPage: null as any,
});

export default function GlobalContextProvider({
    children,
    lng,
}: {
    children: React.ReactNode;
    lng: string;
}) {
    const [dataForTest, setDataForTest] = useState([
        {
            number: 0,
            text: "",
            type: "",
            imageURL: "",
            value: -1,
        },
    ]);
    const [resultPage, setResultPage] = useState({
        title: "Your result",

        rarity: "% - very rarely",

        card__title: "Explorer",

        doYouAgree: "Do you agree with the result?",

        no: "No",
        yes: "Yes",

        button1: "Get a full beautiful report",
        button2: "courses related to this profession",

        share: "Share on social media",
        download: "Download to device",

        professions: "Professions",
        courses: "Courses",
        categories: [
            {
                type: "linguistic talents",
                card__title: "Linguistic talents",
                card__subtitle: "Journalist, Film Writer, Writer",
                description:
                    "Your strong point is the ability to express your thoughts in words so as to convince and lead the interlocutors or readers, as well as easily master new languages",
                professions:
                    "Theater and film director, writer, screenwriter, Clips, advertising, television series creator, copywriter, Journalist, TV presenter, blogger, PR specialist, marketer",
                courses:
                    "Introductory Course on Film Making\nWork with text and word\nCreating a WOW script",
                imgURL: "https://plus.unsplash.com/premium_photo-1663047291494-b29cb4f0df9d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
            },
            {
                type: "logical-mathematical abilities",
                card__title: "Explorer",
                card__subtitle: "Programmer, Engineer, Scientist",
                description:
                    "Your talent is the ability to analyze and create order, and any, even the most complex concepts of 'decompose on the shelves'",
                professions:
                    "Programmer, developer of games and applications, Data Analyst, System Administrator, Architect, graphic designer, design engineer",
                courses:
                    "Introduction to the Profession Game Design\nMain programming languages\nPrograms for video processing and editing",
                imgURL: "https://images.unsplash.com/photo-1580982181126-aefa590a41c8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
            },
            {
                type: "artist's talent",
                card__title: "Artist",
                card__subtitle: "Designer, Operator, Artist",
                description:
                    "Your gift-imagination, the ability to visualize, or create pictures and images will be in demand in a variety of directions-from game design to the film industry, architecture or contemporary art",
                professions:
                    "Artist, Illustrator, Designer, creator of dolls and decorations, Art teacher, clothing and footwear designer, Architect, graphic designer, landscape design, Producer and organizer of exhibitions, Video operator, creator of clips and films, photographer, photo artist",
                courses:
                    "Introduction to the Profession Game Design\nDigital Art and 3D modeling\nCreating images of game heroes",
                imgURL: "https://images.unsplash.com/photo-1501084817091-a4f3d1d19e07?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
            },
            {
                type: "musical abilities",
                card__title: "Musical abilities",
                card__subtitle: "Sound engineer, Singer, DJ",
                description:
                    "Sense of rhythm, subtle hearing, artistry and creativity-all these qualities make you not only a welcome party guest, but give you a sea of opportunities to realize yourself in fashion professions",
                professions:
                    "DJ, arranger, sound design director, Singer, musician, composer, conductor, music producer, Game music creator, dubbing actor, special effects creator, Music journalist, music teacher, Sound engineer, radio presenter, TV presenter",
                courses:
                    "Introductory Course on Film Making\nMusic that makes cinema live\nCareer for successful musicians",
                imgURL: "https://images.unsplash.com/photo-1593697820910-a2b68670c1e1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
            },
            {
                type: "communication genius",
                card__title: "communication genius",
                card__subtitle:
                    "Blogger, Game Project Manager, Film Producer Projects",
                description:
                    "Such people easily get to know and build relationships, find common interests, it is easy and pleasant to communicate with them, since childhood they know how to convince that it is important for them",
                professions:
                    "Diplomat, public figure, politician, Blogger, TV presenter, producer of TV-video channel, Entrepreneur, Business Manager, Teacher, mentor, coach, motivator speaker, Administrator, project manager, exhibition coordinator, event organizer, PR specialist, marketer, SMM specialist",
                courses:
                    "Introductory Course on Film Making\nIntroduction to the Profession Game Design\nCreating a WOW script",
                imgURL: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
            },
            {
                type: "bodily-kinesthetic talent",
                card__title: "Kinesthetic talent",
                card__subtitle:
                    "Actor, Art scenery creator, Film director of projects",
                description:
                    "Your way to express yourself in the world is through movement, sports, dancing. Tactile contact (feel with skin) and the aesthetics of what you do is important to you",
                professions:
                    "Actor, director, choreographer, dancer, circus performer, photo model, Sculptor, creator of Art objects, jewelry, Builder, carpenter, blacksmith, restorer, Professional athlete, trainer, physical education teacher, choreographer, Surgeon, cosmetologist, massage therapist",
                courses:
                    "Introductory Course on Film Making\nWork with text and word\nCreating images of game heroes",
                imgURL: "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8c3BvcnR8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=600&q=60",
            },
            {
                type: "nature understanding",
                card__title: "Nature understanding",
                card__subtitle: "Ecologist, Veterinarian, Zoologist",
                description:
                    "Your source of strength and inspiration is wildlife, communication and observation of flora and fauna, friendship with animals, the study of the natural sciences. It is in these areas that you will be interested in developing your career",
                professions:
                    "Biologist, bioengineer, pharmacist, Researcher and fighter for solving environmental problems, oceanologist, Anthropologist, seismologist, soil scientist, Engineer-surveyor, archaeologist, geographer, Biology, Geography Teacher, Farmer, forest caretaker, agronomist, livestock breeder, zoo employee, veterinarian, Landscape designer, florist",
                courses:
                    "Introductory Course on Film Making\nWork with text and word\nDigital Art and 3D Modeling",
                imgURL: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2074&q=80",
            },
            {
                type: "philosopher's gift",
                card__title: "Philosopher",
                card__subtitle:
                    "Film director of projects, Screenwriter, Data Analyst",
                description:
                    "You are among those few people who, from early childhood, know how to recognize and control emotions, think about the meaning of life, are interested in religion, reasonably talk about serious phenomena, subtly feel your own and other people's experiences",
                professions:
                    "Scientist in social sciences, history, pedagogy, Film director, screenwriter, theater director, Psychologist, psychotherapist, motivator coach, Religious figure, philosopher, creator of political concepts and programs of political parties, Teacher, mentor, Journalist, writer, researcher, Head of Research Projects",
                courses:
                    "Introductory Course on Film Making\nWork with text and word\nCreating images of game heroes",
                imgURL: "https://images.unsplash.com/photo-1620662736427-b8a198f52a4d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGhpbG9zb3BoeXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=600&q=60",
            },
        ],
    });

    useEffect(() => {
        // set dataForTest
        let jsonString: string = "";
        const language = lng.slice(0, 2);
        switch (language) {
            case "ru":
                jsonString = require("./i18n/locales/ru/questionsRU.json");
                break;
            case "en":
                jsonString = require("./i18n/locales/en/questionsEN.json");
                break;
            case "es":
                jsonString = require("./i18n/locales/es/questionsES.json");
                break;
            default:
                jsonString = require("./i18n/locales/en/questionsEN.json");
        }
        let questions = JSON.parse(JSON.stringify(jsonString));
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
        console.log(`set data for test with ${language}`);

        // set resultPage
        let resultPageString: string = "";
        switch (language) {
            case "ru":
                resultPageString = require("./i18n/locales/ru/results.json");
                break;
            case "en":
                resultPageString = require("./i18n/locales/en/results.json");
                break;
            case "es":
                resultPageString = require("./i18n/locales/es/results.json");
                break;
            default:
                resultPageString = require("./i18n/locales/en/results.json");
        }
        let resultPage = JSON.parse(JSON.stringify(resultPageString));
        setResultPage(resultPage);
    }, [lng]);

    return (
        <GlobalContext.Provider
            value={{ dataForTest, setDataForTest, resultPage, setResultPage }}
        >
            {children}
        </GlobalContext.Provider>
    );
}
