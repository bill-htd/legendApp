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
var PeakBetWin = (function (_super) {
    __extends(PeakBetWin, _super);
    function PeakBetWin() {
        var _this = _super.call(this) || this;
        _this.skinName = "BetSkin";
        _this.numLabel.restrict = "0-9";
        _this.numLabel.maxChars = 8;
        _this.arrow0.visible = false;
        _this.arrow1.visible = false;
        _this.aPlayerGroup = _this.face0.parent;
        _this.aPlayerGroup.touchChildren = false;
        _this.bPlayerGroup = _this.face1.parent;
        _this.bPlayerGroup.touchChildren = false;
        return _this;
    }
    PeakBetWin.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.addTouchEvent(this.tipGroup, this.onTouch);
        this.addTouchEvent(this.bgClose, this.onTouch);
        this.addTouchEvent(this.betBtn, this.onTouch);
        this.addTouchEvent(this.maxBtn, this.onTouch);
        this.addTouchEvent(this.aPlayerGroup, this.onTouch);
        this.addTouchEvent(this.bPlayerGroup, this.onTouch);
        this.addChangeEvent(this.numLabel, this.changeInput);
        var group1 = param[0];
        var group2 = param[1];
        var isSixteen = PeakedSys.ins().isKFSixteen();
        var playData = PeakedSys.ins().isKf() ? PeakedHelp.getKFPlayerData(group1, group2, param[2], isSixteen) : PeakedHelp.getPlayerData(group1, group2);
        if (playData) {
            var Adata = playData.playerList[0];
            this.face0.source = Adata ? "yuanhead" + Adata.job + Adata.sex : "";
            this.name0.text = Adata ? Adata.playerName : "---";
            this.select0.name = Adata ? Adata.roleId + "" : "";
            var Bdata = playData.playerList[1];
            this.face1.source = Bdata ? "yuanhead" + Bdata.job + Bdata.sex : "";
            this.name1.text = Bdata ? Bdata.playerName : "---";
            this.select1.name = Bdata ? Bdata.roleId + "" : "";
        }
        this.select0.visible = this.select1.visible = false;
        var maxNum = Actor.chip;
        var dpMax = PeakedSys.ins().isKf() ? GlobalConfig.PeakRaceCrossTime[PeakedSys.ins().kfStatus + 1].maxBett : GlobalConfig.PeakRaceTime[PeakedSys.ins().bfStatus + 1].maxBett;
        this._maxNum = maxNum > dpMax ? dpMax : maxNum;
        this.changeInput(null);
    };
    PeakBetWin.prototype.close = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.removeTouchEvent(this.tipGroup, this.onTouch);
        this.removeTouchEvent(this.bgClose, this.onTouch);
        this.removeTouchEvent(this.betBtn, this.onTouch);
        this.removeTouchEvent(this.maxBtn, this.onTouch);
        this.addChangingEvent(this.numLabel, this.changeInput);
    };
    PeakBetWin.prototype.changeInput = function (e) {
        var curNum = parseInt(this.numLabel.text);
        if (e == null)
            curNum = this._maxNum;
        if (curNum < 0) {
            curNum = 0;
        }
        else if (curNum > this._maxNum) {
            curNum = this._maxNum;
        }
        this.numLabel.text = curNum + "";
    };
    PeakBetWin.prototype.onTouch = function (e) {
        switch (e.target) {
            case this.tipGroup:
            case this.bgClose:
                ViewManager.ins().close(this);
                break;
            case this.betBtn:
                var chipNum = parseInt(this.numLabel.text);
                if (this._curId) {
                    if (chipNum <= 0) {
                        UserTips.ins().showTips("\u7B79\u7801\u4E0D\u591F");
                        return;
                    }
                    if (PeakedSys.ins().isKf()) {
                        PeakedSys.ins().sendKFBet(this._curId, chipNum);
                    }
                    else {
                        PeakedSys.ins().sendBet(this._curId, chipNum);
                    }
                }
                else
                    UserTips.ins().showTips("\u8BF7\u5148\u9009\u62E9\u9700\u8981\u4E0B\u6CE8\u7684\u73A9\u5BB6");
                break;
            case this.maxBtn:
                this.changeInput(null);
                break;
            case this.aPlayerGroup:
                if (this.select0.name) {
                    this.select0.visible = true;
                    this.select1.visible = false;
                    this.arrow0.visible = true;
                    this.arrow1.visible = false;
                    this._curId = parseInt(this.select0.name);
                }
                break;
            case this.bPlayerGroup:
                if (this.select1.name) {
                    this.select1.visible = true;
                    this.select0.visible = false;
                    this.arrow0.visible = false;
                    this.arrow1.visible = true;
                    this._curId = parseInt(this.select1.name);
                }
                break;
        }
    };
    PeakBetWin.openCheck = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        var group1 = param[0];
        var group2 = param[1];
        var isSixteen = PeakedSys.ins().isKFSixteen();
        var playData = PeakedSys.ins().isKf() ? PeakedHelp.getKFPlayerData(group1, group2, param[2], isSixteen) : PeakedHelp.getPlayerData(group1, group2);
        if (playData && playData.playerList.length > 1) {
            return true;
        }
        else if (playData && playData.playerList.length == 1) {
            UserTips.ins().showTips("\u4EBA\u6570\u4E0D\u8DB3\uFF0C\u65E0\u6CD5\u4E0B\u6CE8\uFF01");
            return false;
        }
        else {
            UserTips.ins().showTips("\u672C\u8F6E\u8F6E\u7A7A,\u65E0\u6CD5\u4E0B\u6CE8\uFF01");
            return false;
        }
    };
    return PeakBetWin;
}(BaseEuiView));
__reflect(PeakBetWin.prototype, "PeakBetWin");
ViewManager.ins().reg(PeakBetWin, LayerManager.UI_Popup);
//# sourceMappingURL=PeakBetWin.js.map