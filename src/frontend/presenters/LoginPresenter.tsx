import LoginView from "../views/loginView";
//import { UserAccount, UserData } from "../../backend/model/user";
//import modelthingy for logging users in.

function Login(props) {
  const userLoginData = { username: "", password: "" }; //Could be swapped to "UserAccount" later.
  //let hideErrorTextInView = true;
  function compareUserLoginInfoACB() {
    //if (userLoginData.username == "" || userLoginData.password == "")
    //hideErrorTextInView = false; //Display the error text somehow
    //else
    props.model.logInUser(userLoginData.username, userLoginData.password);
  }
  function updateUsernameInputACB(usernameString: string) {
    //hideErrorTextInView = true;
    userLoginData.username = usernameString;
  }
  function updatePasswordInputACB(passwordString: string) {
    //hideErrorTextInView = true;
    userLoginData.password = passwordString;
  }

  return (
    <LoginView
      //hideErrorText={hideErrorTextInView}
      attemptLogin={compareUserLoginInfoACB}
      onUsernameChange={updateUsernameInputACB}
      onPasswordChange={updatePasswordInputACB}
    />
  );
}
export default Login;
