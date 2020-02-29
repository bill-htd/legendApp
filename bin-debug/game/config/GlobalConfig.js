var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var GlobalConfig = (function () {
    function GlobalConfig() {
    }
    GlobalConfig.init = function () {
        var self = this;
        if (self.config)
            return;
        var config = self.config = RES.getRes("config_json");
        if (!config) {
            return;
        }
        var parseKeys = function (obj, proto, key) {
            if (key == 0) {
                obj.__proto__ = proto;
            }
            else {
                for (var i in obj) {
                    parseKeys(obj[i], proto, key - 1);
                }
            }
        };
        var _loop_1 = function (key) {
            var value = config[key];
            var objCls = egret.getDefinitionByName(key);
            if (objCls) {
                var objKey_1 = "_obj" + key;
                self[objKey_1] = new objCls();
                var boolKey_1 = "_bool" + key;
                self[boolKey_1] = false;
                var newKey_1 = "_" + key + "_";
                Object.defineProperty(self, key, {
                    get: function () {
                        var obj = self[newKey_1];
                        if (self[boolKey_1]) {
                            return obj;
                        }
                        var proto = self[objKey_1];
                        parseKeys(obj, proto, GlobalConfig.keys[key] || 0);
                        self[boolKey_1] = true;
                        return obj;
                    },
                    set: function (val) {
                        self[newKey_1] = val;
                    }
                });
            }
            self[key] = value;
        };
        for (var key in config) {
            _loop_1(key);
        }
        RES.destroyRes("config_json");
    };
    GlobalConfig.keys = {
        "InstanceBaseConfig": 0,
        "RongLuExpConfig": 1,
        "PlayFunConfig": 1,
        "HunGuConf": 0,
        "HunGuEquip": 1,
        "HunYuEquip": 2,
        "HunGuSuit": 3,
        "ShenShouConfig": 0,
        "ShenShouBase": 1,
        "ShenShouEquip": 1,
        "ShenShouSkill": 1,
        "TeamFuBenBaseConfig": 0,
        "TeamFuBenConfig": 1,
        "FlameStamp": 0,
        "CrossBossConfig": 1,
        "CrossBossBase": 0,
        "ZhanLingConfig": 0,
        "ZhanLingBase": 1,
        "ZhanLingLevel": 2,
        "ZhanLingEquip": 1,
        "ZhanLingSuit": 1,
        "ZhanLingTalent": 2,
        "ZhanLingSkill": 1,
        "SDKConfig": 0,
        "FlameStampLevel": 1,
        "PActivity2Config": 2,
        "FlameStampEffect": 2,
        "FlameStampMat": 1,
        "PActivity3Config": 2,
        "PActivityBtnConfig": 1,
        "PActivityConfig": 1,
        "WeaponSoulItemAttr": 1,
        "WeaponSoulBaseConfig": 0,
        "PrivilegeData": 0,
        "ActivityType10Config": 2,
        "PunchEquipMasterConfig": 1,
        "PunchEquipConfig": 2,
        "ActivityType9Config": 2,
        "SuperVipConfig": 1,
        "GodWeaponTaskConfig": 2,
        "ActorExRingFubenConfig": 0,
        "TrainDayAwardConfig": 2,
        "ActivityType5Config": 2,
        "ItemComposeConfig": 1,
        "LoopRechargeConfig": 2,
        "MultiDayRechargeConfig": 1,
        "CampBattleConfig": 0,
        "CampBattlePersonalAwardConfig": 1,
        "CampBattlePersonalRankAwardConfig": 1,
        "GodWingLevelConfig": 2,
        "MonsterTitleConf": 1,
        "FbChallengeLotteryConfig": 1,
        "LoginActivateConfig": 0,
        "GodWingSuitConfig": 1,
        "GodWingItemConfig": 1,
        "NewWorldBossRankConfig": 2,
        "NewWorldBossAttrConfig": 1,
        "NewWorldBossBaseConfig": 0,
        "MailIdConfig": 1,
        "CityBaseConfig": 0,
        "CityBossConfig": 1,
        "LevelMailConfig": 1,
        "LoginDayMailConfig": 0,
        "GuildBonFireConfig": 1,
        "ActivityType4Config": 2,
        "VipGiftConfig": 1,
        "ActivityType3Config": 2,
        "RechargeDaysAwardsConfig": 1,
        "RechargeItemsConfig": 1,
        "WeaponSoulSuit": 2,
        "WeaponSoulPosConfig": 2,
        "WeaponSoulConfig": 1,
        "KuangYuanConfig": 1,
        "NpcBaseConfig": 1,
        "CaiKuangConfig": 0,
        "RichManRoundAwardConfig": 1,
        "RichManGridConfig": 1,
        "RichManBaseConfig": 0,
        "FuwenTreasureRewardConfig": 1,
        "MonsterSpeakConfig": 2,
        "LeadFubenBaseConfig": 0,
        "GuanYinAwardConfig": 1,
        "MonthCardConfig": 0,
        "ItemGiftConfig": 1,
        "HeirloomEquipConfig": 2,
        "HeirloomEquipItemConfig": 1,
        "HeirloomEquipFireConfig": 1,
        "HeirloomEquipSetConfig": 1,
        "ItemDescConfig": 1,
        "DailyRechargeConfig": 2,
        "FirstRechargeConfig": 1,
        "FirstRechargeClientConfig": 1,
        "ExpFubenBaseConfig": 0,
        "ExpFubenConfig": 1,
        "ExpFbMonsterConfig": 1,
        "ImbaSkillReviseConfig": 1,
        "HintConfig": 1,
        "SkillsSorderConfig": 1,
        "SkillsDescConfig": 1,
        "ScenesConfig": 1,
        "YouDangConfig": 1,
        "BossHomeConfig": 1,
        "OpenSystemConfig": 1,
        "LoongSoulBaseConfig": 0,
        "DeathgainWayConfig": 1,
        "DeathGuideConfig": 1,
        "TrainBaseConfig": 0,
        "FbChNameConfig": 1,
        "StoneOpenConfig": 1,
        "WorldBossKillMsgConfig": 1,
        "MonstershpConfig": 1,
        "MonthSignVipConfig": 1,
        "MonthSignDaysConfig": 1,
        "MonthSignBaseConfig": 0,
        "MonthSignConfig": 1,
        "BookListConfig": 1,
        "DecomposeConfig": 1,
        "SuitConfig": 2,
        "CardConfig": 2,
        "MijiBaseConfig": 1,
        "TreasureBoxRateConfig": 1,
        "TreasureBoxGridConfig": 1,
        "TreasureBoxConfig": 1,
        "TreasureBoxBaseConfig": 0,
        "TianTiConstConfig": 0,
        "TianTiDanConfig": 2,
        "TianTiRankAwardConfig": 1,
        "NeiGongBaseConfig": 0,
        "NeiGongStageConfig": 2,
        "FuwenTreasureConfig": 0,
        "FuwenTreasureLevelConfig": 1,
        "FbChallengeConfig": 1,
        "RuneConverConfig": 1,
        "RuneBaseConfig": 1,
        "RuneLockPosConfig": 1,
        "RuneNameConfig": 1,
        "RuneOtherConfig": 0,
        "RuneAttrTypeConfig": 1,
        "RuneComposeConfig": 1,
        "TogetherHitEquipPageConfig": 1,
        "TogetherHitEquipQmConfig": 3,
        "TogetherHitEquipExchangeConfig": 1,
        "TogetherHitConfig": 1,
        "LimitTimeTaskConfig": 1,
        "LimitTimeConfig": 1,
        "BubbleConfig": 1,
        "DefineEff": 1,
        "ActorExRingConfig": 1,
        "ActorExRingBookConfig": 2,
        "ActorExRing2Config": 1,
        "ActorExRing3Config": 1,
        "ActorExRing4Config": 1,
        "ActorExRing5Config": 1,
        "ActorExRing6Config": 1,
        "ActorExRing7Config": 1,
        "ActorExRingAbilityConfig": 1,
        "ActorExRingItemConfig": 3,
        "MonstersConfig": 1,
        "ExpConfig": 1,
        "ItemConfig": 1,
        "EquipConfig": 1,
        "SkillsConfig": 1,
        "SkirmishRewardConfig": 1,
        "SkirmishBaseConfig": 0,
        "EffectsConfig": 1,
        "ChaptersRewardConfig": 1,
        "WorldRewardConfig": 1,
        "WingLevelConfig": 1,
        "WingCommonConfig": 0,
        "DailyFubenConfig": 1,
        "DailyConfig": 1,
        "DailyAwardConfig": 1,
        "ImbaJigsawConf": 1,
        "ImbaConf": 1,
        "AchievementTaskConfig": 1,
        "ZhuanShengConfig": 0,
        "ZhuanShengLevelConfig": 1,
        "JingMaiStageConfig": 1,
        "JingMaiLevelConfig": 1,
        "JingMaiCommonConfig": 0,
        "SkillsUpgradeConfig": 1,
        "SkillsOpenConfig": 1,
        "ZhuanShengExpConfig": 1,
        "NewRoleConfig": 1,
        "ForgeIndexConfig": 1,
        "StoneLevelCostConfig": 1,
        "StoneLevelConfig": 1,
        "ZhulingAttrConfig": 1,
        "ZhulingCostConfig": 1,
        "EnhanceAttrConfig": 1,
        "EnhanceCostConfig": 1,
        "LegendLevelupConfig": 1,
        "LegendComposeConfig": 1,
        "ExRingConfig": 1,
        "ExRing0Config": 1,
        "ExRing1Config": 1,
        "EquipItemConfig": 1,
        "ItemStoreConfig": 1,
        "StoreCommonConfig": 0,
        "IntegralStore": 1,
        "TreasureOverViewConfig": 1,
        "EffectConfig": 1,
        "VipConfig": 1,
        "ShieldConfig": 1,
        "ShieldStageConfig": 1,
        "LoongSoulConfig": 1,
        "LoongSoulStageConfig": 1,
        "TreasureHuntConfig": 0,
        "TreasureHuntPoolConfig": 1,
        "TreasureHuntPoolHefuConfig": 1,
        "SkirmishRankConfig": 1,
        "GainItemConfig": 1,
        "BagBaseConfig": 0,
        "BagExpandConfig": 1,
        "WorldBossConfig": 1,
        "WorldBossBaseConfig": 0,
        "ServerTips": 1,
        "AttrPowerConfig": 1,
        "TrainLevelConfig": 1,
        "LoginRewardsConfig": 1,
        "ActivityType1Config": 2,
        "ActivityType2Config": 2,
        "ActivityType6Config": 2,
        "ActivityType8Config": 2,
        "ActivityType7Config": 2,
        "ActivityConfig": 1,
        "ActivityBtnConfig": 1,
        "SkillPowerConfig": 1,
        "KnighthoodConfig": 1,
        "KnighthoodBasicConfig": 0,
        "ChongZhi1Config": 3,
        "ChongZhi2Config": 3,
        "FuncNoticeConfig": 1,
        "RefinesystemExpConfig": 1,
        "VipGridConfig": 1,
        "OtherBoss1Config": 1,
        "EquipPointConstConfig": 0,
        "EquipPointBasicConfig": 1,
        "EquipPointGrowUpConfig": 2,
        "EquipPointRankConfig": 2,
        "EquipPointResolveConfig": 1,
        "WanBaGiftbagBasic": 1,
        "HelpInfoConfig": 1,
        "ClientGlobalConfig": 0,
        "CashCowBoxConfig": 1,
        "CashCowLimitConfig": 1,
        "CashCowBasicConfig": 1,
        "CashCowAmplitudeConfig": 1,
        "GuildConfig": 0,
        "GuildCommonSkillConfig": 2,
        "GuildPracticeSkillConfig": 2,
        "GuildCreateConfig": 1,
        "GuildDonateConfig": 1,
        "GuildLevelConfig": 2,
        "GuildTaskConfig": 1,
        "WelfareConfig": 1,
        "OtherBoss2Config": 1,
        "MiJiGridConfig": 1,
        "MiJiSkillConfig": 1,
        "TitleConf": 1,
        "TrainLevelAwardConfig": 1,
        "TerraceDescConfig": 1,
        "WeiXiGuanZhuConst": 0,
        "GuildBattleLevel": 1,
        "GuildBattleConst": 0,
        "GuildBattleDayAward": 1,
        "GuildBattleDistributionAward": 2,
        "GuildBattlePersonalAward": 1,
        "GuildBattlePersonalRankAward": 1,
        "GuildStoreConfig": 0,
        "FriendLimit": 0,
        "ZhuangBanId": 1,
        "ZhuangBanConfig": 0,
        "FeatsStore": 1,
        "GuildBossConfig": 0,
        "GuildBossInfoConfig": 1,
        "GuildBossHpAwardsConfig": 2,
        "GuildBossRankConfig": 1,
        "AllWorldConfig": 1,
        "GuideConfig": 2,
        "TogerherHitBaseConfig": 0,
        "ActorExRingCommon": 0,
        "HeirloomTreasureConfig": 0,
        "HeirloomTreasureRewardConfig": 1,
        "OptionalGiftConfig": 1,
        "GodweaponItemConfig": 1,
        "GodWeaponLineConfig": 2,
        "GodWeaponLevelConfig": 1,
        "GodWeaponBaseConfig": 0,
        "GodWeaponFubenConfig": 1,
        "GWSkillReviseConfig": 1,
        "MoneyConfig": 1,
        "FbChallengeBaseConfig": 0,
        "YuPeiConfig": 1,
        "YuPeiBasicConfig": 0,
        "PassionPointConfig": 0,
        "PassionPointAwardConfig": 1,
        "RoleConfig": 2,
        "NewFuncNoticeConfig": 1,
        "ReincarnationBase": 0,
        "ReincarnationExchange": 1,
        "ReincarnationLevel": 1,
        "ReincarnateSpirit": 2,
        "ReincarnateSuit": 1,
        "ReincarnateEquip": 1,
        "EquipWithEffConfig": 1,
        "PrestigeBase": 0,
        "PrestigeLevel": 1,
        "ActivityType11_1Config": 2,
        "ActivityType11_2Config": 2,
        "ReincarnateEquipCompose": 1,
        "SpecialEquipsConfig": 1,
        "ReincarnationSoulLevel": 3,
        "ReincarnationDemonLevel": 2,
        "ReincarnationLinkLevel": 3,
        "PeakRaceBase": 0,
        "PeakRaceTime": 1,
        "PeakRaceCrossTime": 1,
        "ActivityType19Config": 2,
        "ActivityType18Config": 2,
        "HeartMethodStarConfig": 1,
        "GuardGodWeaponConf": 0,
        "GGWWaveConf": 2,
        "JadePlateBaseConfig": 0,
        "JadePlateLevelConfig": 1,
        "HeartMethodBaseConfig": 0,
        "HeartMethodConfig": 1,
        "HeartMethodPosConfig": 3,
        "HeartMethodLevelConfig": 2,
        "HeartMethodStageConfig": 2,
        "HeartMethodSuitConfig": 2,
        "ZhiZunEquipLevel": 2,
        "ZhiZunLinkLevel": 3,
        "ZhuangBanLevelUp": 2,
        "ActivityType20Config": 2,
        "PActivityType1Config": 2,
        "PActivityType9Config": 2,
        "ActivityType12Config": 2,
        "DevilBossBase": 0,
        "DevilBossConfig": 1,
        "CrossArenaBase": 0,
        "CrossArenaScore": 1,
    };
    return GlobalConfig;
}());
__reflect(GlobalConfig.prototype, "GlobalConfig");
//# sourceMappingURL=GlobalConfig.js.map