import styles from "./Loading.module.css";

const Loading = () => {
  return <div className={styles.wrapper}>
    <div className={styles.dottedLoader}></div>
  </div>
};

export default Loading;
