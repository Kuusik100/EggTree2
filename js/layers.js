addLayer("a", {
    name: "achievements",
    symbol: "A",
    row: "side",
    resource: "achievements",
    color: "#bbbb00",
    tooltip: "Achievements",
    startData() { return {
        unlocked: true,
        points: new Decimal(0),
    }},
    achievements: {
        11: 
        {
            name: "01. egg",
            tooltip: "get 1 eggs",
            done() {
                if (player.points.gte(1)) return true
            },
            onComplete() {
                player.a.points = player.a.points.add(1)
            }
        },
        12: 
        {
            name: "02. J",
            tooltip: "get 1 J points",
            done() {
                if (player.j.points.gte(1)) return true
            },
            onComplete() {
                player.a.points = player.a.points.add(1)
            }
        },


}, 
})

addLayer("j", {
    name: "J points", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "J", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#808080",
    requires: new Decimal(1), // Can be a function that takes requirement increases into account
    resource: "J points", // Name of prestige currency
    baseResource: "eggs", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.69, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "j", description: "J: Reset for J points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    upgrades: {
        11: {
            description: "3x eggs",
            title: "01. J wow",
            cost: new Decimal(1),
        },
        12: {
            description: "1.672x eggs",
            title: "02. more",
            cost: new Decimal(4),
        },
    },  

   
    layerShown(){return true}
})
