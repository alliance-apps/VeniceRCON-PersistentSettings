const VAR_BF3VU = [
    "vars.serverName", "vars.autoBalance",
    "vars.friendlyFire", "vars.maxPlayers", "vars.serverDescription",
    "vars.serverMessage", "vars.killCam", "vars.miniMap",
    "vars.hud", "vars.3dSpotting", "vars.miniMapSpotting",
    "vars.nametag", "vars.3pCam", "vars.regenerateHealth",
    "vars.teamKillCountForKick", "vars.teamKillValueForKick", "vars.teamKillValueIncrease",
    "vars.teamKillValueDecreasePerSecond", "vars.teamKillKickForBan", "vars.idleTimeout",
    "vars.idleBanRounds", "vars.roundStartPlayerCount", "vars.roundRestartPlayerCount",
    "vars.roundLockdownCountdown", "vars.vehicleSpawnAllowed", "vars.vehicleSpawnDelay",
    "vars.soldierHealth", "vars.playerRespawnTime", "vars.playerManDownTime", "vars.bulletDamage",
    "vars.gameModeCounter", "vars.onlySquadLeaderSpawn",
    "vars.gunMasterWeaponsPreset",
    "vu.DestructionEnabled", "vu.SuppressionMultiplier",
    "vu.DesertingAllowed", "vu.VehicleDisablingEnabled",
    "vu.HighPerformanceReplication", "vu.ServerBanner",
    "vu.SunFlareEnabled", "vu.SquadSize",
    "vu.ColorCorrectionEnabled", "vu.TimeScale",
]

module.exports = async ({ engine, battlefield, logger, store }) => {
    engine.on('varsChanged', async data => {
        await getAndStoreVariables()
    })

    async function getAndStoreVariables() {
        for(const bf3var of VAR_BF3VU) {
            store.set(bf3var, await battlefield.get(bf3var))
        }
        logger.info("Configuration was changed")
    }

    async function bootGetandSetVariables() {
        for(const bf3var of VAR_BF3VU) {
            let value = await store.get(bf3var)
            if(value) {
                if(bf3var === 'vars.maxPlayers' && (value % 2) !== 0) value--
                battlefield.createCommand(bf3var, value).send()
                    .then(() => {})
                    .catch((error) => logger.error("Error setting variable: " + error.message))
            }
        }
    }

    await bootGetandSetVariables()
}

