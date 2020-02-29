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
var MillionaireRole = (function (_super) {
    __extends(MillionaireRole, _super);
    function MillionaireRole(sex) {
        var _this = _super.call(this) || this;
        _this.preName = "";
        _this.shadow = new eui.Image("richman_shadow");
        _this.shadow.x = _this.x - 18;
        _this.shadow.y = _this.y - 5;
        _this.addChild(_this.shadow);
        _this.state = MillionaireView.DIR_UP;
        _this.roleType = MillionaireRole.STOP;
        _this.sex = sex ? sex : 0;
        _this.initModel();
        return _this;
    }
    MillionaireRole.prototype.initModel = function () {
        this.model = new MovieClip;
        this.addChild(this.model);
        this.prefix = "body100";
        this.model1 = new MovieClip;
        this.addChild(this.model1);
        this.prefix1 = "";
        this.model2 = new MovieClip;
        this.addChild(this.model2);
        this.prefix2 = "";
        this.model3 = new MovieClip;
        this.addChild(this.model3);
        this.prefix3 = "";
        this.model4 = new MovieClip;
        this.addChild(this.model4);
        this.prefix4 = "";
        this.weightLayers = [];
        this.weightLayers[MillionaireView.DIR_UP] = CharEffect.FRAME_ODER[0];
        this.weightLayers[MillionaireView.DIR_RIGHT] = CharEffect.FRAME_ODER[2];
        this.weightLayers[MillionaireView.DIR_LEFT] = CharEffect.FRAME_ODER[6];
        this.weightLayers[MillionaireView.DIR_DOWN] = CharEffect.FRAME_ODER[4];
        this.setMovieFromWeight();
        var role = EntityManager.ins().getMainRole(0);
        if (role) {
            var model = role.infoModel;
            var id = model.equipsData[2].item.configID;
            if (model.zhuangbei[0] > 0) {
                var fileName = GlobalConfig.ZhuangBanId[model.zhuangbei[0]].res;
                this.prefix = fileName;
            }
            else if (id > 0) {
                if (GlobalConfig.EquipConfig[id]) {
                    var fileName = GlobalConfig.EquipConfig[id].appearance;
                    this.prefix = fileName;
                }
            }
            else
                this.prefix = "body000";
            id = model.getEquipByIndex(0).item.configID;
            if (model.zhuangbei[1] > 0) {
                var fileName = GlobalConfig.ZhuangBanId[model.zhuangbei[1]].res;
                this.prefix1 = fileName;
            }
            else if (id > 0) {
                if (GlobalConfig.EquipConfig[id]) {
                    var fileName = GlobalConfig.EquipConfig[id].appearance;
                    this.prefix1 = fileName;
                }
            }
            if (model.zhuangbei[2] > 0) {
                var fileName = GlobalConfig.ZhuangBanId[model.zhuangbei[2]].res;
                this.prefix2 = fileName;
            }
            else if (model.wingsData.openStatus) {
                if (GlobalConfig.WingLevelConfig[model.wingsData.lv])
                    this.prefix2 = GlobalConfig.WingLevelConfig[model.wingsData.lv].appearance;
            }
            if (model.heirloom) {
                var suitConfig = model.heirloom.getSuitConfig(model);
                if (suitConfig && suitConfig.weff) {
                    this.prefix3 = suitConfig.weff;
                }
            }
            if (model.weapons && model.weapons.weaponsId > 0) {
                var fileName = GlobalConfig.WeaponSoulConfig[model.weapons.weaponsId].outside[model.job - 1];
                this.prefix4 = fileName;
            }
        }
    };
    MillionaireRole.prototype.setMovieFromWeight = function () {
        this.setWeight(this.state);
    };
    MillionaireRole.prototype.setWeight = function (dir) {
        var layers = this.weightLayers[dir];
        for (var i = 0; i < layers.length; i++) {
            var mc = this.getMoviceByWeight(layers[i]);
            if (mc) {
                this.setChildIndex(mc, i);
            }
        }
    };
    MillionaireRole.prototype.getMoviceByWeight = function (weight) {
        var mc;
        switch (weight) {
            case CharMcOrder.BODY:
                mc = this.model;
                break;
            case CharMcOrder.WEAPON:
                mc = this.model1;
                break;
            case CharMcOrder.WING:
                mc = this.model2;
                break;
            case CharMcOrder.SOUL:
                mc = this.model4;
                break;
        }
        return mc;
    };
    MillionaireRole.prototype.destory = function () {
        DisplayUtils.removeFromParent(this.model);
        DisplayUtils.removeFromParent(this.model1);
        DisplayUtils.removeFromParent(this.model2);
        DisplayUtils.removeFromParent(this.model3);
        DisplayUtils.removeFromParent(this.model4);
    };
    Object.defineProperty(MillionaireRole.prototype, "stateName", {
        get: function () {
            this.model.scaleX = 1;
            var strType = "";
            switch (this.state) {
                case MillionaireView.DIR_UP:
                    if (this.roleType)
                        strType = "0r";
                    else
                        strType = "0s";
                    break;
                case MillionaireView.DIR_RIGHT:
                    if (this.roleType)
                        strType = "2r";
                    else
                        strType = "2s";
                    break;
                case MillionaireView.DIR_DOWN:
                    if (this.roleType)
                        strType = "4r";
                    else
                        strType = "4s";
                    break;
                case MillionaireView.DIR_LEFT:
                    this.model.scaleX = -1;
                    if (this.roleType)
                        strType = "2r";
                    else
                        strType = "2s";
                    break;
            }
            this.model1.scaleX = this.model.scaleX;
            this.model2.scaleX = this.model.scaleX;
            this.model4.scaleX = this.model.scaleX;
            return strType;
        },
        enumerable: true,
        configurable: true
    });
    MillionaireRole.prototype.updateModel = function () {
        if (this.preName != this.stateName) {
            this.preName = this.stateName;
            if (this.prefix)
                this.model.playFile(RES_DIR_BODY + this.prefix + "_" + this.sex + "_" + this.stateName, -1);
            if (this.prefix1)
                this.model1.playFile(RES_DIR_WEAPON + this.prefix1 + "_" + this.sex + "_" + this.stateName, -1);
            if (this.prefix2)
                this.model2.playFile(RES_DIR_WING + this.prefix2 + "_" + this.stateName, -1);
            if (this.prefix3)
                this.model3.playFile(RES_DIR_EFF + this.prefix3, -1);
            if (this.prefix4)
                this.model4.playFile(RES_DIR_WEAPON + this.prefix4 + "_" + this.stateName, -1);
            this.setMovieFromWeight();
        }
    };
    MillionaireRole.STOP = 0;
    MillionaireRole.ACTION = 1;
    return MillionaireRole;
}(egret.DisplayObjectContainer));
__reflect(MillionaireRole.prototype, "MillionaireRole");
//# sourceMappingURL=MillionaireRole.js.map