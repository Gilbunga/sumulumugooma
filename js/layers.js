addLayer("p", {
    name: "prestige", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "P", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#4BDC13",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "prestige points", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.95, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        if (hasUpgrade('p', 13)) mult = mult.times(upgradeEffect('p', 13))
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "p", description: "P: Reset for prestige points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true},    upgrades: {
        11: {
            title: "Increase Money Gain by 1.25x",
            description: "Increase your money gain fr fr.",
            cost: new Decimal(1),
        },
        12: {
            title: "Increase Money Gain by 2x",
            description: "Increase your money ong",
            cost: new Decimal(3),
        },
        13: {
            title: "Decrease Prestige Points Cost",
            description: "warning: will mess up the 'x points until next prestige' component",
            cost: new Decimal(10),
            effect() {
                return player.points.add(1).pow(0.15)
            },
        },
        14: {
            title: "Increase Money Gain by 2x again",
            description: "Increase your money twofold",
            cost: new Decimal(10),
        },
        15: {
            title: "Money boosts itself",
            description: "im going to struggle while coding this",
            cost: new Decimal(20),
        },
        16: {
            title: "Increase previous upgrades effectiveness",
            description: "hooray",
            cost: new Decimal(45),
        },
    },
})
