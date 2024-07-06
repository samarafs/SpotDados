import React, { useState } from "react";
import { Outlet, useLocation, useParams } from "react-router-dom";
import { GoHome } from "react-icons/go";
import { PiMedal } from "react-icons/pi";
import { FiSearch } from "react-icons/fi";
import Sidebar from "./Sidebar";
import SidebarItem from "./SidebarItem";
import Navbar from "./Navbar";
import ListenerStatistic from "./statistic/ListenerStatistic";
import {
  getTotalPlayedSongs,
  totalListenedSongs,
  totalListeningTimeSongs,
  findAverageDailyTimeWeListenToSongs,
  timeOfTheDayTheUserListenToSongs,
  toFindWhatSeasonOfTheYearTheUserListenToSongs,
} from "../utils/logic";
import { IoMusicalNote } from "react-icons/io5";

// import imageSource from "../assets/Rectangle.png";

function Layout() {
  const [navLinkClicked, setNavLinkClicked] = useState(false);
  const url = useLocation();

  
  console.log(url.pathname);

  return (
    <div className="flex bg-neutral-900 gap-1">
      <div className="flex">
        <Sidebar>
          <SidebarItem
            icon={<GoHome className="text-white w-8 h-8" />}
            text={
              <span className="text-white text-lg font-medium font-sans">
                Home
              </span>
            }
            path="/"
            setNavLinkClicked={setNavLinkClicked}
            navLinkClicked={navLinkClicked}
          />
          <SidebarItem
            icon={<PiMedal className="text-white w-8 h-8" />}
            text={
              <span className="text-white text-lg font-medium font-sans">
                Top 100
              </span>
            }
            path="/home"
            setNavLinkClicked={setNavLinkClicked}
            navLinkClicked={navLinkClicked}
          />
          <SidebarItem
            icon={<FiSearch className="text-white w-8 h-8" />}
            text={
              <span className="text-white text-lg font-medium font-sans">
                Search
              </span>
            }
            path="/search"
            setNavLinkClicked={setNavLinkClicked}
            navLinkClicked={navLinkClicked}
          />
        </Sidebar>
      </div>
      <main className="w-full  bg-neutral-900">
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
