function RegisterView(props) {
  function usernameValueChangedACB(e) {
    props.onUsernameChange(e.target.value);
  }
  function passwordValueChangedACB(e) {
    props.onPasswordChange(e.target.value);
  }
  function repeatedPasswordValueChangedACB(e) {
    props.onRepeatedPasswordChange(e.target.value);
  }
  function loginButtonPressedACB() {
    props.attemptRegistration();
  }
  function userRegisterACB() {
  }
  return (
    <div className="px-5 py-7 flex justify-center">
      <div>
        <label className="text-white" htmlFor="Login">
          Register an account
        </label>
        <div>
          <input
            className="text-white mt-2 mb-1 px-2 py-1 rounded-lg bg-[#312244]"
            type="text"
            name="Username"
            id="Username"
            placeholder="A fake name"
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
        <div className="mt-1 text-red-500 justify-end">
          {
            "Enter a name and password to register an account / Passwords must be the same / Username already taken"
          }
        </div>
      </div>
    </div>
  );
}
export default RegisterView;
