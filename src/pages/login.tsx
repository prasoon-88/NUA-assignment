import { Link, useNavigate } from "react-router-dom";
import Input from "../component/input";
import { useState } from "react";
import { handleGoogleSSO, login } from "../utils/api";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const validateForm = () => {
    if (email && password) {
      return true;
    } else {
      return false;
    }
  };

  const handleGoogleLogin = async () => {
    const check = await handleGoogleSSO();
    if (check.state === "success") {
      navigate("/dashboard", { replace: true });
    }
  };

  const onSubmit = async (e: any) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    const check = await login({ email, password });
    if (check) {
      setPassword("");
      navigate("/", { replace: true });
    } else {
      navigate("/dashboard", { replace: true });
    }
  };
  return (
    <div id="loginPage" className="col-md-4 col-12 mx-auto pt-48">
      <form className="" onSubmit={onSubmit}>
        <div className="fs-42 font-700 mt-36 font-lora">
          Log in to TUA Assignment
        </div>
        <div className="mt-24">
          <Input
            classNames="fs-18 p-12 pl-8 pr-8"
            placeholder="Email address"
            value={email}
            onChange={(e: any) => setEmail(e.target.value)}
          />
        </div>
        <div className="mt-18">
          <Input
            classNames="fs-18 p-12 pl-8 pr-8"
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e: any) => setPassword(e.target.value)}
          />
        </div>
        <input
          className="cylinderical-p w-100 mt-25"
          type="submit"
          value="Log in"
        />

        <div className="google-sso mt-24" onClick={handleGoogleLogin}>
          <img
            src="https://cdn1.iconfinder.com/data/icons/google-s-logo/150/Google_Icons-09-512.png"
            alt="Google"
            width={20}
          />
          <div className="fs-16  font-500 lh-20 ml-12">Connect with Google</div>
        </div>
        <div className="mt-40 d-flex justify-content-between primary">
          <Link to={"/signup"}>Sign Up</Link>
        </div>
      </form>

      <h1>For testing </h1>
      <h3>email = test@gmail.com</h3>
      <h3>password = 12345678</h3>
    </div>
  );
};

export default Login;
