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
var FengceActivityWin = (function (_super) {
    __extends(FengceActivityWin, _super);
    function FengceActivityWin() {
        var _this = _super.call(this) || this;
        _this.curLevelIndex = 0;
        _this.skinName = "fengceActiveSkin";
        _this.defaultText = "\u6E38\u620F\u5185\u5BB9\u9047\u5230\u7684\u95EE\u9898\uFF0C\u8BF7\u54A8\u8BE2\u5BA2\u670D\uFF08\u4E0D\u8D85\u8FC7100\u5B57\uFF09";
        return _this;
    }
    FengceActivityWin.prototype.open = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        this.edit.addEventListener(egret.FocusEvent.FOCUS_IN, this.onTap, this);
        this.addTouchEvent(this.sendBtn, this.onTap);
        this.addTouchEvent(this.arrowleft, this.onTap);
        this.addTouchEvent(this.arrowright, this.onTap);
        this.addTouchEvent(this.bgClose, this.onTap);
        this.addTouchEvent(this.edit, this.onTap);
        this.addChangeEvent(this.tab, this.onSelectIndex);
        this.setSelectIndex(params[0] || 0);
    };
    FengceActivityWin.prototype.setSelectIndex = function (index) {
        this.viewStack.selectedIndex = index;
        if (index == 0) {
            if (!this.levelData) {
                this.levelData = [];
                var config = GlobalConfig.LevelMailConfig;
                for (var id in config) {
                    if (config[id].mType) {
                        this.levelData.push(+id);
                    }
                }
                this.levelData.sort(function (a, b) { return a < b ? -1 : 1; });
            }
            var lv = Actor.level;
            var zs = UserZs.ins().lv;
            this.curLevelIndex = 0;
            for (var i = 0; i < this.levelData.length; i++) {
                this.curLevelIndex = i;
                var zz = Math.floor(this.levelData[i] / 1000);
                if (zz < 1) {
                    if (lv < this.levelData[i]) {
                        break;
                    }
                }
                else {
                    if (zs < zz) {
                        break;
                    }
                }
            }
            this.updateLevel(this.curLevelIndex);
            var curDay = GameServer.serverOpenDay + 1;
            var dayConfig = GlobalConfig.LoginDayMailConfig[curDay];
            if (dayConfig) {
                var mailId = dayConfig.idList[0];
                var mailConfig = GlobalConfig.MailIdConfig[mailId];
                this.count0.text = mailConfig.attachment[0].count + "";
            }
            else {
                this.count0.text = "0";
            }
        }
    };
    FengceActivityWin.prototype.updateLevel = function (levelIndex) {
        if (levelIndex < 0) {
            levelIndex = 0;
        }
        if (levelIndex >= this.levelData.length) {
            levelIndex = this.levelData.length - 1;
        }
        if (levelIndex == 0) {
            this.arrowleft.visible = false;
            this.arrowright.visible = true;
        }
        else if (levelIndex == this.levelData.length - 1) {
            this.arrowleft.visible = true;
            this.arrowright.visible = false;
        }
        else {
            this.arrowleft.visible = true;
            this.arrowright.visible = true;
        }
        this.curLevelIndex = levelIndex;
        var lv = this.levelData[levelIndex];
        var zs = Math.floor(this.levelData[levelIndex] / 1000);
        if (zs < 1) {
            if (lv > Actor.level) {
                this.countDesc.text = "\u518D\u5347" + (lv - Actor.level) + "\u7EA7\u53EF\u9886\u53D6";
            }
            else {
                this.countDesc.text = "";
            }
            this.lvText.text = lv + "\u7EA7\u5956\u52B1";
        }
        else {
            if (zs > UserZs.ins().lv) {
                this.countDesc.text = "\u8FBE\u5230" + zs + "\u8F6C\u53EF\u9886\u53D6";
            }
            else {
                this.countDesc.text = "";
            }
            this.lvText.text = zs + "\u8F6C\u5956\u52B1";
        }
        var levelConfig = GlobalConfig.LevelMailConfig[lv];
        var mailId = levelConfig.idList[0];
        var mailConfig = GlobalConfig.MailIdConfig[mailId];
        this.count2.text = mailConfig.attachment[0].count + "";
    };
    FengceActivityWin.prototype.onSelectIndex = function (e) {
        this.setSelectIndex(e.itemIndex);
    };
    FengceActivityWin.prototype.onTap = function (e) {
        var tar = e.currentTarget;
        if (tar == this.bgClose) {
            ViewManager.ins().close(this);
        }
        else if (tar == this.arrowleft) {
            this.updateLevel(this.curLevelIndex - 1);
        }
        else if (tar == this.arrowright) {
            this.updateLevel(this.curLevelIndex + 1);
        }
        else if (tar == this.sendBtn) {
            if (this.edit.text.length == 0 || this.edit.text == this.defaultText) {
                UserTips.ins().showTips("内容不能为空");
                return;
            }
            ReportData.getIns().advice(this.edit.text, this.callBack, this);
        }
        else if (tar == this.edit) {
            if (this.edit.text == this.defaultText) {
                this.edit.text = "";
                this.edit.textColor = 0xffffff;
            }
        }
    };
    FengceActivityWin.prototype.callBack = function () {
        this.edit.text = "";
    };
    FengceActivityWin.prototype.close = function () {
        this.tab.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.onSelectIndex, this);
        this.edit.removeEventListener(egret.FocusEvent.FOCUS_IN, this.onTap, this);
    };
    return FengceActivityWin;
}(BaseEuiView));
__reflect(FengceActivityWin.prototype, "FengceActivityWin");
ViewManager.ins().reg(FengceActivityWin, LayerManager.UI_Popup);
//# sourceMappingURL=FengceActivityWin.js.map