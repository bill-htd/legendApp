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
var SamsaraComposeItem = (function (_super) {
    __extends(SamsaraComposeItem, _super);
    function SamsaraComposeItem() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SamsaraComposeItem.prototype.childrenCreated = function () {
        this.compose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);
        this.compose1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);
        this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemove, this);
    };
    SamsaraComposeItem.prototype.dataChanged = function () {
        var item = this.data;
        if (item) {
            var cfg = void 0;
            var id = void 0, count = void 0;
            if (item.type == MergeType.SamsareEquip) {
                cfg = GlobalConfig.ReincarnateEquipCompose[item.id];
                id = cfg.material.id;
                count = cfg.material.count;
                this.currentState = "state1";
            }
            else if (item.type == MergeType.ZhanlingEquip) {
                cfg = GlobalConfig.ZhanLingEquip[item.id];
                id = cfg.mat[0].id;
                count = cfg.mat[0].count;
                this.currentState = "state1";
            }
            else if (item.type == MergeType.Rune) {
                this.currentState = "state2";
                this.setState2Info(item.type, item.id);
                return;
            }
            this.need.showName = true;
            this.need.data = id;
            this.num.text = count.toString();
            this.target.showName = true;
            this.target.data = item.id;
            var isCan = MergeCC.ins().isCanMergeTargetId(item.type, item.id);
            this.redPoint.visible = isCan;
            if (isCan) {
                this.content.filters = null;
            }
            else {
                this.content.filters = FilterUtil.ARRAY_GRAY_FILTER;
            }
        }
    };
    SamsaraComposeItem.prototype.onTouch = function () {
        if (this.redPoint.visible) {
            var item = this.data;
            var cfg = void 0;
            if (item.type == MergeType.SamsareEquip) {
                cfg = GlobalConfig.ReincarnateEquipCompose[item.id];
                var roleIndex = SamsaraModel.ins().getRoleIndexByEquip(cfg.material.id);
                SamsaraCC.ins().requestCompose(item.id, roleIndex);
            }
            else if (item.type == MergeType.ZhanlingEquip) {
                ZhanLing.ins().sendZhanLingComposeItem(item.id);
            }
        }
        else if (this.redPoint1.visible) {
            if (this.data.type == MergeType.Rune) {
                Rune.ins().sendRuneMerge(this.data.id);
            }
        }
        else {
            UserTips.ins().showTips("|C:0xf3311e&T:\u6750\u6599\u4E0D\u8DB3|");
        }
    };
    SamsaraComposeItem.prototype.setState2Info = function (type, id) {
        this.redPoint.visible = false;
        this.need0.showName = true;
        this.need1.showName = true;
        this.need2.showName = true;
        this.target1.showName = true;
        if (type == MergeType.Rune) {
            var conf = GlobalConfig.RuneComposeConfig[id];
            var goldItemId = GlobalConfig.RuneOtherConfig.goldItemId;
            this.need0.data = conf.material[0];
            this.need1.data = conf.material[1];
            this.need2.num = conf.count;
            this.need2.data = goldItemId;
            this.target1.data = conf.id;
            var ins = UserBag.ins();
        }
        var isCan = MergeCC.ins().isCanMergeTargetId(type, id);
        this.redPoint1.visible = isCan;
        this.compose1.enabled = isCan;
    };
    SamsaraComposeItem.prototype.onRemove = function (e) {
        if (this.content)
            this.content.filters = null;
    };
    return SamsaraComposeItem;
}(BaseItemRender));
__reflect(SamsaraComposeItem.prototype, "SamsaraComposeItem");
//# sourceMappingURL=SamsaraComposeItem.js.map