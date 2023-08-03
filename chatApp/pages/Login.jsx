import { Card, Input, Button, Typography } from "@material-tailwind/react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { setCurrentUser } from "../redux/currentUserSlice";
import axios from "axios";

export default function SignIn() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const currentUser = useSelector((state) => state.currentUser);

  useEffect(() => {
    if (currentUser) {
      navigate("/users");
    }
  }, [currentUser, navigate]);
  const handleSignIn = async (e) => {
    e.preventDefault();
    const userData = {
      username: e.target.username.value,
      password: e.target.password.value,
    };
    axios
      .post("/api/login", userData)
      .then((res) => {
        if (res.statusText === "OK") {
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
          Sign in
        </Typography>
        <Typography color="gray" className="mt-1 font-normal">
          Enter your details to register.
        </Typography>
        <form
          onSubmit={handleSignIn}
          className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96 form-input"
        >
          <Input
            id="username"
            size="lg"
            label="Username"
            className="mb-4"
            required
          />
          <Input
            id="password"
            type="password"
            size="lg"
            label="Password"
            required
          />

          <Button type="submit" className="mt-6" fullWidth>
            Register
          </Button>
          <Typography color="gray" className="mt-4 text-center font-normal">
            Don&apos;t have an account?{" "}
            <Link
              to="/signup"
              className="font-medium text-blue-500 transition-colors hover:text-blue-700"
            >
              Sign Up
            </Link>
          </Typography>
        </form>
      </Card>
    </div>
  );
}
