import React, { useState } from "react";
import {
  calculateArtistPercentages,
  searchForArtistPercentage,
  top20BestSongsThisArtist,
  top100SongsThisArtistAllTime,
  top100SongsFromPeriod,
  toFindWhatSeasonOfTheYearTheUserListenToSongsThisArtist,
  findNumberOfSongsThisArtistArgs,
  totalListeningOfThisArtistSongs,
  howManyDifferentSongsOfThisArtistIListent,
  toFindThePositionOfTheArtistTop100,
} from "../utils/logic";
import { useParams } from "react-router-dom";
import { RiAlbumFill } from "react-icons/ri";
import { GiLoveSong } from "react-icons/gi";
import { PiMusicNoteSimpleFill } from "react-icons/pi";

function ArthistDetails() {
  const param = useParams();
  const [selectedPeriod, setSelectedPeriod] = useState("allTime");
  const [topSongOfArtist, setTopSongOfArtist] = useState(() =>
    top100SongsThisArtistAllTime(param.id)
  );
  const top20BestSongs = top20BestSongsThisArtist(param.id);
  const seasonOfTheYearTheUserListenToSongsThisArtist =
    toFindWhatSeasonOfTheYearTheUserListenToSongsThisArtist(param.id);
  const numberOfSongsThisArtistArgs = findNumberOfSongsThisArtistArgs(param.id);
  const totalListeningOfThisArtist = totalListeningOfThisArtistSongs(param.id);
  const howManyDifferentSongsOfThisArtist =
    howManyDifferentSongsOfThisArtistIListent(param.id);
  const toFindThePositionOfTheArtist = toFindThePositionOfTheArtistTop100(
    param.id
  );

  const artistPercentage = searchForArtistPercentage(param.id);
  const artistPercentagesLists = calculateArtistPercentages();
  console.log("artis percent ", artistPercentagesLists);

  const updatePeriod = (period) => {
    setSelectedPeriod(period);
    if (period === "allTime") {
      setTopSongOfArtist(top100SongsThisArtistAllTime(param.id));
    }
    if (period === "fourWeeks") {
      setTopSongOfArtist(top100SongsFromPeriod(28, param.id));
    }
    if (period === "sixMonths") {
      setTopSongOfArtist(top100SongsFromPeriod(180, param.id));
    }
    if (period === "lastYear") {
      setTopSongOfArtist(top100SongsFromPeriod(365, param.id));
    }
  };

  return (
    <div>
      <div className="flex flex-col items-center border py-4 px-6">
        <div className="flex gap-4">
          <h1 className="flex text-gray-700 font-semibold  p-6 border bggrad rounded-lg text-center capitalize  bg-gradient-to-r from-teal-400 to-teal-500  hover:bg-gradient-to-r hover:from-pink-500 hover:to-yellow-500">
            {artistPercentage}%
          </h1>
          <h1 className="flex text-gray-700 font-semibold  p-6 border bggrad rounded-lg text-center capitalize  bg-gradient-to-r from-teal-400 to-teal-500  hover:bg-gradient-to-r hover:from-pink-500 hover:to-yellow-500">
            {seasonOfTheYearTheUserListenToSongsThisArtist}
          </h1>
          <h1 className="flex text-gray-700 font-semibold  p-6 border bggrad rounded-lg text-center capitalize  bg-gradient-to-r from-teal-400 to-teal-500  hover:bg-gradient-to-r hover:from-pink-500 hover:to-yellow-500">
            number of songs the Artist listen {numberOfSongsThisArtistArgs}
          </h1>
          <h1 className="flex text-gray-700 font-semibold  p-6 border bggrad rounded-lg text-center capitalize  bg-gradient-to-r from-teal-400 to-teal-500  hover:bg-gradient-to-r hover:from-pink-500 hover:to-yellow-500">
            total listening time: {totalListeningOfThisArtist} h
          </h1>
          <h1 className="flex text-gray-700 font-semibold  p-6 border bggrad rounded-lg text-center capitalize  bg-gradient-to-r from-teal-400 to-teal-500  hover:bg-gradient-to-r hover:from-pink-500 hover:to-yellow-500">
            number of different songs the Artist{" "}
            {howManyDifferentSongsOfThisArtist}
          </h1>
          <h1 className="flex text-gray-700 font-semibold  p-6 border bggrad rounded-lg text-center capitalize  bg-gradient-to-r from-teal-400 to-teal-500  hover:bg-gradient-to-r hover:from-pink-500 hover:to-yellow-500">
            The Position of The Artist between top 100{" "}
            {toFindThePositionOfTheArtist}
          </h1>
        </div>

        <div className="flex gap-4 mb-5 mt-5">
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
      </div>
      <div>
        <h1 className="flex text-gray-300 font-semibold  p-2 rounded-lg text-center capitalize my-4">
          top 20 best songs from{" "}
          <span className="font-semibold text-orange-400 flex">
            <PiMusicNoteSimpleFill size={20} color="white" />
            {param.id}
          </span>
        </h1>
        <ul className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4">
          {topSongOfArtist.map((song, index) => {
            return (
              <li
                className="flex flex-col  text-white px-4 m-2 rounded py-4 bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500 "
                key={index}
              >
                <h1 className="flex items-center gap-3">
                  <RiAlbumFill size={20} color="black" />
                  Album Name : {song.master_metadata_album_album_name}
                </h1>
                <h1 className="flex items-center gap-3">
                  <GiLoveSong size={20} color="black" /> Song Name :{" "}
                  {song.master_metadata_track_name}
                </h1>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default ArthistDetails;
