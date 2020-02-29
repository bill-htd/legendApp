var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var OtherFireRingData = (function () {
    function OtherFireRingData() {
        this.lyMarkLv = 0;
        this.lyMarkSkills = [];
    }
    OtherFireRingData.prototype.parser = function (bytes) {
        this.lv = bytes.readInt();
        this.skillBooks = [];
        this.abilityItems = [];
        if (this.lv > 0) {
            var bookCount = bytes.readShort();
            for (var i = 0; i < bookCount; i++) {
                var skillInfo = new RingSkillInfo();
                skillInfo.position = bytes.readShort();
                skillInfo.skillId = bytes.readShort();
                skillInfo.skillLvl = bytes.readShort();
                this.skillBooks.push(skillInfo);
            }
            var itemCount = bytes.readShort();
            for (var i = 0; i < itemCount; i++) {
                var id = bytes.readShort();
                var lv = bytes.readShort();
                this.abilityItems[id] = lv;
            }
            this.lyMarkLv = bytes.readShort();
            this.lyMarkSkills = [];
            var len = bytes.readByte();
            this.lyMarkSkills.length = len;
            for (var i = 0; i < len; i++)
                this.lyMarkSkills[i] = bytes.readShort();
        }
    };
    return OtherFireRingData;
}());
__reflect(OtherFireRingData.prototype, "OtherFireRingData");
//# sourceMappingURL=OtherFireRingData.js.map