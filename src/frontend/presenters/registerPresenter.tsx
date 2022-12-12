import RegisterView from "../views/registerView";

function Register(props: any) {
    const userRegitrationData = { username: "", nickname: "", password: "" , repeatedPassword: ""}; //Could be swapped to "UserAccount" later.
    function compareUserLoginInfoACB() {
        if (userRegitrationData.username == "" || userRegitrationData.password == "")
            1; //First error, user must input a name and password
        else if(userRegitrationData.password !== userRegitrationData.repeatedPassword)
            2; //Other error, passwords must match
        else if(props.model.lookUpUser(userRegitrationData.username))
            3; //Third error, the username already exists
      else props.model.logInUser(userRegitrationData.username, userRegitrationData.password);
    }
    function updateUsernameInputACB(usernameString: string) {
        userRegitrationData.username = usernameString;
    }
    function updateNicknameInputACB(nicknameString: string) {
        userRegitrationData.nickname = nicknameString;
      }
    function updatePasswordInputACB(passwordString: string) {
        userRegitrationData.password = passwordString;
    }
    function updateRepeatedPasswordInputACB(repeatedPasswordString: string) {
        userRegitrationData.repeatedPassword = repeatedPasswordString;
      }
  
    return (
      <RegisterView
        attemptRegistration={compareUserLoginInfoACB}
        onUsernameChange={updateUsernameInputACB}
        onNicknameChange={updateNicknameInputACB}
        onPasswordChange={updatePasswordInputACB}
        onRepeatedPasswordChange={updateRepeatedPasswordInputACB}
      />
    );
  }
  export default Register;