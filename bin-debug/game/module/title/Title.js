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
var Title = (function (_super) {
    __extends(Title, _super);
    function Title() {
        var _this = _super.call(this) || this;
        _this.showTitleDic = {};
        _this.curSelectRole = 0;
        _this.sysId = PackageID.Title;
        _this.regNetMsg(1, _this.postListUpdate);
        _this.regNetMsg(2, _this.doAdd);
        _this.regNetMsg(3, _this.doRemove);
        _this.regNetMsg(4, _this.doUpdateShow);
        return _this;
    }
    Title.ins = function () {
        return _super.ins.call(this);
    };
    Title.prototype.getTotalPower = function () {
        var count = this.list.length;
        var power = 0;
        for (var i = 0; i < count; i++) {
            var data = this.list.getItemAt(i);
            if (data.endTime >= 0) {
                power += data.power;
            }
        }
        return power;
    };
    Title.prototype.postUseTitle = function (data) {
        return data;
    };
    Title.prototype.sendGetList = function () {
        this.sendBaseProto(1);
    };
    Title.prototype.postListUpdate = function (bytes) {
        var timeDict = {};
        var n = bytes.readInt();
        for (var i = 0; i < n; ++i) {
            timeDict[bytes.readInt()] = bytes.readUnsignedInt();
        }
        this.initList(timeDict);
        this.showTitleDic = {};
        var len = SubRoles.ins().subRolesLen;
        for (var i = 0; i < len; i++) {
            var role = SubRoles.ins().getSubRoleByIndex(i);
            if (role == null)
                continue;
            this.showTitleDic[Number(i)] = role.title;
        }
    };
    Title.prototype.doAdd = function (bytes) {
        this.change(bytes.readInt(), bytes.readUnsignedInt());
    };
    Title.prototype.doRemove = function (bytes) {
        this.change(bytes.readInt(), -1);
    };
    Title.prototype.sendChangeShow = function (roleID, title) {
        var bytes = this.getBytes(4);
        bytes.writeShort(roleID);
        bytes.writeInt(title);
        this.sendToServer(bytes);
    };
    Title.prototype.doUpdateShow = function (bytes) {
        var role = EntityManager.ins().getEntityByHandle(bytes.readDouble());
        if (role) {
            role.infoModel.title = bytes.readInt();
            role.updateTitle();
            if (role.team == Team.My) {
                var index = role.infoModel.index;
                var title = 0;
                var lastTitle = this.showTitleDic[index] || 0;
                var roleModel = role.infoModel;
                title = role.infoModel.title;
                this.showTitleDic[index] = title;
                this.postTitleShow(index, title, lastTitle);
            }
        }
    };
    Title.prototype.postTitleShow = function (param1, param2, param3) {
        return [param1, param2, param3];
    };
    Title.prototype.setTitle = function (roleIndex, titleID) {
        for (var k in this.showTitleDic) {
            if (this.showTitleDic[k] == titleID) {
                this.sendChangeShow(Number(k), 0);
                break;
            }
        }
        this.sendChangeShow(roleIndex, titleID);
    };
    Title.prototype.sortFunc = function (a, b) {
        return a.endTime < 0 == b.endTime < 0 ? (a.config.sort > b.config.sort ? 1 : -1) : a.endTime < 0 ? 1 : -1;
    };
    Title.prototype.initList = function (timeDict) {
        this.timeDict = timeDict;
        this.infoDict = {};
        this._totalAttrs = [];
        this._totalAttrsText = new eui.ArrayCollection;
        var infoList = [];
        var configList = GlobalConfig.TitleConf;
        for (var i in configList) {
            var info = new TitleInfo(configList[i]);
            if (info.config.Id in timeDict) {
                info.endTime = timeDict[info.config.Id];
                for (var i_1 in info.config.attrs) {
                    this._totalAttrs[info.config.attrs[i_1].type] = (this._totalAttrs[info.config.attrs[i_1].type] || 0) + info.config.attrs[i_1].value;
                }
            }
            else {
                info.endTime = -1;
            }
            infoList[infoList.length] = this.infoDict[info.config.Id] = info;
            info.attrsTotal = this._totalAttrsText;
        }
        infoList.sort(this.sortFunc);
        this.list = new eui.ArrayCollection(infoList);
        this.updateTotalAttrs();
    };
    Title.prototype.change = function (id, time) {
        if (!this.infoDict || !(id in this.infoDict))
            return;
        if ((id in this.timeDict) == time >= 0)
            return;
        var info = this.infoDict[id];
        info.endTime = time;
        if (time < 0)
            delete this.timeDict[id];
        else
            this.timeDict[id] = time;
        this.list.source.sort(this.sortFunc);
        this.list.refresh();
        var sign = time < 0 ? -1 : 1;
        for (var _i = 0, _a = info.config.attrs; _i < _a.length; _i++) {
            var attr = _a[_i];
            this._totalAttrs[attr.type] = (this._totalAttrs[attr.type] || 0) + sign * attr.value;
        }
        this.updateTotalAttrs();
        if (sign > 0)
            this.autoWearTitle(info);
    };
    Title.prototype.updateTotalAttrs = function () {
        var list = this._totalAttrsText.source;
        list.length = 0;
        for (var i in this._totalAttrs) {
            if (this._totalAttrs[i] > 0)
                list.push(TitleInfo.formatAttr(Number(i), this._totalAttrs[i]));
        }
        if (list.length == 0) {
            var attrs = this.infoDict[1].config.attrs;
            for (var _i = 0, attrs_1 = attrs; _i < attrs_1.length; _i++) {
                var attr = attrs_1[_i];
                list.push(TitleInfo.formatAttr(attr.type, 0));
            }
        }
        this._totalAttrsText.refresh();
    };
    Title.prototype.autoWearTitle = function (info) {
        if (info.config.Id != 17)
            return;
        if (info instanceof TitleInfo) {
            var len = SubRoles.ins().subRolesLen;
            for (var i = 0; i < len; i++) {
                if (!Title.ins().showTitleDic[i]) {
                    Title.ins().setTitle(i, info.config.Id);
                    break;
                }
            }
        }
    };
    Title.TITLE_WIN_REFLASH_PANEL = "TITLE_WIN_REFLASH_PANEL";
    Title.SIMLPE_HEIGHT = 86;
    Title.EXPAND_HEIGHT = 380;
    return Title;
}(BaseSystem));
__reflect(Title.prototype, "Title");
var GameSystem;
(function (GameSystem) {
    GameSystem.title = Title.ins.bind(Title);
})(GameSystem || (GameSystem = {}));
//# sourceMappingURL=Title.js.map