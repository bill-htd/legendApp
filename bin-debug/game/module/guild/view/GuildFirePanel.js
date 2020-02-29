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
var GuildFirePanel = (function (_super) {
    __extends(GuildFirePanel, _super);
    function GuildFirePanel() {
        var _this = _super.call(this) || this;
        _this.itemCount = 0;
        return _this;
    }
    GuildFirePanel.prototype.open = function () {
        this.addTouchEvent(this.give, this.onGive);
        this.observe(Guild.ins().postUpdateFire, this.update);
        this.update();
    };
    GuildFirePanel.prototype.close = function () {
        this.removeTouchEvent(this.give, this.onGive);
        this.removeObserve();
    };
    GuildFirePanel.prototype.update = function () {
        var fireDic = Guild.ins().fireDic;
        if (fireDic.fireLvl > 0) {
            this.firestar.visible = true;
        }
        else {
            this.firestar.visible = false;
        }
        var lv = 0;
        while (true) {
            if (this['lv' + lv]) {
                this['lv' + lv].visible = fireDic.fireLvl >= lv;
                if (this['fire' + lv])
                    this['fire' + lv].visible = fireDic.fireLvl == lv;
            }
            else {
                break;
            }
            lv += 1;
        }
        var config = GlobalConfig.GuildBonFireConfig[fireDic.fireLvl];
        var nextConf = GlobalConfig.GuildBonFireConfig[fireDic.fireLvl + 1];
        if (config) {
            this.progressBar.maximum = config.value;
            this.progressBar.value = fireDic.fireVal;
        }
        else {
            this.progressBar.maximum = 100;
            this.progressBar.value = 100;
        }
        var conf = GlobalConfig.GuildConfig;
        var item = UserBag.ins().getBagItemById(conf.bonfireItem);
        if (item) {
            this.count.text = "" + item.count;
            this.cha.textColor = this.count.textColor = 0x35E62D;
            this.itemCount = item.count;
            this.redPoint.visible = true;
        }
        else {
            this.count.text = "0";
            this.cha.textColor = this.count.textColor = 0xff0000;
            this.itemCount = 0;
            this.redPoint.visible = false;
        }
        if (nextConf) {
            this.desc1.textFlow = TextFlowMaker.generateTextFlow1("\u6BCF\u6350\u732E 1 \u4E2A\u67F4\u706B\u589E\u52A0 |C:0x35E62D&T:" + conf.bonfireValue + "| \u70B9\u7BDD\u706B\u503C\u4EE5\u53CA |C:0x35E62D&T:" + conf.bonfireReward[0].count + "| \u70B9\u884C\u4F1A\u8D21\u732E");
            this.desc2.textFlow = TextFlowMaker.generateTextFlow1("\u518D\u6350\u732E\u603B\u8BA1 |C:0x35E62D&T:" + (config.value - fireDic.fireVal) / conf.bonfireValue + "| \u4E2A\u67F4\u706B\u53EF\u589E\u52A0 |C:0x35E62D&T:" + nextConf.reward + "| \u884C\u4F1A\u8D44\u91D1");
        }
        else {
            this.desc1.textFlow = TextFlowMaker.generateTextFlow1("\u6BCF\u6350\u732E 1 \u4E2A\u67F4\u706B\u589E\u52A0 |C:0x35E62D&T:" + conf.bonfireValue + "| \u70B9\u7BDD\u706B\u503C\u4EE5\u53CA |C:0x35E62D&T:" + conf.bonfireReward[0].count + "| \u70B9\u884C\u4F1A\u8D21\u732E");
            this.desc2.textFlow = TextFlowMaker.generateTextFlow1("\u7BDD\u706B\u503C\u5DF2\u8FBE\u5230\u6700\u5927 \u6B21\u65E5\u53EF\u589E\u52A0 |C:0x35E62D&T:" + config.reward + "| \u884C\u4F1A\u8D44\u91D1");
        }
    };
    GuildFirePanel.prototype.onGive = function () {
        if (this.itemCount > 0) {
            var count = GlobalConfig.GuildConfig.bonfirecount;
            if (this.itemCount < count)
                count = this.itemCount;
            this.itemCount -= count;
            Guild.ins().sendToFire(count, this.itemCount);
        }
        else {
            UserTips.ins().showTips("\u9053\u5177\u4E0D\u8DB3");
        }
    };
    return GuildFirePanel;
}(BaseView));
__reflect(GuildFirePanel.prototype, "GuildFirePanel");
//# sourceMappingURL=GuildFirePanel.js.map