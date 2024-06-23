export function loadConfig() {
    return {
        game: {
            spawnerRadius: 110,
            timePerSpawn: 15000,
            timePerLevel: 60000,
            timePerSurvivalScore: 5000,
            survivalAsteroidBonus: 0.2,
            survivalLevelBonus: 1,
            itemDropMultiplierWhenExploreToChild: 0.2,
            itemDropMultiplierUseSpecialAmmo: 0.05,
            multiDrop: false,
            tick: 58
        },
        asteroid: {
            spin: 0.3,
            damagePerRadius: 0.25,
            childrenSizeRatio: 0.65,
            minimalSizeCanSplit: 30,
            minNumberOfChild: 1,
            maxNumberOfChild: 3,
            minSize: 60,
            maxSize: 100,
            minSpeed: 0,
            maxSpeed: 4
        },
        ship: {
            health: 100,
            speed: 4,
            spin: 0.3,
            size: 20
        },
        ammo: {
            damage: 10,
            destroyAsteroidRate: 0.6,
            speed: 8,
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
                rate: 0.12
            },
            item1: {
                name: "Burger",
                heal: 15,
                rate: 0.2
            },
            item2: {
                name: "Red Ammo",
                amount: 1,
                rate: 0.015
            },
            item3: {
                name: "Antimatter Bomb",
                amount: 1,
                rate: 0.01
            },
            item4: {
                name: "Gold",
                rate: 0.3,
                score: 30
            }
        }
    };
}
