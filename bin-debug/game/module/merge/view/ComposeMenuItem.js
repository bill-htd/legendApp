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
var ComposeMenuItem = (function (_super) {
    __extends(ComposeMenuItem, _super);
    function ComposeMenuItem() {
        return _super.call(this) || this;
    }
    ComposeMenuItem.prototype.childrenCreated = function () {
        this.list.itemRenderer = ComposeSecMenuItem;
        this.list.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onListChange, this);
    };
    ComposeMenuItem.prototype.onListChange = function () {
        var data = this.list.selectedItem;
        var compose = ViewManager.ins().getView(BagWin).reinComposePanel;
        compose.updateView(data.id, data.index, MergeCC.ins().getCanMergeTargetId(data.id, data.index));
        compose.unSelectList();
        this.list.getVirtualElementAt(this.list.selectedIndex).setSelect(true);
    };
    ComposeMenuItem.prototype.selectList = function (index) {
        this.list.selectedIndex = index;
        var item = this.list.getVirtualElementAt(this.list.selectedIndex);
        item.selected = true;
        item.setSelect(true);
    };
    ComposeMenuItem.prototype.dataChanged = function () {
        var data = this.data;
        this.list.dataProvider = new ArrayCollection(MergeCC.ins().getMergeSecMenu(data.id));
        this.redPoint.visible = MergeCC.ins().isCanMergeById(data.id);
        this.rein_equips.source = data.btn_source;
    };
    return ComposeMenuItem;
}(BaseItemRender));
__reflect(ComposeMenuItem.prototype, "ComposeMenuItem");
//# sourceMappingURL=ComposeMenuItem.js.map