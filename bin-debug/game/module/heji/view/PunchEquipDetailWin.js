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
var PunchEquipDetailWin = (function (_super) {
    __extends(PunchEquipDetailWin, _super);
    function PunchEquipDetailWin() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.offY = 150;
        _this.data = null;
        _this.duanwei = ["高", "初", "中"];
        return _this;
    }
    PunchEquipDetailWin.prototype.initUI = function () {
        _super.prototype.initUI.call(this);
        this.isTopLevel = true;
        this.skinName = "PunchEquipTipsSkin";
    };
    PunchEquipDetailWin.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.data = param[0];
        this.forgeGroup.visible = param[1];
        this.forgeGroup.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTap, this);
        this.observe(UserSkill.ins().postHejiEquipChange, this.refushInfo);
        this.refushInfo();
    };
    PunchEquipDetailWin.prototype.close = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.forgeGroup.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTap, this);
        this.removeObserve();
    };
    PunchEquipDetailWin.prototype.refushInfo = function () {
        var config;
        var str1 = "";
        var str2 = "";
        config = this.data.itemConfig;
        var point = 0;
        point = this.data.point;
        this.score.text = "评分：" + point;
        var addPoint = 0;
        this.powerPanel.setPower(Math.floor(point * (100 + addPoint) / 100));
        var atts = this.data.att;
        var bestDesc = "";
        for (var i = 0; i < atts.length; i++) {
            if (atts[i].type == 0)
                continue;
            var str = AttributeData.getAttrNameByAttrbute(atts[i], true);
            str1 += str + "\n";
        }
        var extAtts = this.data.extAtt;
        var hasExtAtt = false;
        for (var j = 0; j < extAtts.length; j++) {
            if (extAtts[j].type == 0)
                continue;
            hasExtAtt = true;
            var str = AttributeData.getAttrNameByAttrbute(extAtts[j], true);
            str2 += str + "\n";
        }
        if (hasExtAtt) {
            this.tupoDesc.visible = true;
            this.group.height = 600;
            this.forgeGroup.y = 530;
        }
        else {
            this.tupoDesc.visible = false;
            this.group.height = 600 - this.offY;
            this.forgeGroup.y = 530 - this.offY;
        }
        this.desc1.text = "基础属性:";
        this.nameLabel.text = config.name;
        this.nameLabel.textColor = ItemConfig.getQualityColor(config);
        this.itemIcon.setData(config);
        var chong = config.level % 3;
        this.lv.text = config.zsLevel > 0 ? "\u7B49\u7EA7\uFF1A" + config.zsLevel + "\u8F6C" : "\u7B49\u7EA7\uFF1A" + config.level + "\u7EA7";
        this.attr1.text = str1;
        this.attr0.text = str2;
    };
    PunchEquipDetailWin.prototype.onTap = function (e) {
        switch (e.target) {
            case this.forgeGroup:
                ViewManager.ins().close(PunchEquipDetailWin);
                ViewManager.ins().open(PunchEquipChooseWin, this.data.itemConfig.subType, 1);
                break;
            default:
                ViewManager.ins().close(PunchEquipDetailWin);
        }
    };
    return PunchEquipDetailWin;
}(BaseEuiView));
__reflect(PunchEquipDetailWin.prototype, "PunchEquipDetailWin");
ViewManager.ins().reg(PunchEquipDetailWin, LayerManager.UI_Main);
//# sourceMappingURL=PunchEquipDetailWin.js.map