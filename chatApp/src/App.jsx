import { Routes, Route } from "react-router-dom";
import SignUp from "../pages/Signup";
import Login from "../pages/Login";
import UsersPage from "../pages/Users";
import Chat from "../pages/Chat";
import { useDispatch } from "react-redux";
import axios from "axios";
import { useEffect } from "react";
import { setCurrentUser } from "../redux/currentUserSlice";
import Test from "../components/ChatDrawer.jsx";
import { setUsers } from "../redux/usersSlice";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    axios
      .get("/api/me")
      .then((res) => {
        dispatch(setCurrentUser(res.data));
      })
      .catch((err) => console.log(err));
  }, [dispatch]);

  useEffect(() => {
    axios
      .get("/api/users")
      .then((res) => {
        dispatch(setUsers(res.data));
      })
      .catch((err) => console.log(err));
  }, [dispatch]);

  return (
    <div className="flex flex-col h-screen">
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/users" element={<UsersPage />} />
          <Route path="/chat/:uuid" element={<Chat />} />
          <Route path="/test" element={<Test />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
