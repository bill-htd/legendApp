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
var HunguAttrWin = (function (_super) {
    __extends(HunguAttrWin, _super);
    function HunguAttrWin() {
        var _this = _super.call(this) || this;
        _this._lastX = 0;
        _this.proShowList = [];
        _this.skinName = "heartmethodAttrSkin";
        _this.isTopLevel = true;
        _this.proShowList = [2, 4, 5, 6];
        return _this;
    }
    HunguAttrWin.prototype.initUI = function () {
        _super.prototype.initUI.call(this);
    };
    HunguAttrWin.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.curRole = param[0];
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
    HunguAttrWin.prototype.close = function () {
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
    HunguAttrWin.prototype.onClose = function (e) {
        ViewManager.ins().close(this);
    };
    HunguAttrWin.prototype.otherClose = function (e) {
        if (e.target == this.bg || e.target instanceof eui.Button)
            return;
        ViewManager.ins().close(this);
    };
    HunguAttrWin.prototype.onMove = function (e) {
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
    HunguAttrWin.prototype.moveAttr = function (num) {
        var t = egret.Tween.get(this.attrGroup);
        var toNum;
        if (num > 0)
            toNum = 0;
        else
            toNum = 242;
        t.to({ "x": this.attrGroup.x + num, "alpha": 0 }, 200).to({ "x": toNum }, 200).to({ "x": 80, "alpha": 1 }, 200);
    };
    HunguAttrWin.prototype.onTouch = function (e) {
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
    HunguAttrWin.prototype.setRoleAttr = function (roleId) {
        var role = SubRoles.ins().getSubRoleByIndex(roleId);
        this.job.source = "op_" + role.job;
        var str = "";
        var strName = "";
        var value = 0;
        var i = 0;
        var attrsList = Hungu.ins().calcHunguTotalValue(role.index);
        for (var j = 0; j < this.proShowList.length; j++) {
            i = this.proShowList[j];
            value = 0;
            for (var idx = 0; idx < attrsList.length; idx++) {
                if (attrsList[idx].type == i) {
                    value = attrsList[idx].value;
                    break;
                }
            }
            str += Math.floor(value) + "";
            strName += Hungu.ins().getAttrStrByType(i) + ":";
            if (j < this.proShowList.length - 1) {
                str += "\n";
                strName += "\n";
            }
        }
        this.attr.text = str;
        this.attrName.text = strName;
        this.setBtn();
    };
    HunguAttrWin.prototype.setBtn = function () {
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
    return HunguAttrWin;
}(BaseEuiView));
__reflect(HunguAttrWin.prototype, "HunguAttrWin");
ViewManager.ins().reg(HunguAttrWin, LayerManager.UI_Popup);
//# sourceMappingURL=HunguAttrWin.js.map