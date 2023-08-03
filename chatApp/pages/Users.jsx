import { useSelector } from "react-redux";
import UserCard from "../components/UserCard";
import { useNavigate } from "react-router-dom";

export default function Chat() {
  const navigate = useNavigate();
  const currentUser = useSelector((state) => state.currentUser);
  const users = useSelector((state) => state.users);

  return (
    <div>
      {users.map((user) => {
        if (currentUser && user.uuid === currentUser.uuid) {
          return null;
        }
        return (
          <UserCard
            key={user.uuid}
            username={user.username}
            onClick={() => navigate(`/chat/${user.uuid}`)}
          />
        );
      })}
    </div>
  );
}
