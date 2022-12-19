import { useNavigate } from "react-router-dom";
function Spinner() {
  const navigate = useNavigate();
  return (
    <div className="w-full grow flex flex-col justify-center items-center">
      <button className="self-center mb-3 bg-[#4D194D] hover:bg-[#251a33] font-bold" onClick={() => navigate(-1)}>BACK</button>
      <img src="/spinner.svg" alt="Loading" width="128" height="128" />
    </div>
  );
}
export default Spinner;
