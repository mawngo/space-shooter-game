export const config = {
    game: {
        timePerSpawn: 15000,
        timePerLevel: 60000,
        timePerSurvivalScore: 5000,
        survivalAsteroidBonus: 0.2,
        survivalLevelBonus: 1,
        itemDropMultiplierWhenExploreToChild: 0.2,
        itemDropMultiplierUseSpecialAmmo: 0.05,
        multiDrop: false
    },
    asteroid: {
        spin: 0.3,
        damagePerRadius: 0.25,
        childrenSizeRatio: 0.6,
        minimalSizeCanSplit: 28,
        minNumberOfChild: 2,
        maxNumberOfChild: 2,
        minSize: 60,
        maxSize: 80,
        minSpeed: 0,
        maxSpeed: 5
    },
    ship: {
        health: 100,
        speed: 5,
        spin: 0.3,
        size: 20
    },
    ammo: {
        damage: 8,
        destroyAsteroidRate: 0.6,
        speed: 10,
        size: 25
    },
    items: {
        ammos: {
            ammo1: "Blue",
            ammo2: "Red",
            ammo3: "Bomb"
        },
        item0: {
            name: "Blue Ammo",
            amount: 3,
            rate: 0.20
        },
        item1: {
            name: "Burger",
            heal: 20,
            rate: 0.20
        },
        item2: {
            name: "Red Ammo",
            amount: 1,
            rate: 0.05
        },
        item3: {
            name: "Antimatter Bomb",
            amount: 1,
            rate: 0.03
        },
        item4: {
            name: "Gold",
            rate: 0.3,
            score: 30
        }
    }
};
