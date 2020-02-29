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
var Box = (function (_super) {
    __extends(Box, _super);
    function Box() {
        var _this = _super.call(this) || this;
        _this.arrOpenData = [];
        _this.freeInfoList = [];
        _this.sysId = PackageID.Box;
        _this.regNetMsg(1, _this.updateBoxData);
        _this.regNetMsg(2, _this.getBox);
        _this.regNetMsg(3, _this.updateTipsList);
        _this.regNetMsg(5, _this.getBoxNotice);
        _this.regNetMsg(6, _this.doShowRewardInfo);
        _this.arrTips = [];
        return _this;
    }
    Box.ins = function () {
        return _super.ins.call(this);
    };
    Box.prototype.postUpdateData = function () {
    };
    Box.prototype.postUpdateFreeBox = function () {
    };
    Box.prototype.getGridInfoById = function (id) {
        for (var i = 0; i < this.arrOpenData.length; i++) {
            if (this.arrOpenData[i].pos == id) {
                return this.arrOpenData[i];
            }
        }
        return null;
    };
    Box.prototype.isHaveFreePos = function () {
        var num = 0;
        for (var i = 0; i < this.arrOpenData.length; i++) {
            if (this.arrOpenData[i].state == 2 && this.arrOpenData[i].getTime() > 0) {
                ++num;
            }
        }
        var freeNum = UserVip.ins().lv >= GlobalConfig.TreasureBoxBaseConfig.thirdOpenLevel ? 2 : 1;
        return freeNum > num;
    };
    Box.prototype.updateBoxQueue = function () {
    };
    Box.prototype.canAdd = function () {
        for (var i = 1; i < 4; i++) {
            if (this.arrOpenData[i].canUsed && this.arrOpenData[i].itemId == 0)
                return true;
        }
        return false;
    };
    Box.prototype.getAddIndex = function () {
        for (var i = 1; i < 4; i++) {
            if (this.arrOpenData[i].canUsed && this.arrOpenData[i].itemId == 0)
                return i;
        }
        return 0;
    };
    Box.prototype.updateBoxData = function (bytes) {
        var len = bytes.readShort();
        this.arrOpenData = [];
        for (var i = 0; i < len; i++) {
            var data = new BoxOpenData();
            data.updateData(bytes);
            this.arrOpenData.push(data);
        }
        len = bytes.readShort();
        this.freeInfoList = [];
        for (var i = 0; i < len; i++) {
            var data = new BoxFreeData();
            data.updateData(bytes);
            this.freeInfoList.push(data);
        }
        TimerManager.ins().removeAll(this);
        this.postUpdateData();
    };
    Box.prototype.sendOpen = function (index) {
        var bytes = this.getBytes(2);
        bytes.writeShort(index);
        this.sendToServer(bytes);
    };
    Box.prototype.getBox = function (bytes) {
        UserTips.ins().showBoxTips(bytes.readShort());
    };
    Box.prototype.sendAddToQueue = function (id) {
        var bytes = this.getBytes(3);
        bytes.writeShort(id);
        this.sendToServer(bytes);
    };
    Box.prototype.updateTipsList = function (bytes) {
        var len = bytes.readShort();
        for (var i = 0; i < len; i++) {
            var data = new BoxTipsData();
            data.id = bytes.readShort();
            data.name = bytes.readString();
            this.arrTips.push(data);
        }
        this.postUpdateData();
    };
    Box.prototype.sendOpenFreeBox = function (index) {
        var bytes = this.getBytes(4);
        bytes.writeShort(index);
        this.sendToServer(bytes);
    };
    Box.prototype.getBoxNotice = function (bytes) {
        UserTips.ins().showRewardBox(bytes.readShort());
    };
    Box.prototype.doShowRewardInfo = function (bytes) {
        var type = bytes.readShort();
        var len = bytes.readShort();
        var rewardList = [];
        for (var i = 0; i < len; i++) {
            var item = new RewardData();
            item.parser(bytes);
            rewardList.push(item);
        }
        ViewManager.ins().open(BoxOpenWin, type, rewardList);
    };
    return Box;
}(BaseSystem));
__reflect(Box.prototype, "Box");
var GameSystem;
(function (GameSystem) {
    GameSystem.box = Box.ins.bind(Box);
})(GameSystem || (GameSystem = {}));
//# sourceMappingURL=Box.js.map