var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var SubRole = (function () {
    function SubRole() {
        this.pos1 = 0;
        this.pos2 = 0;
        this.pos3 = 0;
    }
    SubRole.prototype.parser = function (bytes) {
        this.job = bytes.readByte();
        this.sex = bytes.readByte();
        this.clothID = bytes.readInt();
        this.swordID = bytes.readInt();
        this.wingLevel = bytes.readInt();
        if (bytes.readInt() == 0) {
            this.wingLevel = -1;
        }
        this.pos1 = bytes.readInt();
        this.pos2 = bytes.readInt();
        this.pos3 = bytes.readInt();
    };
    return SubRole;
}());
__reflect(SubRole.prototype, "SubRole");
var PraiseData = (function () {
    function PraiseData() {
        this.subRole = [];
    }
    PraiseData.prototype.getLastMobaiNum = function () {
        var index = UserZs.ins().lv > 0 ? UserZs.ins().lv * 1000 : Actor.level;
        var maxPraiseTime = GlobalConfig['MorshipConfig'][index].count;
        return maxPraiseTime - this.praiseTime;
    };
    PraiseData.prototype.parser = function (bytes) {
        this.id = bytes.readInt();
        if (this.id > 0) {
            this.name = bytes.readString();
            this.ce = bytes.readDouble();
            this.level = bytes.readShort();
            this.zhuan = bytes.readShort();
            this.vipLevel = bytes.readShort();
            var num = bytes.readShort();
            for (var i = 0; i < num; i++) {
                this.subRole[i] = new SubRole;
                this.subRole[i].parser(bytes);
            }
        }
    };
    PraiseData.prototype.getRoleByJob = function (job) {
        if (job > 0) {
            for (var i in this.subRole) {
                if (this.subRole[i].job == job)
                    return this.subRole[i];
            }
        }
        return this.subRole[0];
    };
    return PraiseData;
}());
__reflect(PraiseData.prototype, "PraiseData");
//# sourceMappingURL=PraiseData.js.map