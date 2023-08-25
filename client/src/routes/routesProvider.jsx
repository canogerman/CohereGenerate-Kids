import { createBrowserRouter } from "react-router-dom";
import ChatRoute, { action as ChatAction, loader as ChatLoader } from "./chat";
import IndexRoute, { loader as LoginLoader } from ".";

export const routerProvider = createBrowserRouter([
  {
    path: "/",
    element: <IndexRoute />,
    loader: LoginLoader,
  },
  {
    path: "/chat",
    element: <ChatRoute />,
    action: ChatAction,
    loader: ChatLoader,
  },
]);
