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
var UserTask = (function (_super) {
    __extends(UserTask, _super);
    function UserTask() {
        var _this = _super.call(this) || this;
        _this.limitTaskList = [];
        _this.limitTaskDic = {};
        _this.limitTaskState = 0;
        _this.limitTaskCount = 0;
        _this.limitTaskEndTime = -1;
        _this.currTaskListsId = -1;
        _this.lastState = -1;
        _this.sysId = PackageID.Task;
        _this.regNetMsg(1, _this.doTaskData);
        _this.regNetMsg(2, _this.doTaskChangeData);
        _this.regNetMsg(3, _this.doVitality);
        _this.regNetMsg(4, _this.doVitalityAwards);
        _this.regNetMsg(5, _this.doAchieveData);
        _this.regNetMsg(7, _this.doJoinAchieveData);
        _this.regNetMsg(8, _this.doAchieveChangeData);
        _this.regNetMsg(9, _this.doLimitDataChange);
        _this.regNetMsg(10, _this.doUpdateLimitData);
        _this.achiEvement = [];
        return _this;
    }
    UserTask.ins = function () {
        return _super.ins.call(this);
    };
    UserTask.prototype.sendGetTask = function (id) {
        var bytes = this.getBytes(1);
        bytes.writeInt(id);
        this.sendToServer(bytes);
    };
    UserTask.prototype.sendGetVitalityAwards = function (id) {
        var bytes = this.getBytes(2);
        bytes.writeInt(id);
        this.sendToServer(bytes);
    };
    UserTask.prototype.sendGetAchieve = function (id) {
        var bytes = this.getBytes(3);
        bytes.writeInt(id);
        this.sendToServer(bytes);
    };
    UserTask.prototype.doTaskData = function (bytes) {
        this.task = [];
        this.vitalityAwards = [];
        var count = bytes.readInt();
        for (var i = 0; i < count; i++) {
            var data = new TaskData;
            data.id = bytes.readInt();
            data.value = bytes.readInt();
            data.state = bytes.readInt();
            this.task.push(data);
        }
        this.vitality = bytes.readInt();
        var awardsCount = bytes.readInt();
        for (var i = 0; i < awardsCount; i++) {
            var awardsData = new VitalityData;
            awardsData.id = bytes.readInt();
            awardsData.state = bytes.readInt();
            this.vitalityAwards.push(awardsData);
        }
        this.sortTask();
    };
    UserTask.prototype.doTaskChangeData = function (bytes) {
        var id = bytes.readInt();
        var data = UserTask.ins().getTaskDataById(id);
        if (ErrorLog.Assert(data, "UserTask  doTaskChangeData id  = " + id)) {
            return;
        }
        data.value = bytes.readInt();
        data.state = bytes.readInt();
        UserTask.ins().sortTask();
        UserTask.ins().postTaskChangeData();
    };
    UserTask.prototype.postTaskChangeData = function () {
    };
    UserTask.prototype.doVitality = function (bytes) {
        this.vitality = bytes.readInt();
    };
    UserTask.prototype.doVitalityAwards = function (bytes) {
        var id = bytes.readInt();
        var data = this.getVitalityAwardsById(id);
        data.state = bytes.readInt();
        UserTask.ins().postTaskChangeData();
    };
    UserTask.prototype.doAchieveData = function (bytes) {
        this.achiEvement.length = 0;
        var count = bytes.readInt();
        for (var i = 0; i < count; i++) {
            var data = new AchievementData;
            data.achievementId = bytes.readInt();
            data.id = bytes.readInt();
            data.state = bytes.readInt();
            data.value = bytes.readInt();
            var cfg = this.getAchieveConfById(data.id);
            if (cfg == null) {
                debug.warn("无法获得成就配置:" + data.id + "，请检查配置");
            }
            else {
                data.achievementType = cfg.achievementType;
            }
            if (data.achievementId == 1000) {
                this.taskTrace = data;
                if (this.taskTrace.id == 100003 && this.taskTrace.state == 0) {
                }
                UserTask.ins().postUpdteTaskTrace();
            }
            else {
                this.achiEvement.push(data);
            }
        }
        this.sortAchiEvement();
        this.postUpdateAchieve();
    };
    UserTask.prototype.getTaskData = function (achievementId, taskId) {
        var count = this.achiEvement.length;
        var data;
        for (var i = 0; i < count; i++) {
            var temp = this.achiEvement[i];
            if (temp.achievementId == achievementId && temp.id == taskId) {
                data = temp;
                break;
            }
        }
        return data;
    };
    UserTask.prototype.getTaskTarget = function (taskId) {
        var target = 0;
        var cfg = this.getAchieveConfById(taskId);
        if (cfg) {
            target = cfg.target;
        }
        return target;
    };
    UserTask.prototype.postUpdateAchieve = function () {
    };
    UserTask.prototype.postUpdteTaskTrace = function () {
    };
    UserTask.prototype.postUpdteLimitTaskData = function (taskData) {
        return taskData;
    };
    UserTask.prototype.postLimitTaskEnd = function () {
    };
    UserTask.prototype.doJoinAchieveData = function (bytes) {
        this.changeAchieve(bytes);
    };
    UserTask.prototype.doAchieveChangeData = function (bytes) {
        this.changeAchieve(bytes);
    };
    UserTask.prototype.doLimitDataChange = function (bytes) {
        var state = bytes.readByte();
        this.limitTaskState = state;
        this.limitTaskCount = 0;
        if (state == 0) {
            this.currTaskListsId = bytes.readInt();
            this.initLimitTaskData(this.currTaskListsId);
        }
        else if (state == 1) {
            this.currTaskListsId = bytes.readInt();
            this.initLimitTaskData(this.currTaskListsId);
            this.limitTaskEndTime = bytes.readInt();
            var config = GlobalConfig.LimitTimeConfig[this.currTaskListsId];
            if (this.currTaskListsId == 1 && config.time == this.limitTaskEndTime) {
                ViewManager.ins().open(LimitStartTipsView);
            }
            this.limitTaskEndTime += Math.floor(GameServer.serverTime / 1000);
            var len = bytes.readShort();
            for (var i = 0; i < len; i++) {
                var id = bytes.readInt();
                this.limitTaskDic[id].parser(bytes);
                if (this.limitTaskDic[id].state == 2)
                    this.limitTaskCount++;
            }
        }
        UserTask.ins().postUpdteLimitTaskData();
    };
    UserTask.prototype.initLimitTaskData = function (id) {
        this.limitTaskList = [];
        this.limitTaskDic = {};
        var config = GlobalConfig.LimitTimeConfig[id];
        for (var k in config.taskIds) {
            var baseData = GlobalConfig.LimitTimeTaskConfig[config.taskIds[k]];
            var item = new LimitTaskData();
            item.setBaseData(baseData);
            this.limitTaskList.push(item);
            this.limitTaskDic[item.id] = item;
        }
    };
    UserTask.prototype.doUpdateLimitData = function (bytes) {
        var id = bytes.readInt();
        var item = this.limitTaskDic[id];
        if (!item) {
            debug.log("限时任务未初始化：" + id);
            return;
        }
        item.parser(bytes);
        if (item.state == 2)
            this.limitTaskCount++;
        UserTask.ins().postUpdteLimitTaskData(item);
    };
    UserTask.prototype.sendGetLimitTask = function () {
        this.sendBaseProto(5);
    };
    UserTask.prototype.sendGetLimitTaskReward = function (id) {
        var bytes = this.getBytes(6);
        bytes.writeInt(id);
        this.sendToServer(bytes);
    };
    UserTask.prototype.changeAchieve = function (bytes) {
        var achievementId = bytes.readInt();
        var data;
        if (achievementId == 1000) {
            data = this.taskTrace;
        }
        else
            data = this.getAchieveDataById(achievementId);
        if (ErrorLog.Assert(data, "UserTask  data is null  achievementId = " + achievementId)) {
            return;
        }
        data.id = bytes.readInt();
        data.state = bytes.readInt();
        data.value = bytes.readInt();
        if (data.achievementId == 1000) {
            UserTask.ins().postUpdteTaskTrace();
        }
        else {
            this.sortAchiEvement();
            UserTask.ins().postTaskChangeData();
        }
    };
    UserTask.prototype.getChengjiuDataByType = function (type) {
        if (this.achiEvement == undefined) {
            Log.trace("通过成就类型获取成就数据  achiEvement = null");
            return;
        }
        var reArr = [];
        for (var i = 0; i < this.achiEvement.length; i++) {
            if (this.achiEvement[i].achievementType == type)
                reArr.push(this.achiEvement[i]);
        }
        return this.sortAchievementAcByType(reArr);
    };
    UserTask.prototype.sortAchievementAcByType = function (reArr) {
        if (reArr) {
            reArr.sort(function (a, b) {
                if (a.state == 2)
                    return 1;
                if (b.state == 2)
                    return -1;
                return b.state - a.state;
            });
        }
        return reArr;
    };
    UserTask.prototype.getAchieveDataById = function (id) {
        if (this.achiEvement == undefined) {
            Log.trace("通过成就类型获取成就数据  achiEvement = null");
            return;
        }
        for (var i = 0; i < this.achiEvement.length; i++) {
            if (this.achiEvement[i].achievementId == id)
                return this.achiEvement[i];
        }
        return null;
    };
    UserTask.prototype.getAchieveByTaskId = function (id) {
        for (var i = 0; i < this.achiEvement.length; i++) {
            if (this.achiEvement[i].id == id)
                return this.achiEvement[i];
        }
        return null;
    };
    UserTask.prototype.getVitalityAwardsById = function (id) {
        for (var i = 0; i < this.vitalityAwards.length; i++) {
            if (this.vitalityAwards[i].id == id)
                return this.vitalityAwards[i];
        }
        return null;
    };
    UserTask.prototype.getTaskDataById = function (id) {
        if (!this.task)
            return null;
        for (var i = 0; i < this.task.length; i++) {
            if (this.task[i].id == id)
                return this.task[i];
        }
        return null;
    };
    UserTask.prototype.getAchieveConfById = function (id) {
        var list = GlobalConfig.AchievementTaskConfig;
        var i;
        for (i in list) {
            var config = list[i];
            if (config.taskId == id)
                return config;
        }
        return null;
    };
    UserTask.prototype.getAwardsConfigById = function (id) {
        var list = GlobalConfig.DailyAwardConfig;
        var i;
        for (i in list) {
            var config = list[i];
            if (config.id == id)
                return config;
        }
        return null;
    };
    UserTask.prototype.getTaskStast = function () {
        if (this.task) {
            var i = void 0;
            for (i = 0; i < this.task.length; i++) {
                if (this.task[i].state == 1) {
                    UserTask.ins().postUpdataTaskPoint(true);
                    return;
                }
            }
            for (i = 0; i < this.vitalityAwards.length; i++) {
                var config = this.getAwardsConfigById(this.vitalityAwards[i].id);
                if (this.vitality >= config.valueLimit && this.vitalityAwards[i].state == 0) {
                    UserTask.ins().postUpdataTaskPoint(true);
                    return;
                }
            }
            for (i = 0; i < this.achiEvement.length; i++) {
                if (this.achiEvement[i].state == 1) {
                    UserTask.ins().postUpdataTaskPoint(true);
                    return;
                }
            }
            UserTask.ins().postUpdataTaskPoint(false);
            return;
        }
    };
    UserTask.prototype.postUpdataTaskPoint = function (bo) {
        return bo;
    };
    UserTask.prototype.sortTask = function () {
        if (this.task.length > 2) {
            this.task.sort(this.sort);
            var state1Task = [];
            for (var i = 0; i < this.task.length; i++) {
                if (this.task[i].state != 0) {
                    state1Task.push(this.task[i]);
                    this.task.splice(i, 1);
                    i--;
                }
            }
            if (state1Task.length > 0)
                this.task = this.task.concat(state1Task);
        }
    };
    UserTask.prototype.sort = function (a, b) {
        var s1 = a.id;
        var s2 = b.id;
        if (s1 < s2)
            return -1;
        else if (s1 > s2)
            return 1;
        else
            return 0;
    };
    UserTask.prototype.sortAchiEvement = function () {
        for (var i = 0; i < this.achiEvement.length; i++) {
            var data = this.achiEvement[i];
            if (data.state == 1) {
                this.achiEvement.splice(i, 1);
                this.achiEvement.unshift(data);
            }
            else if (data.state == 2) {
                this.achiEvement.splice(i, 1);
                this.achiEvement.push(data);
            }
        }
    };
    UserTask.prototype.getIsOpenChengjiu = function () {
        return Actor.level >= 7;
    };
    UserTask.prototype.getIsHaveChengjiuReward = function () {
        if (!this.getIsOpenChengjiu())
            return false;
        var maxTypeDatas = LiLian.ins().chengjiuMaxData();
        for (var _i = 0, maxTypeDatas_1 = maxTypeDatas; _i < maxTypeDatas_1.length; _i++) {
            var type = maxTypeDatas_1[_i];
            var datas = this.getChengjiuDataByType(type);
            if (datas == undefined) {
                Log.trace("是否有成就奖励可领取 datas = null");
                return;
            }
            for (var _a = 0, datas_1 = datas; _a < datas_1.length; _a++) {
                var d = datas_1[_a];
                if (d.state == 1)
                    return true;
            }
        }
        return false;
    };
    UserTask.prototype.getIsHaveChengjiuRewardBytype = function (type) {
        var datas = this.getChengjiuDataByType(type);
        for (var _i = 0, datas_2 = datas; _i < datas_2.length; _i++) {
            var d = datas_2[_i];
            if (d.state == 1)
                return true;
        }
        return false;
    };
    UserTask.prototype.getTaskState = function () {
        var data = UserTask.ins().taskTrace;
        if (data) {
            var config = UserTask.ins().getAchieveConfById(data.id);
            var nextConfig = UserTask.ins().getAchieveConfById(data.id + 1);
            if (!nextConfig && data.state == 2)
                return false;
            else
                return true;
        }
        return false;
    };
    UserTask.prototype.getLimitTaskRed = function () {
        for (var i = 0; i < UserTask.ins().limitTaskList.length; i++) {
            if (UserTask.ins().limitTaskList[i].state == 1) {
                return 1;
            }
        }
        return 0;
    };
    UserTask.prototype.postParabolicItem = function () {
    };
    UserTask.prototype.getLimitTimeId = function (id) {
        for (var k in GlobalConfig.LimitTimeConfig) {
            var cfg = GlobalConfig.LimitTimeConfig[k];
            if (cfg.taskIds.indexOf(id) != -1) {
                return cfg.id;
            }
        }
        return 0;
    };
    return UserTask;
}(BaseSystem));
__reflect(UserTask.prototype, "UserTask");
var GameSystem;
(function (GameSystem) {
    GameSystem.userTask = UserTask.ins.bind(UserTask);
})(GameSystem || (GameSystem = {}));
//# sourceMappingURL=UserTask.js.map