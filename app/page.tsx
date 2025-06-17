import styles from "./page.module.css";

export default function Home() {
    return (
        <div className={styles.page}>
          <button className="btn btn-primary">
              Hola mundo
          </button>
        </div>
    );
}
