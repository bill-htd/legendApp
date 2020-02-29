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
var CityFunPanel = (function (_super) {
    __extends(CityFunPanel, _super);
    function CityFunPanel() {
        var _this = _super.call(this) || this;
        _this.skinName = "CityFunSkin";
        return _this;
    }
    CityFunPanel.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.addTouchEvent(this.attState, this.onClick);
        this.addTouchEvent(this.quit, this.onClick);
        this.addTouchEvent(this.npcBtn, this.onClick);
        this.observe(CityCC.ins().postChangeAttStatue, this.changeBtn);
        this.observe(CityCC.ins().postCityBossId, this.changeAttStatue);
        this.changeAttStatue();
    };
    CityFunPanel.prototype.changeAttStatue = function () {
        if (CityCC.ins().cityBossId > 0) {
            CityCC.ins().postChangeAttStatue(1);
            ViewManager.ins().open(TargetListPanel);
        }
    };
    CityFunPanel.prototype.changeBtn = function () {
        this.attState.selected = ViewManager.ins().isShow(TargetListPanel);
    };
    CityFunPanel.prototype.onClick = function (e) {
        switch (e.currentTarget) {
            case this.attState:
                var type = 0;
                if (this.attState.selected) {
                    ViewManager.ins().open(TargetListPanel);
                    type = 1;
                }
                else if (CityCC.ins().cityBossId == 0) {
                    type = 2;
                    ViewManager.ins().close(TargetListPanel);
                }
                else {
                    UserTips.ins().showTips('当前远古BOSS攻城期间，不能切换模式');
                }
                CityCC.ins().postChangeAttStatue(type);
                break;
            case this.quit:
                WarnWin.show("\u662F\u5426\u9000\u51FA\u4E3B\u57CE\uFF0C\u9000\u51FA\u540E\u670930\u79D2\u8FDB\u5165CD", function () {
                    UserFb.ins().sendExitFb();
                }, this);
                break;
            case this.npcBtn:
                break;
        }
    };
    return CityFunPanel;
}(BaseEuiView));
__reflect(CityFunPanel.prototype, "CityFunPanel");
var GameSystem;
(function (GameSystem) {
    GameSystem.cityfunpanel = function () {
        ViewManager.ins().reg(CityFunPanel, LayerManager.Main_View);
    };
})(GameSystem || (GameSystem = {}));
//# sourceMappingURL=CityFunPanel.js.map