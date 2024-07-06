

const history = [
    {
        ts: "2020-06-01T01:01:00.000Z",
        ms_played: 1000000,

    },
    {
        ts: "2021-06-02T02:02:00.000Z",
        ms_played: 2000000,
    },
    {
        ts: "2020-04-02T02:02:00.000Z",
        ms_played: 2000000,
    },
    {
        ts: "2020-06-03T03:03:00.000Z",
        ms_played: 3000000,
    }
]

function timeOfTheDayTheUserListenToSongs() {
    let hourTotalTime = {}; // Object to store total listening time for each hour

    history.forEach((song) => {
        const hour = new Date(song.ts).getHours();
        hourTotalTime[hour] = (hourTotalTime[hour] || 0) + song.ms_played; // Increment total listening time for the hour
    });

    // Find the hour(s) with the maximum total listening time
    const maxTotalTime = Math.max(...Object.values(hourTotalTime));
    const mostListenedHours = Object.keys(hourTotalTime).filter(hour => hourTotalTime[hour] === maxTotalTime);

    return mostListenedHours;
}

console.log(timeOfTheDayTheUserListenToSongs());