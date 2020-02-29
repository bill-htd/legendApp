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
var DropDown = (function (_super) {
    __extends(DropDown, _super);
    function DropDown() {
        return _super.call(this) || this;
    }
    DropDown.prototype.childrenCreated = function () {
        this.init();
    };
    DropDown.prototype.init = function () {
        this.touchEnabled = true;
        this.currentState = 'up';
        this.addChangeEvent(this.list, this.listSelect);
        this.addTouchEvent(this, this.onTap);
        this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.removeStage, this);
        this.dataPro = new eui.ArrayCollection();
        this.list.itemRenderer = DropDownListItem;
        this.list.dataProvider = this.dataPro;
    };
    DropDown.prototype.listSelect = function (e) {
        this.value.text = this.list.selectedItem.name;
    };
    DropDown.prototype.removeStage = function (e) {
        if (this.stage)
            this.removeTouchEvent(this.stage, this.onTap);
    };
    DropDown.prototype.onTap = function (e) {
        this.currentState = this.currentState == 'up' ? 'down' : 'up';
        e.stopPropagation();
        if (this.stage) {
            if (this.currentState == 'down')
                this.addTouchEvent(this.stage, this.onTap);
            else
                this.removeTouchEvent(this.stage, this.onTap);
        }
    };
    DropDown.prototype.setData = function (data) {
        this.dataPro.replaceAll(data);
    };
    DropDown.prototype.setSelectedIndex = function (value) {
        this.list.selectedIndex = value;
    };
    DropDown.prototype.getSelectedIndex = function () {
        return this.list.selectedIndex;
    };
    DropDown.prototype.setLabel = function (str) {
        this.value.text = str;
    };
    DropDown.prototype.getLabel = function () {
        return this.value.text;
    };
    DropDown.prototype.setEnabled = function (b) {
        this.list.touchEnabled = b;
        this.list.touchChildren = b;
    };
    DropDown.prototype.getEnabled = function () {
        return this.list.touchEnabled;
    };
    DropDown.prototype.destructor = function () {
        this.list.removeEventListener(egret.Event.CHANGE, this.listSelect, this);
        this.removeTouchEvent(this, this.onTap);
        this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.removeStage, this);
        this.removeStage();
    };
    return DropDown;
}(BaseComponent));
__reflect(DropDown.prototype, "DropDown");
var DropDownListItem = (function (_super) {
    __extends(DropDownListItem, _super);
    function DropDownListItem() {
        return _super.call(this) || this;
    }
    DropDownListItem.prototype.dataChanged = function () {
        this.nameLbl.text = this.data.name;
    };
    return DropDownListItem;
}(BaseItemRender));
__reflect(DropDownListItem.prototype, "DropDownListItem");
//# sourceMappingURL=DropDown.js.map