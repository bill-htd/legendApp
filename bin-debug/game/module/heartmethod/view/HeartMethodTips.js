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
var HeartMethodTips = (function (_super) {
    __extends(HeartMethodTips, _super);
    function HeartMethodTips() {
        var _this = _super.call(this) || this;
        _this.skinName = 'heartmethodTips';
        return _this;
    }
    HeartMethodTips.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.addTouchEvent(this.bgClose, this.onClick);
        this.addTouchEvent(this.addStar, this.onClick);
        this.addTouchEvent(this.replace, this.onClick);
        this.observe(HeartMethod.ins().postHeartUpLevel, this.updateUI);
        this.roleId = param[0];
        this.heartId = param[1];
        this.id = param[2];
        this.updateUI();
    };
    HeartMethodTips.prototype.close = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.removeTouchEvent(this.bgClose, this.onClick);
        this.removeTouchEvent(this.addStar, this.onClick);
        this.removeTouchEvent(this.replace, this.onClick);
        DisplayUtils.removeFromParent(this.starList);
        this.starList = null;
    };
    HeartMethodTips.prototype.onClick = function (e) {
        switch (e.target) {
            case this.bgClose:
                ViewManager.ins().close(this);
                break;
            case this.addStar:
                if (this.isMax) {
                    UserTips.ins().showTips("\u5DF2\u6EE1\u661F");
                    return;
                }
                if (this.isAdd) {
                    HeartMethod.ins().sendHeartUpLevel(this.roleId, this.heartId, this.pId);
                }
                else
                    UserTips.ins().showTips("|C:0xff0000&T:\u6750\u6599\u4E0D\u8DB3");
                break;
            case this.replace:
                var itemid = HeartMethod.ins().calcHeartSlotChange(this.roleId, this.heartId, this.id);
                if (!itemid) {
                    UserTips.ins().showTips("\u6CA1\u6709\u66F4\u597D\u7684\u90E8\u4F4D\u88AB\u66FF\u6362");
                    return;
                }
                if (!this.pId) {
                    UserTips.ins().showTips("\u9053\u5177:" + this.id + "\u5957\u88C5\u90E8\u4F4D\u6570\u636E\u5F02\u5E38");
                    return;
                }
                HeartMethod.ins().sendHeartChange(this.roleId, this.heartId, this.pId, itemid);
                break;
        }
    };
    HeartMethodTips.prototype.updateUI = function () {
        this.pId = HeartMethod.ins().getSuitPosFromItemId(this.id);
        if (!this.pId)
            return;
        this.id = HeartMethod.ins().HeartMethodInfo[this.roleId][this.heartId].slots[this.pId - 1];
        var config = GlobalConfig.HeartMethodStarConfig[this.id];
        if (!config)
            return;
        this.icon.source = config.bigIcon;
        if (!this.mc)
            this.mc = new MovieClip;
        if (!this.mc.parent)
            this.effGroup.addChild(this.mc);
        this.mc.playFile(RES_DIR_EFF + config.effect, -1);
        var itemConfig = GlobalConfig.ItemConfig[this.id];
        this.nameLabel.textFlow = TextFlowMaker.generateTextFlow1("|C:" + ItemConfig.getQualityColor(itemConfig) + "&T:" + itemConfig.name);
        var power = UserBag.getAttrPower(config.attr);
        this.powerPanel.setPower(power);
        var strAttrName = "";
        var strAttrValue = "";
        for (var i = 0; i < HeartMethod.ins().proShowList.length; i++) {
            for (var j = 0; j < config.attr.length; j++) {
                if (HeartMethod.ins().proShowList[i].id == config.attr[j].type) {
                    var sname = HeartMethod.ins().getAttrStrByType(config.attr[j].type);
                    if (!sname)
                        continue;
                    if (!config.attr[j].value)
                        continue;
                    strAttrName += sname;
                    strAttrValue += "+" + config.attr[j].value;
                    strAttrName += "\n";
                    strAttrValue += "\n";
                }
            }
        }
        if (strAttrName) {
            var index = strAttrName.lastIndexOf("\n");
            strAttrName = strAttrName.substring(0, index);
        }
        if (strAttrValue) {
            var index = strAttrValue.lastIndexOf("\n");
            strAttrValue = strAttrValue.substring(0, index);
        }
        this.attr.text = strAttrName;
        this.value.text = strAttrValue;
        var costStr = "";
        this.isMax = false;
        if (config.nextItem) {
            var itemcfg = GlobalConfig.ItemConfig[config.costItem];
            if (itemcfg) {
                var color = ItemConfig.getQualityColor(itemcfg);
                costStr = "|C:0xFFFFCC&T:\u6D88\u8017 |C:" + color + "&T:" + itemcfg.name + "|C:0xFFFFCC&T: X" + config.costNum;
                this.cost.textFlow = TextFlowMaker.generateTextFlow1(costStr);
            }
            this.isAdd = HeartMethod.ins().calcHeartSlotCost(this.id);
        }
        else {
            this.isMax = true;
            this.isAdd = false;
        }
        this.cost.visible = costStr ? true : false;
        var hmpconfig = GlobalConfig.HeartMethodPosConfig[config.posId][config.quality];
        if (hmpconfig) {
            var stars = Object.keys(hmpconfig).length - 1;
            if (!this.starList) {
                this.starList = new StarList(stars);
                this.starList.horizontalCenter = 0;
                this.starList.y = 0;
                this.starGroup.addChild(this.starList);
            }
            else {
                this.starList.setlistLength(stars, config.star);
            }
            this.starList.setStarNum(config.star);
        }
        this.updateRedPoint();
    };
    HeartMethodTips.prototype.updateRedPoint = function () {
        this.redPoint1.visible = this.isAdd;
        this.redPoint2.visible = HeartMethod.ins().calcHeartSlotChange(this.roleId, this.heartId, this.id) ? true : false;
    };
    return HeartMethodTips;
}(BaseEuiView));
__reflect(HeartMethodTips.prototype, "HeartMethodTips");
ViewManager.ins().reg(HeartMethodTips, LayerManager.UI_Popup);
//# sourceMappingURL=HeartMethodTips.js.map