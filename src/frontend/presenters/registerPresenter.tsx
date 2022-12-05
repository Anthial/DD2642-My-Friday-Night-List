import RegisterView from "../views/registerView";

function Register(props) {
    const userLoginData = { username: "", password: "" , repeatedPassword: ""}; //Could be swapped to "UserAccount" later.
    function compareUserLoginInfoACB() {
        if (userLoginData.username == "" || userLoginData.password == "")
            1; //First error, user must input a name and password
        else if(userLoginData.password !== userLoginData.repeatedPassword)
            2; //Other error, passwords must match
        else if(props.model.lookUpUser(userLoginData.username))
            3; //Third error, the username already exists
      else props.model.logInUser(userLoginData.username, userLoginData.password);
    }
    function updateUsernameInputACB(usernameString: string) {
      userLoginData.username = usernameString;
    }
    function updatePasswordInputACB(passwordString: string) {
      userLoginData.password = passwordString;
    }
    function updateRepeatedPasswordInputACB(repeatedPasswordString: string) {
        userLoginData.repeatedPassword = repeatedPasswordString;
      }
  
    return (
      <RegisterView
        attemptRegistration={compareUserLoginInfoACB}
        onUsernameChange={updateUsernameInputACB}
        onPasswordChange={updatePasswordInputACB}
        onRepeatedPasswordChange={updateRepeatedPasswordInputACB}
      />
    );
  }
  export default Register;