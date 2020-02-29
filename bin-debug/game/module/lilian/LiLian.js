var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var LiLian = (function (_super) {
    __extends(LiLian, _super);
    function LiLian() {
        var _this = _super.call(this) || this;
        _this.lilianReward = 0;
        _this.nobilityIsUpGrade = 0;
        _this.nobilityLv = 0;
        _this.xunzhangJF = 0;
        _this.liLianExpDay = 0;
        _this.liLianExpDayReward = 0;
        _this.jadeLv = 0;
        _this.isShow = false;
        _this.isXZShow = false;
        _this.skillCfgList = [];
        _this.sysId = PackageID.Train;
        _this.regNetMsg(1, _this.postLilianData);
        _this.regNetMsg(5, _this.postNobilityData);
        _this.regNetMsg(3, _this.postTrainsDayAward);
        _this.regNetMsg(10, _this.postJadeLv);
        return _this;
    }
    LiLian.ins = function () {
        return _super.ins.call(this);
    };
    LiLian.prototype.sendLilianUpgrade = function () {
        this.sendBaseProto(1);
    };
    LiLian.prototype.sendNobilityUpgrade = function () {
        this.sendBaseProto(6);
    };
    LiLian.prototype.sendNobilityStageUpgrade = function () {
        this.sendBaseProto(7);
    };
    LiLian.prototype.sendGetLilianReward = function () {
        this.sendBaseProto(2);
    };
    LiLian.prototype.postLilianData = function (bytes) {
        var lv = bytes.readInt();
        this.liLianExp = bytes.readInt();
        this.lilianReward = bytes.readInt();
        this.liLianExpDay = bytes.readInt();
        this.liLianExpDayReward = bytes.readInt();
        var flag = false;
        if (lv > this.liLianLv || this.checkShowRedPoint2())
            flag = true;
        this.liLianLv = lv;
        UserTask.ins().postUpdataTaskPoint();
        if (flag) {
            this.upDateRole();
        }
        if (!this.getTraining)
            return { flag: true };
        else
            return { flag: false };
    };
    LiLian.prototype.upDateRole = function () {
        var len = SubRoles.ins().subRolesLen;
        for (var i = 0; i < len; i++) {
            var entity = EntityManager.ins().getMainRole(i);
            if (entity) {
                var model = SubRoles.ins().getSubRoleByIndex(i);
                model.lilianLv = this.liLianLv;
                entity.setCharName(model.guildAndName);
                entity.setLilian(model.lilianUrl);
            }
        }
    };
    LiLian.prototype.postNobilityData = function (bytes) {
        this.isXZShow = false;
        var level = bytes.readInt();
        var lvChange = this.nobilityLv != level;
        this.nobilityLv = level;
        return { refush: lvChange };
    };
    LiLian.prototype.postTrainsDayAward = function (bytes) {
        var b = bytes.readBoolean();
        this.getTraining = false;
        return b;
    };
    LiLian.prototype.sendTrainsDayAward = function (index) {
        var bytes = this.getBytes(3);
        bytes.writeInt(index);
        this.sendToServer(bytes);
    };
    LiLian.prototype.setXunzhangJF = function (value) {
        if (this.xunzhangJF != value) {
            if (this.xunzhangJF > 0) {
                var u64 = value - this.xunzhangJF;
                var addFeats = parseInt(u64.toString());
                if (addFeats > 0) {
                    var str = "|C:0xffd93f&T:获得" + addFeats + "成就积分|";
                    UserTips.ins().showTips(str);
                }
            }
            this.xunzhangJF = value;
        }
    };
    LiLian.prototype.getLiLianStast = function () {
        if (this.getLilianShenGongStast()) {
            return true;
        }
        if (this.getNobilityIsUpGrade() && !this.getNobilityIsMaxLevel) {
            return this.getNobilityIsUpGrade();
        }
        if (Artifact.ins().showRedPoint()) {
            return true;
        }
        if (UserTask.ins().getIsHaveChengjiuReward()) {
            return true;
        }
        if (this.checkJueWeiOpen() && this.getNobilityIsUpGrade() && !this.getNobilityIsMaxLevel()) {
            return true;
        }
        if (this.checkJadeRed())
            return true;
        return this.checkShowRedPoint2();
    };
    LiLian.prototype.checkJueWeiOpen = function () {
        var id = GlobalConfig.TrainBaseConfig.actImbaId;
        if (Artifact.ins().getNewArtifactBy(Artifact.ins().getArtifactIndexById(id))) {
            return Artifact.ins().getNewArtifactBy(Artifact.ins().getArtifactIndexById(id)).open;
        }
        return false;
    };
    LiLian.prototype.checkXunZhangOpen = function () {
        var id = GlobalConfig.KnighthoodBasicConfig.actImbaId;
        if (Artifact.ins().getNewArtifactBy(Artifact.ins().getArtifactIndexById(id))) {
            return Artifact.ins().getNewArtifactBy(Artifact.ins().getArtifactIndexById(id)).open;
        }
        return false;
    };
    LiLian.prototype.checkBookOpen = function () {
        return OpenSystem.ins().checkSysOpen(SystemType.BOOK);
    };
    LiLian.prototype.checkShowRedPoint2 = function () {
        if (this.lilianReward <= 0) {
            return false;
        }
        var data = GlobalConfig.GuanYinAwardConfig[this.lilianReward];
        return this.liLianLv >= data.level;
    };
    LiLian.prototype.getLilianActiveState = function () {
        var id = GlobalConfig.TrainBaseConfig.actImbaId;
        if (Artifact.ins().getNewArtifactBy(Artifact.ins().getArtifactIndexById(id))) {
            return Artifact.ins().getNewArtifactBy(Artifact.ins().getArtifactIndexById(id)).open;
        }
        return false;
    };
    LiLian.prototype.getLilianShenGongStast = function () {
        if (!this.getLilianActiveState())
            return false;
        var config = GlobalConfig.TrainLevelConfig[this.liLianLv + 1];
        if (config && this.liLianExp >= config.exp) {
            return true;
        }
        return this.checkShowRedPoint2();
    };
    LiLian.prototype.getLilianBtnState = function () {
        if (!this.getLilianActiveState())
            return false;
        var config = GlobalConfig.TrainLevelConfig[this.liLianLv + 1];
        if (config && this.liLianExp >= config.exp) {
            return true;
        }
        return false;
    };
    LiLian.prototype.getNobilityIsUpGrade = function () {
        var config = GlobalConfig.KnighthoodConfig[this.nobilityLv];
        for (var i = 0; i < config.achievementIds.length; i++) {
            var taskid = config.achievementIds[i].taskId;
            if (taskid > 0) {
                var data = UserTask.ins().getAchieveByTaskId(taskid);
                if (data) {
                    var cfg = UserTask.ins().getAchieveConfById(data.id);
                    if (cfg.target > data.value) {
                        return false;
                    }
                }
                else {
                    return false;
                }
            }
        }
        return true;
    };
    LiLian.prototype.getNobilityIsMaxLevel = function () {
        var config = GlobalConfig.KnighthoodConfig[this.nobilityLv + 1];
        return config ? false : true;
    };
    LiLian.prototype.getAllChengjiuData = function () {
        if (this._achievementTaskAllConfig)
            return this._achievementTaskAllConfig;
        this._achievementTaskAllConfig = [];
        var configs = GlobalConfig.AchievementTaskConfig;
        for (var key in GlobalConfig.AchievementTaskConfig) {
            if (configs[key].achievementType > 0) {
                this._achievementTaskAllConfig.push(configs[key]);
            }
        }
        this._achievementTaskAllConfig.sort(LiLian.sort);
        return this._achievementTaskAllConfig;
    };
    LiLian.sort = function (a, b) {
        if (a.achievementType > b.achievementType)
            return 1;
        else if (a.achievementType < b.achievementType)
            return -1;
        else
            return 0;
    };
    LiLian.prototype.getChengjiuData = function (type) {
        var configArr = this.getAllChengjiuData();
        var reArr = [];
        for (var _i = 0, configArr_1 = configArr; _i < configArr_1.length; _i++) {
            var config = configArr_1[_i];
            if (config.achievementType == type) {
                reArr.push(config);
            }
        }
        return reArr;
    };
    LiLian.prototype.chengjiuMaxData = function () {
        if (this._chengjiuMaxData)
            return this._chengjiuMaxData;
        this._chengjiuMaxData = [];
        var configArr = this.getAllChengjiuData();
        var tmpType = -1;
        for (var _i = 0, configArr_2 = configArr; _i < configArr_2.length; _i++) {
            var config = configArr_2[_i];
            if (tmpType != config.achievementType) {
                tmpType = config.achievementType;
                this._chengjiuMaxData.push(tmpType);
            }
        }
        return this._chengjiuMaxData;
    };
    LiLian.prototype.getPower = function () {
        return GlobalConfig.TrainLevelConfig[this.liLianLv].power;
    };
    LiLian.prototype.getCruLevelSkillCfg = function (isNext) {
        if (isNext === void 0) { isNext = false; }
        var list = GlobalConfig.TrainLevelAwardConfig;
        if (this.skillCfgList.length <= 0) {
            for (var cfg in list) {
                this.skillCfgList.push(list[cfg]);
            }
        }
        var crucfg = null;
        for (var _i = 0, _a = this.skillCfgList; _i < _a.length; _i++) {
            var cfg = _a[_i];
            if (cfg.level > this.liLianLv) {
                crucfg = cfg;
                break;
            }
        }
        if (isNext) {
            return crucfg;
        }
        var id = crucfg ? crucfg.id - 1 : 0;
        return list[id];
    };
    LiLian.prototype.postGetLilianReward = function (sourceList) {
        return sourceList;
    };
    LiLian.prototype.getTrainDayAwardConfigs = function (openDay) {
        var keys = Object.keys(GlobalConfig.TrainDayAwardConfig);
        keys.sort(this.setSortTrainAwards);
        for (var i = 0; i < keys.length; i++) {
            if (openDay >= Number(keys[i]))
                return GlobalConfig.TrainDayAwardConfig[keys[i]];
        }
        return null;
    };
    LiLian.prototype.jadeUpgrade = function () {
        this.sendBaseProto(10);
    };
    LiLian.prototype.setSortTrainAwards = function (a, b) {
        if (Number(a) > Number(b))
            return -1;
        else
            return 1;
    };
    LiLian.prototype.isGetTrainDayAward = function (id) {
        var config = this.getTrainDayAwardConfigs(GameServer.serverOpenDay + 1);
        if (!config || !config[id])
            return false;
        if (this.liLianExpDayReward >> id & 1) {
        }
        else {
            if (this.liLianExpDay >= config[id].score) {
                return true;
            }
            else {
            }
        }
        return false;
    };
    LiLian.prototype.isGetTrainDayAwardAll = function () {
        if (!this.getLilianActiveState())
            return false;
        var config = this.getTrainDayAwardConfigs(GameServer.serverOpenDay + 1);
        if (!config)
            return false;
        for (var k in config) {
            if (this.liLianExpDayReward >> +k & 1) {
            }
            else {
                if (this.liLianExpDay >= config[+k].score) {
                    return true;
                }
                else {
                }
            }
        }
        return false;
    };
    LiLian.prototype.postJadeLv = function (bytes) {
        this.jadeLv = bytes.readInt();
    };
    LiLian.prototype.isJadeMax = function () {
        return this.jadeLv >= Object.keys(GlobalConfig.YuPeiConfig).length - 1;
    };
    LiLian.prototype.checkJadeRed = function () {
        return false;
        if (Actor.level < GlobalConfig.YuPeiBasicConfig.openLv)
            return false;
        if (this.isJadeMax())
            return false;
        var cfg = GlobalConfig.YuPeiConfig[this.jadeLv];
        if (cfg.item_id == undefined || cfg.item_id <= 0)
            return true;
        var itemData = UserBag.ins().getBagItemById(cfg.item_id);
        if (itemData && itemData.count >= cfg.count)
            return true;
        return false;
    };
    return LiLian;
}(BaseSystem));
__reflect(LiLian.prototype, "LiLian");
var GameSystem;
(function (GameSystem) {
    GameSystem.lilian = LiLian.ins.bind(LiLian);
})(GameSystem || (GameSystem = {}));
//# sourceMappingURL=LiLian.js.map