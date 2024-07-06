import { useState } from "react";
import { allArthistList, searchArtistDetails } from "../utils/logic";
import { Link } from "react-router-dom";
import { MdSettingsVoice } from "react-icons/md";
import { FiSearch } from "react-icons/fi";
import { SiYoutubemusic } from "react-icons/si";

function Search() {
  const [seeMore, setSeeMore] = useState(false);
  const [search, setSearch] = useState("");
  const [showList, setShowList] = useState(false);
  const artistList = allArthistList();
  const artistDetails = searchArtistDetails(search);
  console.log("Artist List", artistDetails);

  const handleInputChange = (e) => {
    setSearch(e.target.value);
    setShowList(e.target.value !== ""); // Show list if input is not empty
  };

  const handleMouseLeave = () => {
    setShowList(false); // Hide list when mouse leaves input field
  };

  return (
    <div className="flex flex-col h-full">
      <div
        className="flex relative flex-col w-full ml-32"
        onMouseLeave={handleMouseLeave}
      >
        <div className="relative w-96 mt-10 ">
          <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            autocomplete="off"
            className="w-full h-[37px] pl-10 pr-12 py-2.5 bg-white rounded-[500px] text-sm font-normal font-sans placeholder-neutral-500"
            value={search}
            onChange={handleInputChange}
            type="search"
            placeholder="What do you want to listen to?"
            name="search"
            id="search"
          />
        </div>
        <h1 className="text-white text-xl font-bold font-sans mt-20">
          {" "}
          Browse all
        </h1>
        {showList &&
          search && ( // Only render list if showList is true and search input is not empty
            <ul className="absolute top-20 h-60 overflow-auto shadow-2xl rounded-md w-96 bg-neutral-700 z-50">
              {artistDetails.map((artist, index) => (
                <Link to={`/arthist/${artist}`} key={index}>
                  <li
                    className=" text-white font-sans text-sm flex  justify-start gap-5 py-2 px-4 rounded-lg hover:bg-neutral-600 cursor-pointer"
                    key={index}
                  >
                    {artist}
                  </li>
                </Link>
              ))}
            </ul>
          )}
      </div>

      <div className="flex flex-col w-full">
        <button
          className="self-end mr-10 bg-zinc-800 py-2 px-3 rounded-full text-white font-sans text-xs font-medium hover:bg-zinc-300 hover:text-neutral-900"
          onClick={() => setSeeMore(!seeMore)}
        >
          {seeMore ? "See less" : "See more"}
        </button>
        <ul className="my-10 ml-32 mr-10 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 justify-center gap-6">
          {artistList.map((artist, index) => {
            if (!seeMore && index >= 20) {
              return null; // Skip rendering this item
            }
            return (
              <Link to={`/arthist/${artist}`} key={index}>
                <li
                  className="relative w-52 h-52 p-5 bg-green-500 shadow-2xl rounded-lg overflow-hidden transition-all duration-300 ease-in-out hover:shadow-2xl hover:bg-gradient-to-t from-transparent to-neutral-900 hover:scale-105"
                  key={index}
                >
                  <div className="text-white text-xl font-bold font-sans leading-[38.40px]">
                    {artist}
                  </div>
                  <SiYoutubemusic className="absolute right-5 bottom-5 w-[50px] h-[50px] origin-top-left hover:text-white" />
                </li>
              </Link>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default Search;
