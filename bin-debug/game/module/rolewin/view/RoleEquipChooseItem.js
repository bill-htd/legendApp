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
var RoleEquipChooseItem = (function (_super) {
    __extends(RoleEquipChooseItem, _super);
    function RoleEquipChooseItem() {
        var _this = _super.call(this) || this;
        _this.showUpimage = true;
        _this.skinName = 'RoleChooseEquipItemSkin';
        return _this;
    }
    RoleEquipChooseItem.prototype.dataChanged = function () {
        if (!this.data || !this.data.itemConfig)
            return;
        this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemove, this);
        var itemdata = this.data;
        this.itemIcon.setData(this.data.itemConfig);
        this.nameTxt.text = itemdata.itemConfig.name;
        this.nameTxt.textColor = ItemConfig.getQualityColor(this.data.itemConfig);
        var att = UserBag.ins().getEquipAttrs(this.data);
        var config = GlobalConfig.EquipConfig[this.data.itemConfig.id];
        var exPower = 0;
        var itemPoint = this.data.point + exPower;
        this.power.text = "\u8BC4\u5206\uFF1A" + itemPoint;
        var itemSubType = ItemConfig.getSubType(this.data.itemConfig);
        this.upImg.x = this.power.x + this.power.textWidth + 10;
        var boo = (Actor.level >= (this.data.itemConfig.level || 1) && UserZs.ins().lv >= (this.data.itemConfig.zsLevel || 0));
        var color = boo ? "0x35E62D" : "0xfe4444";
        if (itemSubType == EquipPos.DZI) {
            this.levelStrText.text = "等阶:";
            this.levelText.text = UserBag.ins().getGuanyinLevel(itemdata.itemConfig);
        }
        else {
            this.levelStrText.text = "等级:";
            var str = isNaN(this.data.itemConfig.zsLevel) ? (this.data.itemConfig.level || 1) + "\u7EA7" : this.data.itemConfig.zsLevel + "\u8F6C";
            this.levelText.textFlow = TextFlowMaker.generateTextFlow("|C:" + color + "&T:" + str + "|");
        }
        var job = 0;
        this.now.visible = !this.showUpimage;
        if (!this.data.itemConfig.job) {
            var w = ViewManager.ins().getView(RoleChooseEquipWin);
            var index = w.roleSelect;
            var roleData = SubRoles.ins().getSubRoleByIndex(index);
            job = roleData.job;
        }
        else {
            job = ItemConfig.getJob(this.data.itemConfig);
        }
        var comparePower = UserBag.ins().getEquipPowerDic(job, itemSubType);
        if ((itemPoint > comparePower) && this.showUpimage && boo) {
            this.upImg.visible = true;
            var t = egret.Tween.get(this.upImg, { "loop": true });
            t.to({ y: this.upImg.y - 3 }, 250).to({ y: this.upImg.y + 3 }, 250);
        }
        else {
            this.upImg.visible = false;
        }
        if (this.itemIndex == 0 && this.showUpimage && boo) {
            if (itemPoint > comparePower) {
                this.best.visible = true;
                this.best.x = this.upImg.x + this.upImg.width + 9;
            }
            else {
                this.best.visible = false;
            }
        }
        else {
            this.best.visible = false;
        }
        var str1 = "";
        var str2 = "";
        for (var i = 0; i < att.length; i++) {
            if (att[i].type == 0 || att[i].value == 0)
                continue;
            var str = AttributeData.getAttrNameByAttrbute(att[i], true);
            str1 += str + "\n";
        }
        this.attr1.textFlow = new egret.HtmlTextParser().parser(str1);
        if (UserZs.ins().lv < (this.data.itemConfig.zsLevel || 0) || Actor.level < (this.data.itemConfig.level || 1)) {
            this.changeBtn.visible = false;
        }
        else {
            this.changeBtn.visible = true;
        }
    };
    RoleEquipChooseItem.prototype.onRemove = function () {
        this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemove, this);
        egret.Tween.removeTweens(this.upImg);
    };
    RoleEquipChooseItem.prototype.setUpImage = function (boo) {
        this.showUpimage = boo;
    };
    RoleEquipChooseItem.prototype.setBtnStatu = function () {
        this.changeBtn.visible = false;
        this.now.visible = true;
    };
    return RoleEquipChooseItem;
}(eui.ItemRenderer));
__reflect(RoleEquipChooseItem.prototype, "RoleEquipChooseItem");
//# sourceMappingURL=RoleEquipChooseItem.js.map