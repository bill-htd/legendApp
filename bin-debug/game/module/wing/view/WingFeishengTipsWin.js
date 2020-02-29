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
var WingFeishengTipsWin = (function (_super) {
    __extends(WingFeishengTipsWin, _super);
    function WingFeishengTipsWin() {
        var _this = _super.call(this) || this;
        _this._curRole = 0;
        _this.skinName = "wingFeishengTips";
        _this.isTopLevel = true;
        return _this;
    }
    WingFeishengTipsWin.prototype.open = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this._curRole = args[0];
        this.observe(UserBag.ins().postItemAdd, this.itemChange);
        this.observe(UserBag.ins().postItemChange, this.itemChange);
        this.observe(UserBag.ins().postItemDel, this.itemChange);
        this.observe(Wing.ins().postUseDanSuccess, this.update);
        this.observe(Wing.ins().postWingUpgrade, this.update);
        this.addTouchEvent(this, this.onTouch);
        this.update();
    };
    WingFeishengTipsWin.prototype.close = function () {
        this.removeObserve();
        this.removeTouchEvent(this, this.onTouch);
    };
    WingFeishengTipsWin.prototype.update = function () {
        var role = SubRoles.ins().getSubRoleByIndex(this._curRole);
        var cfg = GlobalConfig.WingLevelConfig[role.wingsData.lv];
        this.wingName.text = cfg.name;
        this.feishengLv.text = role.wingsData.flyUpDan + "级";
        this.career.text = Role.getJobNameByJob(role.job);
        var maxNum = cfg.flyPill;
        if (role.wingsData.flyUpDan >= maxNum)
            this.currentState = "maxLv";
        else {
            var itemData = UserBag.ins().getBagItemById(GlobalConfig.WingCommonConfig.flyPillId);
            var num = itemData ? itemData.count : 0;
            if (num)
                this.currentState = "normal";
            else
                this.currentState = "noitem";
        }
        this.updateAttrs();
    };
    WingFeishengTipsWin.prototype.updateAttrs = function () {
        var role = SubRoles.ins().getSubRoleByIndex(this._curRole);
        var cfg = GlobalConfig.WingLevelConfig[role.wingsData.lv];
        var len = cfg.attr.length;
        var flyAttrs = GlobalConfig.WingCommonConfig.flyPillAttr;
        var len2 = flyAttrs.length;
        var pAttr = [];
        var attData;
        for (var i = 1; i <= 4; i++) {
            this["attr" + i].text = "";
            this["attr" + i + "NextLv"].text = "";
            if (i <= len) {
                attData = cfg.attr[i - 1];
                this["attr" + i].text = AttributeData.getAttrStrByType(attData.type) + ": +" + (Math.floor(GlobalConfig.WingCommonConfig.flyPill / 100) * role.wingsData.flyUpDan) + "%";
                if (this.currentState == "normal")
                    this["attr" + i + "NextLv"].text = "+" + (Math.floor(GlobalConfig.WingCommonConfig.flyPill / 100) * (role.wingsData.flyUpDan + 1)) + "%";
                pAttr.push(new AttributeData(attData.type, Math.floor(attData.value * GlobalConfig.WingCommonConfig.flyPill / 10000 * role.wingsData.flyUpDan)));
            }
            this["attr" + (i + 4)].text = "";
            this["attr" + (i + 4) + "NextLv"].text = "";
            if (i <= len2) {
                attData = flyAttrs[i - 1];
                this["attr" + (i + 4)].text = AttributeData.getAttrStrByType(attData.type) + ": +" + attData.value * role.wingsData.flyUpDan;
                if (this.currentState == "normal")
                    this["attr" + (i + 4) + "NextLv"].text = "+" + attData.value * (role.wingsData.flyUpDan + 1);
                pAttr.push(new AttributeData(attData.type, attData.value * role.wingsData.flyUpDan));
            }
        }
        this.powerPanel.setPower(UserBag.getAttrPower(pAttr));
    };
    WingFeishengTipsWin.prototype.itemChange = function () {
        if (this.currentState == "maxLv")
            return;
        var itemData = UserBag.ins().getBagItemById(GlobalConfig.WingCommonConfig.flyPillId);
        var num = itemData ? itemData.count : 0;
        var stateChange;
        if (num) {
            stateChange = this.currentState != "normal";
            this.currentState = "normal";
        }
        else {
            stateChange = this.currentState != "noitem";
            this.currentState = "noitem";
        }
        if (stateChange)
            this.updateAttrs();
    };
    WingFeishengTipsWin.prototype.onTouch = function (e) {
        switch (e.target) {
            case this.bgClose:
                ViewManager.ins().close(this);
                break;
            case this.updateBtn:
                Wing.ins().sendUseDan(this._curRole, 1);
                break;
        }
    };
    return WingFeishengTipsWin;
}(BaseEuiView));
__reflect(WingFeishengTipsWin.prototype, "WingFeishengTipsWin");
ViewManager.ins().reg(WingFeishengTipsWin, LayerManager.UI_Main);
//# sourceMappingURL=WingFeishengTipsWin.js.map