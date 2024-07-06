import React from "react";
import { useProvider } from "./Sidebar";
import { Link } from "react-router-dom";

function SidebarItem({ icon, text, active, alert ,path , setNavLinkClicked, navLinkClicked}) {
  const { expanded } = useProvider();
  console.log(`context ${expanded}`);
  return (
    <Link to={path} onClick={() => setNavLinkClicked(!navLinkClicked)}>
      <li
        className={`relative flex items-center group py-2 px-3 my-1 font-medium cursor-pointer rounded-md transition-colors ${
          active
            ? "bg-gradient-to-tr from-neutral-600 to-neutral-800 text-neutral-800 "
            : "hover:bg-neutral-500 text-neutral-600"
        }`}
      >
        {icon}
        <span
          className={`overflow-hidden transition-all text-gray-300 ${
            expanded ? "w-52 ml-3" : "w-0"
          }`}
        >
          {text}
        </span>
        {alert && (
          <div
            className={`absolute w-2 h-2 rounded bg-indigo-400 right-2 ${
              expanded ? "" : "top-2"
            }`}
          ></div>
        )}
        {!expanded && (
          <div
            className="absolute left-full rounded-md px-2 py-1 ml-6 z-40
      bg-stone-400 text-stone-950 text-sm invisible  opacity-20 -translate-x-3
      transition-all"
          >
          </div>
        )}
      </li>
    </Link>
  );
}

export default SidebarItem;
