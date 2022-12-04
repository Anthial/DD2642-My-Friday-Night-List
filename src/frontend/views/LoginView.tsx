function LoginView() {
  function userLogInACB() {
    //somefunctionfrompresenter();
  }
  function userRegisterACB() {
    //show register view
  }
  return (
    <div className="px-5 py-7 flex justify-evenly items-center">
      <div>
        <label className="text-white" htmlFor="Login">
          Log in here
        </label>
        <div>
          <input
            className="text-white mt-2 mb-1 px-2 py-1 rounded-lg bg-[#312244]"
            type="text"
            name="Login"
            id="Username"
            placeholder="A fake name"
            required
          ></input>
        </div>
        <div>
          <input
            className="text-white mt-1 mb-2 px-2 py-1 rounded-lg bg-[#312244]"
            type="password"
            name="Login"
            id="Password"
            placeholder="Password"
            required
          ></input>
        </div>
        <div className="text-white flex justify-start items-center">
          <button
            className="mr-8 px-5 py-1 bg-[#312244]"
            onClick={userLogInACB}
          >
            Log in
          </button>
          <a className="" onClick={userRegisterACB}>
            Or register?
          </a>
        </div>
      </div>
    </div>
  );
}
export default LoginView;
