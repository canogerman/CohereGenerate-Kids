import { Chat } from "../pages/Chat";
import useStore from "../store";

export const action = async () => {
  return {};
};

export const loader = async () => {
  return {
    message: "WELCOME",
  };
};

export default function ChatRoute() {
  const { username } = useStore.getState();

  return <Chat username={username} />;
}
