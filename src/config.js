export const config = {
    game: {
        timePerSpawn: 15000,
        timePerLevel: 60000,
        timePerSurvivalScore: 5000,
        survivalAsteroidBonus: 0.2,
        survivalLevelBonus: 1,
        itemDropMultiplierWhenExploreToChild: 0.2,
        multiDrop: false,
    },
    asteroid: {
        spin: 0.3,
        damagePerRadius: 0.25,
        childrenSizeRatio: 0.6,
        minimalSizeCanSplit: 20,
        minNumberOfChild: 2,
        maxNumberOfChild: 2,
        minSize: 60,
        maxSize: 60,
        minSpeed: 0,
        maxSpeed: 5,
    },
    ship: {
        health: 100,
        speed: 5,
        spin: 0.3,
    },
    ammo: {
        damage: 10,
        destroyAsteroidRate: 0.5,
        speed: 10,
    },
    items: {
        item0: {
            name: 'Blue',
            amount: 3,
            rate: 0.25,
        },
        item1: {
            name: 'Burger',
            heal: 20,
            rate: 0.20,
        },
        item2: {
            name: 'Red',
            amount: 1,
            rate: 0.05,
        },
        item3: {
            name: 'Bomb',
            amount: 1,
            rate: 0.03,
        },
        item4: {
            name: 'Gold',
            rate: 0.3,
            score: 30,
        },
    },
};
