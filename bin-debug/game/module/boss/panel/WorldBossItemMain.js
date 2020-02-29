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
var WorldBossItemMain = (function (_super) {
    __extends(WorldBossItemMain, _super);
    function WorldBossItemMain() {
        return _super.call(this) || this;
    }
    WorldBossItemMain.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.list.itemRenderer = WorldBossItem;
        this.list.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onTap, this);
        this.listData = new eui.ArrayCollection();
        this.list.dataProvider = this.listData;
    };
    WorldBossItemMain.prototype.onTap = function (e) {
        var data = this.listData.getItemAt(e.itemIndex);
        this.data.clickCall(data);
    };
    WorldBossItemMain.prototype.dataChanged = function () {
        _super.prototype.dataChanged.call(this);
        var data = this.data;
        this.listData.source = data.arr;
        this.list.selectedIndex = data.selectIndex;
        if (data.type == UserBoss.BOSS_SUBTYPE_WORLDBOSS)
            this.title.source = "title_mijingboss";
        else if (data.type == UserBoss.BOSS_SUBTYPE_DARKBOSS)
            this.title.source = "title_anzhimijingboss";
        var redPoint = false;
        if (UserBoss.ins().worldBossLeftTime[data.type]) {
            redPoint = UserBoss.ins().checkWorldBossRedPoint(data.type);
        }
        this.redPoint.visible = redPoint;
    };
    return WorldBossItemMain;
}(BaseItemRender));
__reflect(WorldBossItemMain.prototype, "WorldBossItemMain");
//# sourceMappingURL=WorldBossItemMain.js.map