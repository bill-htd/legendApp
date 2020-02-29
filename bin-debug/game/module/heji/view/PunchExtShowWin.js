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
var PunchExtShowWin = (function (_super) {
    __extends(PunchExtShowWin, _super);
    function PunchExtShowWin() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.colorWhite = "#f8b141";
        _this.colorGray = "#444134";
        return _this;
    }
    PunchExtShowWin.prototype.initUI = function () {
        _super.prototype.initUI.call(this);
        this.isTopLevel = true;
        this.skinName = "PunchExtShowSkin";
    };
    PunchExtShowWin.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.addTouchEvent(this.bgClose, this.onTap);
        this.setView();
    };
    PunchExtShowWin.prototype.close = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.removeTouchEvent(this.bgClose, this.onTap);
        this.removeObserve();
    };
    PunchExtShowWin.prototype.setView = function () {
        var str = "";
        var config = GlobalConfig.TogetherHitEquipQmConfig;
        var currentAtt = UserSkill.ins().qimingAttrDic;
        var obj = new Object();
        var objAttLevel = 0;
        for (var i in currentAtt) {
            obj = currentAtt[i];
            objAttLevel = Number(i);
        }
        var len = obj ? CommonUtils.getObjectLength(obj) : 0;
        var color = this.colorWhite;
        var isGray = false;
        for (var k in config) {
            for (var l in config[k]) {
                var obj_1 = config[k][l];
                if (Number(k) != 0) {
                    str += "<font color=" + this.colorWhite + ">" + k + "\u8F6C\u5957\u88C5\u5C5E\u6027(\u4E09\u89D2\u8272\u65F6):</font>\n";
                }
                else {
                    str += "<font color=" + this.colorWhite + ">" + l + "\u7EA7\u5957\u88C5\u5C5E\u6027(\u4E09\u89D2\u8272\u65F6):</font>\n";
                }
                var i = 0;
                var level = Number(k) * 10000 + Number(l);
                for (var m in obj_1) {
                    var totalAtt = obj_1[m].exAttr;
                    if (level > objAttLevel) {
                        color = this.colorGray;
                        isGray = true;
                    }
                    else if (level == objAttLevel) {
                        if (i + 1 > len) {
                            color = this.colorGray;
                            isGray = true;
                        }
                    }
                    str += "<font color=" + color + ">" + obj_1[m].num + "\u4EF6\u5957\uFF1A" + this.getDescTextFlow(obj_1[m].desc, !isGray) + "</font>\n";
                    i++;
                    if (i == 3) {
                        str += "\n";
                    }
                }
            }
        }
        this.baseAttr.textFlow = (new egret.HtmlTextParser()).parser(str);
    };
    PunchExtShowWin.prototype.getDescTextFlow = function (desc, color) {
        var tf = TextFlowMaker.generateTextFlow1(desc);
        var str = '';
        for (var _i = 0, tf_1 = tf; _i < tf_1.length; _i++) {
            var f = tf_1[_i];
            if (color && f.style && f.style.textColor != undefined) {
                str += "<font color=" + f.style.textColor + ">" + f.text + "</font>";
            }
            else {
                str += f.text;
            }
        }
        return str;
    };
    PunchExtShowWin.prototype.onTap = function (e) {
        switch (e.currentTarget) {
            case this.bgClose:
                ViewManager.ins().close(this);
                break;
        }
    };
    return PunchExtShowWin;
}(BaseEuiView));
__reflect(PunchExtShowWin.prototype, "PunchExtShowWin");
ViewManager.ins().reg(PunchExtShowWin, LayerManager.UI_Main);
//# sourceMappingURL=PunchExtShowWin.js.map