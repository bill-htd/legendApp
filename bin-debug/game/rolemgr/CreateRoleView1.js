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
var CreateRoleView1 = (function (_super) {
    __extends(CreateRoleView1, _super);
    function CreateRoleView1() {
        var _this = _super.call(this) || this;
        _this._selectJob = 0;
        _this._selectSex = 0;
        _this.isAutoEnter = false;
        _this.skinName = "CreateRole1Skin";
        _this.enterGroup.visible = false;
        _this.groupSpark = new eui.Group();
        _this.addChild(_this.groupSpark);
        _this.groupSpark.touchChildren = false;
        _this.groupSpark.touchEnabled = false;
        _this.list.itemRenderer = CreateRoleViewItem;
        var arrName = ["", "", "", ""];
        var addName = ["紫廖渔歌", "半瓶矿泉水", "暖风", "繁华过后", "念迩成习", "逆丶美丽",
            "握不住的美", "隔岸觀火", "残喘的笑", "何时苏醒", "湮丶燃尽了", "年少无知≈", "卸不掉的盔甲", "″温瞳渐远≈",
            "男人/吥乖", "走遍四方", "我已无力说爱", "繁华沧桑", "卡尺", "往事随风", "剑胆琴心", "心如止水", "风伤依旧",
            "一直很低调", "遥忘而立", "忧郁的萨克斯", "哥比彩钻还炫", "烈日追风", "本人、已昏", "全橙相伴", "残月孤生"];
        for (var i = 0; i < 3; i++) {
            arrName = arrName.concat(addName);
        }
        _this.list.dataProvider = new eui.ArrayCollection(arrName);
        _this.scroller.touchChildren = false;
        _this.scroller.touchEnabled = false;
        _this.job1['selected'].source = "createrole_selected_1";
        _this.job2['selected'].source = "createrole_selected_1";
        _this.job3['selected'].source = "createrole_selected_1";
        _this.boy['selected'].source = "createrole_selected_0";
        _this.girl['selected'].source = "createrole_selected_0";
        return _this;
    }
    CreateRoleView1.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.selectJob = 1;
        this.selectSex = Math.floor(Math.random() * 2);
        this.job1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
        this.job2.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
        this.job3.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
        this.boy.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
        this.girl.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
        this.createBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
        this.diceBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
        var str = LocationProperty.nickName;
        if (str == "null" || str == "") {
            RoleMgr.ins().sendRandomName(this._selectSex);
        }
        else
            this.setName(str);
        this.sparkTween();
        this.listH = this.list.height - 200;
        this.scroller.viewport.scrollV = 0;
        var t = egret.Tween.get(this.scroller.viewport);
        t.to({ scrollV: this.listH }, 40 * this.listH).call(this.loopT, this);
        this.observe(GameApp.ins().postPerLoadProgress, this.perloadProgress);
        this.observe(RoleMgr.ins().postCreateRole, this.createRuselt);
        this.openTime = egret.getTimer() + 15 * 1000;
        TimerManager.ins().doTimer(1000, 0, this.updateTiem, this);
        this.nameInput.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
    };
    CreateRoleView1.prototype.setBtnEff = function () {
        if (!this.btnMc) {
            this.btnMc = new MovieClip;
            this.btnMc.x = this.createBtn.x + this.createBtn.width / 2 + 15;
            this.btnMc.y = this.createBtn.y + this.createBtn.height / 2 - 2;
            this.createBtn.parent.addChild(this.btnMc);
        }
        this.btnMc.playFile(RES_DIR_EFF + "chuangjuebtn", -1);
    };
    CreateRoleView1.prototype.updateTiem = function () {
        var s = Math.ceil((this.openTime - egret.getTimer()) / 1000);
        this.timeLab.text = "\u5269\u4F59" + Math.max(s, 0) + "\u79D2";
        if (s <= 0) {
            this.isAutoEnter = true;
            this.sendCreateRole();
        }
    };
    CreateRoleView1.prototype.createRuselt = function (result) {
        this.enterGroup.visible = false;
        if (Math.abs(result) == 6) {
            RoleMgr.ins().sendRandomName(this._selectSex);
        }
    };
    CreateRoleView1.prototype.perloadProgress = function (arr) {
        var loaded = arr[0], total = arr[1];
        this.loadText.text = "\u6B63\u5728\u8FDB\u5165\u6E38\u620F\uFF08" + Math.ceil((loaded / total) * 100) + "%\uFF09";
    };
    CreateRoleView1.prototype.loopT = function () {
        this.scroller.viewport.scrollV = 200;
        var t = egret.Tween.get(this.scroller.viewport);
        t.to({ scrollV: this.listH }, 40 * this.listH).call(this.loopT, this);
    };
    CreateRoleView1.prototype.loopT2 = function () {
        var t1 = egret.Tween.get(this.imgA);
        t1.to({ horizontalCenter: -100 }, 1000).to({ horizontalCenter: -115 }, 1000).call(this.loopT2, this);
    };
    CreateRoleView1.prototype.close = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.job1.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
        this.job2.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
        this.job3.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
        this.boy.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
        this.girl.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
        this.createBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
        this.diceBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
        this.nameInput.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
        this.closeTween();
        TimerManager.ins().removeAll(this);
    };
    CreateRoleView1.prototype.sendCreateRole = function () {
        RoleMgr.ins().sendCreateRole(this.nameInput.text, this.curSex(), this.curJob(), 0, 0, "");
        TimerManager.ins().removeAll(this);
    };
    CreateRoleView1.prototype.onClick = function (e) {
        switch (e.currentTarget) {
            case this.createBtn:
                ReportData.getIns().report("clickstart", ReportData.LOAD);
                this.sendCreateRole();
                this.enterGroup.visible = true;
                break;
            case this.diceBtn:
                RoleMgr.ins().sendRandomName(this._selectSex);
            case this.nameInput:
                TimerManager.ins().remove(this.updateTiem, this);
                this.timeLab.text = "";
                break;
            case this.boy:
                this.selectSex = 0;
                break;
            case this.girl:
                this.selectSex = 1;
                break;
            case this.job1:
                this.selectJob = 1;
                break;
            case this.job2:
                this.selectJob = 2;
                break;
            case this.job3:
                this.selectJob = 3;
                break;
        }
        SoundManager.ins().touchBg();
    };
    Object.defineProperty(CreateRoleView1.prototype, "selectJob", {
        set: function (jobIndex) {
            this._selectJob = jobIndex;
            this.updateRole();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CreateRoleView1.prototype, "selectSex", {
        set: function (sexIndex) {
            this._selectSex = sexIndex;
            this.updateRole();
        },
        enumerable: true,
        configurable: true
    });
    CreateRoleView1.prototype.updateRole = function () {
        var job = this.curJob();
        var sex = this.curSex();
        this.role.source = "cr_" + job + "_" + sex + "_png";
        for (var i = 1; i <= 3; i++)
            this["job" + i].currentState = "up";
        this["job" + job].currentState = "selected";
        if (sex == 0) {
            this.boy.currentState = "selected";
            this.girl.currentState = "up";
        }
        else {
            this.girl.currentState = "selected";
            this.boy.currentState = "up";
        }
    };
    CreateRoleView1.prototype.setName = function (str) {
        this.nameInput.text = str;
        if (this.isAutoEnter)
            this.sendCreateRole();
    };
    CreateRoleView1.prototype.curJob = function () {
        return this._selectJob;
    };
    CreateRoleView1.prototype.curSex = function () {
        return this._selectSex;
    };
    CreateRoleView1.prototype.sparkTween = function () {
        var _this = this;
        for (var i = 0; i < 15; i++) {
            TimerManager.ins().doTimer(Math.random() * 1000 + 1500, 1, function () {
                _this.randomSpark();
            }, this);
        }
        TimerManager.ins().doTimer(1500, 1, function () {
            _this.sparkTween();
        }, this);
    };
    CreateRoleView1.prototype.randomSpark = function () {
        var image = ObjectPool.pop("eui.Image");
        image.source = "cr_3";
        image.x = Math.random() * 300 + 500;
        image.rotation = Math.random() * 180;
        image.touchEnabled = false;
        this.groupSpark.addChild(image);
        var scale = MathUtils.limit(0.7, 1);
        image.scaleX = image.scaleY = scale;
        image.y = MathUtils.limit(-50, 250) + 700;
        var t = egret.Tween.get(image);
        t.to({ "x": Math.random() * 480, "y": Math.random() * 500 }, 3500).call(function () {
            image.parent.removeChild(image);
            egret.Tween.removeTweens(image);
            ObjectPool.push(image);
        });
    };
    CreateRoleView1.prototype.closeTween = function () {
        var len = this.groupSpark.numChildren;
        for (var i = 0; i < len; i++) {
            var obj = this.groupSpark.getChildAt(i);
            egret.Tween.removeTweens(obj);
        }
        egret.Tween.removeTweens(this.imgA);
        egret.Tween.removeTweens(this.scroller.viewport);
    };
    return CreateRoleView1;
}(BaseEuiView));
__reflect(CreateRoleView1.prototype, "CreateRoleView1");
ViewManager.ins().reg(CreateRoleView1, LayerManager.UI_Main);
//# sourceMappingURL=CreateRoleView1.js.map