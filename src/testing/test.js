
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



function toFindWhatSeasonOfTheYearTheUserListenToSongs() {
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

console.log(toFindWhatSeasonOfTheYearTheUserListenToSongs());
