// Init Header

export default function Header(){
  const buttonMap = ["Search",
                    "My List",
                    "Account"]

  function HeaderButtonsCB(buttonContent: string){
    const link = "#"+buttonContent.toLowerCase().replaceAll(" ", "");
    return (
      <li key={link} className="grow hover:shadow-lg">
        <button className="bg-[#312244]">
          <a href={link}>{buttonContent}</a>
        </button>
      </li>
    );
  }
  return (
    <div>
      <div className="px-5 py-7 flex justify-evenly items-center bg-[#312244]">
        <h1 className="font-bold text-2xl py-2">My Friday Night List</h1>
        <div className="flex">
          <div className="flex w-72">
            <input className="outline-none w-72 rounded-lg bg-[#212F45]" type="text" placeholder="   Search..." />
          </div>
          <ul className="flex space-x-12">
            {buttonMap.map(HeaderButtonsCB)}
          </ul>
        </div>
      </div>
    </div>);
}