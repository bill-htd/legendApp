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
var GwFubenView = (function (_super) {
    __extends(GwFubenView, _super);
    function GwFubenView() {
        return _super.call(this) || this;
    }
    GwFubenView.prototype.childrenCreated = function () {
        this._ary = new eui.ArrayCollection();
        this.checkRank.touchEnabled = true;
        this.checkRank.textFlow = new egret.HtmlTextParser().parser("<u>\u67E5\u770B\u6392\u884C</u>");
    };
    GwFubenView.prototype.open = function () {
        this.addTouchEvent(this.checkRank, this.touchHandler);
        this.addTouchEvent(this.challenge, this.touchHandler);
        this.observe(GodWeaponCC.ins().postFubenInfo, this.updateView);
        this.observe(GodWeaponCC.ins().postRankInfo, this.updateRank);
        this.observe(UserBag.ins().postItemCountChange, this.useToItem);
        this.list.dataProvider = this._ary;
        this.list.itemRenderer = GwFubenGridRender;
        this.list.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onTouchList, this);
        GodWeaponCC.ins().requestFubenInfo();
    };
    GwFubenView.prototype.updateView = function () {
        GodWeaponCC.ins().requestRanInfo();
        this._ary.replaceAll(GodWeaponCC.ins().fubenInfoData.listData);
        var freeNum = GlobalConfig.GodWeaponBaseConfig.freeCount;
        var leftNum = GodWeaponCC.ins().fubenInfoData.hadChallengeNum;
        this.countText.text = "\u4ECA\u65E5\u5269\u4F59\u6B21\u6570\uFF1A " + leftNum;
        this.list.selectedIndex = 0;
        this._selectData = this.list.selectedItem;
        if (GodWeaponCC.ins().fubenInfoData.hadChallengeNum > 0) {
            this.rpImg.visible = true;
        }
        else {
            this.rpImg.visible = false;
        }
    };
    GwFubenView.prototype.updateRank = function () {
        var ary = GodWeaponCC.ins().rankInfoDataAry;
        var len = ary.length;
        if (len == 0) {
            this.rank.visible = false;
        }
        else {
            this.rank.visible = true;
        }
        var data;
        for (var i = 0; i < 3; i++) {
            data = ary[i];
            if (data) {
                this.getRankImg(i + 1).visible = true;
                this.getPlayName(i + 1).visible = true;
                this.getPlayRank(i + 1).visible = true;
                this.getPlayTime(i + 1).visible = true;
                this.getPlayName(i + 1).text = data.nameStr;
                this.getPlayRank(i + 1).text = data.floorNum + "\u5C42";
                this.getPlayTime(i + 1).text = data.getgetTimeStr();
            }
            else {
                this.getPlayName(i + 1).visible = false;
                this.getPlayRank(i + 1).visible = false;
                this.getPlayTime(i + 1).visible = false;
                this.getRankImg(i + 1).visible = false;
            }
        }
    };
    GwFubenView.prototype.useToItem = function () {
        if (this._isUser) {
            this._isUser = false;
            if (this._selectData) {
                GodWeaponCC.ins().joinFuben(this._selectData.gridNum);
            }
        }
    };
    GwFubenView.prototype.getRankImg = function (index) {
        return this["rank" + index + "Img"];
    };
    GwFubenView.prototype.getPlayName = function (index) {
        return this["player" + index + "Name"];
    };
    GwFubenView.prototype.getPlayRank = function (index) {
        return this["player" + index + "Rank"];
    };
    GwFubenView.prototype.getPlayTime = function (index) {
        return this["player" + index + "Time"];
    };
    GwFubenView.prototype.close = function () {
        this._selectData = null;
        this.removeTouchEvent(this.checkRank, this.touchHandler);
        this.removeTouchEvent(this.challenge, this.touchHandler);
        this.removeObserve();
        this.list.dataProvider = null;
    };
    GwFubenView.prototype.touchHandler = function (e) {
        if (e.target == this.challenge) {
            if (!this.showTips())
                return;
            if (this._selectData) {
                GodWeaponCC.ins().joinFuben(this._selectData.gridNum);
            }
        }
        else if (e.target == this.checkRank) {
            ViewManager.ins().open(GwMijingRankView);
        }
    };
    GwFubenView.prototype.onTouchList = function (e) {
        this._selectData = this.list.selectedItem;
    };
    GwFubenView.prototype.showTips = function () {
        var count = GodWeaponCC.ins().fubenInfoData.hadChallengeNum;
        if (count > 0) {
            return true;
        }
        var tipText = "";
        var item = UserBag.ins().getBagGoodsByTypeAndId(UserBag.BAG_TYPE_OTHTER, GlobalConfig.GodWeaponBaseConfig.fubenItem);
        if (item) {
            tipText = "\u786E\u5B9A\u4F7F\u75281\u4E2A<font color='#FFB82A'>" + item.itemConfig.name + "</font>\u589E\u52A0\u6311\u6218\u6B21\u6570\uFF1F\n";
            WarnWin.show(tipText, function () {
                this._isUser = true;
                UserBag.ins().sendUseItem(item.configID, 1);
            }, this);
        }
        else {
            UserTips.ins().showTips("|C:0xf3311e&T:\u4ECA\u65E5\u5269\u4F59\u6B21\u6570\u4E0D\u8DB3|");
        }
        return false;
    };
    return GwFubenView;
}(BaseView));
__reflect(GwFubenView.prototype, "GwFubenView");
var GwFubenGridRender = (function (_super) {
    __extends(GwFubenGridRender, _super);
    function GwFubenGridRender() {
        return _super.call(this) || this;
    }
    GwFubenGridRender.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this._ary = new eui.ArrayCollection();
        this.list.dataProvider = this._ary;
        this.list.itemRenderer = MijingItemBase;
    };
    GwFubenGridRender.prototype.dataChanged = function () {
        _super.prototype.dataChanged.call(this);
        if (!this.data) {
            return;
        }
        this._thisData = this.data;
        this.storeyCount.text = "\u7B2C" + this._thisData.gridNum + "\u5C42";
        var ary = this._thisData.config.award[1].concat();
        ary = ary.concat(this._thisData.config.firstAward.concat());
        var newAry = [];
        for (var i = 0; i < ary.length; i++) {
            var data = new MijinglistData();
            data.data = ary[i];
            data.index = i + 1;
            data.start = this._thisData.config.award[1].length;
            data.floorNum = this._thisData.gridNum;
            newAry.push(data);
        }
        this._ary.replaceAll(newAry);
        if (this._thisData.curPoint != 0) {
            this.rankImg.visible = true;
            this.rankbg.visible = true;
            this.rankImg.source = "godweapon_rank" + this._thisData.curPoint;
        }
        else {
            this.rankImg.visible = false;
            this.rankbg.visible = false;
        }
        this.choose.visible = this.selected;
        this.rank.visible = !this.selected;
    };
    GwFubenGridRender.prototype.invalidateState = function () {
        _super.prototype.invalidateState.call(this);
        this.choose.visible = this.selected;
        this.rank.visible = !this.selected;
    };
    return GwFubenGridRender;
}(BaseItemRender));
__reflect(GwFubenGridRender.prototype, "GwFubenGridRender");
var MijingItemBase = (function (_super) {
    __extends(MijingItemBase, _super);
    function MijingItemBase() {
        var _this = _super.call(this) || this;
        _this.init();
        return _this;
    }
    MijingItemBase.prototype.init = function () {
        this.addEventListener(egret.TouchEvent.TOUCH_END, this.onClick, this);
    };
    MijingItemBase.prototype.dataChanged = function () {
        _super.prototype.dataChanged.call(this);
        if (!this.data) {
            return;
        }
        this._thisdata = this.data;
        this.itemIcon.imgJob.visible = false;
        if (this._thisdata.data.type == 0) {
            this.itemIcon.imgIcon.source = RewardData.getCurrencyRes(this._thisdata.data.id);
            var type = 1;
            switch (this._thisdata.data.id) {
                case MoneyConst.yuanbao:
                    type = 5;
                    break;
                case MoneyConst.gold:
                    type = 0;
                    break;
                case MoneyConst.soul:
                    type = 2;
                    break;
                case MoneyConst.piece:
                    type = 2;
                    this.itemIcon.imgIcon.source = RewardData.CURRENCY_RES[this._thisdata.data.id];
                    break;
                case MoneyConst.godweaponExp:
                    type = 2;
                    break;
                default:
                    break;
            }
            var count = this._thisdata.data.count;
            (count != undefined && count > 1) ? this.setCount(count + "") : this.setCount("");
            if (this._thisdata.index <= this._thisdata.start) {
                this.nameTxt.text = RewardData.getCurrencyName(this._thisdata.data.id);
                this.itemIcon.imgBg.source = "quality" + type;
                this.nameTxt.textColor = ItemBase.QUALITY_COLOR[type];
            }
            else {
                this.nameTxt.text = "S首通奖励";
                var data = GodWeaponCC.ins().fubenInfoData;
                this.getImg.visible = false;
                for (var i = 0; i < data.listData.length; i++) {
                    if (this._thisdata.floorNum == data.listData[i].gridNum) {
                        if (data.listData[i].curPoint == 1) {
                            this.getImg.visible = true;
                        }
                        break;
                    }
                }
                if (this._thisdata.floorNum <= 10) {
                    this.nameTxt.textColor = ItemBase.QUALITY_COLOR[3];
                    this.itemIcon.imgBg.source = "quality" + 3;
                }
                else {
                    this.nameTxt.textColor = ItemBase.QUALITY_COLOR[4];
                    this.itemIcon.imgBg.source = "quality" + 4;
                }
            }
        }
        else {
            this.itemConfig = GlobalConfig.ItemConfig[this._thisdata.data.id];
            if (!this.itemConfig)
                return;
            var type = ItemConfig.getQuality(this.itemConfig);
            this.nameTxt.textColor = ItemBase.QUALITY_COLOR[type];
            this.itemIcon.imgBg.source = "quality" + type;
            var count = this._thisdata.data.count;
            count > 1 ? this.setCount(count + "") : this.setCount("");
            this.itemIcon.imgIcon.source = this.itemConfig.icon + '_png';
            if (this._thisdata.index <= this._thisdata.start) {
                this.nameTxt.text = this.itemConfig.name;
            }
            else {
                this.nameTxt.text = "S首通奖励";
                var data = GodWeaponCC.ins().fubenInfoData;
                this.getImg.visible = false;
                for (var i = 0; i < data.listData.length; i++) {
                    if (this._thisdata.floorNum == data.listData[i].gridNum) {
                        if (data.listData[i].curPoint == 1) {
                            this.getImg.visible = true;
                        }
                        break;
                    }
                }
            }
        }
    };
    MijingItemBase.prototype.setCount = function (str) {
        if (str.length > 4) {
            var wNum = Math.floor(Number(str) / 1000);
            str = wNum / 10 + "万";
        }
        this.count.text = str;
    };
    MijingItemBase.prototype.onClick = function () {
        this.showDetail();
    };
    MijingItemBase.prototype.showDetail = function () {
        if (this._thisdata.data.type != 0) {
            ViewManager.ins().open(ItemDetailedWin, 0, this.itemConfig.id, this._thisdata.data.count);
        }
    };
    return MijingItemBase;
}(BaseItemRender));
__reflect(MijingItemBase.prototype, "MijingItemBase");
var MijinglistData = (function () {
    function MijinglistData() {
    }
    return MijinglistData;
}());
__reflect(MijinglistData.prototype, "MijinglistData");
//# sourceMappingURL=GwFubenView.js.map