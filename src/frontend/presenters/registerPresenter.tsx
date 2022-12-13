import RegisterView from "../views/registerView";
import { useState } from "react";
import { UserAccount } from "../../backend/model/user";

function Register(props: any) {
  const userRegitrationData: UserAccount = { username: "", password: "" };
  const [nickname, setNickname] = useState("");
  const [repeatedPassword, setRepeatedPassword] = useState("");
  function attemptUserRegistrationACB() {
    //First error, user must input a name and password
    //Other error, passwords must match
    //Third error, the username already exists
    try {
      if (userRegitrationData.password === repeatedPassword) {
        props.model.createUser(userRegitrationData, nickname);
      }
      else throw new Error('Passwords need to match');
    } catch (error: any){
      
    }
  }
  function updateUsernameInputACB(usernameString: string) {
    userRegitrationData.username = usernameString;
  }
  function updateNicknameInputACB(nicknameString: string) {
    setNickname(nicknameString);
  }
  function updatePasswordInputACB(passwordString: string) {
    userRegitrationData.password = passwordString;
  }
  function updateRepeatedPasswordInputACB(repeatedPasswordString: string) {
    setRepeatedPassword(repeatedPasswordString);
  }

  return (
    <RegisterView
      attemptRegistration={attemptUserRegistrationACB}
      onUsernameChange={updateUsernameInputACB}
      onNicknameChange={updateNicknameInputACB}
      onPasswordChange={updatePasswordInputACB}
      onRepeatedPasswordChange={updateRepeatedPasswordInputACB}
    />
  );
}
export default Register;
