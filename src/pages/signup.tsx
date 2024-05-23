import { Link, useNavigate } from "react-router-dom";
import Input from "../component/input";
import { useState } from "react";
import { checkUser, sendOTP, signUp } from "../utils/api";
import { generateOTP, isValidEmail } from "../utils";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [step, setStep] = useState<number>(1);
  const [otp, setOtp] = useState("");
  const [userEnteredOTP, setUserEnteredOTP] = useState("");
  const navigate = useNavigate();

  const validateForm = () => {
    if (!isValidEmail(email)) {
      setEmail("");
      return false;
    } else if (!name || !password || !confirmPassword) {
      return false;
    } else if (password !== confirmPassword) {
      setConfirmPassword("");
      return false;
    } else if (step === 2 && !userEnteredOTP) {
      return false;
    } else if (step === 2 && otp !== userEnteredOTP) {
      setUserEnteredOTP("");
      return false;
    }
    return true;
  };

  const onSubmit = async () => {
    if (!validateForm()) {
      return;
    } else if (step === 1) {
      const otp = generateOTP();
      const user = await checkUser(email);
      if (!user || !user.data) {
        const resp = await sendOTP(email, otp);
        if (resp) {
          setOtp(otp);
          setStep(2);
        }
      }
    } else if (step === 2) {
      const check = await signUp({ name, email, password });
      if (check.state === "success") {
        navigate("/login");
      } else {
        setPassword("");
        setConfirmPassword("");
      }
    }
  };

  return (
    <div id="loginPage" className="col-md-4 col-12 mx-auto mt-24">
      <div className="fs-42 font-700 mt-36 font-lora">Create an Account</div>
      {step === 1 ? (
        <>
          <div className="mt-24">
            <Input
              classNames="fs-18 p-12 pl-8 pr-8"
              placeholder="Name"
              value={name}
              onChange={(e: any) => setName(e.target.value)}
            />
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
          <div className="mt-18">
            <Input
              classNames="fs-18 p-12 pl-8 pr-8"
              placeholder="Conform Password"
              type="password"
              value={confirmPassword}
              onChange={(e: any) => setConfirmPassword(e.target.value)}
            />
          </div>
          <button className="cylinderical-p w-100 mt-25" onClick={onSubmit}>
            Next
          </button>
        </>
      ) : (
        step === 2 && (
          <>
            <div className="mt-18">
              <Input
                classNames="fs-18 p-12 pl-8 pr-8"
                placeholder="Enter OTP"
                value={userEnteredOTP}
                onChange={(e: any) => setUserEnteredOTP(e.target.value)}
              />
            </div>
            <button className="cylinderical-p w-100 mt-25" onClick={onSubmit}>
              Sign Up
            </button>
          </>
        )
      )}

      <Link
        to={"/login"}
        className="mt-40 d-flex justify-content-center primary cursor-pointer"
      >
        Click here for Login
      </Link>
    </div>
  );
};

export default Signup;
