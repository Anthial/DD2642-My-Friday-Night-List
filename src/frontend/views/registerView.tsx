function RegisterView(props: any /* Model */) {
  function usernameValueChangedACB(e: any) {
    props.onUsernameChange(e.target.value);
  }
  function nicknameValueChangedACB(e: any) {
    props.onNicknameChange(e.target.value);
  }
  function passwordValueChangedACB(e: any) {
    props.onPasswordChange(e.target.value);
  }
  function repeatedPasswordValueChangedACB(e: any) {
    props.onRepeatedPasswordChange(e.target.value);
  }
  function loginButtonPressedACB() {
    props.attemptRegistration();
  }
  function userRegisterACB() {}
  return (
    <div className="container mx-auto max-w-sm m-8 bg-gradient-to-br from-[#312244] via-purple-900 to-[#312244] rounded-xl bg-contain mx-auto px-2 py-2 ">
      <div className="bg-gradient-to-br from-[#101E34] via-purple-900 to-[#101E34] p-10 flex flex-col items-center rounded-lg">
        <label className="text-white" htmlFor="Login">
          Register an account
        </label>
        <div>
          <input
            className="text-white mt-2 mb-1 px-2 py-1 rounded-lg bg-[#312244]"
            type="text"
            name="Username"
            id="Username"
            placeholder="Email"
            onChange={usernameValueChangedACB}
            required
          ></input>
        </div>
        <div>
          <input
            className="text-white mt-1 mb-1 px-2 py-1 rounded-lg bg-[#312244]"
            type="text"
            name="Nickname"
            id="Nickname"
            placeholder="Nickname"
            onChange={nicknameValueChangedACB}
            required
          ></input>
        </div>
        <div>
          <input
            className="text-white mt-1 mb-1 px-2 py-1 rounded-lg bg-[#312244]"
            type="password"
            name="Password"
            id="Password"
            placeholder="Password"
            onChange={passwordValueChangedACB}
            required
          ></input>
        </div>
        <div>
          <input
            className="text-white mt-1 mb-2 px-2 py-1 rounded-lg bg-[#312244]"
            type="password"
            name="PasswordRepeated"
            id="PasswordRepeated"
            placeholder="Repeat password"
            onChange={repeatedPasswordValueChangedACB}
            required
          ></input>
        </div>
        <div className="text-white">
          <button
            className="px-11 py-1 bg-[#312244]"
            onClick={loginButtonPressedACB}
          >
            Register account
          </button>
        </div>
        <div className="mt-1 text-red-500 justify-end" hidden={props.registerErrorMessage == ""}>
          {props.registerErrorMessage
          /* "Enter a name and password to register an account / Passwords must be the same / Username already taken" */
          }
        </div>
      </div>
    </div>
  );
}
export default RegisterView;
