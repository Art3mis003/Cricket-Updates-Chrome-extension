async function getMatchData() {
    try {
        const response = await fetch("https://api.cricapi.com/v1/currentMatches?apikey=63dd3866-b2ef-4362-99c5-e9e5e81b62e9&offset=0");
        const data = await response.json();

        console.log("API Response:", data);

        if (data.status !== "success") {
            console.error("API request was not successful:", data);
            document.getElementById("matches").innerHTML = "<li>No matches available</li>";
            return;
        }

        const matchesList = data.data;

        if (!matchesList || matchesList.length === 0) {
            console.warn("No matches found in the response");
            document.getElementById("matches").innerHTML = "<li>No matches available</li>";
            return;
        }

        const relevantData = matchesList.map(match => ({
            name: match.name,
            status: match.status
        }));

        console.log("Relevant Data:", relevantData);

        document.getElementById("matches").innerHTML = relevantData.map(match => 
            `<li>${match.name} - ${match.status}</li>`).join('');

    } catch (e) {
        console.error("Error fetching match data:", e);
        document.getElementById("matches").innerHTML = "<li>Error fetching match data</li>";
    }
}

document.addEventListener('DOMContentLoaded', () => {
    getMatchData();
});
