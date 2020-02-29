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
var RRoleAttrWin = (function (_super) {
    __extends(RRoleAttrWin, _super);
    function RRoleAttrWin() {
        var _this = _super.call(this) || this;
        _this._lastX = 0;
        _this.proShowList = [
            1,
            2,
            3,
            4,
            5,
            6,
            7,
            AttributeType.atCritEnhance,
            8,
            9,
            10,
            11,
            12,
            13,
            14,
            15,
            16
        ];
        _this.skinName = "RoleAttrSkin";
        _this.isTopLevel = true;
        return _this;
    }
    RRoleAttrWin.prototype.initUI = function () {
        _super.prototype.initUI.call(this);
    };
    RRoleAttrWin.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this._otherPlayerData = param[1];
        this.curRole = param[0];
        this.setRoleAttr(this.curRole);
        var len = this._otherPlayerData.roleData.length;
        if (len > 1) {
            this.addTouchEvent(this.leftBtn, this.onTouch);
            this.addTouchEvent(this.rightBtn, this.onTouch);
            this.bg.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onMove, this);
            this.addTouchEndEvent(this.bg, this.onMove);
        }
        this.addTouchEndEvent(this, this.otherClose);
        this.addTouchEvent(this.closeBtn, this.onClose);
        this.addTouchEvent(this.bgClose, this.onClose);
    };
    RRoleAttrWin.prototype.close = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        var len = this._otherPlayerData.roleData.length;
        if (len > 1) {
            this.removeTouchEvent(this.leftBtn, this.onTouch);
            this.removeTouchEvent(this.rightBtn, this.onTouch);
            this.bg.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onMove, this);
            this.bg.removeEventListener(egret.TouchEvent.TOUCH_END, this.onMove, this);
        }
        this.removeEventListener(egret.TouchEvent.TOUCH_END, this.otherClose, this);
        this.removeTouchEvent(this.closeBtn, this.onClose);
        this.removeTouchEvent(this.bgClose, this.onClose);
    };
    RRoleAttrWin.prototype.onClose = function (e) {
        ViewManager.ins().close(this);
    };
    RRoleAttrWin.prototype.otherClose = function (e) {
        if (e.target == this.bg || e.target instanceof eui.Button)
            return;
        ViewManager.ins().close(this);
    };
    RRoleAttrWin.prototype.onMove = function (e) {
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
    RRoleAttrWin.prototype.moveAttr = function (num) {
        var t = egret.Tween.get(this.attrGroup);
        var toNum;
        if (num > 0)
            toNum = 0;
        else
            toNum = 242;
        t.to({ "x": this.attrGroup.x + num, "alpha": 0 }, 200).to({ "x": toNum }, 200).to({ "x": 80, "alpha": 1 }, 200);
    };
    RRoleAttrWin.prototype.onTouch = function (e) {
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
    RRoleAttrWin.prototype.setRoleAttr = function (roleId) {
        var role = this._otherPlayerData.roleData[roleId];
        this.job.source = "op_" + role.job;
        var str = "";
        var value = 0;
        var i = 0;
        for (var j = 0; j < this.proShowList.length; j++) {
            i = this.proShowList[j];
            value = role.attributeData[i];
            if (i > 1 && i < 9) {
                if (i == 7 || i == 8) {
                    str += value / 100 + "%";
                }
                else {
                    str += value;
                }
            }
            else if (i > 12 && i < 15 || i > 15) {
                if (i == AttributeType.atCritEnhance) {
                    value += role.getAtt(AttributeType.atHuiXinDamage);
                    value += 10000;
                }
                str += value / 100 + "%";
            }
            else
                continue;
            if (j < this.proShowList.length - 1)
                str += "\n";
        }
        this.attr.text = str;
        this.setBtn();
    };
    RRoleAttrWin.prototype.setBtn = function () {
        var len = this._otherPlayerData.roleData.length;
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
    return RRoleAttrWin;
}(BaseEuiView));
__reflect(RRoleAttrWin.prototype, "RRoleAttrWin");
ViewManager.ins().reg(RRoleAttrWin, LayerManager.UI_Popup);
//# sourceMappingURL=RRoleAttrWin.js.map