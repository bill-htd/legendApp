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
var BoxModel = (function (_super) {
    __extends(BoxModel, _super);
    function BoxModel() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.gridCfgList = [];
        return _this;
    }
    BoxModel.ins = function () {
        return _super.ins.call(this);
    };
    BoxModel.prototype.getGridCfgList = function () {
        if (this.gridCfgList.length > 0) {
            return this.gridCfgList;
        }
        var list = GlobalConfig.TreasureBoxGridConfig;
        for (var str in list) {
            this.gridCfgList.push(list[str]);
        }
        return this.gridCfgList;
    };
    BoxModel.prototype.countBoxTimeCost = function (time, type) {
        var cost = GlobalConfig.TreasureBoxBaseConfig.moneyCoefficient;
        var num = Math.ceil(time / 60) * cost;
        var boxCoefficient = 1;
        var boxCfg = GlobalConfig.TreasureBoxConfig[type];
        if (boxCfg)
            boxCoefficient = boxCfg.quality;
        num = Math.ceil(boxCoefficient * num);
        return num;
    };
    BoxModel.prototype.getOtherBoxIsTimeDown = function (index) {
        var other = index == 0 ? 1 : 0;
        var data = Box.ins().freeInfoList[other];
        return data.getTime() <= 0;
    };
    BoxModel.prototype.getDownTimeIndex = function () {
        var data1 = Box.ins().freeInfoList[0];
        var data2 = Box.ins().freeInfoList[1];
        var time1 = data1.getTime();
        var time2 = data2.getTime();
        if (time2 > 0 && time1 > 0) {
            if (time1 > time2) {
                return data2.pos;
            }
            return data1.pos;
        }
        else if (time2 > 0 && time1 <= 0) {
            return data2.pos;
        }
        else if (time2 <= 0 && time1 > 0) {
            return data1.pos;
        }
        else {
            return 0;
        }
    };
    BoxModel.prototype.checkRedPointShow = function () {
        if (Actor.level < GlobalConfig.TreasureBoxBaseConfig.openLevel) {
            return false;
        }
        var box = Box.ins();
        var data1 = box.freeInfoList[0];
        var data2 = box.freeInfoList[1];
        if (!data1 || !data2)
            return false;
        if (data1.getTime() <= 0 || data2.getTime() <= 0) {
            return true;
        }
        var openList = box.arrOpenData;
        var havePos = box.isHaveFreePos();
        for (var i = 0; i < openList.length; i++) {
            var data = openList[i];
            if (data.itemId > 0 && data.state == 1 && havePos) {
                return true;
            }
        }
        return false;
    };
    BoxModel.prototype.checkCanTake = function () {
        var box = Box.ins();
        var data1 = box.freeInfoList[0];
        var data2 = box.freeInfoList[1];
        if (!data1 || !data2)
            return false;
        if (data1.getTime() <= 0 || data2.getTime() <= 0) {
            return true;
        }
        var openList = box.arrOpenData;
        for (var _i = 0, openList_1 = openList; _i < openList_1.length; _i++) {
            var item = openList_1[_i];
            if (item.itemId > 0 && item.state == 2 && item.getTime() <= 0) {
                return true;
            }
        }
        return false;
    };
    BoxModel.prototype.getMinBoxTime = function () {
        var list = Box.ins().freeInfoList;
        var time = Number.MAX_VALUE;
        for (var _i = 0, list_1 = list; _i < list_1.length; _i++) {
            var box = list_1[_i];
            if (box && box.getTime() < time) {
                time = box.getTime();
            }
        }
        var openList = Box.ins().arrOpenData;
        for (var _a = 0, openList_2 = openList; _a < openList_2.length; _a++) {
            var item = openList_2[_a];
            if (item.itemId > 0 && item.state == 2 && item.getTime() < time) {
                time = item.getTime();
            }
        }
        return time;
    };
    return BoxModel;
}(BaseClass));
__reflect(BoxModel.prototype, "BoxModel");
//# sourceMappingURL=BoxModel.js.map