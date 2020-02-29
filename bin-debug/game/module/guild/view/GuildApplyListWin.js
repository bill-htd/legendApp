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
var GuildApplyListWin = (function (_super) {
    __extends(GuildApplyListWin, _super);
    function GuildApplyListWin() {
        var _this = _super.call(this) || this;
        _this.skinName = "MemberApplySkin";
        _this.list.itemRenderer = GuildAppltListItemRender;
        _this.isTopLevel = true;
        return _this;
    }
    GuildApplyListWin.prototype.initUI = function () {
        _super.prototype.initUI.call(this);
        this.attrNum.restrict = "0-9";
        this.attrNum.maxChars = 8;
    };
    GuildApplyListWin.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.addTouchEvent(this.bgClose, this.onTap);
        this.addTouchEvent(this.list, this.onListTouch);
        this.observe(Guild.ins().postApplyInfos, this.updateList);
        Guild.ins().sendApplyInfos();
        this.addTouchEvent(this.checkBoxs, this.onTap);
        this.addChangeEvent(this.attrNum, this.onTxtChange);
        this.checkBoxs.selected = Guild.ins().isAuto == 1;
        this.attrNum.text = Guild.ins().attrLimit + "";
    };
    GuildApplyListWin.prototype.close = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.removeTouchEvent(this.bgClose, this.onTap);
        this.removeTouchEvent(this.list, this.onListTouch);
        this.removeTouchEvent(this.checkBoxs, this.onTap);
        this.attrNum.removeEventListener(egret.Event.CHANGE, this.onTxtChange, this);
        this.removeObserve();
    };
    GuildApplyListWin.prototype.onTxtChange = function (e) {
        Guild.ins().sendAddGuildLimit(this.checkBoxs.selected ? 1 : 0, parseInt(this.attrNum.text));
    };
    GuildApplyListWin.prototype.updateList = function (listData) {
        listData.sort(this.sort);
        this.list.dataProvider = new eui.ArrayCollection(listData);
    };
    GuildApplyListWin.prototype.onListTouch = function (e) {
        if (e.target instanceof eui.Button) {
            var item = e.target.parent;
            item.onTap(e.target);
        }
    };
    GuildApplyListWin.prototype.onTap = function (e) {
        switch (e.currentTarget) {
            case this.bgClose:
                ViewManager.ins().close(this);
                break;
            case this.checkBoxs:
                this.onTxtChange(null);
                break;
        }
    };
    GuildApplyListWin.prototype.sort = function (a, b) {
        if (a.attack > b.attack)
            return -1;
        else if (a.attack < b.attack)
            return 1;
        else
            return 0;
    };
    return GuildApplyListWin;
}(BaseEuiView));
__reflect(GuildApplyListWin.prototype, "GuildApplyListWin");
ViewManager.ins().reg(GuildApplyListWin, LayerManager.UI_Main);
//# sourceMappingURL=GuildApplyListWin.js.map