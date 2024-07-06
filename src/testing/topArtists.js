
import history from "../h.json"
export function top100ArtistsArg(history) {
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
  
console.log(top100ArtistsArg(history));

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
  
  
  export function top100ArtistsFromPeriod(periodInDays) {
      // Ultima data que alguma musica foi ouvida
      const lastListenedDate = new Date(history[history.length - 1]);
     
      const daysBefore = new Date(lastListenedDate);
      daysBefore.setDate(lastListenedDate.getDate() - periodInDays); // 180 dias = 6 meses
  
      const filteredHistory = history.filter(
        (song) =>
          new Date(song.ts) >= daysBefore &&
          new Date(song.ts) <= lastListenedDate
      )
    
      return top100ArtistsArg(filteredHistory);
    }




  
 
  