import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import AuthForm from "../Components/AuthForm";
import ChatFeed from "../Components/ChatFeed";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <AuthForm />,
      },
      {
        path: "/chat-feed",
        element: <ChatFeed />,
      },
    ],
  },
]);

export default router;
