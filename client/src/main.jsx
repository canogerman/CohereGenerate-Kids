import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { routerProvider } from "./routes/routesProvider.jsx";
import { ThemeProvider } from "./context/ThemeContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <>
   <ThemeProvider>
    <RouterProvider router={routerProvider} />
    </ThemeProvider>
  </>
);
