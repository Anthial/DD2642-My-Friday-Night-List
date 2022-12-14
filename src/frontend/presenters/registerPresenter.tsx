import RegisterView from "../views/registerView";
import { useState } from "react";
import { UserAccount } from "../../backend/model/user";

function Register(props: any) {
  const userRegitrationData: UserAccount = { username: "", password: "" };
  const [specifiedErrorText, setErrorText] = useState("");
  let nickname = "";
  let repeatedPassword = "";
  function attemptUserRegistrationACB() {
    setErrorText("");

    //First error, user must input a name and password
    //Other error, passwords must match
    //Third error, the username already exists
    try {
      if (userRegitrationData.password === repeatedPassword) {
        props.model.createUser(userRegitrationData, nickname);
      } else throw new Error("Passwords need to match");
    } catch (error: any) {
      setErrorText(error.message);
    }
  }
  function updateUsernameInputACB(usernameString: string) {
    setErrorText("");
    userRegitrationData.username = usernameString;
  }
  function updateNicknameInputACB(nicknameString: string) {
    setErrorText("");
    nickname = nicknameString;
  }
  function updatePasswordInputACB(passwordString: string) {
    setErrorText("");
    userRegitrationData.password = passwordString;
  }
  function updateRepeatedPasswordInputACB(repeatedPasswordString: string) {
    setErrorText("");
    repeatedPassword = repeatedPasswordString;
  }

  return (
    <RegisterView
      registerErrorMessage={specifiedErrorText}
      attemptRegistration={attemptUserRegistrationACB}
      onUsernameChange={updateUsernameInputACB}
      onNicknameChange={updateNicknameInputACB}
      onPasswordChange={updatePasswordInputACB}
      onRepeatedPasswordChange={updateRepeatedPasswordInputACB}
    />
  );
}
export default Register;
