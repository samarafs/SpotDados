import React from "react";
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

function Nav() {
  const playedSongs = getTotalPlayedSongs();
  const listenedSongs = totalListenedSongs();
  const listeningTime = totalListeningTimeSongs();
  const averageListeningTime = findAverageDailyTimeWeListenToSongs();
  const timeOfTheDayTheUserListenedToMusic = timeOfTheDayTheUserListenToSongs();
  const season = toFindWhatSeasonOfTheYearTheUserListenToSongs();
  return (
    <section className="flex w-full gap-2 rounded-md m-2">
      <div className="flex-1 flex flex-col bg-neutral-900">
        <Navbar />
        <h1 className="m-4 font-sans text-3xl font-semibold text-white">
          Your top
        </h1>
        <div className="grid grid-cols-3 gap-14 mx-36 mb-36">
          <ListenerStatistic
            message="Total Listening Sessions"
            color="bg-pink-500"
            statistic={playedSongs}
            subtitle="reproductions"
          />

          <ListenerStatistic
            message="Variety of Tracks Explored"
            color="bg-teal-700"
            statistic={listenedSongs}
            subtitle="tracks"
          />

          <ListenerStatistic
            message="Total Listening Time "
            color="bg-rose-600"
            statistic={listeningTime}
            subtitle="hours"
          />

          <ListenerStatistic
            message="Daily Average Listening"
            color="bg-amber-600"
            statistic={averageListeningTime}
            subtitle="hours per day"
          />

          <ListenerStatistic
            message="Peak Listening Hours"
            color="bg-blue-400"
            statistic={`${timeOfTheDayTheUserListenedToMusic}:00`}
            subtitle="PM"
          />

          <ListenerStatistic
            message="Seasonal Listening Habits"
            color="bg-indigo-700"
            statistic={season}
            subtitle="season"
          />
        </div>
      </div>
    </section>
  );
}

export default Nav;