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
        13: 
        {
            name: "03. i am so J",
            tooltip: "get 100 J points",
            done() {
                if (player.j.points.gte(100)) return true
            },
            onComplete() {
                player.a.points = player.a.points.add(1)
            }
        },
        14: 
        {
            name: "04. not challenging",
            tooltip: "complete the first challenge",
            done() {
                if (hasChallenge('j', 11)) return true
            },
            onComplete() {
                player.a.points = player.a.points.add(1)
            }
        },
        15: 
        {
            name: "05. SJ",
            tooltip: "get upgrade 06",
            done() {
                if (hasUpgrade('j', 16)) return true
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
        if (hasUpgrade('j', 14)) mult = mult.times(upgradeEffect('j', 14))
        if (hasUpgrade('j', 15)) mult = mult.times(4)
        if (hasMilestone('j', 0)) mult = mult.times(3)
            if (hasMilestone('sj', 0)) mult = mult.times(2.5)

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
        13: {
            description: "your J points boost eggs",
            title: "03. synergy or something",
            cost: new Decimal(6),
            effect() {
                return player[this.layer].points.add(1).pow(0.50)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
            tooltip: "1+J^0.5 = x"
        },
        14: {
            description: "your eggs boost J point",
            title: "04. now the opposite",
            cost: new Decimal(25),
            effect() {
                return player.points.add(1).pow(0.25)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
            tooltip: "1+egg^0.25 = x"
        },
        15: {
            description: "4x J point",
            title: "05. J surplus",
            cost: new Decimal(50),
        },
        16: {
            description: "Unlock a new layer",
            title: "06. i",
            cost: new Decimal(1025),
        },
        },
        challenges: {
            11: {
                unlocked(){ return true},
                name: "slow",
                challengeDescription: "your eggs are x0.002",
                goalDescription: "1 egg",
                canComplete: function() {return player.points.gte(1)},
                rewardDescription: "5x eggs gain",
            },
        },
        milestones: {
            0: {
                requirementDescription: "1000 eggs",
                effectDescription: "x3 J point",
                done() { return player.points.gte(1000) },
            }
        }
    },  

   
)

addLayer("sj", {
    name: "SJP", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "SJ", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
    }},
    color: "#0000bb",
    requires: new Decimal(1200), // Can be a function that takes requirement increases into account
    resource: "Super-J points", // Name of prestige currency
    baseResource: "J points", // Name of resource prestige is based on
    baseAmount() {return player.j.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.3, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 1, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "s", description: "S: Reset for Super-J points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    upgrades: {
        11: {
            description: "2x eggs again",
            title: "07. What is a super-j",
            cost: new Decimal(1),
        },
        },
        milestones: {
            0: {
                requirementDescription: "1 SJP",
                effectDescription: "x2 eggs & x2.5 J point",
                done() { return player.sj.points.gte(1) },
            }
        },
        layerShown() {
            return hasAchievement('a', 15)
        },
    },  
   
)
