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
var MijiItem = (function (_super) {
    __extends(MijiItem, _super);
    function MijiItem() {
        var _this = _super.call(this) || this;
        _this.skinName = "MijiItemSkin";
        return _this;
    }
    MijiItem.prototype.dataChanged = function () {
        this.addImg.visible = false;
        this.itemLock.visible = false;
        this.unlearn.visible = false;
        if (this.data == null) {
            this.lock.visible = true;
            this.icon.source = "";
            this.setUnlearn(false);
        }
        else if (this.data instanceof ItemData) {
            this.lock.visible = false;
            this.icon.source = this.data.itemConfig.icon + "_png";
            this.count.text = this.data.count + "";
            this.icon.visible = true;
        }
        else if (!isNaN(this.data.id) || !isNaN(this.data)) {
            var b = !isNaN(this.data.id);
            this.lock.visible = false;
            this.count.text = "";
            var id = void 0;
            if (b) {
                this.itemLock.visible = this.data.isLocked;
                id = this.data.id;
            }
            else {
                id = this.data;
            }
            if (GlobalConfig.MiJiSkillConfig[id]) {
                var itemId = GlobalConfig.MiJiSkillConfig[id].item;
                var cfg = GlobalConfig.ItemConfig[itemId];
                if (cfg)
                    this.icon.source = cfg.icon + "_png";
                this.icon.visible = true;
            }
            else {
                this.icon.source = "";
            }
        }
        this.select.visible = false;
    };
    MijiItem.prototype.setCountLabel = function (index) {
        this.count.textFlow = new egret.HtmlTextParser().parser("<font color = '#9f946d'>" + (index + 1) + "转开启</font>");
        this.count.visible = true;
    };
    MijiItem.prototype.showSelect = function () {
        this.lock.visible = false;
        this.icon.source = "";
        this.addImg.visible = false;
        this.select.visible = true;
    };
    MijiItem.prototype.setSelected = function (bool) {
        this.select.visible = bool;
    };
    MijiItem.prototype.setUnlearn = function (b) {
        this.unlearn.visible = b;
    };
    MijiItem.prototype.showAdd = function () {
        this.data = null;
        this.lock.visible = false;
        this.icon.source = "";
        this.addImg.visible = true;
        this.redPoint.visible = UserMiji.ins().isMjiSum();
    };
    return MijiItem;
}(BaseItemRender));
__reflect(MijiItem.prototype, "MijiItem");
//# sourceMappingURL=MijiItem.js.map