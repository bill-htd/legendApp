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
var MijiLookWin = (function (_super) {
    __extends(MijiLookWin, _super);
    function MijiLookWin() {
        var _this = _super.call(this) || this;
        _this.skinName = "MijiOverViewSkin";
        _this.isTopLevel = true;
        return _this;
    }
    MijiLookWin.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.addTouchEvent(this.bgClose, this.onTap);
        this.list.itemRenderer = MijiLookItem;
        var arr = [];
        var arrEx = [];
        var rolarr = [];
        var rolarrEx = [];
        for (var i in GlobalConfig.MiJiSkillConfig) {
            var mj = GlobalConfig.MiJiSkillConfig[i];
            var itemconfig = GlobalConfig.ItemConfig[mj.item];
            if (ItemConfig.getQuality(itemconfig) == 3) {
                if (!arr.length)
                    arr.push("middle");
                if (rolarr.length < 5)
                    rolarr.push(mj);
                else {
                    arr.push(rolarr);
                    rolarr = [];
                    rolarr.push(mj);
                }
            }
            else {
                if (!arrEx.length)
                    arrEx.push("high");
                if (rolarrEx.length < 5)
                    rolarrEx.push(mj);
                else {
                    arrEx.push(rolarrEx);
                    rolarrEx = [];
                    rolarrEx.push(mj);
                }
            }
        }
        if (rolarr.length)
            arr.push(rolarr);
        if (rolarrEx.length)
            arrEx.push(rolarrEx);
        var totoalArr = arr.concat(arrEx);
        this.list.dataProvider = new eui.ArrayCollection(totoalArr);
    };
    MijiLookWin.prototype.onTap = function (e) {
        switch (e.currentTarget) {
            case this.bgClose:
                ViewManager.ins().close(this);
                break;
        }
    };
    MijiLookWin.prototype.close = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.removeTouchEvent(this.bgClose, this.onTap);
    };
    MijiLookWin.prototype.setData = function () {
    };
    return MijiLookWin;
}(BaseEuiView));
__reflect(MijiLookWin.prototype, "MijiLookWin");
ViewManager.ins().reg(MijiLookWin, LayerManager.UI_Main);
//# sourceMappingURL=MijiLookWin.js.map