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
var Vip3MWin = (function (_super) {
    __extends(Vip3MWin, _super);
    function Vip3MWin() {
        var _this = _super.call(this) || this;
        _this.skinName = "Vip3Skin";
        return _this;
    }
    Vip3MWin.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.addTouchEvent(this.pay, this.onTouchBtn);
        this.addTouchEvent(this.closeBtn, this.onTouchBtn);
        this.addTouchEvent(this.closeBtn0, this.onTouchBtn);
        var vipIndex = param[0];
        this.init(vipIndex);
    };
    Vip3MWin.prototype.init = function (vipIndex) {
        var vconfig = GlobalConfig.VipConfig[vipIndex];
        for (var i = 0; i < 3; i++) {
            this["gift" + i].data = vconfig.awards[i + 1].id;
            var power = this.getPower(vconfig.awards[i + 1].id, i);
            this["power" + i].setPower(power);
        }
        this.pay.label = UserVip.ins().lv < 3 ? "充值" : "领取";
        this.setIconEff();
    };
    Vip3MWin.prototype.setIconEff = function () {
        if (!this.mc)
            this.mc = new MovieClip;
        if (!this.mc.parent)
            this.mcGroup.addChild(this.mc);
        this.mc.playFile(RES_DIR_EFF + "mabi", -1);
        var power = 0;
        var ringConfig = GlobalConfig.ExRing0Config[1];
        power = UserBag.getAttrPower(ringConfig.attrAward);
        power += ringConfig.power;
        this.powerPanel.setPower(power);
    };
    Vip3MWin.prototype.getPower = function (id, pos) {
        var power = 0;
        var config = GlobalConfig.EquipConfig[id];
        if (!config)
            return power;
        var transfrom = [
            'hp',
            'atk',
            'def',
            'res',
        ];
        var totalAttr = [];
        var idx = 0;
        FOR: for (var k in config) {
            for (var i in transfrom) {
                if (transfrom[i] == k && config[k]) {
                    var value = config[k];
                    if (value == undefined || value == 0)
                        continue;
                    var type = Role.getAttrTypeByName(k);
                    var attrs = new AttributeData;
                    var attrStr = "";
                    attrStr += AttributeData.getAttrStrByType(type) + ":";
                    attrStr += config[k];
                    attrs.type = type;
                    attrs.value = config[k];
                    totalAttr.push(attrs);
                    if (!idx)
                        this["at" + pos].text = attrStr;
                    else if (idx == 1)
                        this["att" + pos].text = attrStr;
                    idx++;
                    if (idx > 1)
                        break FOR;
                }
            }
        }
        power = Math.floor(UserBag.getAttrPower(totalAttr));
        return power;
    };
    Vip3MWin.prototype.onTouchBtn = function (e) {
        switch (e.target) {
            case this.pay:
                this.onBtn();
                break;
            case this.closeBtn:
            case this.closeBtn0:
                ViewManager.ins().close(this);
                break;
        }
    };
    Vip3MWin.prototype.onBtn = function () {
        if (UserVip.ins().lv < 3) {
            var rdata = Recharge.ins().getRechargeData(0);
            if (!rdata || rdata.num != 2) {
                ViewManager.ins().open(Recharge1Win);
            }
            else {
                ViewManager.ins().open(ChargeFirstWin);
            }
            ViewManager.ins().close(this);
            return;
        }
        ViewManager.ins().open(VipWin, 3);
        ViewManager.ins().close(this);
    };
    return Vip3MWin;
}(BaseEuiView));
__reflect(Vip3MWin.prototype, "Vip3MWin");
ViewManager.ins().reg(Vip3MWin, LayerManager.UI_Popup);
//# sourceMappingURL=Vip3MWin.js.map