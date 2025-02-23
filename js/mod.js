let modInfo = {
	name: "The Egg Tree 2",
	author: "Somebody7",
	pointsName: "eggs",
	modFiles: ["layers.js", "tree.js"],

	discordName: "",
	discordLink: "",
	initialStartPoints: new Decimal (0), // Used for hard resets and new players
	offlineLimit: 24,  // In hours
}

// Set your version in num and name
let VERSION = {
	num: "1.00-0",
	name: "release",
}

let changelog = `<h1>Changelog:</h1><br>
	<h3>1.00-0</h3><br>
		released game<br>endgame 2500 eggs`

let winText = `fart`

// If you add new functions anywhere inside of a layer, and those functions have an effect when called, add them here.
// (The ones here are examples, all official functions are already taken care of)
var doNotCallTheseFunctionsEveryTick = ["blowUpEverything"]

function getStartPoints(){
    return new Decimal(modInfo.initialStartPoints)
}

// Determines if it should show points/sec
function canGenPoints(){
	return true
}

// Calculate points/sec!
function getPointGen() {
	if(!canGenPoints())
		return new Decimal(0)
	let gain = new Decimal(0.05)
	if (inChallenge('j', 11)) gain = gain.times(0.002)
	if (hasUpgrade('j', 11)) gain = gain.times(3)
 	if (hasUpgrade('j', 12)) gain = gain.times(1.672)
	if (hasUpgrade('j', 13)) gain = gain.times(upgradeEffect('j', 13))
	if (hasChallenge('j', 11)) gain = gain.times(5)

	return gain
}

// You can add non-layer related variables that should to into "player" and be saved here, along with default values
function addedPlayerData() { return {
}}

// Display extra things at the top of the page
var displayThings = [
]

// Determines when the game "ends"
function isEndgame() {
	return player.points.gte(new Decimal("2500"))
}



// Less important things beyond this point!

// Style for the background, can be a function
var backgroundStyle = {

}

// You can change this if you have things that can be messed up by long tick lengths
function maxTickLength() {
	return(3600) // Default is 1 hour which is just arbitrarily large
}

// Use this if you need to undo inflation from an older version. If the version is older than the version that fixed the issue,
// you can cap their current resources with this.
function fixOldSave(oldVersion){
}