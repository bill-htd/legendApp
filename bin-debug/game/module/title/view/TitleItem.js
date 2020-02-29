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
var TitleItem = (function (_super) {
    __extends(TitleItem, _super);
    function TitleItem() {
        return _super.call(this) || this;
    }
    TitleItem.prototype.onTap = function (e) {
        if (e.target == this.btnSet) {
            Title.ins().postUseTitle(this.data);
        }
        else {
            this.currentState = this.currentState != 'expand' ? 'expand' : 'simple';
            MessageCenter.ins().dispatch(Title.TITLE_WIN_REFLASH_PANEL, this, this.currentState);
        }
    };
    TitleItem.prototype.dataChanged = function () {
        this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemove, this);
        if (this.data instanceof TitleInfo) {
            var titleInfo = this.data;
            this.conditionTxt.text = "\u83B7\u5F97\u6761\u4EF6\uFF1A" + titleInfo.config.condition;
            this.img.source = titleInfo.config.img;
            if (titleInfo.config.eff) {
                if (!this.titleMc) {
                    this.titleMc = ObjectPool.pop("MovieClip");
                    this.titleMc.x = 118;
                    this.titleMc.y = 30;
                    this.addChildAt(this.titleMc, 20);
                }
                var eff = RES_DIR_EFF + titleInfo.config.eff;
                this.titleMc.playFile(eff, -1);
            }
            else {
                if (this.titleMc) {
                    this.titleMc.destroy();
                    this.titleMc = null;
                }
            }
            if (titleInfo.endTime >= 0) {
                this.btnSet.label = titleInfo.config.Id == Title.ins().showTitleDic[Title.ins().curSelectRole] ? '卸下' : Title.ins().showTitleDic[Title.ins().curSelectRole] ? '更换' : '穿戴';
                this.btnSet.visible = true;
                this.time.visible = true;
                var s = DateUtils.formatMiniDateTime(titleInfo.endTime) / 1000;
                this.time.text = titleInfo.endTime == 0 ? "有效期：永久" : "有效期：" + DateUtils.getFormatBySecond(s, 2);
                this.labLack.visible = false;
            }
            else {
                this.btnSet.visible = false;
                this.time.visible = false;
                this.labLack.visible = true;
            }
            if (typeof TitleItem.rareText[titleInfo.config.rare] == 'string')
                TitleItem.rareText[titleInfo.config.rare] = TextFlowMaker.generateTextFlow('稀有度：|C:' + TitleItem.rareText[titleInfo.config.rare]);
            this.labRare.textFlow = TitleItem.rareText[titleInfo.config.rare];
            if (this._power != titleInfo.power) {
                if (this._power)
                    BitmapNumber.ins().desstroyNumPic(this.power.getChildAt(0));
                this.power.addChildAt(BitmapNumber.ins().createNumPic(titleInfo.power * SubRoles.ins().subRolesLen, '8'), 0);
                this._power = titleInfo.power;
            }
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTap, this);
        }
        else {
            this.img.source = '';
            this.conditionTxt.text = '';
            if (this._power) {
                this._power = 0;
                BitmapNumber.ins().desstroyNumPic(this.power.getChildAt(0));
            }
            this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTap, this);
        }
    };
    TitleItem.prototype.onRemove = function () {
        this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemove, this);
        WatcherUtil.removeFromArrayCollection(this.attrs.dataProvider);
        WatcherUtil.removeFromArrayCollection(this.attrsTotal.dataProvider);
        this.attrs.dataProvider = null;
        this.attrsTotal.dataProvider = null;
    };
    TitleItem.rareText = [
        '0xfbf8ee&T:普通',
        '0x00ff3c&T:稀有',
        '0x066eba&T:珍贵',
        '0xd200ff&T:国器',
        '0xf45601&T:无双',
    ];
    return TitleItem;
}(BaseItemRender));
__reflect(TitleItem.prototype, "TitleItem");
//# sourceMappingURL=TitleItem.js.map