import RegisterView from "../views/registerView";
import { useState } from "react";
import { UserAccount, createUser, UserData } from "../../backend/model/user";
import { useSetRecoilState } from "recoil";

function Register(/*props: any*/) {
  const userRegitrationData: UserAccount = { email: "", password: "", nickname: "" };
  const [specifiedErrorText, setErrorText] = useState("");
  let repeatedPassword = "";
  function attemptUserRegistrationACB() {
    setErrorText("");

    //First error, user must input a name and password
    //Other error, passwords must match
    //Third error, the username already exists
    try {
      if (userRegitrationData.password === repeatedPassword) {
        console.log("SUCCESS");

        let newUser = createUser(userRegitrationData).catch((e: Error) => setErrorText(e.message));
        //let setUser = useSetRecoilState(newUser.catch.prototype);
      } else {
        console.log("NameBP: " + userRegitrationData.email);
        console.log("NickBP: " + userRegitrationData.nickname);
        console.log("Pass1BP: " + userRegitrationData.password);
        console.log("Pass2BP: " + repeatedPassword);


        throw new Error("Passwords need to match");
      }
    } catch (error: any) {
      setErrorText(error.message);
    }
  }
  function updateUsernameInputACB(usernameString: string) {
    console.log("Name: " + usernameString);
    setErrorText("");
    userRegitrationData.email = usernameString;
  }
  function updateNicknameInputACB(nicknameString: string) {
    console.log("Nick: " + nicknameString);
    setErrorText("");
    userRegitrationData.nickname = nicknameString;
  }
  function updatePasswordInputACB(passwordString: string) {
    console.log("Pass1: " + passwordString);
    setErrorText("");
    userRegitrationData.password = passwordString;
  }
  function updateRepeatedPasswordInputACB(repeatedPasswordString: string) {
    console.log("Pass2: " + repeatedPasswordString);
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
