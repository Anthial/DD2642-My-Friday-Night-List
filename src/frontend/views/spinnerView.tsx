import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
function Spinner() {
  const [showBackButton, setShowBackButton] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const timeout = setTimeout(() => setShowBackButton(true), 7000);
    return () => clearTimeout(timeout);
  })

  return (
    <div className="w-full grow flex flex-col justify-center items-center">
      <img src="/spinner.svg" alt="Loading" width="128" height="128" />
      {showBackButton && <button className="self-center mb-3 bg-[#4D194D] hover:bg-[#251a33] font-bold" onClick={() => navigate(-1)}>Back</button>}
    </div>
  );
}
export default Spinner;
