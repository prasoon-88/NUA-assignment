import { collection, doc, getDoc, setDoc } from "firebase/firestore";
import { GoogleLogin, firestore } from "./firebase";
import { enCrypt, isValidEmail, sendMail, setCookie } from ".";

interface MessageProp {
  state: "success" | "error" | "warning";
  msg: string;
}

const createMsg = ({ state, msg }: MessageProp): MessageProp => {
  return { state, msg };
};

// For SignUp
export const signUp = async (data: any): Promise<MessageProp> => {
  try {
    const collectionRef = collection(firestore, "users");
    const userRef = doc(collectionRef, data.email);
    const user = await getDoc(userRef);
    if (user.data()) {
      return createMsg({ state: "warning", msg: "User Already Exists" });
    } else {
      await setDoc(userRef, {
        userName: data.userName ? data.userName : "",
        password: data.password ? data.password : "",
        email: data.email ? data.email : "",
      });

      return createMsg({
        state: "success",
        msg: "Your account has been created.",
      });
    }
  } catch (error: any) {
    return createMsg({
      state: "error",
      msg: "Something Went Wrong",
    });
  }
};

export const login = async (payload: any) => {
  try {
    const { data } = await checkUser(payload.email);
    if (data && data.password === payload.password) {
      setCookie("auth", enCrypt(data.email));
      return true;
    }
    return false;
  } catch (error) {
    console.log(error);
  }
};

export const checkUser = async (email: string) => {
  try {
    const collectionRef = collection(firestore, "users");
    const userRef = doc(collectionRef, email);
    const user = await getDoc(userRef);

    return user.data() ? { userRef, data: user.data() } : {};
  } catch (error: any) {
    return {};
  }
};

export const sendOTP = async (email: string, otp: string) => {
  try {
    if (isValidEmail(email)) {
      return await sendMail(email, otp);
    } else {
      return false;
    }
  } catch (error: any) {
    return false;
  }
};

export const handleGoogleSSO = async (): Promise<MessageProp> => {
  try {
    const collectionRef = collection(firestore, "users");
    const credential = await GoogleLogin();
    if (credential.user && credential.user.email) {
      const userRef: any = doc(collectionRef, credential.user.email);
      const user = await getDoc(userRef);
      if (!user.exists()) {
        await signUp({
          name: credential.user.displayName,
          email: credential.user.email,
          loginType: "sso",
        });
      }
      setCookie("auth", enCrypt(credential.user.email));
      return createMsg({
        state: "success",
        msg: `Hi ${credential.user.displayName}! Welcome on Twitter`,
      });
    }
  } catch (error: any) {
    console.log(error);
  }
  return createMsg({
    state: "error",
    msg: "Something Went Wrong",
  });
};
