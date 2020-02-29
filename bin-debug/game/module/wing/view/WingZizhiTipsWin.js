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
var WingZizhiTipsWin = (function (_super) {
    __extends(WingZizhiTipsWin, _super);
    function WingZizhiTipsWin() {
        var _this = _super.call(this) || this;
        _this._curRole = 0;
        _this.skinName = "wingZizhiTips";
        _this.isTopLevel = true;
        return _this;
    }
    WingZizhiTipsWin.prototype.open = function () {
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
    WingZizhiTipsWin.prototype.close = function () {
        this.removeObserve();
        this.removeTouchEvent(this, this.onTouch);
    };
    WingZizhiTipsWin.prototype.update = function () {
        var role = SubRoles.ins().getSubRoleByIndex(this._curRole);
        var cfg = GlobalConfig.WingLevelConfig[role.wingsData.lv];
        this.wingName.text = cfg.name;
        this.zizhiLv.text = role.wingsData.aptitudeDan + "级";
        this.career.text = Role.getJobNameByJob(role.job);
        var maxNum = cfg.attrPill;
        if (role.wingsData.aptitudeDan >= maxNum)
            this.currentState = "maxLv";
        else {
            var itemData = UserBag.ins().getBagItemById(GlobalConfig.WingCommonConfig.attrPillId);
            var num = itemData ? itemData.count : 0;
            if (num)
                this.currentState = "normal";
            else
                this.currentState = "noitem";
        }
        this.updateAttrs();
    };
    WingZizhiTipsWin.prototype.updateAttrs = function () {
        var role = SubRoles.ins().getSubRoleByIndex(this._curRole);
        var attrs = GlobalConfig.WingCommonConfig.attrPill;
        var len = attrs.length;
        var pAttr = [];
        var attData;
        for (var i = 1; i <= 4; i++) {
            this["attr" + i].text = "";
            this["attr" + i + "NextLv"].text = "";
            if (i <= len) {
                attData = attrs[i - 1];
                this["attr" + i].text = AttributeData.getAttrStrByType(attData.type) + ": +" + (attData.value * role.wingsData.aptitudeDan);
                pAttr.push(new AttributeData(attData.type, attData.value * role.wingsData.aptitudeDan));
                if (this.currentState == "normal")
                    this["attr" + i + "NextLv"].text = "+" + (attrs[i - 1].value * (role.wingsData.aptitudeDan + 1));
            }
        }
        this.powerPanel.setPower(UserBag.getAttrPower(pAttr));
    };
    WingZizhiTipsWin.prototype.itemChange = function () {
        if (this.currentState == "maxLv")
            return;
        var itemData = UserBag.ins().getBagItemById(GlobalConfig.WingCommonConfig.attrPillId);
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
    WingZizhiTipsWin.prototype.onTouch = function (e) {
        switch (e.target) {
            case this.bgClose:
                ViewManager.ins().close(this);
                break;
            case this.updateBtn:
                Wing.ins().sendUseDan(this._curRole, 0);
                break;
        }
    };
    return WingZizhiTipsWin;
}(BaseEuiView));
__reflect(WingZizhiTipsWin.prototype, "WingZizhiTipsWin");
ViewManager.ins().reg(WingZizhiTipsWin, LayerManager.UI_Main);
//# sourceMappingURL=WingZizhiTipsWin.js.map