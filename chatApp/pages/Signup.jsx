import { Card, Input, Button, Typography } from "@material-tailwind/react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentUser } from "../redux/currentUserSlice";
import axios from "axios";
import { useEffect } from "react";

export default function SignUp() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const currentUser = useSelector((state) => state.currentUser);

  useEffect(() => {
    if (currentUser) {
      navigate("/users");
    }
  }, [currentUser, navigate]);
  const handleSignUp = async (e) => {
    e.preventDefault();
    const userData = {
      username: e.target.username.value,
      password: e.target.password.value,
    };
    axios
      .post("/api/users", userData)
      .then((res) => {
        if (res.statusText === "Created") {
          dispatch(setCurrentUser(res.data));
          navigate("/users");
        }
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="flex justify-center items-center h-screen">
      <Card color="transparent" shadow={false}>
        <Typography variant="h4" color="blue-gray">
          Sign Up
        </Typography>
        <Typography color="gray" className="mt-1 font-normal">
          Enter your details to register.
        </Typography>
        <form
          onSubmit={handleSignUp}
          className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96 form-input"
        >
          <Input id="username" size="lg" label="Username" className="mb-4" />
          <Input id="password" type="password" size="lg" label="Password" />

          <Button type="submit" className="mt-6" fullWidth>
            Register
          </Button>
          <Typography color="gray" className="mt-4 text-center font-normal">
            Already have an account?{" "}
            <Link
              to="/"
              className="font-medium text-blue-500 transition-colors hover:text-blue-700"
            >
              Sign In
            </Link>
          </Typography>
        </form>
      </Card>
    </div>
  );
}
