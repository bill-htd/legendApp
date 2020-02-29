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
var Hunt = (function (_super) {
    __extends(Hunt, _super);
    function Hunt() {
        var _this = _super.call(this) || this;
        _this.sysId = PackageID.TreasureHunt;
        _this.regNetMsg(1, _this.doHuntResult);
        _this.regNetMsg(2, _this.postBestListInfo);
        return _this;
    }
    Hunt.ins = function () {
        return _super.ins.call(this);
    };
    Hunt.prototype.sendHunt = function (type) {
        var bytes = this.getBytes(1);
        bytes.writeShort(type);
        this.sendToServer(bytes);
    };
    Hunt.prototype.sendHuntList = function () {
        this.sendBaseProto(2);
    };
    Hunt.prototype.doHuntResult = function (bytes) {
        var type = bytes.readShort();
        var num = bytes.readInt();
        var arr = [];
        for (var i = 0; i < num; i++) {
            arr[i] = [bytes.readInt(), bytes.readInt()];
        }
        if (ViewManager.ins().isShow(HuntResultWin)) {
            this.postHuntResult(type, arr, 0);
        }
        else {
            ViewManager.ins().open(HuntResultWin, type, arr, 0);
            this.postHuntResult(type, arr, 0);
        }
    };
    Hunt.prototype.postHuntResult = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return params;
    };
    Hunt.prototype.postBestListInfo = function (bytes) {
        var num = bytes.readShort();
        var arr = [];
        for (var i = 0; i < num; i++) {
            arr[i] = [bytes.readString(), bytes.readInt()];
        }
        arr.reverse();
        return arr;
    };
    return Hunt;
}(BaseSystem));
__reflect(Hunt.prototype, "Hunt");
var GameSystem;
(function (GameSystem) {
    GameSystem.hunt = Hunt.ins.bind(Hunt);
})(GameSystem || (GameSystem = {}));
//# sourceMappingURL=Hunt.js.map