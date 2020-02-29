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
var GuildApplyWin = (function (_super) {
    __extends(GuildApplyWin, _super);
    function GuildApplyWin() {
        var _this = _super.call(this) || this;
        _this.isTopLevel = true;
        _this.dataArr = new eui.ArrayCollection([]);
        _this.skinName = "GuildApplySkin";
        _this.list.itemRenderer = GuildListItemRender;
        _this.list.dataProvider = _this.dataArr;
        return _this;
    }
    GuildApplyWin.openCheck = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        return true;
    };
    GuildApplyWin.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.addTouchEvent(this.createBtn, this.onTap);
        this.addTouchEvent(this.bgClose, this.onTap);
        this.addTouchEvent(this.list, this.onListTouch);
        this.observe(Guild.ins().postGuildList, this.updateList);
        Guild.ins().sendGuildList();
    };
    GuildApplyWin.prototype.onListTouch = function (e) {
        if (e.target instanceof eui.Button) {
            var item = e.target.parent;
            item.onTap();
        }
    };
    GuildApplyWin.prototype.updateList = function () {
        this.noGuild.visible = Guild.ins().guildListInfos.length == 0;
        this.dataArr.replaceAll(Guild.ins().guildListInfos);
    };
    GuildApplyWin.prototype.onTap = function (e) {
        switch (e.currentTarget) {
            case this.bgClose:
                ViewManager.ins().close(this);
                break;
            case this.createBtn:
                ViewManager.ins().open(GuildCreateWin);
                break;
        }
    };
    GuildApplyWin.prototype.destoryView = function () {
        _super.prototype.destoryView.call(this);
        for (var i = 0; i < this.list.numElements; i++) {
            if (this.list.getElementAt(i))
                this.list.getElementAt(i).destruct();
        }
    };
    return GuildApplyWin;
}(BaseEuiView));
__reflect(GuildApplyWin.prototype, "GuildApplyWin");
ViewManager.ins().reg(GuildApplyWin, LayerManager.UI_Popup);
//# sourceMappingURL=GuildApplyWin.js.map