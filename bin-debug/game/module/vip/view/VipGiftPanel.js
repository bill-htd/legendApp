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
var VipGiftPanel = (function (_super) {
    __extends(VipGiftPanel, _super);
    function VipGiftPanel() {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        var _this = _super.call(this) || this;
        _this.curIndex = param[0] ? param[0] : 0;
        _this.skinName = "VipGift" + _this.curIndex + "Skin";
        return _this;
    }
    VipGiftPanel.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
    };
    VipGiftPanel.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.curIndex = param[0] ? param[0] : 0;
        this.menuList.itemRenderer = VipGiftBtnRender;
        this.addTouchEvent(this.leftBtn, this.onTouchBtn);
        this.addTouchEvent(this.rightBtn, this.onTouchBtn);
        this.addEvent(eui.ItemTapEvent.ITEM_TAP, this.menuList, this.onTouchMenu);
        this.addEvent(eui.UIEvent.CHANGE_END, this.menuScroller, this.onChange);
        this.observe(UserVip.ins().postVipGiftBuy, this.onUpdate);
        this.roleSelect.hideRole();
        this.updateMenu();
        this.setDefault();
    };
    VipGiftPanel.prototype.onTouchMenu = function (e) {
        SoundUtil.ins().playEffect(SoundUtil.WINDOW);
        this.setGiftId(e.item.id);
    };
    VipGiftPanel.prototype.onChange = function () {
        if (this.menuList.scrollH < 20) {
            this.leftBtn.visible = false;
            this.rightBtn.visible = true;
        }
        else if (this.menuList.scrollH > (this.menuList.dataProvider.length - 5) * 88 + 2) {
            this.leftBtn.visible = true;
            this.rightBtn.visible = false;
        }
        else {
            this.leftBtn.visible = true;
            this.rightBtn.visible = true;
        }
        if (this.menuList.dataProvider.length <= 5) {
            this.leftBtn.visible = false;
            this.rightBtn.visible = false;
        }
    };
    VipGiftPanel.prototype.updateMenu = function () {
        var configs = GlobalConfig.VipGiftConfig;
        var arr = [];
        for (var id in configs) {
            var hfTimes = configs[id].hfTimes ? configs[id].hfTimes : 0;
            if (this.curIndex == hfTimes)
                arr.push(configs[id]);
        }
        arr.sort(function (a, b) {
            return a.id < b.id ? -1 : 1;
        });
        this.menuList.dataProvider = new eui.ArrayCollection(arr);
        this.menuList.validateNow();
    };
    VipGiftPanel.prototype.setDefault = function () {
        var _this = this;
        var startId = 0;
        var endId = Object.keys(GlobalConfig.VipGiftConfig).length;
        for (var k in GlobalConfig.VipGiftConfig) {
            var hfTimes = GlobalConfig.VipGiftConfig[k].hfTimes;
            hfTimes = hfTimes ? hfTimes : 0;
            if (hfTimes == this.curIndex) {
                if (!startId) {
                    startId = GlobalConfig.VipGiftConfig[k].id;
                }
                endId = +k;
            }
        }
        var state = UserVip.ins().vipGiftState;
        var defId = endId;
        for (var id = startId ? startId : 1; id <= endId; id++) {
            if ((state[id - 1].state & 1) == 0) {
                defId = id;
                break;
            }
        }
        this.setGiftId(defId);
        startId = startId ? startId : 1;
        var menuIndex = defId - startId;
        this.menuList.selectedIndex = menuIndex;
        TimerManager.ins().doNext(function () {
            var scroH = menuIndex * 92;
            if (scroH > (_this.menuList.contentWidth - _this.menuScroller.width)) {
                scroH = _this.menuList.contentWidth - _this.menuScroller.width;
            }
            _this.menuList.scrollH = scroH;
            _this.onChange();
        }, this);
    };
    VipGiftPanel.prototype.onTouchBtn = function (e) {
        var num = 92 * 5;
        var scrollH = 0;
        switch (e.target) {
            case this.leftBtn:
                scrollH = this.menuList.scrollH - num;
                scrollH = Math.round(scrollH / 92) * 92;
                if (scrollH < 0) {
                    scrollH = 0;
                }
                this.menuList.scrollH = scrollH;
                break;
            case this.rightBtn:
                scrollH = this.menuList.scrollH + num;
                scrollH = Math.round(scrollH / 92) * 92;
                if (scrollH > this.menuList.contentWidth - this.menuScroller.width) {
                    scrollH = this.menuList.contentWidth - this.menuScroller.width;
                }
                this.menuList.scrollH = scrollH;
                break;
        }
        this.onChange();
    };
    VipGiftPanel.prototype.onUpdate = function () {
        var arr = this.menuList.dataProvider;
        for (var i = 0; i < arr.length; i++) {
            arr.itemUpdated(arr.getItemAt(i));
        }
        this.setDefault();
    };
    VipGiftPanel.prototype.setGiftId = function (id) {
        this.vipGiftItem.open(id);
    };
    VipGiftPanel.prototype.close = function () {
        this.vipGiftItem.close();
        this.menuList.dataProvider = new eui.ArrayCollection();
        this.removeObserve();
        this.removeTouchEvent(this.leftBtn, this.onTouchBtn);
        this.removeTouchEvent(this.rightBtn, this.onTouchBtn);
    };
    return VipGiftPanel;
}(BaseView));
__reflect(VipGiftPanel.prototype, "VipGiftPanel");
//# sourceMappingURL=VipGiftPanel.js.map