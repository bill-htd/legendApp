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
var MovieClipEvent = egret.MovieClipEvent;
var WeaponListItem = (function (_super) {
    __extends(WeaponListItem, _super);
    function WeaponListItem() {
        var _this = _super.call(this) || this;
        _this.skinName = 'soulItemSkin';
        return _this;
    }
    WeaponListItem.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
    };
    WeaponListItem.prototype.dataChanged = function () {
        if (!this.data || !this.data.showId)
            return;
        var id = this.data.id;
        var isuse = this.data.isuse;
        var isRedPoint = this.data.isRedPoint;
        var level = this.data.level;
        var isSelect = this.data.isSelect;
        var wsconfig = GlobalConfig.WeaponSoulConfig[id];
        var showId = this.data.showId;
        var job = this.data.job;
        if (!wsconfig) {
            wsconfig = GlobalConfig.WeaponSoulConfig[showId];
            this.setEff(wsconfig, job);
            var wssconfig = GlobalConfig.WeaponSoulSuit[wsconfig.id];
            var wss = void 0;
            for (var k in wssconfig) {
                wss = wssconfig[k];
                break;
            }
            this.timelabel.text = wsconfig.name;
            this.huanhuaImage.visible = false;
            this.redPoint0.visible = isRedPoint;
            this.levellabel.text = wss.level + "阶";
            this.setGray(this.mc);
            return;
        }
        this.setEff(wsconfig, job);
        this.timelabel.text = wsconfig.name;
        this.huanhuaImage.visible = isuse;
        this.redPoint0.visible = isRedPoint;
        this.levellabel.text = level + "阶";
    };
    WeaponListItem.prototype.setEff = function (wsconfig, job) {
        if (!wsconfig)
            return;
        if (!this.mc)
            this.mc = new MovieClip;
        if (!this.mc.parent) {
            this.effpos.parent.addChild(this.mc);
            this.mc.x = this.effpos.x;
            this.mc.y = this.effpos.y;
            this.mc.rotation = this.effpos.rotation;
        }
        var eff = wsconfig.inside[job - 1];
        this.mc.playFile(RES_DIR_EFF + eff, -1);
        this.touchEnabled = false;
        this.mc.touchEnabled = false;
        this.effpos.parent.touchEnabled = false;
        this.cleanFilters(this.mc);
    };
    WeaponListItem.prototype.setGray = function (pic) {
        if (this.mc) {
            this.cleanFilters(this.mc);
        }
        if (pic) {
            var colorMatrix = [0.3, 0.6, 0, 0, 0, 0.3, 0.6, 0, 0, 0, 0.3, 0.6, 0, 0, 0, 0, 0, 0, 1, 0];
            pic.filters = [new egret.ColorMatrixFilter(colorMatrix)];
        }
    };
    WeaponListItem.prototype.cleanFilters = function (pic) {
        if (pic) {
            pic.filters = [];
        }
    };
    WeaponListItem.prototype.clear = function () {
        this.cleanFilters(this.mc);
    };
    WeaponListItem.prototype.destruct = function () {
        this.clear();
    };
    return WeaponListItem;
}(BaseItemRender));
__reflect(WeaponListItem.prototype, "WeaponListItem");
//# sourceMappingURL=WeaponListItem.js.map