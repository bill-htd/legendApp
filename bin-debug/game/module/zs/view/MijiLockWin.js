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
var MijiLockWin = (function (_super) {
    __extends(MijiLockWin, _super);
    function MijiLockWin() {
        var _this = _super.call(this) || this;
        _this.curRole = 0;
        _this.selItem = 0;
        _this.isFirst = true;
        _this.skinName = "MijiLockSkin";
        return _this;
    }
    MijiLockWin.prototype.initUI = function () {
        _super.prototype.initUI.call(this);
        this.mijiBtns = [this.mijiBtn0, this.mijiBtn1, this.mijiBtn2, this.mijiBtn3, this.mijiBtn4, this.mijiBtn5, this.mijiBtn6, this.mijiBtn7];
        this.link.textFlow = new egret.HtmlTextParser().parser("<u>获得道具</u>");
        this.roleSelect.hideTop();
    };
    MijiLockWin.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.isFirst = true;
        this.addTouchEvent(this.closeBtn, this.onTap);
        this.addTouchEvent(this.smeltBtn, this.onTap);
        this.addTouchEvent(this.link, this.onTap);
        this.addChangeEvent(this.roleSelect, this.onChange);
        this.addTouchEndEvent(this.otherRect, this.otherClose);
        for (var a in this.mijiBtns) {
            this.addTouchEvent(this.mijiBtns[a], this.onTap);
        }
        this.observe(UserMiji.ins().postMijiLockInfo, this.setData);
        if (param[0] == UserMiji.BAGOPEN) {
            this.bagSelectIndex();
        }
        else {
            this.roleSelect.setCurRole(isNaN(param[0]) ? 0 : param[0]);
            this.selItem = this.getindex(isNaN(param[0]) ? 0 : param[0]);
        }
        this.setCurRole(this.roleSelect.getCurRole());
    };
    MijiLockWin.prototype.otherClose = function (evt) {
        ViewManager.ins().close(this);
    };
    MijiLockWin.prototype.close = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
    };
    MijiLockWin.prototype.onChange = function (e) {
        var roleId = this.roleSelect.getCurRole();
        if (!this.isFirst)
            this.selItem = this.getindex(roleId);
        this.isFirst = false;
        this.setCurRole(roleId);
    };
    MijiLockWin.prototype.setCurRole = function (roleId) {
        this.curRole = roleId;
        this.setData();
    };
    MijiLockWin.prototype.onTap = function (e) {
        switch (e.currentTarget) {
            case this.closeBtn:
                ViewManager.ins().close(this);
                break;
            case this.smeltBtn:
                var mijiData = this.mijiBtns[this.selItem].data;
                if (mijiData.isLocked) {
                    UserMiji.ins().sendMijiDelLock(this.curRole, mijiData.id);
                    return;
                }
                UserMiji.ins().sendMijiAddLock(this.curRole, mijiData.id);
                break;
            case this.link:
                UserWarn.ins().setBuyGoodsWarn(GlobalConfig.MijiBaseConfig.lockId, 1);
                break;
            default:
                var index = this.mijiBtns.indexOf(e.target.parent);
                var data = this.mijiBtns[index].data;
                if (!this.mijiBtns[index] || !data)
                    return;
                if (data.id == 0) {
                    UserTips.ins().showCenterTips("\u672A\u5B66\u4E60\u79D8\u7C4D\u7684\u5B54\u4F4D\u65E0\u6CD5\u52A0\u9501");
                    return;
                }
                this.selItem = index;
                var ins = UserMiji.ins();
                if (!ins.grid || this.selItem >= ins.grid) {
                    UserTips.ins().showTips("未开启");
                    return;
                }
                this.updateBtnState();
                break;
        }
    };
    MijiLockWin.prototype.updateBtnState = function () {
        for (var i = 0; i < this.mijiBtns.length; i++) {
            this.mijiBtns[i].setSelected(false);
        }
        this.labCount.text = "";
        this.link.visible = false;
        var num = UserBag.ins().getBagGoodsCountById(UserBag.BAG_TYPE_OTHTER, GlobalConfig.MijiBaseConfig.lockId);
        var isHas = num > 0;
        if (isHas) {
            this.labCount.text = "\u5269\u4F59\u9053\u5177\uFF1A " + num;
        }
        this.link.visible = !isHas;
        if (this.selItem < 0) {
            this.smeltBtn.label = "\u5B54\u4F4D\u52A0\u9501";
            this.smeltBtn.enabled = false;
            return;
        }
        this.mijiBtns[this.selItem].setSelected(true);
        var mijiData = this.mijiBtns[this.selItem].data;
        if (mijiData.isLocked) {
            this.smeltBtn.label = "\u5B54\u4F4D\u89E3\u9501";
            this.smeltBtn.enabled = true;
        }
        else {
            this.smeltBtn.label = "\u5B54\u4F4D\u52A0\u9501";
            this.smeltBtn.enabled = isHas;
        }
    };
    MijiLockWin.prototype.setData = function () {
        var ins = UserMiji.ins();
        var showSetCount = true;
        for (var i = 0; i < 8; i++) {
            if (ErrorLog.Assert(ins.miji, "MijiPanel   data.miji is null")) {
                this.mijiBtns[i].data = null;
            }
            else {
                var numList = ins.miji[this.curRole];
                if (ErrorLog.Assert(numList, "MijiPanel   numList " +
                    "is null  roleId = " + this.curRole)) {
                    this.mijiBtns[i].data = null;
                }
                else {
                    this.mijiBtns[i].data = !numList[i] ? null : numList[i];
                    if (numList[i] && numList[i].id == 0)
                        this.mijiBtns[i].setUnlearn(true);
                    else
                        this.mijiBtns[i].setUnlearn(false);
                    if (!numList[i]) {
                        if (showSetCount) {
                            this.mijiBtns[i].setCountLabel(i);
                            showSetCount = false;
                        }
                    }
                }
            }
        }
        this.updateBtnState();
    };
    MijiLockWin.prototype.getindex = function (roleId) {
        var numList = UserMiji.ins().miji[roleId];
        for (var i = 0; i < numList.length; i++) {
            if (numList[i].id != 0)
                return i;
        }
        return -1;
    };
    MijiLockWin.prototype.bagSelectIndex = function () {
        var role = 0;
        var b = false;
        this.selItem = 0;
        var len = SubRoles.ins().subRolesLen;
        for (var i = 0; i < len; i++) {
            var numList = UserMiji.ins().miji[i];
            for (var j = 0; j < numList.length; j++) {
                if (numList[j].id != 0 && numList[j].isLocked == 0) {
                    role = i;
                    this.selItem = j;
                    b = true;
                    break;
                }
            }
            if (b)
                break;
        }
        this.roleSelect.setCurRole(role);
    };
    return MijiLockWin;
}(BaseEuiView));
__reflect(MijiLockWin.prototype, "MijiLockWin");
ViewManager.ins().reg(MijiLockWin, LayerManager.UI_Popup);
//# sourceMappingURL=MijiLockWin.js.map