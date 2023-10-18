import React from "react";
import { useEffect, useState } from "react";
import "@/app/css/modal.css";

import Button from "../Button";

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { collection, addDoc } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBoE5iKgQMzwW6g1GdOOhIsZVXhxSlwYWM",

    authDomain: "garageweb-8f787.firebaseapp.com",

    projectId: "garageweb-8f787",

    storageBucket: "garageweb-8f787.appspot.com",

    messagingSenderId: "631951742738",

    appId: "1:631951742738:web:b105a12e2d8b81f5e745cb",

    measurementId: "G-DPDDMFQT8Y",
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const addData = async (email: string) => {
    try {
        const docRef = await addDoc(collection(db, "emails"), {
            email: email,
        });
        console.log("Document written with ID: ", docRef.id);
    } catch (e) {
        console.error("Error adding document: ", e);
    }
};

function validate(email: string) {
    var re = /\S+@\S+\.\S+/;
    var res = re.test(email);
    return res;
}

export default function ModalPage({
    onClose,
    lng,
}: {
    onClose: any;
    lng: string;
}) {
    const [local, setLocal] = useState({ title: "", subtitle: "", button: "" });

    const SendEmail = () => {
        const email = document.getElementById("name") as HTMLInputElement;
        const label = document.getElementById("label") as HTMLInputElement;
        if (validate(email.value)) {
            console.log("valid");
            onClose();
            addData(email.value);
        } else {
            console.log("invalid");
            label.style.color = "red";
            email.style.borderBottom = "2px solid red";
        }
    };

    // set local strings
    useEffect(() => {
        console.log(lng);

        switch (lng) {
            case "en":
                setLocal((prev) => ({
                    title: "Get full report",
                    subtitle: "We will send you a full report to your email",
                    button: "SEND",
                }));
                break;
            case "ru":
                setLocal((prev) => ({
                    title: "Получить полный отчет",
                    subtitle: "Мы отправим вам полный отчет на почту",
                    button: "ОТПРАВИТЬ",
                }));
                break;
            case "es":
                setLocal((prev) => ({
                    title: "Obtener informe completo",
                    subtitle:
                        "Le enviaremos un informe completo a su correo electrónico",
                    button: "ENVIAR",
                }));
                break;
            default:
                setLocal((prev) => ({
                    title: "Get full report",
                    subtitle: "We will send you a full report to your email",
                    button: "SEND",
                }));
                break;
        }
    }, [lng]);

    const handleCloseClick = (
        e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
    ) => {
        e.preventDefault();
        onClose();
    };

    return (
        <div className="modalOverlay">
            <div className="modalWrapper">
                <div className="modal">
                    <div className="modalHeader">
                        <h1 className="modalTitle">{local.title}</h1>
                        <a href="#" onClick={handleCloseClick}>
                            x
                        </a>
                    </div>
                    <div className="modalBody">
                        <p>{local.subtitle}</p>
                        <div className="form__group field">
                            <input
                                type="input"
                                className="form__field"
                                placeholder="Name"
                                name="name"
                                id="name"
                                required
                            />
                            <label
                                htmlFor="name"
                                id="label"
                                className="form__label"
                            >
                                email
                            </label>
                        </div>
                        <Button
                            onClick={() => {
                                SendEmail();
                            }}
                            styleContainer={{ marginBlock: "auto" }}
                        >
                            {local.button}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
