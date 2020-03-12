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
var login = (function (_super) {
    __extends(login, _super);
    function login() {
        var _this = _super.call(this) || this;
        _this._updateRoomList = false;
        _this.skinName = "loginWin";
        _this.password.displayAsPassword = true;
        _this.loginBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onTap, _this);
        _this.lastServerBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onTap, _this);
        _this.roomChoose.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onTap, _this);
        _this.roomClose.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onTap, _this);
        _this.zhuceLabel.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onTap, _this);
        _this.closeZhuce.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onTap, _this);
        _this.zhuceBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onTap, _this);
        _this.getRoomList();
        _this.blackBg.visible = true;
        _this.trpInfo.text = '获取服务器列表中...';
        _this.zhuceLabel.visible = false;
        _this.dengluInfo.visible = true;
        _this.zhuceInfo.visible = false;
        var self = _this;
        egret.ExternalInterface.call("getChannel", '');
        egret.ExternalInterface.addCallback("backChannel", function (msg) {
            if (msg) {
                window['setChannel'](msg);
            }
            if (msg == 'zhousi' || msg == 'CQ') {
                self.zhuceLabel.visible = true;
            }
        });
        return _this;
    }
    login.prototype.getRoomList = function () {
        var self = this;
        var url = 'http://cq.58hufen.com/gm/index.php?m=ServerInfo&a=server_list';
        Http.ins().send(url, true, true, function (event) {
            var request = event.currentTarget;
            var data = JSON.parse(request.response);
            var list = data.data;
            var roomListData = [];
            for (var i = 0; i < list.length; i++) {
                if (list[i].is_test == 2) {
                    var listData = {
                        id: list[i].server_id,
                        name: list[i].server_name,
                        port: list[i].server_port,
                        address: list[i].database_host,
                        isNew: false
                    };
                    if (list[i].server_state == 4) {
                        listData.isNew = true;
                    }
                    else {
                        listData.isNew = false;
                    }
                    roomListData.push(listData);
                }
            }
            window['setRoomList'](roomListData);
            self.updateRoomName();
            self.blackBg.visible = false;
        });
    };
    login.prototype.updateRoomName = function () {
        var roomList = window['getRoomList']();
        var data = JSON.parse(egret.localStorage.getItem('serverid'));
        var _account = egret.localStorage.getItem('account');
        var _password = egret.localStorage.getItem('password');
        if (_account) {
            this.account.text = _account;
        }
        if (_password) {
            this.password.text = _password;
        }
        if (data) {
            for (var i = 0; i < roomList.length; i++) {
                if (roomList[i].id == data) {
                    this.roomName.text = roomList[i].name;
                }
            }
        }
        else {
            this.roomName.text = roomList[roomList.length - 1].name;
        }
    };
    login.prototype.onAccountChange = function (e) {
        egret.log(e.target.text);
        var reg = /^\w{6,10}$/;
        if (reg.test(e.target.text)) {
            this.accountTrp.textColor = 0xFFFFFF;
        }
        else {
            this.accountTrp.textColor = 0xFF0202;
        }
    };
    login.prototype.onPasswordChange = function (e) {
        egret.log(e.target.text);
        var reg = /^\w{8,20}$/;
        if (reg.test(e.target.text)) {
            this.passwordTrp.textColor = 0xFFFFFF;
        }
        else {
            this.passwordTrp.textColor = 0xFF0202;
        }
    };
    login.prototype.close = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.loginBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTap, this);
        this.lastServerBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTap, this);
        this.roomChoose.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTap, this);
        this.roomClose.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTap, this);
        this.zhuceLabel.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTap, this);
        this.zhuceBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTap, this);
        this.closeZhuce.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTap, this);
    };
    login.prototype.onTap = function (e) {
        switch (e.currentTarget) {
            case this.roomChoose:
                this.loginpb.visible = false;
                this.roompb.visible = true;
                this.updateRoomList();
                break;
            case this.loginBtn:
                this.loginHandle(1);
                break;
            case this.roomClose:
                this.loginpb.visible = true;
                this.roompb.visible = false;
                break;
            case this.zhuceBtn:
                this.loginHandle(2);
                break;
            case this.zhuceLabel:
                this.dengluInfo.visible = false;
                this.zhuceInfo.visible = true;
                break;
            case this.closeZhuce:
                this.dengluInfo.visible = true;
                this.zhuceInfo.visible = false;
                break;
            case this.lastServerBtn:
                var roomList = window['getRoomList']();
                for (var i = 0; i < roomList.length; i++) {
                    if (roomList[i].name == this.lastServerBtn.label) {
                        egret.localStorage.setItem('serverid', JSON.stringify(roomList[i].id));
                        egret.localStorage.setItem('serverPort', JSON.stringify(roomList[i].port));
                        egret.localStorage.setItem('serverAddress', JSON.stringify(roomList[i].address));
                    }
                }
                this.loginpb.visible = true;
                this.roompb.visible = false;
                this.updateRoomName();
                break;
        }
    };
    login.prototype.initLoginInfo = function (loginView) {
        this.loginView = loginView;
    };
    login.prototype.loginHandle = function (number) {
        if (this.account.text.length == 0) {
            alert('账号不能为空');
            return;
        }
        if (this.password.text.length == 0) {
            alert('密码不能为空');
            return;
        }
        var self = this;
        var name = this.account.text;
        var password = md5.hex_md5(this.password.text);
        var serverid = JSON.parse(egret.localStorage.getItem('serverid'));
        var port = JSON.parse(egret.localStorage.getItem('serverPort'));
        var address = JSON.parse(egret.localStorage.getItem('serverAddress'));
        if (!serverid) {
            alert('请选择服务器');
            return;
        }
        egret.ExternalInterface.call("getChannel", '');
        egret.ExternalInterface.addCallback("backChannel", function (msg) {
            var channel = msg;
            if (channel == 'lx') {
                password = self.password.text;
            }
            var url = '';
            if (number == 1) {
                url = 'http://cq.58hufen.com/gm/index.php?m=Regi&a=channel_reg';
                url += '&name=' + name;
                url += '&password=' + password;
                url += '&serverid=' + serverid;
                url += '&channel=' + channel;
                self.blackBg.visible = true;
                self.trpInfo.text = '登录中...';
            }
            else {
                url = 'http://cq.58hufen.com/gm/index.php?m=Regi&a=index';
                url += '&name=' + name;
                url += '&password=' + password;
                url += '&serverid=' + serverid;
                url += '&channel=' + channel;
            }
            if (url) {
                Http.ins().send(url, true, true, function (event) {
                    var request = event.currentTarget;
                    var data = JSON.parse(request.response);
                    self.blackBg.visible = false;
                    if (data.status == 1) {
                        egret.localStorage.setItem("account", self.account.text);
                        egret.localStorage.setItem("password", self.password.text);
                        if (channel == 'lx') {
                            password = md5.hex_md5(self.password.text);
                        }
                        var info = {
                            srvid: serverid,
                            user: channel + '_' + name,
                            serverid: serverid,
                            spverify: password,
                            srvaddr: address,
                            srvport: port
                        };
                        window['setLoginInfo'](info);
                        if (StageUtils.ins().getStage().$children[3]) {
                            StageUtils.ins().getStage().removeChild(StageUtils.ins().getStage().$children[3]);
                        }
                        self.loginView.login();
                        LocationProperty.init();
                    }
                    else {
                        alert(data.info);
                    }
                });
            }
        });
    };
    login.prototype.updateRoomList = function () {
        var roomList = window['getRoomList']();
        var data = JSON.parse(egret.localStorage.getItem('serverid'));
        if (data) {
            this.serverList.y = 170;
            this.lastServerName.visible = true;
        }
        else {
            this.serverList.y = 100;
            this.lastServerName.visible = false;
        }
        for (var i = 0; i < roomList.length; i++) {
            if (roomList[i].id == data) {
                this.lastServerBtn.label = roomList[i].name;
            }
        }
        if (this._updateRoomList) {
            this.updateRoomListIcon();
            return;
        }
        this._updateRoomList = true;
        for (var i = 0; i < roomList.length; i++) {
            var btn = this.getBtn(roomList[i].name);
            btn.y = 40 * i;
            btn.x = 0;
            if (roomList[i].id == data) {
                btn.currentState = "up";
            }
            if (roomList[i].isNew) {
                btn.icon_new.visible = true;
            }
            else {
                btn.icon_hot.visible = true;
            }
            this.scrollerGroup.addChild(btn);
        }
    };
    login.prototype.getBtn = function (name) {
        var btn = new eui.Button();
        btn.skinName = 'loginList';
        btn.label = name;
        btn.labelDisplay.text = name;
        btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnTouch, this);
        return btn;
    };
    login.prototype.onBtnTouch = function (event) {
        for (var i = 0; i < this.scrollerGroup.$children.length; i++) {
            this.scrollerGroup.$children[i].currentState = 'normal';
        }
        event.target.currentState = 'up';
        var roomList = window['getRoomList']();
        for (var i = 0; i < roomList.length; i++) {
            if (roomList[i].name == event.target.label) {
                egret.localStorage.setItem('serverid', JSON.stringify(roomList[i].id));
                egret.localStorage.setItem('serverPort', JSON.stringify(roomList[i].port));
                egret.localStorage.setItem('serverAddress', JSON.stringify(roomList[i].address));
            }
        }
        this.loginpb.visible = true;
        this.roompb.visible = false;
        this.updateRoomListIcon();
        this.updateRoomName();
    };
    login.prototype.updateRoomListIcon = function () {
        var roomList = window['getRoomList']();
        var data = JSON.parse(egret.localStorage.getItem('serverid'));
        for (var i = 0; i < roomList.length; i++) {
            if (roomList[i].id == data) {
                this.scrollerGroup.$children[i].currentState = "up";
            }
            else {
                this.scrollerGroup.$children[i].currentState = "normal";
            }
            if (roomList[i].isNew) {
                this.scrollerGroup.$children[i].icon_new.visible = true;
                this.scrollerGroup.$children[i].icon_hot.visible = false;
            }
            else {
                this.scrollerGroup.$children[i].icon_hot.visible = true;
                this.scrollerGroup.$children[i].icon_new.visible = false;
            }
        }
    };
    return login;
}(eui.Component));
__reflect(login.prototype, "login");
//# sourceMappingURL=login.js.map