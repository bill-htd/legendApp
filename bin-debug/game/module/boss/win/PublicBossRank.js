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
var PublicBossRank = (function (_super) {
    __extends(PublicBossRank, _super);
    function PublicBossRank() {
        return _super.call(this) || this;
    }
    PublicBossRank.prototype.initUI = function () {
        _super.prototype.initUI.call(this);
        this.skinName = "BossRankSkin";
    };
    PublicBossRank.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.addTouchEvent(this.hideBtn, this.onTap);
        this['myHarm'].text = "\u6211\u7684\u4F24\u5BB3\uFF1A";
        this['myRank'].text = "\u6211\u7684\u6392\u540D\uFF1A";
    };
    PublicBossRank.prototype.close = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.removeTouchEvent(this.hideBtn, this.onTap);
        this.removeObserve();
    };
    PublicBossRank.prototype.updateRank = function (param) {
        var id = param[0];
        var datas = param[1];
        var actorID = Actor.actorID;
        for (var i = 0; i < 3; i++) {
            this["rank" + i].text = i + 1;
            this["name" + i].text = datas[i] ? datas[i][1] : "";
            if (datas[i]) {
                CommonUtils.labelIsOverLenght(this["harm" + i], datas[i][2]);
            }
            else
                this["harm" + i].text = "";
            if (datas[i] && datas[i][0] == actorID.toString()) {
                this['myHarm'].text = "\u6211\u7684\u4F24\u5BB3\uFF1A" + this["harm" + i].text;
                this['myRank'].text = "\u6211\u7684\u6392\u540D\uFF1A" + this["rank" + i].text;
            }
        }
    };
    PublicBossRank.prototype.onTap = function (e) {
        switch (e.currentTarget) {
            case this.hideBtn:
                var t = egret.Tween.get(this.group);
                t.to({ x: this.hideBtn.selected ? 480 : 247 }, 500);
                break;
        }
    };
    return PublicBossRank;
}(BaseEuiView));
__reflect(PublicBossRank.prototype, "PublicBossRank");
ViewManager.ins().reg(PublicBossRank, LayerManager.UI_Main);
//# sourceMappingURL=PublicBossRank.js.map