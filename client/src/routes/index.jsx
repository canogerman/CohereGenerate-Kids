import { Login } from "../pages/Login";
import { useTheme } from "../context/ThemeContext";
export const loader = async () => {
  console.log("LOGIN page is loaded");
  return {
    message: "Welcome to Cohere-Kids",
  };
};

export default function IndexRoute() {
  const { isDarkMode, toggleDarkMode } = useTheme();
  return <Login />;
}
