import history from "./h.json"


export function getHistoryElement() {
  return history
}

export function getTotalPlayedSongs() {
  let count = 0
  for (let song of history) {
    if (song.master_metadata_track_name !== null) {
      count += 1
    }
  }
  return count
}
export function getAllAlbums() {
  return history.map((song) => song.master_metadata_album_album_name)
}
export function totalListeningTimeSongs() {
  const miliseconds = history.reduce((acc, song) => acc + song.ms_played, 0)

  return Math.floor(miliseconds / 1000 / 60 / 60)
}

// export async function totalListenedSongs() {

//     const numberOfSongs = {}
//     for( let song of history){
//         if(song.reason_end === "trackdone"){
//             numberOfSongs[song.master_metadata_track_name] = 
//             numberOfSongs[song.master_metadata_track_name] ? 
//             numberOfSongs[song.master_metadata_track_name]  : 1
//         }
//     }

//     return Object.values(numberOfSongs).reduce((acc, val) => acc + val, 0)
// }

export function totalListenedSongs() {

  const reproducoes = history.filter((e) => e.master_metadata_track_name !== null);
  let musicasSemRepetir = [
    ...new Set(reproducoes.map((e) => e.master_metadata_track_name)),
  ];
  return musicasSemRepetir.length
}



//   jUst we have talk with Trainer 
export function findAverageDailyTimeWeListenToSongs() {

  let hours = 0
  let daysDifference = 0
  for (let song of history) {
    if (song.skipped !== true && song.episode_name === null) {
      // find hour 
      const miliseconds = history.reduce((acc, song) => acc + song.ms_played, 0)
      hours = Math.floor(miliseconds / 1000 / 60 / 60)


      // find avarage days
      const currentDate = new Date("2023-12-18")
      const endDate = new Date("2020-06-01")

      let differenceInMilliseconds = currentDate - endDate

      daysDifference = Math.ceil(differenceInMilliseconds / (1000 * 60 * 60 * 24)); // convert to day

    }
  }
  let hour = Math.floor(hours / daysDifference)

  let minutes = Math.round(((hours / daysDifference) - hour) * 60)
  return `${hour}:${minutes}`

}


export function timeOfTheDayTheUserListenToSongs() {
  let hourCount = {}
  history.forEach((song) => {
    let hour = new Date(song.ts).getHours()
    hourCount[hour] = hourCount[hour] ? hourCount[hour] + 1 : 1
  })
  //find the max value 5
  const maxValue = Math.max(...Object.values(hourCount))

  let mostFrequentHours = Object.keys(hourCount).filter((key) => hourCount[key] === maxValue)

  return mostFrequentHours
}

export function toFindWhatSeasonOfTheYearTheUserListenToSongs() {
  const timeAndSeason = [];

  // Define the starting and ending dates for each season
  const seasons = [
    { name: "spring", startMonth: 3, startDate: 21, endMonth: 6, endDate: 20 },
    { name: "summer", startMonth: 6, startDate: 21, endMonth: 9, endDate: 20 },
    { name: "autumn", startMonth: 9, startDate: 21, endMonth: 12, endDate: 20 },
    { name: "winter", startMonth: 12, startDate: 21, endMonth: 3, endDate: 20 }
  ];

  // Loop through each season
  seasons.forEach(({ name, startMonth, startDate, endMonth, endDate }) => {
    // Filter songs that belong to the current season
    const songsInSeason = history.filter(song => {
      const songDate = new Date(song.ts);
      const songMonth = songDate.getMonth() + 1; // Months are zero-based, so we add 1
      const songDay = songDate.getDate();
      return (
        (songMonth === startMonth && songDay >= startDate) ||
        (songMonth > startMonth && songMonth < endMonth) ||
        (songMonth === endMonth && songDay <= endDate)
      );
    });

    // Calculate total listening time for songs in the current season
    const totalMsPlayed = songsInSeason.reduce((total, song) => total + song.ms_played, 0);

    // Store the total listening time for the current season
    timeAndSeason.push({ season: name, time: totalMsPlayed });
  });

  let maxTime = 0;
  let seasonsss = null;

  timeAndSeason.forEach(({ season, time }) => {
    if (time > maxTime) {
      maxTime = time;
      seasonsss = season;
    }
  });
  return seasonsss
}




export function top100Artists() {
  const artistPlayCount = {};

  for (let song of history) {
    if (song.master_metadata_track_name !== null) {
      const artistName = song.master_metadata_album_artist_name;

      if (artistName in artistPlayCount) {
        artistPlayCount[artistName]++;
      } else {
        artistPlayCount[artistName] = 1;
      }
    }
  }

  const artistPlayCountArray = Object.entries(artistPlayCount);

  artistPlayCountArray.sort((a, b) => b[1] - a[1]);

  const top100Artists = artistPlayCountArray.slice(0, 100);
  return top100Artists;
}

export function top100ArtistsArgs(histories) {
  const artistPlayCount = {};

  for (let song of histories) {
    if (song.master_metadata_track_name !== null) {
      const artistName = song.master_metadata_album_artist_name;

      if (artistName in artistPlayCount) {
        artistPlayCount[artistName]++;
      } else {
        artistPlayCount[artistName] = 1;
      }
    }
  }

  const artistPlayCountArray = Object.entries(artistPlayCount);

  artistPlayCountArray.sort((a, b) => b[1] - a[1]);

  const top100Artists = artistPlayCountArray.slice(0, 100);
  return top100Artists;
}


export function top100ArtistsFromPeriod(periodInDays) {
  // Ultima data que alguma musica foi ouvida
  const lastListenedDate = new Date(history[history.length - 1].ts);

  const daysBefore = new Date(lastListenedDate);
  daysBefore.setDate(lastListenedDate.getDate() - periodInDays); // 180 dias = 6 meses

  const filteredHistory = history.filter(
    (song) =>
      new Date(song.ts) >= daysBefore &&
      new Date(song.ts) <= lastListenedDate
  )

  return top100ArtistsArgs(filteredHistory);
}

export function top100Album() {
  const albumPlayCount = {};
  for (let song of history) {
    if (song.master_metadata_track_name !== null) {
      const albumName = song.master_metadata_album_album_name;

      if (albumName in albumPlayCount) {
        albumPlayCount[albumName]++;
      } else {
        albumPlayCount[albumName] = 1;
      }
    }
  }
  const albumPlayCountArray = Object.entries(albumPlayCount);

  albumPlayCountArray.sort((a, b) => b[1] - a[1]);

  const top100Album = albumPlayCountArray.slice(0, 100);

  return top100Album;
}
//==============================================

export function top100AlbumArgs(histories) {
  const albumPlayCount = {};
  for (let song of histories) {
    if (song.master_metadata_track_name !== null) {
      const albumName = song.master_metadata_album_album_name;

      if (albumName in albumPlayCount) {
        albumPlayCount[albumName]++;
      } else {
        albumPlayCount[albumName] = 1;
      }
    }
  }
  const albumPlayCountArray = Object.entries(albumPlayCount);

  albumPlayCountArray.sort((a, b) => b[1] - a[1]);

  const top100Album = albumPlayCountArray.slice(0, 100);
  return top100Album;
}

export function top100AlbumFromPeriod(periodInDays) {

  const lastListenedDate = new Date(history[history.length - 1].ts);

  const daysBefore = new Date(lastListenedDate);
  daysBefore.setDate(lastListenedDate.getDate() - periodInDays);

  const filteredHistory = history.filter(
    (song) =>
      new Date(song.ts) >= daysBefore && new Date(song.ts) <= lastListenedDate
  );

  return top100AlbumArgs(filteredHistory);
}


export function top20BestSongsThisArtist(artistName) {
  const top20BestSongsThisArtist = history
    .filter((song) => song.master_metadata_album_artist_name === artistName)
    .sort((a, b) => b.ms_played - a.ms_played)

  const uniqueArtistPercentages = new Set();
  const uniqueArtistPercentagesArray = [];

  top20BestSongsThisArtist.forEach(song => {
    if (!uniqueArtistPercentages.has(song.master_metadata_track_name)) {
      uniqueArtistPercentages.add(song.master_metadata_track_name);
      uniqueArtistPercentagesArray.push(song);
    }
  });
  return uniqueArtistPercentagesArray.slice(0, 20);
}


export function thePositionOfTheArtistTop100(artistName) {
  const artists = top100Artists();
  const position = artists.findIndex((artist) => artist[0] === artistName);
  return position + 1
}



export function searchArtistDetails(artistName) {
  const result = history.filter((song) => {
    const artist = song.master_metadata_album_artist_name;
    return artist && artist.toLowerCase().includes(artistName.toLowerCase());
  });
  return [...new Set(result.map((e) => e.master_metadata_album_artist_name))];
}


export function allArthistList() {
  const artistList = [];
  for (let song of history) {
    if (song.master_metadata_album_artist_name !== null) {
      artistList.push(song.master_metadata_album_artist_name);
    }
  }
  return [...new Set(artistList)];
}
///=============================================No checked 
export function top100Tracks() {
  const trackPlayCount = {};
  for (let song of history) {
    if (song.master_metadata_track_name !== null) {
      const trackName = song.master_metadata_track_name;

      if (trackName in trackPlayCount) {
        trackPlayCount[trackName]++;
      } else {
        trackPlayCount[trackName] = 1;
      }
    }
  }
  const trackPlayCountArray = Object.entries(trackPlayCount);

  trackPlayCountArray.sort((a, b) => b[1] - a[1]);

  const top100Tracks = trackPlayCountArray.slice(0, 100);
  return top100Tracks;
}



export function top100TracksArgs(history) {
  const trackPlayCount = {};
  for (let song of history) {
    if (song.master_metadata_track_name !== null) {
      const trackName = song.master_metadata_track_name;

      if (trackName in trackPlayCount) {
        trackPlayCount[trackName]++;
      } else {
        trackPlayCount[trackName] = 1;
      }
    }
  }
  const trackPlayCountArray = Object.entries(trackPlayCount);

  trackPlayCountArray.sort((a, b) => b[1] - a[1]);

  const top100Tracks = trackPlayCountArray.slice(0, 100);
  return top100Tracks;
}

export function top100TrackFromPeriod(periodInDays) {
  // Ultima data que alguma musica foi ouvida
  const lastListenedDate = new Date(history[history.length - 1].ts);

  const daysBefore = new Date(lastListenedDate);
  daysBefore.setDate(lastListenedDate.getDate() - periodInDays); // 

  const filteredHistory = history.filter(
    (song) =>
      new Date(song.ts) >= daysBefore && new Date(song.ts) <= lastListenedDate
  );

  return top100TracksArgs(filteredHistory);
}

//============================================= not checked
export function groupArtists() {
  const artistPlayCount = {};

  for (let song of history) {
    if (song.master_metadata_track_name !== null) {
      const artistName = song.master_metadata_album_artist_name;

      if (artistName in artistPlayCount) {
        artistPlayCount[artistName]++;
      } else {
        artistPlayCount[artistName] = 1;
      }
    }
  }

  const artistPlayCountArray = Object.entries(artistPlayCount);

  artistPlayCountArray.sort((a, b) => b[1] - a[1]);

  return artistPlayCount;
}

 export function calculateArtistPercentages() {
  const bla = groupArtists();
  // Calculate the total number of reproductions
  const totalPlays = history.length;

  // Object to store the percentages of each artist
  const artistPercentages = [];

  // Calculate the percentage of reproductions for each artist
  for (let [artist, plays] of Object.entries(bla)) {
    const percentage = (plays / totalPlays) * 100;
    artistPercentages.push({ artist, percentage: percentage.toFixed(2) }); //Round to two decimal places
  }


  const arrayOfPercentages = artistPercentages.sort((a, b) => b.percentage - a.percentage);


  const uniqueArtistPercentages = new Set();
  const uniqueArtistPercentagesArray = [];

  arrayOfPercentages.forEach(song => {
    if (!uniqueArtistPercentages.has(song.artist)) {
      uniqueArtistPercentages.add(song.artist);
      uniqueArtistPercentagesArray.push(song);
    }
  });
  return uniqueArtistPercentagesArray;
}


 export function searchForArtistPercentage(artistName) {
  const result = calculateArtistPercentages().find((artist) => artist.artist.toLowerCase() === artistName.toLowerCase());
  return result ? result.percentage : 0;
}


// ============================================ finding artist songs



export function top100SongsThisArtistAllTime(artistName) {
  const top20BestSongsThisArtist = history
    .filter((song) => song.master_metadata_album_artist_name === artistName)
    .sort((a, b) => b.ms_played - a.ms_played)

  const uniqueArtistPercentages = new Set();
  const uniqueArtistPercentagesArray = [];

  top20BestSongsThisArtist.forEach(song => {
    if (!uniqueArtistPercentages.has(song.master_metadata_track_name)) {
      uniqueArtistPercentages.add(song.master_metadata_track_name);
      uniqueArtistPercentagesArray.push(song);
    }
  });
  return uniqueArtistPercentagesArray.slice(0, 20);
}
export function top100SongsThisArtistArgs(histories, artistName) {
  if (!Array.isArray(histories)) {
    console.error("histories is not an array");
    return [];
  }

  const top20BestSongsThisArtist = histories
    .filter((song) => song.master_metadata_album_artist_name === artistName)
    .sort((a, b) => b.ms_played - a.ms_played);

  const uniqueArtistPercentages = new Set();
  const uniqueArtistPercentagesArray = [];

  top20BestSongsThisArtist.forEach(song => {
    if (!uniqueArtistPercentages.has(song.master_metadata_track_name)) {
      uniqueArtistPercentages.add(song.master_metadata_track_name);
      uniqueArtistPercentagesArray.push(song);
    }
  });
  return uniqueArtistPercentagesArray.slice(0, 20);
}

export function top100SongsFromPeriod(periodInDays, artistName) {

  const lastListenedDate = new Date(history[history.length - 1].ts);

  const daysBefore = new Date(lastListenedDate);
  daysBefore.setDate(lastListenedDate.getDate() - periodInDays); 

  const filteredHistory = history.filter(
    (song) =>
      new Date(song.ts) >= daysBefore && new Date(song.ts) <= lastListenedDate
  );
  return top100SongsThisArtistArgs(filteredHistory, artistName);
}

///====================================================== use listend songs the season
export function toFindWhatSeasonOfTheYearTheUserListenToSongsThisArtist(artistName) {
  const timeAndSeason = [];

  // Define the starting and ending dates for each season
  const seasons = [
    { name: "spring", startMonth: 3, startDate: 21, endMonth: 6, endDate: 20 },
    { name: "summer", startMonth: 6, startDate: 21, endMonth: 9, endDate: 20 },
    { name: "autumn", startMonth: 9, startDate: 21, endMonth: 12, endDate: 20 },
    { name: "winter", startMonth: 12, startDate: 21, endMonth: 3, endDate: 20 }
  ];

  // Loop through each season
  seasons.forEach(({ name, startMonth, startDate, endMonth, endDate }) => {
    // Filter songs that belong to the current season and artist
    const songsInSeason = history.filter(song => {
      const songDate = new Date(song.ts);
      const songMonth = songDate.getMonth() + 1; // Months are zero-based, so we add 1
      const songDay = songDate.getDate();
      return (
        (songMonth === startMonth && songDay >= startDate) ||
        (songMonth > startMonth && songMonth < endMonth) ||
        (songMonth === endMonth && songDay <= endDate)
      ) && song.master_metadata_album_artist_name === artistName;
    });

    // Calculate total listening time for songs in the current season
    const totalMsPlayed = songsInSeason.reduce((total, song) => total + song.ms_played, 0);

    // Store the total listening time for the current season
    timeAndSeason.push({ season: name, time: totalMsPlayed });
  });

  let maxTime = 0;
  let seasonsss = null;

  timeAndSeason.forEach(({ season, time }) => {
    if (time > maxTime) {
      maxTime = time;
      seasonsss = season;
    }
  });
  return seasonsss;
}



export function findNumberOfSongsThisArtistArgs(artistName) {
  return  history.filter((song) => song.master_metadata_album_artist_name === artistName).length
 }
 

 export function totalListeningOfThisArtistSongs(artistName) {

  const miliseconds =  history.filter((song) => song.master_metadata_album_artist_name === artistName).reduce((total, song) => total + song.ms_played, 0)
  const hours = Math.floor(miliseconds / 1000 / 60 / 60)
  return hours
}


export function howManyDifferentSongsOfThisArtistIListent(artistName) {
  const songs = history.filter((song) => song.master_metadata_album_artist_name === artistName);
  return [...new Set(songs.map((e) => e.master_metadata_track_name))].length
}



export function toFindThePositionOfTheArtistTop100(artistName) {

  const artists = top100Artists();
  const position = artists.findIndex((artist) => artist[0] === artistName);
  return position + 1


}


// ///top20BestSongsThisArtist ,
// top100SongsThisArtistAllTime, 
// top100SongsFromPeriod,