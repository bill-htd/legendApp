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
var WJBattleMinMapPanel = (function (_super) {
    __extends(WJBattleMinMapPanel, _super);
    function WJBattleMinMapPanel() {
        var _this = _super.call(this) || this;
        _this.flagRes = ["wj_gray_flag_icon", "wj_green_flag_icon", "wj_red_flag_icon"];
        _this.entityRes = ["wj_green_point", "wj_blue_point"];
        return _this;
    }
    WJBattleMinMapPanel.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.signList = [];
    };
    WJBattleMinMapPanel.prototype.open = function () {
        TimerManager.ins().doTimer(300, 0, this.refreshCoordinate, this);
        this.observe(WJBattlefieldSys.ins().postRefCampFlag, this.refreshFlag, this);
    };
    WJBattleMinMapPanel.prototype.close = function () {
        TimerManager.ins().removeAll(this);
        this.removeObserve();
        this.signList = [];
    };
    WJBattleMinMapPanel.prototype.refreshFlag = function () {
        for (var i = 0; i < 3; i++) {
            if (WJBattlefieldSys.ins().flagInfos[i + 1]) {
                this['flag' + (i + 1)].source = WJBattlefieldSys.ins().flagInfos[i + 1] == 100 ? this.flagRes[1] : this.flagRes[2];
            }
            else
                this['flag' + (i + 1)].source = this.flagRes[0];
        }
    };
    WJBattleMinMapPanel.prototype.refreshCoordinate = function () {
        var list = EntityManager.ins().getAllEntity();
        for (var i in list) {
            var entity = list[i];
            if (entity.infoModel && !this.signList[entity.infoModel.handle]) {
                var isFlag = false;
                if (isFlag) {
                }
                else {
                    var entityImg = new eui.Image(this.entityRes[0]);
                    entityImg.x = entity.x / 10 >> 0;
                    entityImg.y = entity.y / 10 >> 0;
                    this.addChild(entityImg);
                    this.signList[entity.infoModel.handle] = entityImg;
                }
            }
            this.signList[entity.infoModel.handle].x = entity.x / 10 >> 0;
            this.signList[entity.infoModel.handle].y = entity.y / 10 >> 0;
        }
    };
    return WJBattleMinMapPanel;
}(BaseView));
__reflect(WJBattleMinMapPanel.prototype, "WJBattleMinMapPanel");
//# sourceMappingURL=WJBattleMinMapPanel.js.map