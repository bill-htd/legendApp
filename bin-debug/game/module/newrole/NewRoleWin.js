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
var NewRoleWin = (function (_super) {
    __extends(NewRoleWin, _super);
    function NewRoleWin() {
        var _this = _super.call(this) || this;
        _this.roleBody = [
            ["op_zs0_png", "op_zs1_png"],
            ["op_fs0_png", "op_fs1_png"],
            ["op_ds0_png", "op_ds1_png"]
        ];
        _this.roleWeapon = [
            "",
            "",
            ""
        ];
        _this.rolePos = [
            [100, 0, 1, 3],
            [-4, 79, 0.7, 2],
            [336, 79, 0.7, 2]
        ];
        _this.beginPoint = 0;
        _this.isTopLevel = true;
        return _this;
    }
    NewRoleWin.prototype.initUI = function () {
        _super.prototype.initUI.call(this);
        this.skinName = "OpenRoleSkin";
        this.roles = [this['role0'], this['role1'], this['role2']];
        var element = SubRoles.ins().getSubRoleByIndex(0);
        if (element && element.sex) {
            this.sexBtn0.selected = true;
            this.sexBtn1.selected = false;
        }
        else {
            this.sexBtn0.selected = false;
            this.sexBtn1.selected = true;
        }
        this.updateRole();
    };
    NewRoleWin.prototype.updateRole = function () {
        for (var i = 0; i < this.roles.length; i++) {
            this.setRole(this.roles[i], i);
        }
    };
    NewRoleWin.prototype.setRole = function (role, job) {
        var sex = this.sexBtn0.selected ? 0 : 1;
        role['weapon'].source = this.roleWeapon[job];
        role['job'].source = "op_" + (job + 1);
        var b;
        var len = SubRoles.ins().subRolesLen;
        for (var i = 0; i < len; i++) {
            var element = SubRoles.ins().getSubRoleByIndex(i);
            if (element.job == job + 1) {
                b = true;
                sex = element.sex;
                break;
            }
        }
        role['body'].source = this.roleBody[job][sex];
        role['openedImg'].visible = b;
    };
    NewRoleWin.prototype.setNeedTxt = function () {
        var openIndex = SubRoles.ins().subRolesLen;
        var config = GlobalConfig.NewRoleConfig[openIndex];
        var str = "";
        var color;
        var meetVIP;
        if (config.zsLevel) {
            str = config.zsLevel + "\u8F6C";
            this.canOpen = UserZs.ins().lv >= config.zsLevel;
            color = this.canOpen ? 0x35e62d : 0xf3311e;
            str = "<font color=\"#" + color.toString(16) + "\">" + str + "</font>";
        }
        else {
            str = config.level + "\u7EA7";
            this.canOpen = Actor.level >= config.level;
            color = this.canOpen ? 0x35e62d : 0xf3311e;
            str = "<font color=\"#" + color.toString(16) + "\">" + str + "</font>";
        }
        if (config.vip) {
            meetVIP = (UserVip.ins().lv >= config.vip);
            this.canOpen = this.canOpen || meetVIP;
            color = meetVIP ? 0x35e62d : 0xf3311e;
            str = str + (" \u6216 <font color=\"#" + color.toString(16) + "\">VIP" + config.vip + "</font>");
        }
        this.needTxt.textFlow = (new egret.HtmlTextParser()).parser("\u89E3\u9501\u9700\u8981\uFF1A" + str);
    };
    NewRoleWin.prototype.selectJob = function (job, teleport) {
        var _this = this;
        if (teleport === void 0) { teleport = false; }
        var _loop_1 = function (i) {
            var index = (job + job + i) % 3;
            if (teleport) {
                this_1.roles[i].x = this_1.rolePos[index][0];
                this_1.roles[i].y = this_1.rolePos[index][1];
                this_1.roles[i].scaleX = this_1.roles[i].scaleY = this_1.rolePos[index][2];
            }
            else {
                var t = egret.Tween.get(this_1.roles[i]);
                t.to({
                    x: this_1.rolePos[index][0],
                    y: this_1.rolePos[index][1],
                    scaleX: this_1.rolePos[index][2],
                    scaleY: this_1.rolePos[index][2]
                }, 500).call(function () {
                    _this.roles[i].touchEnabled = index != 0;
                }, this_1);
            }
            if (index == 0) {
                this_1.roleGroup.addChild(this_1.roles[i]);
                this_1.openBtn.visible = !this_1.roles[i]['openedImg'].visible;
            }
        };
        var this_1 = this;
        for (var i = 0; i < 3; i++) {
            _loop_1(i);
        }
    };
    NewRoleWin.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.addTouchEvent(this, this.onTap);
        this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onBegin, this);
        this.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onMove, this);
        this.updateRole();
        this.setNeedTxt();
        var arr = [0, 1, 2];
        var len = SubRoles.ins().subRolesLen;
        for (var i = 0; i < len; i++) {
            var element = SubRoles.ins().getSubRoleByIndex(i);
            var index = arr.indexOf(element.job - 1);
            if (index > -1)
                arr.splice(index, 1);
        }
        this.job = arr[0];
    };
    NewRoleWin.prototype.close = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.removeTouchEvent(this, this.onTap);
        this.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onBegin, this);
        this.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.onMove, this);
    };
    NewRoleWin.prototype.onBegin = function (e) {
        if (this.stop)
            return;
        this.beginPoint = e.stageX;
    };
    NewRoleWin.prototype.onMove = function (e) {
        if (this.beginPoint == 0)
            return;
        var offset = e.stageX - this.beginPoint;
        if (Math.abs(offset) < 5)
            return;
        var nextJob = this.job - (offset / Math.abs(offset));
        nextJob = nextJob > 2 ? nextJob - 3 : (nextJob < 0 ? nextJob + 3 : nextJob);
        this.addTouchEndEvent(this, this.onEnd);
        if (Math.abs(offset) >= 120) {
            this.job = nextJob;
            this.beginPoint = 0;
            this.removeEventListener(egret.TouchEvent.TOUCH_END, this.onEnd, this);
            return;
        }
        for (var i = 0; i < 3; i++) {
            var element = this.roles[i];
            var nextIndex = (nextJob + nextJob + i) % 3;
            var curIndex = (this.job + this.job + i) % 3;
            var radian = MathUtils.getRadian2(this.rolePos[curIndex][0], this.rolePos[curIndex][1], this.rolePos[nextIndex][0], this.rolePos[nextIndex][1]);
            var angle = MathUtils.getAngle(radian);
            var p = MathUtils.getDirMove(angle, Math.abs(offset));
            element.x = this.rolePos[curIndex][0] + p.x;
            element.y = this.rolePos[curIndex][1] + p.y;
            var scale = Math.abs(offset) / MathUtils.getDistance(this.rolePos[curIndex][0], this.rolePos[curIndex][1], this.rolePos[nextIndex][0], this.rolePos[nextIndex][1]);
            element.scaleX = element.scaleY = this.rolePos[curIndex][2] - (this.rolePos[curIndex][2] - this.rolePos[nextIndex][2]) * scale;
        }
    };
    NewRoleWin.prototype.onEnd = function (e) {
        this.job = this.job;
        this.removeEventListener(egret.TouchEvent.TOUCH_END, this.onEnd, this);
    };
    NewRoleWin.prototype.onTap = function (e) {
        switch (e.target) {
            case this.openBtn:
                if (!this.canOpen) {
                    var openIndex = SubRoles.ins().subRolesLen;
                    var config_1 = GlobalConfig.NewRoleConfig[openIndex];
                    var win = WarnWin.show("VIP\u7B49\u7EA7\u4E0D\u8DB3\uFF0CVIP" + config_1.vip + "\u53EF\u4EE5\u63D0\u524D\u5F00\u542F\u7B2C" + (openIndex + 1) + "\u89D2\u8272\uFF0C\u662F\u5426\u524D\u5F80\u5F00\u542F\uFF1F", null, null, function () {
                        ViewManager.ins().open(VipWin, config_1.vip);
                    }, this);
                    win.setBtnLabel("\u53D6\u6D88", "\u524D\u5F80");
                    return;
                }
                GameLogic.ins().sendNewRole(this.job + 1, this.sexBtn0.selected ? 0 : 1);
                ViewManager.ins().close(LimitTaskView);
            case this.closeBtn:
            case this.closeBtn0:
                ViewManager.ins().close(this);
                break;
            case this.sexBtn0:
                this.sexBtn1.selected = false;
                this.updateRole();
                break;
            case this.sexBtn1:
                this.sexBtn0.selected = false;
                this.updateRole();
                break;
            default:
                var index = this.roles.indexOf(e.target);
                if (index > -1 && !this.stop) {
                    this.job = index;
                }
        }
    };
    Object.defineProperty(NewRoleWin.prototype, "job", {
        get: function () {
            return this._job;
        },
        set: function (value) {
            var _this = this;
            this._job = value;
            this.stop = true;
            this.selectJob(value);
            TimerManager.ins().doTimer(500, 1, function () {
                _this.stop = false;
            }, this);
        },
        enumerable: true,
        configurable: true
    });
    NewRoleWin.openCheck = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        if (SubRoles.ins().subRolesLen >= 3) {
            return false;
        }
        else {
            ViewManager.ins().close(LiLianWin);
            return true;
        }
    };
    return NewRoleWin;
}(BaseEuiView));
__reflect(NewRoleWin.prototype, "NewRoleWin");
ViewManager.ins().reg(NewRoleWin, LayerManager.UI_Main);
//# sourceMappingURL=NewRoleWin.js.map