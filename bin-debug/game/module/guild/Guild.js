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
var Guild = (function (_super) {
    __extends(Guild, _super);
    function Guild() {
        var _this = _super.call(this) || this;
        _this.guildID = 0;
        _this.guildName = "";
        _this.guildLv = 0;
        _this._buildingLevels = [];
        _this.money = 0;
        _this.notice = "";
        _this.records = [];
        _this.guildListInfos = [];
        _this._guildMembers = [];
        _this.applyGuilds = [];
        _this._guillRoleSkillInfo = [];
        _this.guildTaskInfos = new eui.ArrayCollection();
        _this.isFirstGetMessageInfo = true;
        _this._memberSortType = 0;
        _this.pageMax = 1;
        _this.hasApply = false;
        _this.changeNameNum = 0;
        _this.hasNewMsg = false;
        _this.sendToFireCount = [];
        _this.isAuto = 1;
        _this.attrLimit = 99999;
        _this._conCount = [];
        _this.sysId = PackageID.Guild;
        _this.regNetMsg(1, _this.postGuildInfo);
        _this.regNetMsg(2, _this.postGuildMembers);
        _this.regNetMsg(3, _this.postGuildList);
        _this.regNetMsg(4, _this.postGuildCreate);
        _this.regNetMsg(6, _this.postJoinGuild);
        _this.regNetMsg(7, _this.postApplyInfos);
        _this.regNetMsg(8, _this.postProcessJoin);
        _this.regNetMsg(9, _this.doChangeOffice);
        _this.regNetMsg(11, _this.postQuitGuild);
        _this.regNetMsg(12, _this.doUpdateGuildInfo);
        _this.regNetMsg(13, _this.postGuildMoney);
        _this.regNetMsg(14, _this.postChangeNotice);
        _this.regNetMsg(15, _this.doGuildSkillInfo);
        _this.regNetMsg(16, _this.postLearnGuildSkill);
        _this.regNetMsg(17, _this.postUpBuilding);
        _this.regNetMsg(18, _this.doPracticeGuildSkill);
        _this.regNetMsg(19, _this.doGuildTaskInfos);
        _this.regNetMsg(20, _this.doGuildTaskUpdate);
        _this.regNetMsg(22, _this.postManageList);
        _this.regNetMsg(23, _this.doManage);
        _this.regNetMsg(24, _this.postConCount);
        _this.regNetMsg(25, _this.postMyGuildInfo);
        _this.regNetMsg(26, _this.doGuildMessage);
        _this.regNetMsg(27, _this.postAllGuildMessage);
        _this.regNetMsg(28, _this.doAddGuildlimit);
        _this.regNetMsg(30, _this.postUpdateFire);
        _this.observe(GameLogic.ins().postEnterMap, _this.startCheckShow);
        _this.observe(GameLogic.ins().postGuildChange, _this.setGuild);
        _this.initData();
        return _this;
    }
    Guild.prototype.initData = function () {
        if (!this.guildMessageInfoData)
            this.guildMessageInfoData = new eui.ArrayCollection();
        this.guildMessageInfoData.removeAll();
        this.isFirstGetMessageInfo = true;
    };
    Guild.prototype.setGuild = function (arr) {
        var id = arr[0], name = arr[1];
        if (this.guildID != id) {
            this.guildID = id;
            this.guildName = name;
            this.sendGuildInfo();
            if (this.guildID != 0) {
                if (ViewManager.ins().isShow(GuildApplyWin)) {
                    ViewManager.ins().close(GuildApplyWin);
                    ViewManager.ins().open(GuildMap);
                }
            }
        }
    };
    Guild.ins = function () {
        return _super.ins.call(this);
    };
    Guild.prototype.initLogin = function () {
        this.sendGuildInfo();
        this.sendMyGuildInfo();
    };
    Guild.prototype.getSkllInfoByIndex = function (index) {
        return this._guillRoleSkillInfo[index];
    };
    Guild.prototype.getGuildMembersByIndex = function (index) {
        return this._guildMembers[index];
    };
    Guild.prototype.getGuildTaskInfosByIndex = function (index) {
        return this.guildTaskInfos.getItemAt(index);
    };
    Guild.prototype.getBuildingLevels = function (index) {
        if (index === void 0) { index = -1; }
        return index == -1 ? this._buildingLevels : this._buildingLevels[index];
    };
    Guild.prototype.getConCount = function (index) {
        if (index === void 0) { index = -1; }
        return index == -1 ? this._conCount : this._conCount[index];
    };
    Guild.prototype.sendGuildInfo = function () {
        this.sendBaseProto(1);
    };
    Guild.prototype.postGuildInfo = function (bytes) {
        this._buildingLevels = [];
        if (bytes.readByte() == 1) {
            this.guildID = bytes.readUnsignedInt();
            this.guildName = bytes.readString();
            var len = bytes.readUnsignedByte();
            for (var index = 0; index < len; index++) {
                this._buildingLevels.push(bytes.readUnsignedByte());
            }
            this.money = bytes.readInt();
            this.notice = bytes.readString();
            this.doAddGuildlimit(bytes);
            this.guildLv = this._buildingLevels[0];
            this.sendGuildMembers();
            this.sendGuildSkillInfo();
            this.postUpdateFire(bytes);
            this.changeNameNum = bytes.readInt();
            return [this.guildID, this.guildName];
        }
        return false;
    };
    Guild.prototype.sendGuildMembers = function () {
        this.sendBaseProto(2);
    };
    Guild.prototype.postGuildMembers = function (bytes) {
        var len = bytes.readInt();
        this._guildMembers = [];
        for (var index = 0; index < len; index++) {
            var info = new GuildMemberInfo;
            info.roleID = bytes.readInt();
            info.name = bytes.readString();
            info.office = bytes.readUnsignedByte();
            info.job = bytes.readUnsignedByte();
            info.sex = bytes.readUnsignedByte();
            info.vipLevel = bytes.readInt();
            info.monthCard = bytes.readUnsignedByte();
            info.contribution = bytes.readInt();
            info.curContribution = bytes.readInt();
            info.attack = bytes.readDouble();
            info.downTime = bytes.readUnsignedInt();
            info.level = bytes.readInt();
            info.zsLevel = bytes.readInt();
            this._guildMembers.push(info);
        }
    };
    Guild.prototype.sendGuildList = function (page, num) {
        this.sendBaseProto(3);
    };
    Guild.prototype.postGuildList = function (bytes) {
        this.guildListInfos = [];
        var len = bytes.readInt();
        for (var i = 0; i < len; i++) {
            var info = new GuildListInfo;
            info.guildRank = i + 1;
            info.guildID = bytes.readUnsignedInt();
            info.guildLevel = bytes.readUnsignedByte();
            info.commentLv = bytes.readUnsignedByte();
            info.guildMember = bytes.readInt();
            info.guildName = bytes.readString();
            info.guildPresident = bytes.readString();
            info.attr = bytes.readInt();
            this.guildListInfos.push(info);
        }
    };
    Guild.prototype.sendGuildCreate = function (id, name) {
        var bytes = this.getBytes(4);
        bytes.writeByte(id);
        bytes.writeString(name);
        this.sendToServer(bytes);
    };
    Guild.prototype.postGuildCreate = function (bytes) {
        var result = bytes.readUnsignedByte();
        if (result == 0) {
            this.guildID = bytes.readUnsignedInt();
            ViewManager.ins().close(GuildCreateWin);
            ViewManager.ins().close(GuildApplyWin);
            ViewManager.ins().open(GuildMap);
            UserTips.ins().showTips("公会创建成功");
            this.sendGuildInfo();
            return true;
        }
        return false;
    };
    Guild.prototype.sendQuitGuild = function () {
        this.sendBaseProto(5);
    };
    Guild.prototype.sendJoinGuild = function (guildID) {
        var bytes = this.getBytes(6);
        bytes.writeInt(guildID);
        this.sendToServer(bytes);
    };
    Guild.prototype.postJoinGuild = function (bytes) {
        this.hasApply = true;
    };
    Guild.prototype.sendApplyInfos = function () {
        this.sendBaseProto(7);
    };
    Guild.prototype.postApplyInfos = function (bytes) {
        var len = bytes.readInt();
        var applyPlayers = [];
        for (var index = 0; index < len; index++) {
            var info = new GuildApplyInfo;
            info.roleID = bytes.readInt();
            info.vipLevel = bytes.readInt();
            info.job = bytes.readUnsignedByte();
            info.sex = bytes.readUnsignedByte();
            info.attack = bytes.readDouble();
            info.name = bytes.readString();
            applyPlayers.push(info);
        }
        this.hasApply = len > 0;
        return applyPlayers;
    };
    Guild.prototype.sendProcessJoin = function (joinId, b) {
        var bytes = this.getBytes(8);
        bytes.writeInt(joinId);
        bytes.writeByte(b);
        this.sendToServer(bytes);
    };
    Guild.prototype.postProcessJoin = function (bytes) {
        var guildID = bytes.readUnsignedInt();
        var result = bytes.readUnsignedByte();
        var applyGuilds = this.applyGuilds;
        var index = applyGuilds.indexOf(guildID);
        if (index != -1 && result == 0) {
            applyGuilds.splice(index, 1);
        }
        if (result == 1)
            return true;
        return false;
    };
    Guild.prototype.sendChangeOffice = function (roleID, guildOffice) {
        var bytes = this.getBytes(9);
        bytes.writeInt(roleID);
        bytes.writeByte(guildOffice);
        this.sendToServer(bytes);
    };
    Guild.prototype.doChangeOffice = function (bytes) {
        var roleID = bytes.readInt();
        var newOffice = bytes.readUnsignedByte();
        for (var index = 0; index < this._guildMembers.length; index++) {
            var element = this.getGuildMembersByIndex(index);
            if (element.roleID == roleID) {
                element.office = newOffice;
                return;
            }
        }
    };
    Guild.prototype.sendDemise = function () {
        this.sendBaseProto(10);
    };
    Guild.prototype.sendKick = function (roleID) {
        var bytes = this.getBytes(11);
        bytes.writeInt(roleID);
        this.sendToServer(bytes);
    };
    Guild.prototype.postQuitGuild = function (bytes) {
        var roleID = bytes.readInt();
        if (roleID == Actor.actorID) {
            this.clearGuildInfo();
            ViewManager.ins().close(GuildWin);
            ViewManager.ins().close(GuildMap);
            return true;
        }
        return false;
    };
    Guild.prototype.doUpdateGuildInfo = function (bytes) {
        var flag = bytes.readUnsignedByte();
        switch (flag) {
            case 1:
                break;
            case 2:
                this.sendGuildInfo();
                break;
            case 3:
                this.sendGuildMembers();
                break;
            case 4:
                break;
            case 5:
                this.sendApplyInfos();
                break;
            case 6:
                break;
        }
    };
    Guild.prototype.sendCon = function (type) {
        var bytes = this.getBytes(13);
        bytes.writeInt(type);
        this.sendToServer(bytes);
    };
    Guild.prototype.postGuildMoney = function (bytes) {
        this.money = bytes.readInt();
    };
    Guild.prototype.sendChangeNotice = function (text) {
        var bytes = this.getBytes(14);
        bytes.writeString(text);
        this.sendToServer(bytes);
    };
    Guild.prototype.postChangeNotice = function (bytes) {
        var resule = bytes.readUnsignedByte();
        if (resule == 0) {
            this.notice = bytes.readString();
        }
    };
    Guild.prototype.sendGuildSkillInfo = function () {
        this.sendBaseProto(15);
    };
    Guild.prototype.doGuildSkillInfo = function (bytes) {
        var len = bytes.readUnsignedByte();
        this._guillRoleSkillInfo = [];
        for (var index = 0; index < len; index++) {
            var roleSkillInfo = new GuildRoleSkillInfo;
            var len2 = bytes.readUnsignedByte();
            for (var j = 0; j < len2; j++) {
                var skillInfo = new GuildSkillInfo;
                skillInfo.level = bytes.readInt();
                roleSkillInfo.guildSkillInfo.push(skillInfo);
            }
            len2 = bytes.readUnsignedByte();
            for (var k = 0; k < len2; k++) {
                var element = len2[k];
                var skillInfo = new GuildSkillInfo;
                skillInfo.level = bytes.readInt();
                skillInfo.exp = bytes.readInt();
                roleSkillInfo.practiceSkillInfo.push(skillInfo);
            }
            this._guillRoleSkillInfo.push(roleSkillInfo);
        }
        this.postGuildSkillInfo();
    };
    Guild.prototype.postGuildSkillInfo = function () {
    };
    Guild.prototype.sendLearnGuildSkill = function (roleID, skillID) {
        var bytes = this.getBytes(16);
        bytes.writeShort(roleID);
        bytes.writeByte(skillID);
        this.sendToServer(bytes);
    };
    Guild.prototype.postLearnGuildSkill = function (bytes) {
        var roleID = bytes.readShort();
        var skillID = bytes.readUnsignedByte();
        this.getSkllInfoByIndex(roleID).guildSkillInfo[skillID - 1].level = bytes.readInt();
        this.postGuildSkillInfo();
        UserTips.ins().showTips("升级成功");
    };
    Guild.prototype.sendPracticeGuildSkill = function (roleID, skillID) {
        var bytes = this.getBytes(18);
        bytes.writeShort(roleID);
        bytes.writeByte(skillID);
        this.sendToServer(bytes);
    };
    Guild.prototype.doPracticeGuildSkill = function (bytes) {
        var roleID = bytes.readShort();
        var skillID = bytes.readUnsignedByte();
        this.getSkllInfoByIndex(roleID).practiceSkillInfo[skillID - 1].level = bytes.readInt();
        this.getSkllInfoByIndex(roleID).practiceSkillInfo[skillID - 1].exp = bytes.readInt();
        var add = bytes.readInt();
        this.postGuildSkillInfo();
        UserTips.ins().showTips("|C:0x23CA23&T:\u4FEE\u70BC\u503C +" + add + "|");
    };
    Guild.prototype.sendUpBuilding = function (buildType) {
        var bytes = this.getBytes(17);
        bytes.writeByte(buildType);
        this.sendToServer(bytes);
    };
    Guild.prototype.postUpBuilding = function (bytes) {
        var type = bytes.readByte();
        this._buildingLevels[type - 1] = bytes.readByte();
        this.guildLv = this._buildingLevels[0];
    };
    Guild.prototype.doGuildTaskInfos = function (bytes) {
        this.guildTaskInfos.removeAll();
        this.initTaskInfos();
        var source = [];
        var len = bytes.readInt();
        for (var index = 0; index < len; index++) {
            var element = new GuildTaskInfo();
            element.taskID = bytes.readInt();
            element.param = bytes.readInt();
            element.state = bytes.readInt();
            element.stdTask = GlobalConfig.GuildTaskConfig[element.taskID];
            this.guildTaskInfos.addItem(element);
        }
        this.updateTaskList();
    };
    Guild.prototype.postGuildTaskUpdate = function () {
    };
    Guild.prototype.doGuildTaskUpdate = function (bytes) {
        var id = bytes.readInt();
        var param = bytes.readInt();
        var state = bytes.readInt();
        for (var i = 0; i < this.guildTaskInfos.length; i++) {
            var element = this.guildTaskInfos.getItemAt(i);
            if (element && element.taskID == id) {
                element.param = param;
                element.state = state;
                break;
            }
        }
        this.updateTaskList();
    };
    Guild.prototype.updateTaskList = function () {
        var source = this.guildTaskInfos.source;
        for (var i = source.length - 1; i >= 0; i--) {
            if (source[i].stdTask.type == 0)
                source.splice(i, 1);
        }
        source.sort(this.taskInfosSortFunc);
        this.guildTaskInfos.replaceAll(source);
        this.postGuildTaskUpdate();
    };
    Guild.prototype.sendGetTaskAward = function (taskID) {
        var bytes = this.getBytes(21);
        bytes.writeByte(taskID);
        this.sendToServer(bytes);
    };
    Guild.prototype.sendManageList = function () {
        this.sendBaseProto(22);
    };
    Guild.prototype.postManageList = function (bytes) {
        this.records = [];
        var count = bytes.readInt();
        for (var i = 0; i < count; i++) {
            this.parserManage(bytes);
        }
    };
    Guild.prototype.doManage = function (bytes) {
    };
    Guild.prototype.sendConCount = function () {
        this.sendBaseProto(24);
    };
    Guild.prototype.postConCount = function (bytes) {
        var count = bytes.readUnsignedByte();
        for (var i = 0; i < count; i++) {
            this._conCount[i] = bytes.readInt();
        }
    };
    Guild.prototype.sendMyGuildInfo = function () {
        this.sendBaseProto(25);
    };
    Guild.prototype.postMyGuildInfo = function (bytes) {
        this.myCon = bytes.readInt();
        this.myTotalCon = bytes.readInt();
        this.myOffice = bytes.readUnsignedByte();
    };
    Guild.prototype.sendGuildMessage = function (str) {
        var bytes = this.getBytes(26);
        bytes.writeString(str);
        this.sendToServer(bytes);
        ReportData.getIns().reportChat(str, 6);
    };
    Guild.prototype.doGuildMessage = function (bytes) {
        var element = new GuildMessageInfo();
        element.parserMessage(bytes);
        if (Friends.ins().indexOfBlackList(element.roleId) == -1) {
            if (this.guildMessageInfoData.length >= 50) {
                var msg = this.guildMessageInfoData.removeItemAt(0);
                Chat.ins().removeAllChatMsg(msg);
            }
            this.guildMessageInfoData.addItem(element);
            Chat.ins().insertAllChatMsg(element);
            Chat.ins().postNewChatMsg(element);
            if (element.type == 1 && element.roleId != Actor.actorID) {
                this.hasNewMsg = true;
            }
        }
        if (element.type == 1) {
            var msg = new ChatInfoData(null);
            msg.name = element.name;
            msg.type = 7;
            msg.str = element.content;
            Chat.ins().postNewChatMsg(msg);
        }
        if (element.type == 2) {
            this.postGuildBossHaveRelive(true, element.content);
        }
    };
    Guild.prototype.postGetNewGuildMessage = function (ele) {
        return ele;
    };
    Guild.prototype.postGuildBossHaveRelive = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return params;
    };
    Guild.prototype.sendAllGuildMessage = function () {
        if (!this.isFirstGetMessageInfo) {
            return;
        }
        this.isFirstGetMessageInfo = false;
        this.sendBaseProto(27);
    };
    Guild.prototype.postAllGuildMessage = function (bytes) {
        this.guildMessageInfoData.removeAll();
        var len = bytes.readInt();
        for (var index = 0; index < len; index++) {
            var element = new GuildMessageInfo;
            element.parserMessage(bytes);
            if (Friends.ins().indexOfBlackList(element.roleId) == -1) {
                this.guildMessageInfoData.addItem(element);
                Chat.ins().insertAllChatMsg(element);
            }
        }
        if (this.guildMessageInfoData.length) {
            Chat.ins().postNewChatMsg(this.guildMessageInfoData.getItemAt(this.guildMessageInfoData.length - 1));
        }
    };
    Guild.prototype.sendAddGuildLimit = function (auto, attr) {
        var bytes = this.getBytes(28);
        bytes.writeByte(auto);
        bytes.writeInt(attr);
        this.sendToServer(bytes);
    };
    Guild.prototype.doAddGuildlimit = function (bytes) {
        this.isAuto = bytes.readUnsignedByte();
        this.attrLimit = bytes.readInt();
    };
    Guild.prototype.sendToFire = function (count, itemCount) {
        var bytes = this.getBytes(30);
        bytes.writeShort(count);
        this.sendToServer(bytes);
        this.sendToFireCount.push([count, itemCount]);
    };
    Guild.prototype.postUpdateFire = function (bytes) {
        this.fireDic = this.fireDic || {};
        var fireLvl = bytes.readShort();
        var fireVal = bytes.readInt();
        var isUpdate = this.fireDic.fireLvl != fireLvl || this.fireDic.fireVal != fireVal;
        this.fireDic.fireLvl = fireLvl;
        this.fireDic.fireVal = fireVal;
        if (isUpdate) {
            var conf = GlobalConfig.GuildConfig;
            var item = UserBag.ins().getBagItemById(conf.bonfireItem);
            var count = item ? item.count : 0;
            for (var i = 0; i < this.sendToFireCount.length; i++) {
                if (count == this.sendToFireCount[i][1]) {
                    while (i >= 0) {
                        var v = this.sendToFireCount.shift()[0];
                        UserTips.ins().showCenterTips("\u884C\u4F1A\u603B\u7BDD\u706B\u503C +" + 5 * v + " \u4E2A\u4EBA\u884C\u4F1A\u8D21\u732E +" + 30 * v);
                        i -= 1;
                    }
                    break;
                }
            }
        }
    };
    Guild.prototype.sendGuildChangeName = function (nameStr) {
        var bytes = this.getBytes(31);
        bytes.writeString(nameStr);
        this.sendToServer(bytes);
    };
    Guild.prototype.parserManage = function (bytes) {
        if (!this.records)
            return;
        var str = "";
        var time = DateUtils.getFormatBySecond(DateUtils.formatMiniDateTime(bytes.readUnsignedInt()) * 0.001, 8);
        time = StringUtils.complementByChar(time, 16);
        var type = bytes.readUnsignedByte();
        var param1 = bytes.readInt();
        var param2 = bytes.readInt();
        var param3 = bytes.readInt();
        var name1 = bytes.readString();
        var name2 = bytes.readString();
        switch (type) {
            case 1:
                str = time + "  [" + name1 + "]加入工会";
                break;
            case 2:
                str = time + "  [" + name1 + "]离开工会";
                break;
            case 3:
                str = time + "  [" + name1 + "]被任命副会长";
                break;
            case 4:
                str = time + "  [" + name1 + "]成为新的会长";
                break;
            case 5:
                str = time + "  [" + name1 + "]发起弹劾";
                break;
            case 6:
                str = time + "  [" + name1 + "]公会副本进度首通";
                break;
            case 7:
                str = time + "  [" + name1 + "]捐献了" + param2 + (param1 == 2 ? "元宝" : "金币");
                break;
            case 8:
                str = time + "  [" + name1 + "]把" + GlobalConfig.GuildConfig.buildingNames[param1 - 1] + "升级到" + param2 + "级";
                break;
            case 9:
                var config = GlobalConfig.ItemConfig[param1];
                str = time + "  [" + name1 + "]\u5728\u516C\u4F1A\u5546\u5E97\u83B7\u5F97\u4E86<font color=" + ItemConfig.getQualityColor(config) + ">" + config.name + "</font>";
                break;
            case 10:
                str = time + "  <font color='#35e62d'>公会强盗已经全部击杀</font>";
                break;
            case 11:
                str = time + "  [" + name1 + "]被降职了";
                break;
        }
        this.records.unshift(str);
    };
    Guild.prototype.hasApplys = function () {
        return this.myOffice >= GuildOffice.GUILD_FUBANGZHU && this.hasApply;
    };
    Guild.prototype.clearGuildInfo = function () {
        this.guildID = 0;
        this.guildName = "";
        this.guildListInfos = [];
        this._guildMembers = [];
        this.applyGuilds = [];
        this.pageMax = 1;
        this.hasNewMsg = false;
    };
    Guild.prototype.removeMsgWithId = function (userId) {
        var source = [];
        for (var i = 0; i < this.guildMessageInfoData.length; i++) {
            var msgInfo = this.guildMessageInfoData.getItemAt(i);
            if (msgInfo.roleId != userId) {
                source.push(msgInfo);
            }
        }
        this.guildMessageInfoData.source = source;
        this.guildMessageInfoData.refresh();
    };
    Guild.prototype.initTaskInfos = function () {
        if (this.guildTaskInfos != null) {
            return;
        }
        var infoList = [];
        var dp = GlobalConfig.GuildTaskConfig;
        for (var key in dp) {
            if (dp.hasOwnProperty(key)) {
                var gtc = dp[key];
                var element = new GuildTaskInfo;
                element.taskID = gtc.id;
                element.param = 0;
                element.state = 0;
                element.stdTask = gtc;
                infoList.push(element);
            }
        }
        this.guildTaskInfos.replaceAll(infoList);
    };
    Guild.prototype.taskInfosSortFunc = function (aConfig, bConfig) {
        if (aConfig.state == bConfig.state) {
            if (aConfig.taskID < bConfig.taskID)
                return -1;
            if (aConfig.taskID > bConfig.taskID)
                return 1;
            return 0;
        }
        if (aConfig.state == 2)
            return 1;
        if (bConfig.state == 2)
            return -1;
        if (aConfig.state != 2 && bConfig.state != 2) {
            if (aConfig.taskID < bConfig.taskID)
                return -1;
            if (aConfig.taskID > bConfig.taskID)
                return 1;
        }
        return 0;
    };
    Guild.prototype.getMemberNum = function () {
        return this._guildMembers.length;
    };
    Guild.prototype.getGuildMembers = function (sortType) {
        if (sortType == 0 || this._memberSortType == sortType)
            return this._guildMembers;
        if (sortType == 1)
            return this._guildMembers.sort(this.memberSortFunc);
        if (sortType == 2)
            return this._guildMembers.sort(this.memberSortFunc2);
        return this._guildMembers;
    };
    Guild.prototype.getOfficeNum = function (office) {
        var len = this._guildMembers.length;
        var num = 0;
        for (var index = 0; index < len; index++) {
            var element = this._guildMembers[index];
            if (element.office == office)
                num++;
        }
        return num;
    };
    Guild.prototype.canAppointFHZ = function () {
        return this.getOfficeNum(GuildOffice.GUILD_FUBANGZHU) < GlobalConfig.GuildConfig.posCounts[this.guildLv - 1][1];
    };
    Guild.prototype.memberSortFunc = function (aInfo, bInfo) {
        if (aInfo.office > bInfo.office)
            return -1;
        if (aInfo.office < bInfo.office)
            return 1;
        if (aInfo.office == bInfo.office) {
            if (aInfo.contribution == bInfo.contribution)
                return 0;
            return aInfo.contribution > bInfo.contribution ? -1 : 1;
        }
        return 0;
    };
    Guild.prototype.memberSortFunc2 = function (aInfo, bInfo) {
        if (aInfo.curContribution == bInfo.curContribution)
            return 0;
        return aInfo.curContribution > bInfo.curContribution ? -1 : 1;
    };
    Guild.prototype.checkIsInGuild = function (id) {
        for (var k in this._guildMembers) {
            var info = this._guildMembers[k];
            if (info.roleID == id) {
                return true;
            }
        }
        return false;
    };
    Guild.prototype.startCheckShow = function () {
        if (GuildWar.ins().getModel().checkinAppoint()) {
            ViewManager.ins().closeTopLevel();
            ViewManager.ins().open(GuildWarUiInfo);
        }
        else {
            ViewManager.ins().close(GuildWarUiInfo);
        }
    };
    Guild.prototype.isUpGradeBuilding = function () {
        if (Guild.ins().myOffice < GuildOffice.GUILD_FUBANGZHU) {
            return false;
        }
        var buildings = [GuildBuilding.GUILD_HALL, GuildBuilding.GUILD_LIANGONGFANG];
        for (var i = 0; i < buildings.length; i++) {
            var type = buildings[i];
            var curLevel = Guild.ins().getBuildingLevels(type - 1) || 0;
            var glc = GlobalConfig.GuildLevelConfig[type];
            var maxLevel = 0;
            var dp = null;
            var dpNext = null;
            var nextMoney = 0;
            for (var key in glc) {
                if (glc.hasOwnProperty(key)) {
                    var element = glc[key];
                    maxLevel = element.level > maxLevel ? element.level : maxLevel;
                    if (element.level == curLevel)
                        dp = element;
                    if (element.level == curLevel + 1)
                        dpNext = element;
                }
            }
            if (dp || dpNext || (type == GuildBuilding.GUILD_LIANGONGFANG)) {
                if (dpNext && curLevel < maxLevel) {
                    nextMoney = dpNext.upFund;
                }
            }
            if (type == GuildBuilding.GUILD_HALL && curLevel >= maxLevel) {
                continue;
            }
            else if (type != GuildBuilding.GUILD_HALL && curLevel >= Guild.ins().guildLv) {
                continue;
            }
            else if (Guild.ins().money < nextMoney) {
                continue;
            }
            return true;
        }
        return false;
    };
    return Guild;
}(BaseSystem));
__reflect(Guild.prototype, "Guild");
var GameSystem;
(function (GameSystem) {
    GameSystem.guild = Guild.ins.bind(Guild);
})(GameSystem || (GameSystem = {}));
//# sourceMappingURL=Guild.js.map