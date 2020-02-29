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
var Activationtongyong = (function (_super) {
    __extends(Activationtongyong, _super);
    function Activationtongyong() {
        var _this = _super.call(this) || this;
        _this.skinName = "activationtongyong";
        _this.isTopLevel = true;
        _this.bgClose.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onTap, _this);
        _this.okBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onTap, _this);
        return _this;
    }
    Activationtongyong.prototype.onTap = function (e) {
        switch (e.currentTarget) {
            case this.okBtn:
            case this.bgClose:
                ViewManager.ins().close(Activationtongyong);
                break;
        }
    };
    Activationtongyong.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        var type = param[0];
        var name = param[1];
        var source = param[2];
        var play = param[3];
        this.closeFunc = param[4];
        var effmc = param[5];
        var zlmodel = param[6];
        this.title.source = type ? "tongyongjihuochenggongp3" : "tongyongjihuochenggongp2";
        var rxa = RegExpUtil.NonNumericExp.exec(name);
        if (!rxa)
            this.itemname.text = name.split("").join("\n");
        else {
            var num = "";
            var oth = "";
            for (var i = 0; i < name.length; i++) {
                if (i >= rxa.index) {
                    oth += name[i];
                }
                else {
                    num += name[i];
                }
            }
            var str = "";
            if (Number(num) / 10 >= 1) {
                str = num + "\n";
            }
            else {
                str = " " + num + "\n";
            }
            this.itemname.text = str + oth.split("").join("\n");
        }
        this.img.source = source;
        if (effmc) {
            if (!this.imgEff)
                this.imgEff = new MovieClip;
            if (!this.imgEff.parent)
                this.imgMc.addChild(this.imgEff);
            this.imgEff.playFile(RES_DIR_EFF + effmc, -1);
        }
        if (zlmodel) {
            if (!this.zlEff)
                this.zlEff = new MovieClip;
            if (!this.zlEff.parent)
                this.zlMc.addChild(this.zlEff);
            this.zlEff.playFile(RES_DIR_EFF + zlmodel, -1);
        }
        this.playAnimaiton(play);
    };
    Activationtongyong.prototype.close = function () {
        egret.Tween.removeTweens(this.title);
        egret.Tween.removeTweens(this.titleBg);
        egret.Tween.removeTweens(this.img);
        egret.Tween.removeTweens(this.imgMc);
        egret.Tween.removeTweens(this.zlMc);
        egret.Tween.removeTweens(this.tielian);
        egret.Tween.removeTweens(this.imgAct);
        if (this.closeFunc)
            this.closeFunc.apply(null);
        this.closeFunc = null;
        DisplayUtils.removeFromParent(this.zlEff);
        DisplayUtils.removeFromParent(this.imgEff);
        DisplayUtils.removeFromParent(this.mc);
        this.zlEff = null;
        this.imgEff = null;
        this.mc = null;
    };
    Activationtongyong.prototype.playAnimaiton = function (play) {
        var _this = this;
        var tlpos = this.tlpos = this.tlpos || [this.tielian.x, this.tielian.y];
        var lbgpos = this.lbgpos = this.lbgpos || [this.lbg.x, this.lbg.y];
        var rbgpos = this.rbgpos = this.rbgpos || [this.rbg.x, this.rbg.y];
        var titleScale = this.titleScale = this.titleScale || [this.title.scaleX, this.title.scaleY];
        var tbgScale = this.tbgScale = this.tbgScale || [this.titleBg.scaleX, this.titleBg.scaleY];
        var imgScale = this.imgScale = this.imgScale || [this.img.scaleX, this.img.scaleY];
        var imgMcScale = [0, 0];
        if (this.imgEff)
            imgMcScale = this.imgMcScale = this.imgMcScale || [this.imgMc.scaleX, this.imgMc.scaleY];
        else if (this.zlEff)
            imgMcScale = this.imgMcScale = this.imgMcScale || [this.zlMc.scaleX, this.zlMc.scaleY];
        this.bg.visible = false;
        this.itemname.visible = false;
        this.leftBg.visible = false;
        this.buttonBg.visible = false;
        this.title.scaleX = 0;
        this.title.scaleY = 0;
        this.titleBg.scaleX = 0;
        this.titleBg.scaleY = 0;
        this.img.scaleX = 0;
        this.img.scaleY = 0;
        this.imgMc.scaleX = 0;
        this.imgMc.scaleY = 0;
        this.tielian.y = -this.tielian.height * 2;
        var speed = 1;
        var t1 = egret.Tween.get(this.tielian);
        t1.to({ "y": tlpos[1] + 50 }, 200 * speed).to({ "y": tlpos[1] }, 100 * speed).call(function () {
            _this.bg.visible = true;
            var t2 = egret.Tween.get(_this.title);
            var t3 = egret.Tween.get(_this.titleBg);
            var t4 = egret.Tween.get(_this.img);
            var t5 = egret.Tween.get(_this.imgMc);
            t2.to({ scaleX: titleScale[0], scaleY: titleScale[1] }, 500 * speed);
            t3.to({ scaleX: tbgScale[0], scaleY: tbgScale[1] }, 500 * speed);
            t5.to({ scaleX: imgMcScale[0], scaleY: imgMcScale[1] }, 500 * speed);
            t4.to({ scaleX: imgScale[0], scaleY: imgScale[1] }, 500 * speed).wait(500).call(function () {
                _this.itemname.visible = true;
                _this.leftBg.visible = true;
                _this.buttonBg.visible = true;
                _this.showPanel(play);
                _this.artifactTween();
            });
        });
        this.lbg.y = -this.tielian.height;
        this.rbg.y = -this.tielian.height;
        var tl = egret.Tween.get(this.lbg);
        tl.to({ "y": lbgpos[1] + 50 }, 200 * speed).to({ "y": lbgpos[1] }, 100 * speed);
        var tr = egret.Tween.get(this.rbg);
        tr.to({ "y": rbgpos[1] + 50 }, 200 * speed).to({ "y": rbgpos[1] }, 100 * speed);
    };
    Activationtongyong.prototype.showPanel = function (play) {
        if (play) {
            this.mc = new MovieClip();
            this.mc.anchorOffsetX = this.Groupeff.anchorOffsetX;
            this.mc.anchorOffsetY = this.Groupeff.anchorOffsetY;
            this.Groupeff.addChild(this.mc);
            this.mc.playFile(RES_DIR_EFF + "artifacteff", -1);
        }
    };
    Activationtongyong.prototype.artifactTween = function () {
        var t = egret.Tween.get(this.imgAct, { "loop": true });
        t.to({ "y": this.imgAct.y - 20 }, 1000).to({ "y": this.imgAct.y }, 1000);
    };
    Activationtongyong.show = function (type, name, source, play, func, effmc, zlmodel) {
        if (play === void 0) { play = true; }
        if (func === void 0) { func = null; }
        ViewManager.ins().open(Activationtongyong, type, name, source, play, func, effmc, zlmodel);
        StageUtils.ins().setTouchChildren(true);
    };
    return Activationtongyong;
}(BaseEuiView));
__reflect(Activationtongyong.prototype, "Activationtongyong");
ViewManager.ins().reg(Activationtongyong, LayerManager.UI_Main);
//# sourceMappingURL=Activationtongyong.js.map