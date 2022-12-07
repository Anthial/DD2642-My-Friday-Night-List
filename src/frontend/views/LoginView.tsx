import {Link} from "react-router-dom"

function LoginView(props: any) {

  function usernameValueChangedACB(e: any) {
    props.onUsernameChange(e.target.value);
  }
  function passwordValueChangedACB(e: any) {
    props.onPasswordChange(e.target.value);
  }
  function loginButtonPressedACB() {
    /* if() the input value of either username or password is null/empty. Maybe do this is presenter, but how? */
    props.attemptLogin();
  }
  function userRegisterACB() {
    //show register view
  }
  return (
    <div className="px-5 py-7 flex justify-center">
      <div>
        <label className="text-white" htmlFor="Login">
          Log in here
        </label>
        <div>
          <input
            className="text-white mt-2 mb-1 px-2 py-1 rounded-lg bg-[#312244]"
            type="text"
            name="Username"
            id="Username"
            placeholder="Username"
            onChange={usernameValueChangedACB}
            required
          ></input>
        </div>
        <div>
          <input
            className="text-white mt-1 mb-2 px-2 py-1 rounded-lg bg-[#312244]"
            type="password"
            name="Password"
            id="Password"
            placeholder="Password"
            onChange={passwordValueChangedACB}
            required
          ></input>
        </div>
        <div className="text-white">
          <Link to="/mylist">
          <button
            className="px-5 py-1 bg-[#312244]"
            onClick={loginButtonPressedACB}
          >
            Log in
          </button>
          </Link>
          <Link to="register" className="ml-8" onClick={userRegisterACB}>
            Or register?
          </Link>
        </div>
        <div className="mt-1 text-red-500 justify-end" hidden={true/* Tills vidare... */}>
          You must enter both username and password in order to log in
        </div>
      </div>
    </div>
  );
}
export default LoginView;
