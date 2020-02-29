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
var CreateRoleView = (function (_super) {
    __extends(CreateRoleView, _super);
    function CreateRoleView() {
        var _this = _super.call(this) || this;
        _this._selectJob = 0;
        _this.sex = 1;
        _this.isAutoEnter = false;
        _this.skinName = "CreateRole1Skin";
        _this.roleImage = [_this.role0, _this.role1, _this.role2, _this.role3, _this.role4, _this.role5];
        _this.RadioBtns = [_this.jobChoose1, _this.jobChoose2, _this.jobChoose3, _this.woman, _this.man];
        _this.jobChoose1.groupName = "Group1";
        _this.jobChoose2.groupName = "Group1";
        _this.jobChoose3.groupName = "Group1";
        _this.jobChoose1.selected = true;
        _this.man.groupName = "Group2";
        _this.woman.groupName = "Group2";
        _this.woman.selected = true;
        _this.desc.lineSpacing = 5;
        _this.updateRole();
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
        return _this;
    }
    CreateRoleView.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.selectJob = 0;
        for (var i = 0; i < this.RadioBtns.length; i++) {
            this.RadioBtns[i].addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
        }
        this.createBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
        this.diceBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
        var str = LocationProperty.nickName;
        if (str == "null" || str == "") {
            RoleMgr.ins().sendRandomName(this.sex);
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
        this.timeLab.text = "";
        this.nameInput.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
        this.setBtnEff();
    };
    CreateRoleView.prototype.setBtnEff = function () {
        if (!this.btnMc) {
            this.btnMc = new MovieClip;
            this.btnMc.x = this.createBtn.x + this.createBtn.width / 2 + 15;
            this.btnMc.y = this.createBtn.y + this.createBtn.height / 2 - 2;
            this.createBtn.parent.addChild(this.btnMc);
        }
        this.btnMc.playFile(RES_DIR_EFF + "chuangjuebtn", -1);
    };
    CreateRoleView.prototype.updateTiem = function () {
        var s = Math.ceil((this.openTime - egret.getTimer()) / 1000);
        this.timeLab.text = "\u5269\u4F59" + Math.max(s, 0) + "\u79D2";
        if (s <= 0) {
            this.isAutoEnter = true;
            this.sendCreateRole();
        }
    };
    CreateRoleView.prototype.createRuselt = function (result) {
        this.enterGroup.visible = false;
        if (Math.abs(result) == 6) {
            RoleMgr.ins().sendRandomName(this.sex);
        }
    };
    CreateRoleView.prototype.perloadProgress = function (arr) {
        var loaded = arr[0], total = arr[1];
        this.loadText.text = "\u6B63\u5728\u8FDB\u5165\u6E38\u620F\uFF08" + Math.ceil((loaded / total) * 100) + "%\uFF09";
    };
    CreateRoleView.prototype.loopT = function () {
        this.scroller.viewport.scrollV = 200;
        var t = egret.Tween.get(this.scroller.viewport);
        t.to({ scrollV: this.listH }, 40 * this.listH).call(this.loopT, this);
    };
    CreateRoleView.prototype.loopT2 = function () {
        var t1 = egret.Tween.get(this.imgA);
        t1.to({ horizontalCenter: -100 }, 1000).to({ horizontalCenter: -115 }, 1000).call(this.loopT2, this);
    };
    CreateRoleView.prototype.close = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.createBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
        this.diceBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
        this.closeTween();
        TimerManager.ins().removeAll(this);
        DisplayUtils.removeFromParent(this.btnMc);
        this.btnMc = null;
    };
    CreateRoleView.prototype.sendCreateRole = function () {
        RoleMgr.ins().sendCreateRole(this.nameInput.text, this.curSex(), this.curJob(), 0, 0, "");
        TimerManager.ins().removeAll(this);
    };
    CreateRoleView.prototype.onClick = function (e) {
        switch (e.currentTarget) {
            case this.createBtn:
                ReportData.getIns().report("clickstart", ReportData.LOAD);
                this.sendCreateRole();
                this.enterGroup.visible = true;
                break;
            case this.diceBtn:
                RoleMgr.ins().sendRandomName(this.sex);
            case this.nameInput:
                TimerManager.ins().remove(this.updateTiem, this);
                this.timeLab.text = "";
                break;
            default:
                var showRoleIndex = this.RadioBtns.indexOf(e.currentTarget);
                if (showRoleIndex != -1) {
                    this.selectJob = showRoleIndex;
                }
                break;
        }
        SoundManager.ins().touchBg();
    };
    Object.defineProperty(CreateRoleView.prototype, "selectJob", {
        set: function (jobIndex) {
            if (jobIndex > 2) {
                this.sex = jobIndex % 2;
            }
            else {
                this._selectJob = jobIndex;
            }
            this.updateRole();
        },
        enumerable: true,
        configurable: true
    });
    CreateRoleView.prototype.updateRole = function () {
        for (var i = 0; i < this.roleImage.length; i++) {
            this.roleImage[i].visible = false;
        }
        this.zhanshiTitle.visible = false;
        this.fashiTitle.visible = false;
        this.daoshiTitle.visible = false;
        switch (this._selectJob) {
            case 0:
                this.zhanshiTitle.visible = true;
                if (this.sex == 1) {
                    this.roleImage[1].visible = true;
                }
                else {
                    this.roleImage[0].visible = true;
                }
                break;
            case 1:
                this.fashiTitle.visible = true;
                if (this.sex == 1) {
                    this.roleImage[3].visible = true;
                }
                else {
                    this.roleImage[2].visible = true;
                }
                break;
            case 2:
                this.daoshiTitle.visible = true;
                if (this.sex == 1) {
                    this.roleImage[5].visible = true;
                }
                else {
                    this.roleImage[4].visible = true;
                }
                break;
        }
    };
    CreateRoleView.prototype.setName = function (str) {
        this.nameInput.text = str;
        if (this.isAutoEnter)
            this.sendCreateRole();
    };
    CreateRoleView.prototype.curJob = function () {
        return this._selectJob + 1;
    };
    CreateRoleView.prototype.curSex = function () {
        return this.sex;
    };
    CreateRoleView.prototype.sparkTween = function () {
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
    CreateRoleView.prototype.randomSpark = function () {
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
    CreateRoleView.prototype.closeTween = function () {
        var len = this.groupSpark.numChildren;
        for (var i = 0; i < len; i++) {
            var obj = this.groupSpark.getChildAt(i);
            egret.Tween.removeTweens(obj);
        }
        egret.Tween.removeTweens(this.imgA);
        egret.Tween.removeTweens(this.scroller.viewport);
    };
    return CreateRoleView;
}(BaseEuiView));
__reflect(CreateRoleView.prototype, "CreateRoleView");
ViewManager.ins().reg(CreateRoleView, LayerManager.UI_Main);
//# sourceMappingURL=CreateRoleView.js.map