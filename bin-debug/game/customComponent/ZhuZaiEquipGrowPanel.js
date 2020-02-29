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
var ZhuZaiEquipGrowPanel = (function (_super) {
    __extends(ZhuZaiEquipGrowPanel, _super);
    function ZhuZaiEquipGrowPanel() {
        return _super.call(this) || this;
    }
    ZhuZaiEquipGrowPanel.prototype.childrenCreated = function () {
    };
    ZhuZaiEquipGrowPanel.prototype.initUI = function () {
        this.tab = [];
        for (var i = 0; i < 4; i++)
            this.tab.push(this['tab' + i]);
        this.link.textFlow = new egret.HtmlTextParser().parser("<u>\u83B7\u5F97\u6750\u6599</u>");
        this.totalPower = BitmapNumber.ins().createNumPic(0, "1");
        this.totalPower.x = 185;
        this.totalPower.y = 128;
        this.addChild(this.totalPower);
        this.tab[0].selected = true;
        this.selectIndex = 0;
        this.star = new StarList(5, 0);
        this.star.x = 150;
        this.star.y = 290;
        this.addChild(this.star);
        this.inited = true;
    };
    ZhuZaiEquipGrowPanel.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        if (!this.inited)
            this.initUI();
        this.roleSelectPanel.getCurRole = param && param.length ? param[0] : 0;
        this.setEquipPoint();
        this.setSelect(param && param.length ? param[1] : 0);
        this.addTouchEvent(this.link, this.onClick);
        this.addTouchEvent(this.upgradeBtn0, this.onClick);
        this.addChangeEvent(this.roleSelectPanel, this.onChange);
        for (var i = 0; i < this.tab.length; i++) {
            this.addTouchEvent(this.tab[i], this.onClick);
        }
        this.observe(ZhuzaiEquip.ins().postZhuZaiData, this.update);
    };
    ZhuZaiEquipGrowPanel.prototype.close = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.removeTouchEvent(this.link, this.onClick);
        this.removeTouchEvent(this.upgradeBtn0, this.onClick);
        this.roleSelectPanel.removeEventListener(egret.Event.CHANGE, this.onChange, this);
        for (var i = 0; this.tab && i < this.tab.length; i++) {
            this.removeTouchEvent(this.tab[i], this.onClick);
        }
        this.removeObserve();
    };
    ZhuZaiEquipGrowPanel.prototype.update = function () {
        this.setEquipPoint();
        this.setData();
    };
    ZhuZaiEquipGrowPanel.prototype.onChange = function (e) {
        this.parent.parent.selectRole = this.roleSelectPanel.getCurRole();
        this.update();
    };
    ZhuZaiEquipGrowPanel.prototype.setData = function () {
        var index = this.selectIndex + 1;
        var roleIndex = this.roleSelectPanel.getCurRole();
        var role = SubRoles.ins().getSubRoleByIndex(roleIndex);
        var data = role.getZhuZaiDataByIndex(this.selectIndex);
        var lv = data.lv;
        var config = GlobalConfig.EquipPointGrowUpConfig[index][lv];
        var nextConfig = GlobalConfig.EquipPointGrowUpConfig[index][lv + 1];
        var needLv = config.needLevel;
        this.useTxt.text = (needLv / 1000 >> 0) + "转";
        var l = UserZs.ins().lv * 1000 + Actor.level;
        this.useTxt.textColor = l < needLv ? 0xf3311e : 0x2ECA22;
        this.currentState = data.isMaxLevel() ? "max" : "normal";
        this.curAtt.text = AttributeData.getAttStr(config.attrs, 1);
        if (nextConfig)
            this.nextAtt.text = AttributeData.getAttStr(nextConfig.attrs, 1);
        var itemID = config.growUpItem.id;
        var count = UserBag.ins().getBagGoodsCountById(0, itemID);
        this.useTxt0.text = count + " / " + config.growUpItem.count;
        this.useTxt0.textColor = count < config.growUpItem.count ? 0xf3311e : 0x2ECA22;
        this.countTxt0.text = "消耗" + GlobalConfig.ItemConfig[itemID].name + "：";
        this.useTxt1.text = (config.growUpProbability / 100) + "%";
        this.star.setStarNum(config.star);
        this.upgradeBtn0.label = config.growUpItem.count ? (lv ? "升 星" : "激 活") : "免费升级";
        BitmapNumber.ins().changeNum(this.totalPower, UserBag.getAttrPower(config.attrs), "1");
    };
    ZhuZaiEquipGrowPanel.prototype.setEquipPoint = function () {
        var config = GlobalConfig.EquipPointBasicConfig;
        var i = 0;
        for (i = 0; i < this.tab.length; i++) {
            var role = SubRoles.ins().getSubRoleByIndex(this.roleSelectPanel.getCurRole());
            var zhuzaiData = role.getZhuZaiDataByIndex(i);
            this.tab[i].icon = "zzequip_" + (i + 1) + GlobalConfig.EquipPointGrowUpConfig[i + 1][zhuzaiData.lv].rank;
            if (zhuzaiData.growupID) {
                this.tab[i].label = config[i + 1].name;
                this.tab[i]['lvTxt'].text = "+" + zhuzaiData.growupID;
            }
            else {
                this.tab[i].label = (config[i + 1].activationLevel / 1000 >> 0) + "转激活";
                this.tab[i]['lvTxt'].text = "";
            }
            this.tab[i]['redPoint'].visible = zhuzaiData.canLevelup();
        }
        var len = SubRoles.ins().subRolesLen;
        for (i = 0; i < len; i++) {
            this.roleSelectPanel.showRedPoint(i, ZhuzaiEquip.ins().canLevelup(i));
        }
    };
    ZhuZaiEquipGrowPanel.prototype.setSelect = function (v) {
        for (var i = 0; i < this.tab.length; i++) {
            if (i != v)
                this.tab[i].selected = false;
        }
        this.tab[v].selected = true;
        this.selectIndex = v;
        this.parent.parent.select = v;
        this.setData();
    };
    ZhuZaiEquipGrowPanel.prototype.onClick = function (e) {
        var index = this.tab.indexOf(e.currentTarget);
        if (index >= 0) {
            this.setSelect(index);
            return;
        }
        var role = SubRoles.ins().getSubRoleByIndex(this.roleSelectPanel.getCurRole());
        var zhuzaiData = role.getZhuZaiDataByIndex(this.selectIndex);
        var lv = zhuzaiData.lv;
        var config = GlobalConfig.EquipPointGrowUpConfig[this.selectIndex + 1][lv];
        var itemID = config.growUpItem.id;
        switch (e.currentTarget) {
            case this.link:
                UserWarn.ins().setBuyGoodsWarn(itemID, config.growUpItem.count);
                break;
            case this.upgradeBtn0:
                var needZs = config.needLevel / 1000 >> 0;
                var needLv = config.needLevel % 1000;
                if ((needZs && UserZs.ins().lv < needZs) || (Actor.level < needLv)) {
                    UserTips.ins().showTips("转生等级不足");
                    return;
                }
                if (UserBag.ins().getBagGoodsCountById(0, itemID) < config.growUpItem.count) {
                    UserTips.ins().showTips("道具不足");
                    return;
                }
                ZhuzaiEquip.ins().sendGrow(this.roleSelectPanel.getCurRole(), this.selectIndex + 1);
                break;
        }
    };
    return ZhuZaiEquipGrowPanel;
}(BaseComponent));
__reflect(ZhuZaiEquipGrowPanel.prototype, "ZhuZaiEquipGrowPanel");
//# sourceMappingURL=ZhuZaiEquipGrowPanel.js.map