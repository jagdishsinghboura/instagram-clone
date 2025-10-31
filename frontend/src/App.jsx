// import './App.css'

import Signup from "./components/ui/Signup";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Signin from "./components/ui/Signin";
import MainLayout from "./components/ui/MainLayout";
import Home from "./components/ui/Home";
import Profile from "./components/ui/Profile";
import EditProfile from "./components/ui/EditProfile";
import ChatPage from "./components/ui/ChatPage";
import { io } from "socket.io-client"
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSocket } from "./redux/messageSlice/socketSlice";
import { setOnlineUsers } from "./redux/messageSlice/chatSlice";
import { setLikeNotification } from "./redux/notification/RTNotification";
import Search from "./components/ui/Search";
import Explore from "./components/ui/Explore";
import SinglePost from "./components/ui/SinglePost";
import { toast, ToastContainer } from "react-toastify";

const browserRouter = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: "/profile/:id",
        element: <Profile />
      },
      {
        path: "/account/edit",
        element: <EditProfile />
      },
      {
        path: "/chat",
        element: <ChatPage />
      },
      {
        path: "/search",
        element: <Search />
      },
      {
        path: "/explore",
        element: <Explore />,
      },
      {
        path: `/explore/:id`,
        element: <SinglePost />
      }
    ]
  },
  {
    path: "/login",
    element: <Signin />,
  },
  {
    path: "/signup",
    element: <Signup />
  },
]);

function App() {
  const { socket } = useSelector(store => store.socketio)
  const { user } = useSelector(store => store.auth)
  const dispatch = useDispatch();
  useEffect(() => {
    if (user) {
      const socketio = io("http://localhost:8000", {
        query: {
          userId: user?._id,
        },
        transports: ['websocket']
      })
      dispatch(setSocket(socketio))

      socketio.on("getOnlineUsers", (onlineUsers) => {
        dispatch(setOnlineUsers(onlineUsers));
      })
      socketio.on('notification', (notification) => {
        dispatch(setLikeNotification(notification))
      })
      return () => {
        socketio.close();
        dispatch(setSocket(null));
      }
    } else if (socket) {
      socket?.close();
      dispatch(setSocket(null));
    }


  }, [user, dispatch])

  console.log("Backend URL:", import.meta.env.VITE_BACKEND_API_URL);


  return (
    <div>
      <RouterProvider router={browserRouter} />
      

    
    </div>
  );
}

export default App;
