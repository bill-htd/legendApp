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
var RoleMgr = (function (_super) {
    __extends(RoleMgr, _super);
    function RoleMgr() {
        var _this = _super.call(this) || this;
        _this.errorCode = ["",
            "sql错误",
            "用户没登陆",
            "游戏服务没准备好",
            "角色上一次保存数据是否出现异常",
            "客户端选择角色的常规错误",
            "角色名称重复",
            "角色不存在",
            "错误的性别",
            "随机生成的名字已经分配完",
            "客户端上传的角色阵营参数错误",
            "客户端上传的角色职业参数错误",
            "名称无效，名称中包含非法字符或长度不合法",
            "如果玩家是帮主，不能删除该角色，需要玩家退帮",
            "已经登陆到其他服务器",
            "已经超过最大可建角色数量"
        ];
        _this.canEnter = false;
        _this.enterID = -1;
        _this.isFirstEnter = true;
        _this.lastRoleID = -1;
        _this.sysId = PackageID.Login;
        _this.regNetMsg(1, _this.doCheckAccount);
        _this.regNetMsg(2, _this.postCreateRole);
        _this.regNetMsg(4, _this.doRoleList);
        _this.regNetMsg(5, _this.doEnterGame);
        _this.regNetMsg(6, _this.doRandom);
        _this.observe(GameApp.ins().postPerLoadComplete, _this.perCom);
        return _this;
    }
    RoleMgr.ins = function () {
        return _super.ins.call(this);
    };
    RoleMgr.prototype.perCom = function () {
        this.canEnter = true;
        if (this.enterID != -1) {
            this.sendEnterGame(this.enterID);
        }
    };
    RoleMgr.prototype.connectServer = function () {
        this.startBtnEnable(false);
        GameSocket.ins().login(LocationProperty.openID, LocationProperty.password, LocationProperty.srvid, LocationProperty.serverIP, LocationProperty.serverPort);
    };
    RoleMgr.prototype.doCheckAccount = function (bytes) {
        var result = bytes.readByte();
        if (result == 0) {
            var bytes_1 = this.getBytes(4);
            this.sendToServer(bytes_1);
        }
        else {
            this.startBtnEnable(true);
            alert("Connect failed:" + RoleMgr.LONGIN_ERROR_CODE[result]);
            if (result == 3) {
                window["connectError"]();
            }
        }
    };
    RoleMgr.prototype.doRoleList = function (bytes) {
        var id = bytes.readInt();
        LocationProperty.userID = id;
        var code = bytes.readByte();
        if (window['getNative']() != 'web') {
            if (StageUtils.ins().getStage().$children[2]) {
                StageUtils.ins().getStage().$children[2].setProgress(100, '加载完成，进入游戏');
                StageUtils.ins().getStage().removeChild(StageUtils.ins().getStage().$children[2]);
            }
        }
        switch (code) {
            case 0:
                SceneManager.ins().runScene(CreateRoleScene);
                window['showGame']();
                break;
            case 1:
                var roleNum = bytes.readInt();
                var roleArr = [];
                for (var i = 0; i < roleNum; i++) {
                    var role = new SelectRoleData(bytes);
                    roleArr.push(role);
                }
                if (roleNum == 1) {
                    LocationProperty.userName = roleArr[0].name;
                    this.enterID = roleArr[0].id;
                    this.sendEnterGame(roleArr[0].id);
                }
                else if (!this.isFirstEnter && this.lastRoleID != -1) {
                    this.sendEnterGame(this.lastRoleID);
                }
                else {
                    SceneManager.ins().runScene(SelectRoleScene);
                    ViewManager.ins().open(SelectRoleWin, roleArr);
                    window['showGame']();
                }
                break;
        }
    };
    RoleMgr.prototype.sendEnterGame = function (roleID) {
        LocationProperty.roleID = roleID;
        var bytes = this.getBytes(5);
        bytes.writeInt(roleID);
        bytes.writeString(LocationProperty.pf);
        bytes.writeString(LocationProperty.pfid);
        bytes.writeString(LocationProperty.appid);
        this.sendToServer(bytes);
        this.lastRoleID = roleID;
    };
    RoleMgr.prototype.doEnterGame = function (bytes) {
        var result = bytes.readByte();
        switch (result) {
            case 0:
                break;
            case 1:
                if (window['getNative']() != 'web') {
                    if (StageUtils.ins().getStage().$children[2]) {
                        StageUtils.ins().getStage().$children[2].setProgress(100, '加载完成，进入游戏');
                        StageUtils.ins().getStage().removeChild(StageUtils.ins().getStage().$children[2]);
                    }
                }
                KFServerSys.ins().linkingKFState(false);
                SceneManager.ins().runScene(MainScene);
                EntityManager.ins().removeAll();
                Encounter.ins().clearEncounterModel();
                Chat.ins().initData();
                Guild.ins().initData();
                if (this.isFirstEnter) {
                    this.isFirstEnter = false;
                    ReportData.getIns().report("entergame", ReportData.LOAD);
                }
                break;
            default:
                alert("错误码:" + result);
                break;
        }
    };
    RoleMgr.prototype.sendCreateRole = function (roleName, sex, job, head, camp, pf) {
        var bytes = this.getBytes(2);
        bytes.writeString(roleName);
        bytes.writeByte(sex);
        bytes.writeByte(job);
        bytes.writeByte(head);
        bytes.writeString(LocationProperty.pf);
        bytes.writeString(LocationProperty.pfid);
        bytes.writeString(LocationProperty.appid);
        this.sendToServer(bytes);
    };
    RoleMgr.prototype.postCreateRole = function (bytes) {
        var id = bytes.readInt();
        LocationProperty.userID = id;
        var result = bytes.readByte();
        if (result != 0) {
            this.showErrorTips(result);
            return result;
        }
        ReportData.getIns().report("createRole", ReportData.LOAD);
        ReportData.getIns().createRole(id);
        SoundUtil.ins().playEffect(SoundUtil.CREATE_ROLE);
        SoundUtil.ins().delayTime(3000);
        if (!LocationProperty.isFirstLoad || this.canEnter) {
            this.sendEnterGame(id);
            return false;
        }
        this.enterID = id;
        return false;
    };
    RoleMgr.prototype.sendRandomName = function (sex) {
        var bytes = this.getBytes(6);
        bytes.writeByte(sex);
        this.sendToServer(bytes);
    };
    RoleMgr.prototype.doRandom = function (bytes) {
        var result = bytes.readByte();
        if (result == 0) {
            var sex = bytes.readByte();
            var name_1 = bytes.readUTF();
            this.setName(name_1);
        }
    };
    RoleMgr.prototype.startBtnEnable = function (value) {
        if (this.startGameView)
            this.startGameView.start.enabled = value;
    };
    Object.defineProperty(RoleMgr.prototype, "startGameView", {
        get: function () {
            return ViewManager.ins().getView(StartGameView);
        },
        enumerable: true,
        configurable: true
    });
    RoleMgr.prototype.setName = function (str) {
        this.createRoleView.setName(str);
    };
    Object.defineProperty(RoleMgr.prototype, "createRoleView", {
        get: function () {
            return ViewManager.ins().getView(CreateRoleView);
        },
        enumerable: true,
        configurable: true
    });
    RoleMgr.prototype.showErrorTips = function (result) {
        if (result == 0)
            return;
        UserTips.ins().showTips(this.errorCode[Math.abs(result)]);
    };
    RoleMgr.LONGIN_ERROR_CODE = [
        "",
        "密码错误",
        "没有这个账号",
        "账号已登录，请刷新页面，最长需等待3分钟后重新登录",
        "服务器忙",
        "服务器维护中",
        "Session服务器出错，可能数据库没连接好",
        "不存在这个服务器",
        "账号已纳入防沉迷系统，是否需要进行身份证信息填写？"
    ];
    return RoleMgr;
}(BaseSystem));
__reflect(RoleMgr.prototype, "RoleMgr");
var GameSystem;
(function (GameSystem) {
    GameSystem.roleMgr = RoleMgr.ins.bind(RoleMgr);
})(GameSystem || (GameSystem = {}));
//# sourceMappingURL=RoleMgr.js.map