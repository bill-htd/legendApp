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
var JingMaiPanel = (function (_super) {
    __extends(JingMaiPanel, _super);
    function JingMaiPanel() {
        var _this = _super.call(this) || this;
        _this.cursorLocation = [
            [132, 131], [92, 186], [165, 177], [138, 252],
            [84, 231], [96, 316], [152, 339], [126, 431]
        ];
        _this.curRole = 0;
        _this.canClick = true;
        _this.name = "\u7ECF\u8109";
        return _this;
    }
    JingMaiPanel.prototype.childrenCreated = function () {
        this.init();
    };
    JingMaiPanel.prototype.init = function () {
        this.danItemID = GlobalConfig.JingMaiCommonConfig.levelItemid;
        this.cursor = new MovieClip;
        this.cursor.visible = false;
    };
    JingMaiPanel.prototype.open = function () {
        this.addTouchEvent(this.boostBtn, this.onTap);
        this.addTouchEvent(this.bigUpLevelBtn, this.onTap);
        this.observe(UserJingMai.ins().postUpdate, this.setForgeData);
        this.observe(UserBag.ins().postItemAdd, this.setForgeData);
        this.cursor.playFile(RES_DIR_EFF + "jingmaiCursor", -1);
        this.setForgeData(false);
    };
    JingMaiPanel.prototype.close = function () {
        this.removeTouchEvent(this.boostBtn, this.onTap);
        this.removeTouchEvent(this.bigUpLevelBtn, this.onTap);
        this.canClick = true;
        this.removeObserve();
    };
    JingMaiPanel.prototype.onTap = function (e) {
        var _this = this;
        switch (e.currentTarget) {
            case this.boostBtn:
                var config = GlobalConfig.JingMaiLevelConfig[this._data.level];
                if (!this.canClick)
                    return;
                if (this._data.level % 10 == 0 && this._data.level / 10 > this._data.stage && this._data.level != 0) {
                    this.canClick = false;
                    this.showUpgradeEffect();
                    TimerManager.ins().doTimer(1000, 1, function () {
                        UserJingMai.ins().sendUpgrade(_this.curRole);
                        SoundUtil.ins().playEffect(SoundUtil.SKILL_UP);
                        _this.canClick = true;
                    }, this);
                }
                else {
                    if (UserBag.ins().getBagGoodsCountById(0, config.itemId) >= config.count) {
                        UserJingMai.ins().sendBoost(this.curRole);
                        SoundUtil.ins().playEffect(SoundUtil.SKILL_UP);
                    }
                    else {
                        UserWarn.ins().setBuyGoodsWarn(config.itemId);
                    }
                }
                break;
            case this.bigUpLevelBtn:
                var itemName = GlobalConfig.ItemConfig[this.danItemID].name;
                WarnWin.show("\u786E\u5B9A\u4F7F\u7528" + itemName + "\u63D0\u5347\u5F53\u524D\u7ECF\u8109\u5417\uFF1F\n\u8BF4\u660E\uFF1A\n" + GlobalConfig.JingMaiCommonConfig.levelItemidStage + "\u9636\u53CA\u4EE5\u4E0B\u7ECF\u8109\u4F7F\u7528\u53EF\u76F4\u53471\u9636\n\u5176\u4ED6\u7B49\u9636\u4F7F\u7528\u8F6C\u6362\u4E3A" + GlobalConfig.JingMaiCommonConfig.levelItemChange + "\u4E2A" + GlobalConfig.ItemConfig[GlobalConfig.JingMaiCommonConfig.itemid].name, function () {
                    UserJingMai.ins().sendBigUpLevel(_this.curRole);
                }, this);
                break;
        }
    };
    JingMaiPanel.prototype.showLight = function (lv, flag) {
    };
    JingMaiPanel.prototype.showUpgradeEffect = function () {
        for (var i = 0; i <= 9; i++) {
            this["jinmai_" + i].setLights(4);
        }
    };
    JingMaiPanel.prototype.setForgeData = function (levelUp) {
        if (levelUp === void 0) { levelUp = true; }
        this._data = SubRoles.ins().getSubRoleByIndex(this.curRole).jingMaiData;
        var stagesConfig = GlobalConfig.JingMaiStageConfig[this._data.stage];
        var lvConfig = GlobalConfig.JingMaiLevelConfig[this._data.level];
        this.jinmaiStage.setValue(stagesConfig.level);
        this.jinMaiName.text = stagesConfig.name;
        this.attr.text = AttributeData.getAttStr(AttributeData.AttrAddition(stagesConfig.attr, lvConfig.attr), 0.75);
        this._totalPower = UserBag.getAttrPower(AttributeData.AttrAddition(stagesConfig.attr, lvConfig.attr));
        this.powerPanel.setPower(this._totalPower);
        var flag = this._data.level / 10 - stagesConfig.stage;
        if (stagesConfig.stage < GlobalConfig.JingMaiCommonConfig.stageMax) {
            var nextStagesConfig = void 0;
            var nextLvConfig = void 0;
            var count_1 = UserBag.ins().getBagGoodsCountById(0, lvConfig.itemId);
            this.redPoint0.visible = count_1 >= lvConfig.count;
            if (this._data.level > 0 && this._data.level % 10 == 0 && flag) {
                nextStagesConfig = GlobalConfig.JingMaiStageConfig[this._data.stage + 1];
                nextLvConfig = lvConfig;
            }
            else {
                nextStagesConfig = stagesConfig;
                nextLvConfig = GlobalConfig.JingMaiLevelConfig[this._data.level + 1];
            }
            if (this.nextAttr.visible == false) {
                this.nextAttr.visible = true;
                this.countLabel.x = 2;
                this.countLabel.y = 497;
            }
            this.nextAttr.text = AttributeData.getAttStr(AttributeData.AttrAddition(nextStagesConfig.attr, nextLvConfig.attr), 0, 1, "+", false, true);
            this.boostBtn.visible = true;
            if (this._data.level > 0 && this._data.level % 10 == 0 && flag) {
                this.boostBtn.label = "\u5347  \u9636";
                this.countLabel.text = "\u7ECF\u8109\u7B49\u7EA7\u5DF2\u6EE1,\u53EF\u8FDB\u9636";
                this.cursor.visible = false;
            }
            else {
                this.boostBtn.label = "\u51B2  \u8109";
                var colorStr = "";
                if (count_1 >= lvConfig.count)
                    colorStr = "|C:0x35e62d&T:";
                else
                    colorStr = "|C:0xf3311e&T:";
                this.countLabel.textFlow = TextFlowMaker.generateTextFlow("\u6D88\u8017\u7ECF\u8109\u4E39:" + colorStr + count_1 + "|/" + lvConfig.count);
            }
            this.cursor.x = this.cursorLocation[this._data.level % 8][0];
            this.cursor.y = this.cursorLocation[this._data.level % 8][1];
            this.showLight(this._data.level, flag);
        }
        else {
            this.nextAttr.visible = false;
            this.boostBtn.visible = false;
            this.countLabel.x = this.nextAttr.x - 60;
            this.countLabel.y = this.nextAttr.y;
            this.redPoint0.visible = false;
            if (this.cursor.parent) {
                this.removeChild(this.cursor);
            }
            this.countLabel.text = "\u7ECF\u8109\u5DF2\u6EE1\u9636";
        }
        for (var i = 0; i < 9; i++) {
            this["nadis" + i].source = "jingmailine" + ((flag == 1 || (i + 1 < this._data.level % 10) ? "1" : "2"));
        }
        var hasGuang = true;
        var jmItem;
        for (var i = 0; i <= 9; i++) {
            jmItem = this["jinmai_" + i];
            jmItem.item.visible = ((flag == 1 || (i + 1 <= this._data.level % 10) ? true : false));
            jmItem.bgImg.visible = !jmItem.item.visible;
            if (jmItem.item.visible) {
                jmItem.setLights(2);
            }
            else {
                if (levelUp && hasGuang && (i - 1 >= 0)) {
                    this["jinmai_" + (i - 1)].setLights(3);
                }
                jmItem.setLights(hasGuang ? 1 : 0);
                hasGuang = false;
            }
        }
        var count = UserBag.ins().getBagGoodsCountById(0, this.danItemID);
        if (this.bigUpLevelBtn["redPoint"]) {
            this.bigUpLevelBtn['redPoint'].visible = count > 0;
        }
        if (this.bigUpLevelBtn["txt"]) {
            this.bigUpLevelBtn['txt'].text = count;
        }
    };
    return JingMaiPanel;
}(BaseView));
__reflect(JingMaiPanel.prototype, "JingMaiPanel");
//# sourceMappingURL=JingMaiPanel.js.map