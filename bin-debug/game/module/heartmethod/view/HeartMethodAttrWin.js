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
var HeartMethodAttrWin = (function (_super) {
    __extends(HeartMethodAttrWin, _super);
    function HeartMethodAttrWin() {
        var _this = _super.call(this) || this;
        _this._lastX = 0;
        _this.proShowList = [];
        _this.skinName = "heartmethodAttrSkin";
        _this.isTopLevel = true;
        _this.proShowList = HeartMethod.ins().proShowList;
        return _this;
    }
    HeartMethodAttrWin.prototype.initUI = function () {
        _super.prototype.initUI.call(this);
    };
    HeartMethodAttrWin.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.curRole = param[0];
        this.heartId = param[1];
        this.setRoleAttr(this.curRole);
        var len = SubRoles.ins().subRolesLen;
        if (len > 1) {
            this.addTouchEvent(this.leftBtn, this.onTouch);
            this.addTouchEvent(this.rightBtn, this.onTouch);
            this.bg.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onMove, this);
            this.addTouchEndEvent(this.bg, this.onMove);
        }
        this.addTouchEndEvent(this, this.otherClose);
    };
    HeartMethodAttrWin.prototype.close = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        var len = SubRoles.ins().subRolesLen;
        if (len > 1) {
            this.removeTouchEvent(this.leftBtn, this.onTouch);
            this.removeTouchEvent(this.rightBtn, this.onTouch);
            this.bg.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onMove, this);
            this.bg.removeEventListener(egret.TouchEvent.TOUCH_END, this.onMove, this);
        }
        this.removeEventListener(egret.TouchEvent.TOUCH_END, this.otherClose, this);
    };
    HeartMethodAttrWin.prototype.onClose = function (e) {
        ViewManager.ins().close(this);
    };
    HeartMethodAttrWin.prototype.otherClose = function (e) {
        if (e.target == this.bg || e.target instanceof eui.Button)
            return;
        ViewManager.ins().close(this);
    };
    HeartMethodAttrWin.prototype.onMove = function (e) {
        switch (e.type) {
            case egret.TouchEvent.TOUCH_BEGIN:
                this._lastX = e.localX;
                break;
            case egret.TouchEvent.TOUCH_END:
                if (this._lastX > e.localX) {
                    if (this.curRole < 2) {
                        this.curRole++;
                        this.setRoleAttr(this.curRole);
                        this.moveAttr(-200);
                    }
                }
                else if (this._lastX < e.localX) {
                    if (this.curRole > 0) {
                        this.curRole--;
                        this.setRoleAttr(this.curRole);
                        this.moveAttr(200);
                    }
                }
                break;
        }
    };
    HeartMethodAttrWin.prototype.moveAttr = function (num) {
        var t = egret.Tween.get(this.attrGroup);
        var toNum;
        if (num > 0)
            toNum = 0;
        else
            toNum = 242;
        t.to({ "x": this.attrGroup.x + num, "alpha": 0 }, 200).to({ "x": toNum }, 200).to({ "x": 80, "alpha": 1 }, 200);
    };
    HeartMethodAttrWin.prototype.onTouch = function (e) {
        switch (e.currentTarget) {
            case this.leftBtn:
                if (this.curRole > 0) {
                    this.curRole--;
                    this.setRoleAttr(this.curRole);
                    this.moveAttr(200);
                }
                break;
            case this.rightBtn:
                if (this.curRole < 2) {
                    this.curRole++;
                    this.setRoleAttr(this.curRole);
                    this.moveAttr(-200);
                }
                break;
        }
    };
    HeartMethodAttrWin.prototype.setRoleAttr = function (roleId) {
        var role = SubRoles.ins().getSubRoleByIndex(roleId);
        this.job.source = "op_" + role.job;
        var str = "";
        var strName = "";
        var value = 0;
        var i = 0;
        var attrsList = HeartMethod.ins().calcHeartTotalValue(role.index, this.heartId);
        for (var j = 0; j < this.proShowList.length; j++) {
            i = this.proShowList[j].id;
            value = attrsList[j];
            if (!value)
                continue;
            if (this.proShowList[j].id == AttributeType.atZhuiMingPro)
                str += value + "%";
            else
                str += value + "";
            strName += HeartMethod.ins().getAttrStrByType(i) + ":";
            if (j < this.proShowList.length - 1) {
                str += "\n";
                strName += "\n";
            }
        }
        this.attr.text = str;
        this.attrName.text = strName;
        this.setBtn();
    };
    HeartMethodAttrWin.prototype.setBtn = function () {
        var len = SubRoles.ins().subRolesLen;
        if (len == 1) {
            this.leftBtn.visible = false;
            this.rightBtn.visible = false;
        }
        else if (len > 1) {
            if (this.curRole == 0) {
                this.leftBtn.visible = false;
                this.rightBtn.visible = true;
            }
            else if (this.curRole == 1) {
                this.leftBtn.visible = true;
                if (len < 3)
                    this.rightBtn.visible = false;
                else
                    this.rightBtn.visible = true;
            }
            else if (this.curRole == 2) {
                this.leftBtn.visible = true;
                this.rightBtn.visible = false;
            }
        }
    };
    return HeartMethodAttrWin;
}(BaseEuiView));
__reflect(HeartMethodAttrWin.prototype, "HeartMethodAttrWin");
ViewManager.ins().reg(HeartMethodAttrWin, LayerManager.UI_Popup);
//# sourceMappingURL=HeartMethodAttrWin.js.map