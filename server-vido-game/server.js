// import gamesData from "./games-data";
// import genresData from "./genres-data";
// import platformsData from "./platforms-data";

const gamesData = require("./games-data");
const genresData = require("./genres-data");
const platformsData = require("./platforms-data");

var http = require("http");
var url = require("url");

const server = http.createServer((req, res) => {
	res.setHeader("Content-Type", "application/json");
	res.setHeader("Access-Control-Allow-Origin", "*");

	if (req.url === "/") {
		setTimeout(() => {
			res.end(JSON.stringify(gamesData));
		}, 2000);
	}
	if (req.url === "/genres") {
		setTimeout(() => {
			res.end(JSON.stringify(genresData));
		}, 2000);
	}
	if (req.url === "/platforms") {
		setTimeout(() => {
			res.end(JSON.stringify(platformsData));
		}, 2000);
	}
});

const PORT = 3000;
server.listen(PORT, () => {
	console.log(`Server is listening on port ${PORT}`);
});
