import styles from "../styles/Message.module.css";

const joinClasses = (...classes) => classes.join(" ");

export const Message = ({ username, message, isFromMe = false }) => {
  return (
    <div className={joinClasses(styles.message, isFromMe ? styles.me : "")}>
      <span className={styles.span}>{username}</span>
      <p className={styles.text}>{message}</p>
    </div>
  );
};
