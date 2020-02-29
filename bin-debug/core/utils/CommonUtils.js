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
var CommonUtils = (function (_super) {
    __extends(CommonUtils, _super);
    function CommonUtils() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CommonUtils.addLableStrokeColor = function (lable, color, width) {
        lable.strokeColor = color;
        lable.stroke = width;
    };
    CommonUtils.getObjectLength = function (list) {
        var num = 0;
        for (var i in list) {
            num++;
        }
        return num;
    };
    CommonUtils.getObjectByAttr = function (list, attrName, attrValue) {
        for (var i in list) {
            if (list[i][attrName] == attrValue) {
                return list[i];
            }
        }
        return null;
    };
    CommonUtils.getObjectByUnionAttr = function (list, attrValue, attrValue1) {
        for (var i in list) {
            if (i == attrValue.toString()) {
                for (var j in list[i]) {
                    if (j == attrValue1.toString()) {
                        return list[i][j];
                    }
                }
            }
        }
        return null;
    };
    CommonUtils.copyDataHandler = function (obj) {
        var newObj;
        if (obj instanceof Array) {
            newObj = [];
        }
        else if (obj instanceof Object) {
            newObj = {};
        }
        else {
            return obj;
        }
        var keys = Object.keys(obj);
        for (var i = 0, len = keys.length; i < len; i++) {
            var key = keys[i];
            newObj[key] = this.copyDataHandler(obj[key]);
        }
        return newObj;
    };
    CommonUtils.objectToArray = function (obj) {
        if (obj instanceof Object) {
            obj = this.copyDataHandler(obj);
            var newArr = [];
            var keys = Object.keys(obj);
            for (var i = 0, len = keys.length; i < len; i++) {
                var key = keys[i];
                if (obj[key])
                    newArr.push(obj[key]);
            }
            return newArr;
        }
        else {
            return obj;
        }
    };
    CommonUtils.lock = function () {
        StageUtils.ins().getStage().touchEnabled = StageUtils.ins().getStage().touchChildren = false;
    };
    CommonUtils.unlock = function () {
        StageUtils.ins().getStage().touchEnabled = StageUtils.ins().getStage().touchChildren = true;
    };
    CommonUtils.labelIsOverLenght = function (label, num) {
        label.text = this.overLength(num);
    };
    CommonUtils.overLength = function (num) {
        var str = null;
        if (num < 100000) {
            str = Math.floor(num) + "";
        }
        else if (num > 100000000) {
            num = (num / 100000000);
            num = Math.floor(num * 10) / 10;
            str = num + "亿";
        }
        else {
            num = (num / 10000);
            num = Math.floor(num * 10) / 10;
            str = num + "万";
        }
        return str;
    };
    CommonUtils.overLengthChange = function (num) {
        var str = null;
        if (num < 10000) {
            str = Math.floor(num) + "";
        }
        else if (num > 100000000) {
            num = (num / 100000000);
            num = Math.floor(num * 10) / 10;
            str = num + "亿";
        }
        else {
            num = (num / 10000);
            num = Math.floor(num * 10) / 10;
            str = num + "万";
        }
        return str;
    };
    return CommonUtils;
}(BaseClass));
__reflect(CommonUtils.prototype, "CommonUtils");
//# sourceMappingURL=CommonUtils.js.map