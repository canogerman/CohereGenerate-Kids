import { Form } from "react-router-dom";
import styles from "../styles/Login.module.css";
import { useNavigate } from "react-router-dom";
import useStore from "../store";
import { useTheme } from "../context/ThemeContext";

export const Login = () => {
  const navigate = useNavigate();
  const setUsername = useStore((state) => state.setUsername);

  const handleLogin = () => {
    const inputValue = document.querySelector('input[name="username"]').value;
    setUsername(inputValue);
    navigate("/chat");
  };

  const { isDarkMode, toggleDarkMode } = useTheme();
  return (
    <main
      className={`${styles.container} ${isDarkMode ? styles.darkMode : ""}`}
    >
      <div className="theme-toggle-container">
        <input
          type="checkbox"
          id="themeToggle"
          checked={isDarkMode}
          onChange={toggleDarkMode}
          className="theme-toggle-input"
        />
        <label htmlFor="themeToggle" className="theme-toggle-label">Dark Mode</label>
      </div>

      <h1 className={styles.title}>Welcome to CohereChat-Kids 👨‍👩‍👧‍👦</h1>
      <Form>
        <div className={styles.inputContainer}>
          <label className={styles.label} htmlFor="username">
            Username:{" "}
          </label>
          <input
            className={styles.input}
            type="text"
            name="username"
            placeholder="Harry Potter"
            required
          />
        </div>
        <button className={styles.button} type="button" onClick={handleLogin}>
          Login
        </button>
      </Form>
    </main>
  );
};
