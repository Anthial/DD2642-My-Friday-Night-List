import { useState } from "react";
import { UserAccount, loginUserWithPassword } from "../../backend/model/user";
import LoginView from "../views/loginView";
import Spinner from "../views/spinnerView"; 
//import { UserAccount, UserData } from "../../backend/model/user";
//import modelthingy for logging users in.

function Login(/*props: any Model*/) {
  const [userLoginData, setUserLoginData] = useState({ email: "", password: "", nickname: "" } as UserAccount);
  const [specifiedErrorText, setErrorText] = useState("");
  const [isWaitingForPromise, setWaitingForPromise] = useState(false);

  function compareUserLoginInfoACB() {
    setErrorText("");

    try {
      if (userLoginData.email == "" || userLoginData.password == "")
        setErrorText("Enter email & password"); //First run should set the text to the specified string
      else
        setErrorText("");
      setWaitingForPromise(true);
      loginUserWithPassword(userLoginData)
        .catch((e: Error) => setErrorText(e.message))
        .finally(() => setWaitingForPromise(false));
    } catch (error: any /* Catch must have any type */) {
      setErrorText(error.message);
      setWaitingForPromise(false);
    }
  }
  function updateEmailInputACB(emailString: string) {
    setErrorText("");
    setUserLoginData({...userLoginData, email: emailString});
  }
  function updatePasswordInputACB(passwordString: string) {
    setErrorText("");
    setUserLoginData({...userLoginData, password: passwordString});
  }

  if(isWaitingForPromise) {
    return <Spinner/>;
  }

  return (
    <LoginView
      loginErrorMessage={specifiedErrorText}
      attemptLogin={compareUserLoginInfoACB}
      onEmailChange={updateEmailInputACB}
      onPasswordChange={updatePasswordInputACB}
    />
  );
}
export default Login;
