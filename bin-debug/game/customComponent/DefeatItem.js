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
var DefeatItem = (function (_super) {
    __extends(DefeatItem, _super);
    function DefeatItem() {
        var _this = _super.call(this) || this;
        _this.skinName = 'DefeatItemSkin';
        _this.init();
        return _this;
    }
    DefeatItem.prototype.init = function () {
        this.addEventListener(egret.TouchEvent.TOUCH_END, this.onClick, this);
        var str = "|U&S:" + this.jump.size + "&C:" + this.jump.textColor + "&T:" + this.jump.text + "|";
        this.jump.textFlow = TextFlowMaker.generateTextFlow1(str);
    };
    DefeatItem.prototype.onClick = function (e) {
        switch (e.target) {
            case this.openRole0:
            case this.jump:
                this.showDetail();
                break;
        }
    };
    DefeatItem.prototype.showDetail = function () {
        if (this.cfg) {
            if (ViewManager.ins().isShow(MaterialResultWin))
                ViewManager.ins().close(MaterialResultWin);
            else if (ViewManager.ins().isShow(TongResultWin))
                ViewManager.ins().close(TongResultWin);
            else if (ViewManager.ins().isShow(CityResultWin))
                ViewManager.ins().close(CityResultWin);
            else if (ViewManager.ins().isShow(NewWorldBossResultPanel))
                ViewManager.ins().close(NewWorldBossResultPanel);
            else if (ViewManager.ins().isShow(BossResultWin))
                ViewManager.ins().close(BossResultWin);
            else if (ViewManager.ins().isShow(PersonalResultWin))
                ViewManager.ins().close(PersonalResultWin);
            else
                ViewManager.ins().close(ResultWin);
            if (this.cfg.gainWay[1] == "VipWin") {
                ViewManager.ins().open(this.cfg.gainWay[1], UserVip.ins().lv + 1);
            }
            else {
                ViewManager.ins().open(this.cfg.gainWay[1], this.cfg.gainWay[2]);
            }
        }
    };
    DefeatItem.prototype.dataChanged = function () {
        if (!isNaN(this.data)) {
            this.cfg = null;
            var cfg = void 0;
            for (var i in GlobalConfig.DeathgainWayConfig) {
                cfg = GlobalConfig.DeathgainWayConfig[i];
                if (cfg.level == this.data) {
                    this.cfg = cfg;
                    break;
                }
            }
            if (this.cfg) {
                if (this.cfg.level == 14) {
                    var rch = Recharge.ins().getRechargeData(0);
                    if (rch.num && rch.num != 2) {
                        this.cfg = GlobalConfig.DeathgainWayConfig[20];
                    }
                }
                this.icon.source = this.cfg.itemId;
                this.iconName.text = this.cfg.gainWay[0];
                var count = void 0;
                var len = void 0;
                var b = false;
                var head = "siwangyd";
                this.desc.visible = false;
                this.up.visible = this.desc.visible;
            }
            if (this.data == 16) {
                if (!this.mc)
                    this.mc = new MovieClip;
                if (!this.mc.parent) {
                    this.jump.parent.addChild(this.mc);
                    this.mc.playFile(RES_DIR_EFF + "chargeff1", -1);
                    this.mc.touchEnabled = false;
                }
                this.mc.x = this.jump.x + 18;
                this.mc.y = this.jump.y + 9;
                this.mc.scaleX = this.mc.scaleY = 0.4;
                this.icon.scaleX = this.icon.scaleY = 0.55;
            }
        }
    };
    DefeatItem.prototype.and = function (list) {
        for (var k in list) {
            if (list[k] == true)
                return true;
        }
        return false;
    };
    return DefeatItem;
}(BaseItemRender));
__reflect(DefeatItem.prototype, "DefeatItem");
//# sourceMappingURL=DefeatItem.js.map