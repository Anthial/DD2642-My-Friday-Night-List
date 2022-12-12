import { useState } from "react";
import LoginView from "../views/LoginView";
//import { UserAccount, UserData } from "../../backend/model/user";
//import modelthingy for logging users in.

function Login(props: any /*Model*/) {
  const userLoginData = { username: "", password: "" }; //Could be swapped to "UserAccount" later.
  const [hideErrorTextInView, toggleText] = useState(Boolean);
  function compareUserLoginInfoACB() {
    if (userLoginData.username === "" || userLoginData.password === "") {
      toggleText(false);
    } else {
      toggleText(true);
      //props.model.logInUser(userLoginData.username, userLoginData.password);

    }
  }
  function updateUsernameInputACB(usernameString: string) {
    userLoginData.username = usernameString;
    //toggleText(true);
  }
  function updatePasswordInputACB(passwordString: string) {
    userLoginData.password = passwordString;
    //toggleText(true);
  }

  return (
    <LoginView
      hideErrorText={hideErrorTextInView}
      attemptLogin={compareUserLoginInfoACB}
      onUsernameChange={updateUsernameInputACB}
      onPasswordChange={updatePasswordInputACB}
    />
  );
}
export default Login;
