import LoginView from "../views/loginView";
//import { UserAccount, UserData } from "../../backend/model/user";
//import modelthingy for logging users in.

function Login(props) {
  const userLoginData = { username: "", password: "" }; //Could be swapped to "UserAccount" later.
  function compareUserLoginInfoACB() {
    if (userLoginData.username == "" || userLoginData.password == "")
      1; //Display the error text somehow
    else props.model.logInUser(userLoginData.username, userLoginData.password);
  }
  function updateUsernameInputACB(usernameString: string) {
    userLoginData.username = usernameString;
  }
  function updatePasswordInputACB(passwordString: string) {
    userLoginData.password = passwordString;
  }

  return (
    <LoginView
      attemptLogin={compareUserLoginInfoACB}
      onUsernameChange={updateUsernameInputACB}
      onPasswordChange={updatePasswordInputACB}
    />
  );
}
export default Login;
