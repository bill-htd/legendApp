var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var HeirloomData = (function () {
    function HeirloomData() {
        this.heirloomData = [];
    }
    HeirloomData.prototype.parser = function (bytes) {
        for (var i = 0; i < 8; i++) {
            var lv = bytes.readInt();
            if (!this.heirloomData[i])
                this.heirloomData[i] = new HeirloomInfo();
            this.heirloomData[i].setInfo(i + 1, lv);
        }
    };
    HeirloomData.prototype.update = function (solt, lv) {
        if (solt <= 0 || solt > 8)
            return;
        var info = this.heirloomData[solt - 1];
        if (info) {
            info.setInfo(solt, lv);
        }
    };
    HeirloomData.prototype.getData = function () {
        return this.heirloomData;
    };
    HeirloomData.prototype.getInfoBySolt = function (index) {
        if (index >= 0 && index < 8) {
            var info = this.heirloomData[index];
            if (info) {
                return info;
            }
        }
        return null;
    };
    HeirloomData.getInfoBySoltFirst = function (index) {
        if (index >= 0 && index < 8) {
            var config = GlobalConfig.HeirloomEquipConfig[index + 1][1];
            return config;
        }
        return null;
    };
    HeirloomData.getEquipName = function (index) {
        var str = "";
        switch (index + 1) {
            case HeirloomSlot.wq:
                str = "武器";
                break;
            case HeirloomSlot.tk:
                str = "头盔";
                break;
            case HeirloomSlot.yf:
                str = "衣服";
                break;
            case HeirloomSlot.xl:
                str = "项链";
                break;
            case HeirloomSlot.hw:
                str = "护腕";
                break;
            case HeirloomSlot.yd:
                str = "腰带";
                break;
            case HeirloomSlot.jz:
                str = "戒指";
                break;
            case HeirloomSlot.xz:
                str = "鞋子";
                break;
        }
        return str;
    };
    HeirloomData.prototype.getSuitConfig = function (role) {
        var hinfos = role.heirloom.getData();
        var minLv = 0;
        var everyLv = true;
        for (var i = 0; i < hinfos.length; i++) {
            var info = hinfos[i];
            if (i == 0)
                minLv = info.lv;
            if (!info.lv && everyLv)
                everyLv = false;
            if (info.lv <= minLv)
                minLv = info.lv;
        }
        var suitConfig;
        if (everyLv) {
            suitConfig = GlobalConfig.HeirloomEquipSetConfig[minLv];
        }
        return suitConfig;
    };
    return HeirloomData;
}());
__reflect(HeirloomData.prototype, "HeirloomData");
var HeirloomSlot;
(function (HeirloomSlot) {
    HeirloomSlot[HeirloomSlot["wq"] = 1] = "wq";
    HeirloomSlot[HeirloomSlot["tk"] = 2] = "tk";
    HeirloomSlot[HeirloomSlot["yf"] = 3] = "yf";
    HeirloomSlot[HeirloomSlot["xl"] = 4] = "xl";
    HeirloomSlot[HeirloomSlot["hw"] = 5] = "hw";
    HeirloomSlot[HeirloomSlot["yd"] = 6] = "yd";
    HeirloomSlot[HeirloomSlot["jz"] = 7] = "jz";
    HeirloomSlot[HeirloomSlot["xz"] = 8] = "xz";
})(HeirloomSlot || (HeirloomSlot = {}));
//# sourceMappingURL=HeirloomData.js.map