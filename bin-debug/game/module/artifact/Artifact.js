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
var Artifact = (function (_super) {
    __extends(Artifact, _super);
    function Artifact() {
        var _this = _super.call(this) || this;
        _this.artifacts = [];
        _this.showGuide = -2000;
        _this.openHeji = 0;
        _this.attArr = ["a", "args", "b", "cd", "crit", "d", "selfEff"];
        _this.listArtifacts = {};
        _this.sysId = PackageID.Artifact;
        _this.regNetMsg(1, _this.postArtifactInit);
        _this.regNetMsg(2, _this.postArtifactUpdate);
        _this.regNetMsg(3, _this.postNewArtifactInit);
        _this.regNetMsg(4, _this.postNewArtifactUpdate);
        return _this;
    }
    Artifact.ins = function () {
        return _super.ins.call(this);
    };
    Artifact.prototype.getNewArtifactPower = function (index) {
        var conf = GlobalConfig.ImbaConf[index];
        var data = this.listArtifacts[conf.id];
        if (!data)
            return 0;
        var isSuit = true;
        var power = 0;
        for (var i = 0; i < conf.jigsawId.length; i++) {
            var state = (data.record >> i) & 1;
            if (state)
                power += GlobalConfig.ImbaJigsawConf[conf.jigsawId[i]].power;
            else
                isSuit = false;
        }
        if (data.open)
            power += conf.power;
        return power;
    };
    Artifact.prototype.getAttr = function () {
        var list = {};
        for (var index in GlobalConfig.ImbaConf) {
            var conf = GlobalConfig.ImbaConf[index];
            var data = this.getNewArtifactBy(conf.index);
            for (var i = 0; i < conf.jigsawId.length; i++) {
                var state = (data.record >> i) & 1;
                if (state) {
                    var chipConf = GlobalConfig.ImbaJigsawConf[conf.jigsawId[i]];
                    for (var j = 0; j < chipConf.attrs.length; j++) {
                        var attr = chipConf.attrs[j];
                        AttributeData.addAttrToList(list, attr);
                    }
                }
            }
            if (data.open) {
                if (conf.attrs) {
                    for (var i = 0; i < conf.attrs.length; i++) {
                        AttributeData.addAttrToList(list, conf.attrs[i]);
                    }
                }
            }
        }
        var result = [];
        for (var k in list) {
            result.push(list[k]);
        }
        result.sort(AttributeData.sortAttribute);
        return result;
    };
    Artifact.prototype.getAllArtifactPower = function () {
        var power = 0;
        for (var k in GlobalConfig.ImbaConf) {
            power += this.getNewArtifactPower(+(k));
        }
        return power;
    };
    Artifact.prototype.getArtifactIndexById = function (id) {
        for (var k in GlobalConfig.ImbaConf) {
            if (GlobalConfig.ImbaConf[k].id == id) {
                return GlobalConfig.ImbaConf[k].index;
            }
        }
        return 0;
    };
    Artifact.prototype.getNewArtifactBy = function (index) {
        var id = 0;
        if (GlobalConfig.ImbaConf[index]) {
            id = GlobalConfig.ImbaConf[index].id;
        }
        else {
            return null;
        }
        if (!this.listArtifacts[id]) {
            var data = new NewArtifactData();
            data.id = id;
            data.record = 0;
            this.listArtifacts[id] = data;
        }
        return this.listArtifacts[id];
    };
    Artifact.prototype.getMaxIndex = function () {
        if (!this.maxIndex) {
            var id = 1;
            var conf = GlobalConfig.ImbaConf;
            for (var i in conf) {
                id = Math.max(conf[i].index, id);
            }
            this.maxIndex = id;
        }
        return this.maxIndex;
    };
    Artifact.prototype.getConfById = function (id) {
        var conf = GlobalConfig.ImbaConf;
        for (var k in conf) {
            if (conf[k].id == id) {
                return conf[k];
            }
        }
    };
    Artifact.prototype.showRedPoint = function () {
        var max = this.getMaxIndex();
        for (var i = 1; i <= max; i++) {
            var conf = GlobalConfig.ImbaConf[i];
            var data = this.getNewArtifactBy(i);
            if (!data.open) {
                var len = conf.jigsawId.length;
                var complete = Math.pow(2, len) - 1;
                if (complete == data.record)
                    return true;
                if (data.exitRecord != data.record)
                    return true;
            }
        }
        return false;
    };
    Artifact.prototype.getNextChapterId = function () {
        var max = this.getMaxIndex();
        for (var i = 1; i <= max; i++) {
            var data = this.getNewArtifactBy(i);
            var id = data.getNextChipId();
            if (id) {
            }
        }
    };
    Artifact.prototype.getConfByChipId = function (id) {
        var conf = GlobalConfig.ImbaConf;
        for (var k in conf) {
            if (conf[k].jigsawId.indexOf(id) != -1) {
                return conf[k];
            }
        }
        return null;
    };
    Artifact.prototype.setGuide = function () {
        this.showGuide = egret.getTimer();
        this.postGuide();
        TimerManager.ins().remove(this.guideEnd, this);
        TimerManager.ins().doTimer(3000, 1, this.guideEnd, this);
    };
    Artifact.prototype.guideEnd = function () {
        Artifact.ins().showGuide = -3000;
        Artifact.ins().postGuide();
    };
    Artifact.prototype.postGuide = function () {
    };
    Artifact.prototype.postArtifactInit = function (bytes) {
        var count = bytes.readInt();
        for (var i = 0; i < count; i++) {
            var artifact = new ArtifactData();
            artifact.parser(bytes);
            this.artifacts[artifact.id] = artifact;
        }
    };
    Artifact.prototype.postArtifactUpdate = function (bytes) {
        var isSuccee = bytes.readBoolean();
        if (isSuccee) {
            var artifactId = bytes.readInt();
            var rank = bytes.readShort();
            this.artifacts[artifactId].rank = rank;
        }
        else {
            UserTips.ins().showTips("不满足条件");
        }
        return isSuccee;
    };
    Artifact.prototype.sendRank = function (artifactId) {
        var bytes = this.getBytes(2);
        bytes.writeInt(artifactId);
        this.sendToServer(bytes);
    };
    Artifact.prototype.postNewArtifactInit = function (bytes) {
        var len = bytes.readUnsignedShort();
        this.artifactsOpenDic = {};
        for (var i = 0; i < len; i++) {
            var data = new NewArtifactData();
            data.id = bytes.readInt();
            data.record = bytes.readInt();
            data.open = bytes.readByte() != 0;
            if (!data.open) {
                data.exitRecord = bytes.readInt();
            }
            else {
                data.exitRecord = Math.pow(2, 32) - 1;
                if (len == 1 && this.openHeji == 1) {
                    this.openHeji = 2;
                }
            }
            this.listArtifacts[data.id] = data;
            if (data.open)
                this.artifactsOpenDic[data.id] = data;
        }
        this.setImbaBuffDic();
    };
    Artifact.prototype.setImbaBuffDic = function () {
        if (!this.imbaBuffDic) {
            this.imbaBuffDic = {};
            var config = GlobalConfig.ImbaSkillReviseConfig;
            for (var k in config) {
                if (!this.imbaBuffDic[config[k].skill])
                    this.imbaBuffDic[config[k].skill] = {};
                if (!this.imbaBuffDic[config[k].skill][config[k].imba_id])
                    this.imbaBuffDic[config[k].skill][config[k].imba_id] = {};
                this.imbaBuffDic[config[k].skill][config[k].imba_id] = config[k];
            }
        }
        var len = CommonUtils.getObjectLength(this.artifactsOpenDic);
        if (len) {
            this.imbaSkillDic = {};
            for (var j in this.imbaBuffDic) {
                for (var l in this.imbaBuffDic[j]) {
                    if (this.artifactsOpenDic[l]) {
                        if (!this.imbaSkillDic[j]) {
                            this.imbaSkillDic[j] = new ImbaSkillReviseConfig();
                        }
                        for (var m in this.imbaSkillDic[j]) {
                            if (this.attArr.indexOf(m) == -1)
                                continue;
                            if (this.imbaBuffDic[j][l][m]) {
                                if (m == "selfEff") {
                                    if (!this.imbaSkillDic[j][m]) {
                                        this.imbaSkillDic[j][m] = [];
                                    }
                                    this.imbaSkillDic[j][m].push(this.imbaBuffDic[j][l][m][0]);
                                }
                                else if (m == "args") {
                                    this.imbaSkillDic[j][m] = this.imbaBuffDic[j][l][m];
                                }
                                else {
                                    this.imbaSkillDic[j][m] += this.imbaBuffDic[j][l][m];
                                }
                            }
                        }
                    }
                }
            }
        }
    };
    Artifact.prototype.getReviseBySkill = function (sId) {
        if (!this.imbaSkillDic)
            return null;
        var skillId = Math.floor(sId / 1000);
        if (this.imbaSkillDic[skillId]) {
            return this.imbaSkillDic[skillId];
        }
        return null;
    };
    Artifact.prototype.postNewArtifactUpdate = function (bytes) {
        var id = bytes.readInt();
        var tar = this.listArtifacts[id];
        if (tar) {
            var oldRecord = tar.exitRecord;
            tar.exitRecord = bytes.readInt();
            tar.record = bytes.readInt();
            var addRecord = tar.exitRecord - oldRecord;
            var conf = this.getConfById(id);
            for (var i = 0; i < conf.jigsawId.length; i++) {
                var state = (addRecord >> i) & 1;
                if (state) {
                    var itemData = new ItemData();
                    itemData.configID = conf.jigsawId[i];
                }
            }
        }
        else {
            var data = new NewArtifactData();
            data.id = id;
            data.exitRecord = bytes.readInt();
            data.record = bytes.readInt();
            this.listArtifacts[id] = data;
        }
    };
    Artifact.prototype.sendOpenChip = function (id) {
        var bytes = this.getBytes(4);
        bytes.writeInt(id);
        this.sendToServer(bytes);
    };
    Artifact.prototype.openArtifact = function (id) {
        var bytes = this.getBytes(3);
        bytes.writeInt(id);
        this.sendToServer(bytes);
        if (this.openHeji == 0) {
            this.openHeji = 1;
        }
    };
    return Artifact;
}(BaseSystem));
__reflect(Artifact.prototype, "Artifact");
var GameSystem;
(function (GameSystem) {
    GameSystem.artifact = Artifact.ins.bind(Artifact);
})(GameSystem || (GameSystem = {}));
//# sourceMappingURL=Artifact.js.map