// Init Header
import {Link} from "react-router-dom"
import r from "react"
import { IconMenu2 } from "@tabler/icons";

function Header(props:any){
  const mobileMap = ["List","Log Out"]
  const buttonMap = ["Search", ... mobileMap];
  const [menuClicked, setMenuClicked] = r.useState(false);

  function HeaderButtonsCB(buttonContent: string){
    let link = buttonContent.toLowerCase().replaceAll(" ", "");
    let func = () => {
      setMenuClicked(false);
    }
    let style = "opacity-100 hover:shadow-lg";
    if (link === "search"){
      func = () => {
        setMenuClicked(false);
        props.search();
      }
      if(!props.canSearch) {
        style = "pointer-events-none opacity-80";
      }
    }
    if (link === "list"){
      link = "";
      buttonContent = `${props.user.nickname}'s ${buttonContent}`;
    }
    link = "/"+link;
    return (
      <li key={link} className={`grow ${style}`}>
        <Link to={link}>
          <button className="bg-[#312244] hover:bg-[#251a33]"  onClick={func}>
            {buttonContent}
          </button>
        </Link>
      </li>
    );
  }

  return (
    <div>
      <div className="px-5 py-7 flex justify-evenly items-center bg-[#312244]">
        <div className="hidden lg:flex">
          <Link to={"/"} className="hover:bg-[#251a33] rounded-xl "><h1 className="font-bold text-2xl py-2 mr-10 pl-10 text-center">My Friday Night List</h1></Link>
          <div className="flex">
            <div className="flex w-72 mr-4">
              <input className="outline-none w-72 rounded-lg bg-[#212F45] pl-4" type="text" placeholder="Search..." value={props.value} onChange={(e) => props.setQuery(e.target.value)} onKeyDown={(e)=> {if (e.key === "Enter") props.search()}}/>
            </div>
            <ul className="flex space-x-2">
              {buttonMap.map(HeaderButtonsCB)}
            </ul>
          </div>
        </div>
        
        <div className="flex justify-between w-full items-center lg:hidden ">
        <Link to={"/"} className="hover:bg-[#251a33] rounded-md "><h1 className="font-bold text-xl mr-5 pl-5">M.F.N.L</h1></Link>
          <div className="flex h-12">
              <input className="outline-none w-full rounded-lg bg-[#212F45] pl-4" type="text" placeholder="Search..." value={props.value} onChange={(e) => props.setQuery(e.target.value)} onKeyDown={(e)=> {if (e.key === "Enter") props.search()}}/>
          </div>
          <div className="flex justify-end items-end">
            <button className="bg-[#312244] w-full h-12" onClick={()=> setMenuClicked(!menuClicked)}> 
              <IconMenu2></IconMenu2>
            </button>
          </div>
        </div>
      </div>
      <div className="w-full flex flex-col justify-end text-center items-end bg-[#312244] lg:hidden ">
      <ul className={menuClicked ? "transition ease-in delay-90 opacity-100 shadow-lg" : "hidden"}>{mobileMap.map(HeaderButtonsCB)}</ul>
      </div>
    </div>);
}

function NotLoggedInHeader(){
  return (
    <div>
      <div className="px-5 py-7 flex justify-evenly items-center bg-[#312244]">
        <div className="hidden lg:flex">
        <Link to={"/"} className="hover:bg-[#251a33] rounded-xl "><h1 className="font-bold text-2xl py-2">My Friday Night List</h1></Link>
        </div>
        
        <div className="flex justify-center w-full items-center lg:hidden ">
          <Link to={"/"} className="hover:bg-[#251a33] rounded-md "><h1 className="font-bold text-xl">M.F.N.L</h1></Link>
        </div>
      </div>
    </div>);
}

export {Header, NotLoggedInHeader}