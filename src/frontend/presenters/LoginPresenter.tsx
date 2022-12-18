import React from "react";
import { UserAccount, loginUserWithPassword } from "../../backend/model/user";
import LoginView from "../views/loginView";
//import { UserAccount, UserData } from "../../backend/model/user";
//import modelthingy for logging users in.

function Login(/*props: any Model*/) {
  let userLoginData: UserAccount = { username: "", password: "" };
  const [specifiedErrorText, setErrorText] = React.useState("");
  function compareUserLoginInfoACB() {
    setErrorText("");

    try {
      /*JUST FOR TESTING*/
      console.log("name L: " + userLoginData.username);
      console.log("pass L: " + userLoginData.password);
      /*JUST FOR TESTING*/

      if (userLoginData.username == "" || userLoginData.password == "")
        setErrorText("Enter username & password"); //First run should set the text to the specified string
      else
        setErrorText("");
      loginUserWithPassword(userLoginData);
    } catch (error: any /* Catch must have any type */) {
      setErrorText(error.message);
    }
  }
  function updateUsernameInputACB(usernameString: string) {
    /*JUST FOR TESTING*/ console.log("name: " + usernameString);
    setErrorText("");
    userLoginData.username = usernameString;
  }
  function updatePasswordInputACB(passwordString: string) {
    /*JUST FOR TESTING*/ console.log("pass: " + passwordString);

    setErrorText("");
    userLoginData.password = passwordString;
  }

  return (
    <LoginView
      loginErrorMessage={specifiedErrorText}
      attemptLogin={compareUserLoginInfoACB}
      onUsernameChange={updateUsernameInputACB}
      onPasswordChange={updatePasswordInputACB}
    />
  );
}
export default Login;
