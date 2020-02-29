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
var NobilityPanel = (function (_super) {
    __extends(NobilityPanel, _super);
    function NobilityPanel() {
        var _this = _super.call(this) || this;
        _this._totalPower = 0;
        _this.skinName = "NobilitySkin";
        _this.name = "爵位";
        return _this;
    }
    NobilityPanel.prototype.childrenCreated = function () {
        this.list.itemRenderer = NobilityItem;
        this.totalPower = BitmapNumber.ins().createNumPic(0, "1");
        this.totalPower.x = 182;
        this.totalPower.y = 63;
        this.addChild(this.totalPower);
        this.promoteeff = new MovieClip;
        this.promoteeff.x = 214;
        this.promoteeff.y = 260;
    };
    NobilityPanel.prototype.open = function () {
        this.addTouchEvent(this.list, this.onListTouch);
        this.addTouchEvent(this.sureBtn, this.onUpgrade);
        this.observe(UserTask.ins().postTaskChangeData, this.setData);
        this.observe(LiLian.ins().postNobilityData, this.setData);
        this.setData();
    };
    NobilityPanel.prototype.close = function () {
        this.removeTouchEvent(this.list, this.onListTouch);
        this.removeTouchEvent(this.sureBtn, this.onUpgrade);
        this.removeObserve();
    };
    NobilityPanel.prototype.onListTouch = function (e) {
        if (e.target instanceof eui.Label) {
            var item = e.target.parent;
            GameGuider.taskGuidance(item.data.id, 1);
        }
    };
    NobilityPanel.prototype.onUpgrade = function (e) {
        if (LiLian.ins().getNobilityIsUpGrade())
            LiLian.ins().sendNobilityUpgrade();
        else
            UserTips.ins().showTips("|C:0xf3311e&T:任务条件没达成，无法升级|");
    };
    NobilityPanel.prototype.setData = function () {
        var lv = LiLian.ins().nobilityLv;
        ((lv >= 0 && lv != null) ? lv : lv = 0);
        var config = GlobalConfig.KnighthoodConfig[lv];
        this.lvTxt.text = config.desc;
        this.attrTxt.text = AttributeData.getAttStr(config.attrs, 0, 1, "：");
        var power = UserBag.getAttrPower(config.attrs);
        if (power > this._totalPower && this._totalPower > 0)
            this.playEff();
        this._totalPower = power;
        BitmapNumber.ins().changeNum(this.totalPower, this._totalPower * SubRoles.ins().subRolesLen, "1");
        var list = [];
        for (var i = 0; i < config.achievementIds.length; i++) {
            list.push(UserTask.ins().getAchieveByTaskId(config.achievementIds[i]["taskId"]));
        }
        this.list.dataProvider = new eui.ArrayCollection(list);
        var nextConfig = GlobalConfig.KnighthoodConfig[lv + 1];
        if (nextConfig) {
            this.nextAttrTxt.text = AttributeData.getAttStr(nextConfig.attrs, 0, 1, "：");
            if (LiLian.ins().getNobilityIsUpGrade()) {
                this.mc = this.mc || new MovieClip;
                this.mc.x = 215;
                this.mc.y = 507;
                this.mc.playFile(RES_DIR_EFF + 'normalbtn', -1);
                this.addChild(this.mc);
            }
            else {
                if (this.mc) {
                    DisplayUtils.removeFromParent(this.mc);
                }
            }
        }
        else {
            if (this.mc) {
                DisplayUtils.removeFromParent(this.mc);
            }
            this.nextGroup.visible = false;
            this.lvTxt.horizontalCenter = 0;
            this.attrTitleTxt.horizontalCenter = 0;
            this.attrTxt.horizontalCenter = 0;
            this.completely.visible = true;
        }
    };
    NobilityPanel.prototype.playEff = function () {
        this.promoteeff.playFile(RES_DIR_EFF + "promoteeff", 1);
        this.addChild(this.promoteeff);
    };
    return NobilityPanel;
}(BaseView));
__reflect(NobilityPanel.prototype, "NobilityPanel");
//# sourceMappingURL=NobilityPanel.js.map