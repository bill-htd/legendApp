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
var SamsaraComposeMenuItem = (function (_super) {
    __extends(SamsaraComposeMenuItem, _super);
    function SamsaraComposeMenuItem() {
        return _super.call(this) || this;
    }
    SamsaraComposeMenuItem.prototype.childrenCreated = function () {
        this.list.itemRenderer = SamsaraComposeSecMenuItem;
        this.list.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onListChange, this);
    };
    SamsaraComposeMenuItem.prototype.onListChange = function () {
        var data = this.list.selectedItem;
        var compose = ViewManager.ins().getView(BagWin).reinComposePanel;
        compose.updateView(data.type, data.zsLv, SamsaraModel.ins().getComposeEquipId(data.type, data.zsLv));
        compose.unSelectList();
        this.list.getElementAt(this.list.selectedIndex).setSelect(true);
    };
    SamsaraComposeMenuItem.prototype.selectList = function (index) {
        this.list.selectedIndex = index;
        var item = this.list.getElementAt(this.list.selectedIndex);
        item.selected = true;
        item.setSelect(true);
    };
    SamsaraComposeMenuItem.prototype.dataChanged = function () {
        var type = this.data;
        this.nameLabel.text = GlobalConfig.ReincarnationBase.headName[type - 1] + ".\u8F6E\u56DE\u88C5\u5907";
        this.list.dataProvider = new ArrayCollection(SamsaraModel.ins().getComposeZsList(type));
        this.redPoint.visible = SamsaraModel.ins().isCanTypeCompose(type);
        if (type == 1) {
            this.rein_equips.source = "rein_equip_shen";
        }
        else {
            this.rein_equips.source = "rein_equip_sheng";
        }
    };
    return SamsaraComposeMenuItem;
}(BaseItemRender));
__reflect(SamsaraComposeMenuItem.prototype, "SamsaraComposeMenuItem");
//# sourceMappingURL=SamsaraComposeMenuItem.js.map