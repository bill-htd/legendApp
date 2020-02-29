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
var BloodLabel = (function (_super) {
    __extends(BloodLabel, _super);
    function BloodLabel() {
        var _this = _super.call(this) || this;
        _this.urlDic = {
            256: "wydEffectIcon",
            512: ["j0z", "j4z", "j5z"],
        };
        _this.containers = [];
        _this.imgs = [];
        return _this;
    }
    BloodLabel.ins = function () {
        return _super.ins.call(this);
    };
    BloodLabel.prototype.createBloodLabel = function (dtype, num, type, offset, offsetY, job) {
        if (offset === void 0) { offset = 0; }
        if (offsetY === void 0) { offsetY = 0; }
        if (job === void 0) { job = 1; }
        var blood = this.getContainer();
        blood.createBlood(dtype, num, type, offset, offsetY, job);
        return blood;
    };
    BloodLabel.prototype.getTypeUrl = function (_type, job) {
        if (job === void 0) { job = 1; }
        var url = this.urlDic[_type];
        if (url) {
            if (typeof url != "string") {
                return url[job - 1];
            }
            return url;
        }
    };
    BloodLabel.prototype.getImage = function () {
        return this.imgs.pop() || new eui.Image();
    };
    BloodLabel.prototype.getContainer = function () {
        return this.containers.pop() || new BloodContainer();
    };
    BloodLabel.prototype.pushImage = function (img) {
        if (img && this.imgs.indexOf(img) == -1)
            this.imgs.push(img);
    };
    BloodLabel.prototype.pushContainer = function (container) {
        if (container && this.containers.indexOf(container) == -1)
            this.containers.push(container);
    };
    return BloodLabel;
}(BaseClass));
__reflect(BloodLabel.prototype, "BloodLabel");
var BloodContainer = (function (_super) {
    __extends(BloodContainer, _super);
    function BloodContainer() {
        var _this = _super.call(this) || this;
        _this.offset = 3;
        return _this;
    }
    BloodContainer.prototype.createBlood = function (dtype, num, type, offset, offsetY, job) {
        if (offset === void 0) { offset = 0; }
        if (offsetY === void 0) { offsetY = 0; }
        if (job === void 0) { job = 1; }
        if ((dtype & DamageTypes.ZhuiMing) == DamageTypes.ZhuiMing)
            this.addImage(DamageTypes.ZhuiMing, job);
        if ((dtype & DamageTypes.ZhiMing) == DamageTypes.ZhiMing)
            this.addImage(DamageTypes.ZhiMing, job);
        this.addBmpNumber(num, type, offset, offsetY);
        this.resetPosition();
    };
    BloodContainer.prototype.addImage = function (dtype, job) {
        if (job === void 0) { job = 1; }
        var url = BloodLabel.ins().getTypeUrl(dtype, job);
        if (!url) {
            console.log("\u4F24\u5BB3\u7C7B\u578B:" + dtype + "\u672A\u8BBE\u7F6E\u8D44\u6E90");
            return;
        }
        var img = BloodLabel.ins().getImage();
        img.addEventListener(egret.Event.COMPLETE, this.onLoaded, this);
        img.width = NaN;
        img.height = NaN;
        img.source = url;
        this.addChild(img);
    };
    BloodContainer.prototype.addBmpNumber = function (num, type, offset, offsetY) {
        if (offset === void 0) { offset = 0; }
        if (offsetY === void 0) { offsetY = 0; }
        if (this.bmpContainer) {
            BitmapNumber.ins().changeNum(this.bmpContainer, num, type, offset, offsetY);
        }
        else {
            this.bmpContainer = BitmapNumber.ins().createNumPic(num, type, offset, offsetY);
        }
        this.addChild(this.bmpContainer);
    };
    BloodContainer.prototype.onLoaded = function (e) {
        var img = e.currentTarget;
        img.removeEventListener(egret.Event.COMPLETE, this.onLoaded, this);
        this.resetPosition();
    };
    BloodContainer.prototype.resetPosition = function () {
        var w = 0;
        var h = 0;
        var num = this.numChildren;
        for (var i = 0; i < num; i++) {
            var ch = this.getChildAt(i);
            ch.x = w;
            w += ch.width + this.offset;
            h = Math.max(h, ch.height);
        }
        for (var i = 0; i < num; i++) {
            var ch = this.getChildAt(i);
            ch.y = (h - ch.height) / 2;
        }
        this.width = w - this.offset;
        this.height = h;
    };
    BloodContainer.prototype.destroy = function () {
        while (this.numChildren) {
            var ch = this.removeChildAt(this.numChildren - 1);
            if (ch instanceof eui.Image) {
                ch.removeEventListener(egret.Event.COMPLETE, this.onLoaded, this);
                BloodLabel.ins().pushImage(ch);
            }
            else if (ch instanceof egret.DisplayObjectContainer) {
                BitmapNumber.ins().desstroyNumPic(ch);
            }
        }
        this.bmpContainer = null;
        BloodLabel.ins().pushContainer(this);
    };
    return BloodContainer;
}(egret.DisplayObjectContainer));
__reflect(BloodContainer.prototype, "BloodContainer");
//# sourceMappingURL=BloodLabel.js.map