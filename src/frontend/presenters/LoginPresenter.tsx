import { useNavigate } from "react-router";
import { useSetRecoilState } from "recoil";
import { loggedInUserAtom, loginUserWithPassword } from "../../backend/model/user";
import LoginView from "../views/LoginView";
//import { UserAccount, UserData } from "../../backend/model/user";
//import modelthingy for logging users in.

function Login(props: any) {
  const userLoginData = { username: "", password: "" }; //Could be swapped to "UserAccount" later.
  const navigate = useNavigate();
  const setLoggedInUser = useSetRecoilState(loggedInUserAtom);

  //let hideErrorTextInView = true;
  function compareUserLoginInfoACB() {
    //if (userLoginData.username == "" || userLoginData.password == "")
    //hideErrorTextInView = false; //Display the error text somehow
    //else
    loginUserWithPassword({ username: "hacker", password: "hacker"} )
      .then((user) =>  {
        setLoggedInUser(user);
        navigate("mylist")
      })
      .catch((e: Error) => window.alert(e.message));
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
