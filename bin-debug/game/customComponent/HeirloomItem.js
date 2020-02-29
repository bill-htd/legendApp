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
var HeirloomItem = (function (_super) {
    __extends(HeirloomItem, _super);
    function HeirloomItem() {
        var _this = _super.call(this) || this;
        _this.skinName = 'heirloomItemSkin';
        return _this;
    }
    HeirloomItem.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.init();
    };
    HeirloomItem.prototype.init = function () {
        this.addEventListener(egret.TouchEvent.TOUCH_END, this.onClick, this);
    };
    HeirloomItem.prototype.dataChanged = function () {
        this.clear();
        if (!this.data)
            return;
        if (this.data.icon) {
            this.lv.visible = this.lvBg.visible = false;
        }
        var info = this.data.info;
        this.itemIcon.setData(info, this.data.pos, this.data.icon, this.data.uplevel);
        this.lv.visible = info ? true : false;
        if (!this.data.icon) {
            if (info && info.lv > 0) {
                this.lv.visible = true;
                this.lv.source = "heir_0" + info.lv;
            }
            else {
                this.lv.visible = false;
            }
            this.lvBg.visible = this.lv.visible;
        }
        else {
            this.lvBg.visible = this.lv.visible = false;
            this.skillname = this.data.skillname;
            this.skilldesc = this.data.skilldesc;
            this.equipName.visible = false;
        }
        if (info.name)
            this.equipName.text = info.name;
        if (this.data.uplevel)
            this.setUpEff();
    };
    HeirloomItem.prototype.cleanEff = function () {
        this.itemIcon.cleanEff();
    };
    HeirloomItem.prototype.setTipsVisible = function () {
        this.itemIcon.imgRect.visible = false;
        this.equipName.visible = false;
    };
    HeirloomItem.prototype.clear = function () {
        this.cleanEff();
    };
    HeirloomItem.prototype.destruct = function () {
        this.removeEventListener(egret.TouchEvent.TOUCH_END, this.onClick, this);
    };
    HeirloomItem.prototype.onClick = function () {
    };
    HeirloomItem.prototype.setSelectIconVisible = function (v) {
        this.selectIcon.visible = v;
        var iconY = this.itemIcon.y;
        if (!this.itemIcon.imgRect.visible)
            iconY = this.itemIcon.y - 5;
        this.selectIcon.y = iconY;
    };
    HeirloomItem.prototype.setUpEff = function () {
        if (this.upEffect == null) {
            this.upEffect = new MovieClip;
            this.upEffect.x = this.itemIcon.x + this.itemIcon.width / 2;
            this.upEffect.y = this.itemIcon.y + this.itemIcon.height / 2;
            this.addChild(this.upEffect);
        }
        this.upEffect.playFile(RES_DIR_EFF + 'promoteeff', 1);
    };
    HeirloomItem.QUALITY_COLOR = [0xe2dfd4, 0x35e62d, 0xd242fb, 0xff750f, 0xf3311e, 0xffd93f];
    return HeirloomItem;
}(BaseItemRender));
__reflect(HeirloomItem.prototype, "HeirloomItem");
//# sourceMappingURL=HeirloomItem.js.map