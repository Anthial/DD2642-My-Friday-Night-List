import { useState } from "react";
import { UserAccount } from "../../backend/model/user";
import LoginView from "../views/loginView";
//import { UserAccount, UserData } from "../../backend/model/user";
//import modelthingy for logging users in.

function Login(props: any /*Model*/) {
  const userLoginData: UserAccount = { username: "", password: "" }; 
  const [specifiedErrorText, setErrorText] = useState("");
  function compareUserLoginInfoACB() {
    try{
      console.log(specifiedErrorText); //First run should print nothing
      setErrorText("testpleasework"); //First run should set the text to the specified string
      console.log(specifiedErrorText); //First run should print the specified sting, BUT it doesn't!! :/
      //props.model.loginUserWithPassword(userLoginData.username, userLoginData.password);
    } catch(error: any /* Catch must have any type */) {
      setErrorText(error.message);
    }



    /*if (userLoginData.username === "" || userLoginData.password === "") {
      toggleText(false);
    } else {
      toggleText(true);
    }*/
  }
  function updateUsernameInputACB(usernameString: string) {
    /*JUST FOR TESTING*/console.log(usernameString);
    setErrorText("");
    userLoginData.username = usernameString;
    //toggleText(true);
  }
  function updatePasswordInputACB(passwordString: string) {
    /*JUST FOR TESTING*/console.log(passwordString);

    setErrorText("");
    userLoginData.password = passwordString;
    //toggleText(true);
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
