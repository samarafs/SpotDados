import React, { useState } from "react";
import {
  top100Artists,
  top100Album,
  top100Tracks,
  top100ArtistsFromPeriod,
  top100AlbumFromPeriod,
  top100TrackFromPeriod,
} from "../utils/logic";

function Check() {
  const [selectedPeriod, setSelectedPeriod] = useState("allTime");
  const [dataTopSongs, setDataTopSongs] = useState(() => top100Artists());
  const [top100AlbumsList, setTop100AlbumsList] = useState(() => top100Album());
  const [top100TracksList, setTop100TracksList] = useState(() =>
    top100Tracks()
  );

  const updatePeriod = (period) => {
    setSelectedPeriod(period);
    if (period === "allTime") {
      setDataTopSongs(top100Artists());
      setTop100AlbumsList(top100Album());
      setTop100TracksList(top100Tracks());
    }
    if (period === "fourWeeks") {
      setDataTopSongs(top100ArtistsFromPeriod(28));
      setTop100AlbumsList(top100AlbumFromPeriod(28));
      setTop100TracksList(top100TrackFromPeriod(28));
    }
    if (period === "sixMonths") {
      setDataTopSongs(top100ArtistsFromPeriod(180));
      setTop100AlbumsList(top100AlbumFromPeriod(180));
      setTop100TracksList(top100TrackFromPeriod(180));
    }
    if (period === "lastYear") {
      setDataTopSongs(top100ArtistsFromPeriod(365));
      setTop100AlbumsList(top100AlbumFromPeriod(365));
      setTop100TracksList(top100TrackFromPeriod(365));
    }
  };

  return (
    <div>
      <div className="group relative overflow-hidden flex justify-center items-center  transition-shadow hover:shadow-2xl  hover:shadow-black/30">
        <div className="w-full h-full">
          <img
            className="w-full h-60 object-cover rounded-md"
            src="./banner.jpg"
            alt=""
          />

          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black "></div>
          <div className="absolute inset-0 flex justify-center items-center text-white text-3xl capitalize ">
            <h1 className="font-sans font-extrabold text-6xl text-custom-purple">
              Listening Stats
            </h1>
          </div>
        </div>
      </div>

      <div className="flex flex-col justify-center items-center mt-4 ">
        <div className="flex gap-4 mb-5">
          <button
            className={`${
              selectedPeriod === "allTime"
                ? "text-black bg-slate-200"
                : "text-white bg-stone-700 hover:bg-gray-500"
            } py-2 px-8 rounded-full`}
            onClick={() => updatePeriod("allTime")}
          >
            All time
          </button>
          <button
            className={`${
              selectedPeriod === "fourWeeks"
                ? "text-black bg-slate-200"
                : "text-white bg-stone-700 hover:bg-gray-500"
            } py-2 px-8 rounded-full`}
            onClick={() => updatePeriod("fourWeeks")}
          >
            4 weeks
          </button>
          <button
            className={`${
              selectedPeriod === "sixMonths"
                ? "text-black bg-slate-200"
                : "text-white bg-stone-700 hover:bg-gray-500"
            } py-2 px-8 rounded-full`}
            onClick={() => updatePeriod("sixMonths")}
          >
            6 months
          </button>
          <button
            className={`${
              selectedPeriod === "lastYear"
                ? "text-black bg-slate-200"
                : "text-white bg-stone-700 hover:bg-gray-500"
            } py-2 px-8 rounded-full`}
            onClick={() => updatePeriod("lastYear")}
          >
            Last year
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 px-10">
          <ul className="grid grid-cols-1">
            <h1 className="text-white text-xl	font-bold text-start rounded-sm px">Tracks</h1>
            {top100TracksList.map((artist, indexParent) =>
              artist.map(
                (song, index) =>
                  index !== 1 && (
                    <li
                      className="flex flex-col justify-start gap-6 hover:bg-gray-800 e p-2 rounded-lg"
                      key={indexParent}
                    >
                      <div className="flex justify-start ">
                        {" "}
                        <span className="flex justify-center items-center text-white w-10 h-10 rounded-full bg-gradient-to-r from-purple-400 to-pink-600">
                          {indexParent + 1}
                        </span>{" "}
                        <span className="font-semibold px-9 text-white ">
                          {song}
                        </span>{" "}
                      </div>
                    </li>
                  )
              )
            )}
          </ul>

          <ul className="grid grid-cols-1">
            <h2 className="text-white text-white text-xl	font-bold">Artists</h2>
            {dataTopSongs.map((artist, indexParent) =>
              artist.map(
                (song, index) =>
                  index !== 1 && (
                    <li
                    className="flex flex-col justify-start gap-6 hover:bg-gray-800 e p-2 rounded-lg"
                    key={indexParent}
                  >
                    <div className="flex justify-start ">
                      {" "}
                      <span className="flex justify-center items-center text-white w-10 h-10 rounded-full bg-gradient-to-r from-purple-400 to-pink-600">
                        {indexParent + 1}
                      </span>{" "}
                      <span className="font-semibold px-9 text-white ">
                        {song}
                      </span>{" "}
                    </div>
                  </li>
                  )
              )
            )}
          </ul>

          <ul className="grid grid-cols-1">
            <h2 className="text-white text-white text-xl	font-bold">Albums</h2>
            {top100AlbumsList.map((artist, indexParent) =>
              artist.map(
                (song, index) =>
                  index !== 1 && (
                    <li
                    className="flex flex-col justify-start gap-6 hover:bg-gray-800 e p-2 rounded-lg"
                    key={indexParent}
                  >
                    <div className="flex justify-start ">
                      {" "}
                      <span className="flex justify-center items-center text-white w-10 h-10 rounded-full bg-gradient-to-r from-purple-400 to-pink-600">
                        {indexParent + 1}
                      </span>{" "}
                      <span className="font-semibold px-9 text-white ">
                        {song}
                      </span>{" "}
                    </div>
                  </li>
                  )
              )
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Check;
