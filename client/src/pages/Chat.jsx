import { useRef, useEffect, useState } from "react";
import { io } from "socket.io-client";
import { Message } from "../components/Message";
import styles from "../styles/Chat.module.css";
import { useTheme } from "../context/ThemeContext";

export const Chat = ({ username }) => {
  const [messages, setMessages] = useState([]);
  const socketRef = useRef(
    io("http://localhost:3000", {
      query: {
        username,
      },
    })
  );
  const formRef = useRef(null);

  const { isDarkMode, toggleDarkMode } = useTheme();
  useEffect(() => {
    if (isDarkMode) {
      console.log("oscuro");
      document.body.classList.add("darkMode");
    } else {
      document.body.classList.remove("darkMode");
    }
  }, [isDarkMode]);

  useEffect(() => {
    const handleSubmit = (event) => {
      event.preventDefault();
      const formData = new FormData(formRef.current);
      const input = formData.get("message");
      const message = input.trim();
      socketRef.current.emit("message", message);
      formRef.current.reset();
      setMessages((messages) => [
        ...messages,
        {
          username,
          message,
          isFromMe: true,
        },
      ]);
    };

    socketRef.current.on("message-received", (data) => {
      setMessages((messages) => [
        ...messages,
        {
          username: data.from.username,
          message: data.message,
          isFromMe: false,
        },
      ]);
    });

    // Manejar la respuesta de Cohere
    socketRef.current.on("cohere-response", (data) => {
      setMessages((messages) => [
        ...messages,
        {
          username: "Teacher-Cohere",
          message: data.message,
          isFromMe: false,
        },
      ]);
    });

    formRef.current = document.querySelector("form");
    formRef.current.addEventListener("submit", handleSubmit);

    return () => {
      formRef.current.removeEventListener("submit", handleSubmit);
    };
  }, [username]);

  return (
    <>
      <header className={styles.header}>
        <h1 className={styles.title}>
          Hi {username}!!😀, {"let's go to learn...📖"}
        </h1>
        <div className={styles.themeToggle}>
        <input
          type="checkbox"
          id="themeToggle"
          checked={isDarkMode}
          onChange={toggleDarkMode}
        />
        <label htmlFor="themeToggle">Dark Mode</label>
      </div>
      </header>
      <main className={`${styles.main} ${isDarkMode ? styles.darkMode : ""}`}>
        <section className={styles.section}>
          <div className={styles.messagesContainer} id="messages-container">
            <div className={styles.messages} id="messages">
              {messages.map((message, index) => (
                <Message
                  key={index}
                  username={message.username}
                  message={message.message}
                  isFromMe={message.isFromMe}
                />
              ))}
            </div>
          </div>
          <form className={styles.form} ref={formRef}>
            <input
              className={styles.input}
              type="text"
              name="message"
              placeholder="Type a message"
              required
            />
            <button
              className={styles.button}
              type="submit"
              aria-label="send-message-button"
            >
              ➡
            </button>
          </form>
        </section>
      </main>
    </>
  );
};
