import Image from "next/image";
import Link from "next/link";

import { useTranslation } from "../i18n";
import type { RootLayoutParams } from "./layout";
import { Footer } from "./components/Footer";
import Button from "./components/Button";

import styles from "../css/page.module.css";

import Laptop from "../../public/firstPage/laptop.svg";
import Time from "../../public/firstPage/time.svg";
import List from "../../public/firstPage/list.svg";
import Chat from "../../public/firstPage/chat.svg";
import Arrow from "./components/svgs/Arrow";

export default async function Home({ params }: { params: RootLayoutParams }) {
    const { t } = await useTranslation(params.lng, "first-page");

    return (
        <main className={styles.main}>
            <div className={styles.container}>
                <div className={styles.left}>
                    <h1 className={styles.title}>{t("title")}</h1>

                    <h2 className={styles.subtitle}>{t("subtitle")}</h2>
                    <div className={styles.listItem}>
                        <Image src={Time} alt="" />
                        <div>
                            {t("list-1")} <b>{t("list-1-bolder")}</b>
                        </div>
                    </div>
                    <div className={styles.listItem}>
                        <Image src={List} alt="" />
                        <div>{t("list-2")}</div>
                    </div>
                    <div className={styles.listItem}>
                        <Image src={Chat} alt="" />
                        <div>{t("list-3")}</div>
                    </div>
                    <Button>
                        <Link
                            className={styles.link}
                            href={`/${params.lng}/testPage`}
                        >
                            <p>{t("start")}</p>{" "}
                            <Arrow
                                className={styles.arrow}
                                currentcolor="black"
                            />
                        </Link>
                    </Button>
                </div>
                <div className={styles.right}>
                    <Image src={Laptop} alt="" />
                </div>
            </div>

            <Footer lng={params.lng} />
        </main>
    );
}
