import { createContext, useContext, useState } from "react";
import { MdKeyboardArrowRight, MdKeyboardArrowLeft } from "react-icons/md";
import { MdMoreVert } from "react-icons/md";

const SideBarContext = createContext();
function Sidebar(props) {
 
  const [expanded, setExpanded] = useState(true);
  return (
    <aside className="flex-1 h-screen bg-stone-950 rounded-md sticky top-0 ">
      <nav className="h-full flex flex-col shadow-sm bg-stone-950 rounded-md">
        <div className="HEADER-NAV flex justify-between items-center p-4 border-b border-stone-950 pb-2">
          <img
            src=""
            className={`overflow-hidden transition-all ${
              expanded ? "w-8" : "w-0"
            }`}
            alt=""
          />
          <button
            onClick={() => setExpanded(!expanded)}
            className="p-1.5 bg-neutral-700 rounded-lg hover:bg-neutral-500"
          >
            {expanded ? (
              <MdKeyboardArrowLeft size={30} color="white" />
            ) : (
              <MdKeyboardArrowRight size={30} color="white" />
            )}
          </button>
        </div>
        <SideBarContext.Provider value={{ expanded }}>
          <ul className="flex-1 px-3 py-2">{props.children}</ul>
        </SideBarContext.Provider>
        <div className="border-t-gray-600 border-t flex p-3">
          <img
            src="https://avatars.githubusercontent.com/u/39876?v=4"
            className="w-8 h-8 rounded-full object-cover"
            alt=""
          />
          <div
            className={`flex justify-between items-center overflow-hidden transition-all 
            ${expanded ? "w-52 ml-3" : "w-0"}`}
          >
            <div className="leading-4">
              <h4 className="font-semibold text-gray-300">Samara</h4>
              <p className="text-sm text-gray-400">samara.f@gmail.com</p>
            </div>
            <MdMoreVert className="text-gray-300" size={20} />
          </div>
        </div>
      </nav>
    </aside>
  );
}
export const useProvider = () => useContext(SideBarContext);

export default Sidebar;
