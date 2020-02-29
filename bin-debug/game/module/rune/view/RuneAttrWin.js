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
var RuneAttrWin = (function (_super) {
    __extends(RuneAttrWin, _super);
    function RuneAttrWin() {
        var _this = _super.call(this) || this;
        _this._lastX = 0;
        _this.proShowList = null;
        _this.curRole = 0;
        _this.skinName = "RuneAttrsSkin";
        return _this;
    }
    RuneAttrWin.prototype.initUI = function () {
        _super.prototype.initUI.call(this);
    };
    RuneAttrWin.prototype.setAttrList = function () {
        this.proShowList = [];
        var role = SubRoles.ins().getSubRoleByIndex(this.curRole);
        var runeList = role.runeDatas;
        var runeBaseConfig = GlobalConfig.RuneBaseConfig;
        if (!Assert(runeBaseConfig, "RuneAttrTypeConfig is null")) {
            for (var k in runeList) {
                var item = runeList[k];
                if (item.configID) {
                    var cfg = runeBaseConfig[item.configID];
                    if (!Assert(cfg, "cfg is null   id == " + item.configID))
                        this.setProShowList(cfg);
                }
            }
        }
    };
    RuneAttrWin.prototype.setProShowList = function (cfg) {
        this.checkIsRepeat(cfg.attr, 0);
        this.checkIsRepeat(cfg.equipAttr, 1);
        this.checkIsRepeat(cfg.exAttr, 2);
        this.checkIsRepeat(cfg.specialAttr, 3);
    };
    RuneAttrWin.prototype.checkIsRepeat = function (addList, index) {
        if (!this.proShowList[index]) {
            this.proShowList[index] = [];
        }
        var list = this.proShowList[index];
        if (!addList) {
            return;
        }
        var flag = false;
        var additem;
        for (var i in addList) {
            additem = addList[i];
            flag = false;
            for (var k in list) {
                if (list[k].type == additem.type) {
                    list[k].value = list[k].value + additem.value;
                    flag = true;
                }
            }
            if (!flag) {
                list.push(additem);
            }
        }
    };
    RuneAttrWin.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.curRole = isNaN(param[0]) ? 0 : param[0];
        this.addTouchEvent(this.leftBtn, this.onTap);
        this.addTouchEvent(this.rightBtn, this.onTap);
        this.addTouchEvent(this.closeBtn, this.onClose);
        this.addTouchEndEvent(this.bg, this.onMove);
        this.addTouchEndEvent(this, this.otherClose);
        this.setAttrList();
        this.setAttrs();
        this.setBtns();
    };
    RuneAttrWin.prototype.close = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        MessageCenter.ins().removeAll(this);
    };
    RuneAttrWin.prototype.onClose = function (e) {
        ViewManager.ins().close(this);
    };
    RuneAttrWin.prototype.otherClose = function (e) {
        if (e.target == this.bg || e.target instanceof eui.Button)
            return;
        ViewManager.ins().close(this);
    };
    RuneAttrWin.prototype.onTap = function (e) {
        if (e && e.currentTarget) {
            switch (e.currentTarget) {
                case this.leftBtn:
                    this.curRole--;
                    this.setAttrList();
                    this.setAttrs();
                    this.setBtns();
                    break;
                case this.rightBtn:
                    this.curRole++;
                    this.setAttrList();
                    this.setAttrs();
                    this.setBtns();
                    break;
            }
        }
    };
    RuneAttrWin.prototype.onMove = function (e) {
        switch (e.type) {
            case egret.TouchEvent.TOUCH_BEGIN:
                this._lastX = e.localX;
                break;
            case egret.TouchEvent.TOUCH_END:
                if (this._lastX > e.localX) {
                    if (this.curRole < 3) {
                        this.curRole++;
                        this.setAttrList();
                        this.setAttrs();
                        this.setBtns();
                    }
                }
                else if (this._lastX < e.localX) {
                    if (this.curRole > 0) {
                        this.curRole--;
                        this.setAttrList();
                        this.setAttrs();
                        this.setBtns();
                    }
                }
                break;
        }
    };
    RuneAttrWin.prototype.setAttrs = function () {
        var role = SubRoles.ins().getSubRoleByIndex(this.curRole);
        if (role) {
            this.job.source = "op_" + role.job;
            var str = "";
            for (var j = this.imgGroup.numChildren - 1; j >= 0; j--) {
                var item = this.imgGroup.getChildAt(j);
                DisplayUtils.removeFromParent(item);
                item = null;
            }
            var count = 0;
            for (var i = 0; i < this.proShowList.length; i++) {
                var list = this.proShowList[i];
                str += RuneConfigMgr.ins().getAttrByList(list, i);
                for (var k in list) {
                    var img = new eui.Image();
                    img.source = "tongyongdian";
                    img.y = 28 * count + 2;
                    this.imgGroup.addChild(img);
                    count++;
                }
            }
            if (str.length <= 0) {
                str = "\u6682\u65E0\u5C5E\u6027\n";
            }
            this.attr.textFlow = TextFlowMaker.generateTextFlow(str);
            this.mainGroup.height = this.attr.height + 190;
        }
    };
    RuneAttrWin.prototype.setBtns = function () {
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
                this.rightBtn.visible = len >= 3;
            }
            else if (this.curRole == 2) {
                this.leftBtn.visible = true;
                this.rightBtn.visible = false;
            }
        }
    };
    return RuneAttrWin;
}(BaseEuiView));
__reflect(RuneAttrWin.prototype, "RuneAttrWin");
ViewManager.ins().reg(RuneAttrWin, LayerManager.UI_Popup);
//# sourceMappingURL=RuneAttrWin.js.map