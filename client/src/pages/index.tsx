import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "../styles/Home.module.css";
import { NextPage } from "next";

const inter = Inter({ subsets: ["latin"] });

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <h1 className="text-3xl font-bold underline">Hello world!</h1>
    </div>
  );
};

export default Home;
