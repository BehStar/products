import { useEffect } from "react";
import { useAlert } from "../../providers-contexts/AlertContext.jsx";
import styles from "./Alert.module.css";

function Alert() {
  const { alert, toggleAlert } = useAlert();
  useEffect(() => {
    let timeoutId;
    if (alert.isVisible) {
      timeoutId = setTimeout(() => {
        toggleAlert(false, "", "");
      }, 5000);
    }
    return () => clearTimeout(timeoutId);
  }, [toggleAlert]);

  return (
    <div className={styles.wrapper}>
      <div
        className={`${styles.dialogContainer} ${
          alert.isVisible ? styles.show : styles.hide
        }`}
      >
        <div className={styles.dialogHeader}>{alert.header}</div>
        <div className={styles.dialogBody}>{alert.message}</div>
        <div className={styles.dialogFooter}>
          <button onClick={() => toggleAlert(false, "", "")}>Ok</button>
        </div>
      </div>
    </div>
  );
}

export default Alert;
