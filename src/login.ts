class login extends eui.Component {

    private account: eui.EditableText;

    private password: eui.EditableText;
    private roomName: eui.Label;
    private loginBtn: eui.Group;
    private roomChoose: eui.Group;
    private accountTrp: eui.Label;
    private passwordTrp: eui.Label;

    private roomClose: eui.Image;
    private loginpb: eui.Group;
    private roompb: eui.Group;

    private lastServerName: eui.Group;
    private serverList: eui.Group;
    private lastServerBtn: eui.Button;


    private scrollerGroup: eui.Group;

    private _updateRoomList: Boolean = false;
    public loginView: LoadingUI;

    private blackBg: eui.Group;
    private trpInfo: eui.Label;


    private zhuceInfo: eui.Group;
    private dengluInfo: eui.Group;
    private zhuceBtn: eui.Button;
    private closeZhuce: eui.Image;
    private zhuceLabel: eui.Label;


    public constructor() {
        super();

        this.skinName = "loginWin";
        this.password.displayAsPassword = true;
        // this.password.addEventListener(egret.Event.CHANGE, this.onPasswordChange, this);
        // this.account.addEventListener(egret.Event.CHANGE, this.onAccountChange, this);
        this.loginBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTap, this);
        this.lastServerBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTap, this);
        this.roomChoose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTap, this);
        this.roomClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTap, this);

        this.zhuceLabel.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTap, this);
        this.closeZhuce.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTap, this);
        this.zhuceBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTap, this);


        this.getRoomList();
        this.blackBg.visible = true
        this.trpInfo.text = '获取服务器列表中...'

        
        this.zhuceLabel.visible = false
        this.dengluInfo.visible = true
        this.zhuceInfo.visible = false
        let self = this
        egret.ExternalInterface.call("getChannel", '');
        egret.ExternalInterface.addCallback("backChannel", function (msg) {
            if(msg == 'zhousi'){
                self.zhuceLabel.visible = true
            }
        })
    }

	/*
	 	 存：egret.localStorage.setItem('test', JSON.stringify(data));
		 取：var data = JSON.parse(<string>egret.localStorage.getItem('test'));
		 删：egret.localStorage.removeItem('test');
		 清空所有:egret.localStorage.clear();

	 */
    private getRoomList() {
        let self = this;
        let url = 'http://winyso.com/gm/index.php?m=ServerInfo&a=server_list'
        Http.ins().send(url, true, true, function (event: egret.Event) {
            var request = <egret.HttpRequest>event.currentTarget;
            let data = JSON.parse(request.response)
            let list = data.data
            let roomListData = []
            // console.log(list)
            for (let i = 0; i < list.length; i++) {
                if (list[i].is_test == 2) {
                    // 正式服
                    let listData = {
                        id: list[i].server_id,
                        name: list[i].server_name,
                        port: list[i].server_port,
                        address: list[i].database_host,
                        isNew: false
                    }
                    if (list[i].server_state == 4) {
                        listData.isNew = true
                    } else {
                        listData.isNew = false
                    }
                    roomListData.push(listData)
                }
            }

            // console.log('保存的列表 : ')
            // console.log(roomListData)

            window['setRoomList'](roomListData)
            self.updateRoomName()
            self.blackBg.visible = false
        })
    }

    private updateRoomName() {
        let roomList = window['getRoomList']()
        var data = JSON.parse(<string>egret.localStorage.getItem('serverid'));
        if (data) {
            for (let i = 0; i < roomList.length; i++) {
                if (roomList[i].id == data) {
                    this.roomName.text = roomList[i].name
                }
            }
        }
    }

    private onAccountChange(e: egret.Event) {
        egret.log(e.target.text);
        var reg = /^\w{6,10}$/;
        if (reg.test(e.target.text)) {
            //通过，增加ok样式
            this.accountTrp.textColor = 0xFFFFFF;
        } else {
            //不通过，增加error样式
            this.accountTrp.textColor = 0xFF0202;
        }
    }

    private onPasswordChange(e: egret.Event) {
        egret.log(e.target.text);
        var reg = /^\w{8,20}$/;
        if (reg.test(e.target.text)) {
            //通过，增加ok样式
            this.passwordTrp.textColor = 0xFFFFFF;
        } else {
            //不通过，增加error样式
            this.passwordTrp.textColor = 0xFF0202;
        }
    }

    public close(...param: any[]): void {
        this.loginBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTap, this);
        this.lastServerBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTap, this);
        this.roomChoose.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTap, this);
        this.roomClose.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTap, this);


        this.zhuceLabel.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTap, this);
        this.zhuceBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTap, this);
        this.closeZhuce.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTap, this);

    }

    private onTap(e: egret.TouchEvent): void {
        switch (e.currentTarget) {
            case this.roomChoose:
                this.loginpb.visible = false
                this.roompb.visible = true
                this.updateRoomList()
                break;
            case this.loginBtn:
                this.loginHandle(1)
                break;
            case this.roomClose:
                // this.loginHandle()   
                this.loginpb.visible = true
                this.roompb.visible = false

                break;
            case this.zhuceBtn:
                this.loginHandle(2)
                break;
            case this.zhuceLabel:
                this.dengluInfo.visible = false
                this.zhuceInfo.visible = true

                break;
            case this.closeZhuce:
                this.dengluInfo.visible = true
                this.zhuceInfo.visible = false
                break;
            case this.lastServerBtn:
                let roomList = window['getRoomList']()
                for (let i = 0; i < roomList.length; i++) {
                    if (roomList[i].name == this.lastServerBtn.label) {
                        egret.localStorage.setItem('serverid', JSON.stringify(roomList[i].id));
                        egret.localStorage.setItem('serverPort', JSON.stringify(roomList[i].port));
                        egret.localStorage.setItem('serverAddress', JSON.stringify(roomList[i].address));
                    }
                }

                this.loginpb.visible = true
                this.roompb.visible = false
                this.updateRoomName()
                break;
        }
    }

    public initLoginInfo(loginView) {
        this.loginView = loginView
    }
    private loginHandle(number) {

        // if (StageUtils.ins().getStage().$children[3]) {
        //     StageUtils.ins().getStage().removeChild(StageUtils.ins().getStage().$children[3])
        // }
        // this.loginView.login()
        // return
        // var reg = /^\w{6,10}$/;
        // var reg2 = /^\w{8,20}$/;
        // if (!reg.test(this.accountTrp.text) || !reg2.test(this.passwordTrp.text)) {
        //     alert('格式错误，请重新输入')
        //     return
        // }
        if (this.account.text.length == 0) {
            alert('账号不能为空')
            return
        }
        if (this.password.text.length == 0) {
            alert('密码不能为空')
            return
        }
        let self = this
        let name = this.account.text;
        let password = md5.hex_md5(this.password.text);
        let serverid = JSON.parse(<string>egret.localStorage.getItem('serverid'));
        let port = JSON.parse(<string>egret.localStorage.getItem('serverPort'));
        let address = JSON.parse(<string>egret.localStorage.getItem('serverAddress'));

        if (!serverid) {
            alert('请选择服务器')
            return
        }
        egret.ExternalInterface.call("getChannel", '');
        egret.ExternalInterface.addCallback("backChannel", function (msg) {
            // let msg = 'lx'
            let channel = msg;
            let url = ''
            if (number == 1) {
                url = 'http://winyso.com/gm/index.php?m=Regi&a=channel_reg'
                url += '&name=' + name;
                url += '&password=' + password;
                url += '&serverid=' + serverid;
                url += '&channel=' + channel;

                self.blackBg.visible = true
                self.trpInfo.text = '登录中...'
            } else {
                url = 'http://winyso.com/gm/index.php?m=Regi&a=index'
                url += '&name=' + name;
                url += '&password=' + password;
                url += '&serverid=' + serverid;
                url += '&channel=' + channel;
            }



            if (url) {
                Http.ins().send(url, true, true, function (event: egret.Event) {
                    var request = <egret.HttpRequest>event.currentTarget;
                    let data = JSON.parse(request.response)
                    self.blackBg.visible = false
                    if (data.status == 1) {
                        // 保存信息
                        let info = {
                            srvid: serverid,
                            user: channel + '_' + name,
                            serverid: serverid,
                            spverify: password,
                            srvaddr: address,
                            srvport: port
                        }
                        window['setLoginInfo'](info)

                        //  资源加载完成，删除加载界面
                        if (StageUtils.ins().getStage().$children[3]) {
                            StageUtils.ins().getStage().removeChild(StageUtils.ins().getStage().$children[3])
                        }
                        self.loginView.login()
                        LocationProperty.init()
                    } else {
                        alert(data.info)
                    }

                })
            }


        });




    }


    // ---------------------
    private updateRoomList() {
        let roomList = window['getRoomList']()
        var data = JSON.parse(<string>egret.localStorage.getItem('serverid'));
        if (data) {
            this.serverList.y = 170;
            this.lastServerName.visible = true;
        } else {
            this.serverList.y = 100;
            this.lastServerName.visible = false;
        }
        for (let i = 0; i < roomList.length; i++) {
            if (roomList[i].id == data) {
                this.lastServerBtn.label = roomList[i].name
            }
        }

        if (this._updateRoomList) {
            this.updateRoomListIcon()
            return
        }
        this._updateRoomList = true

        for (let i = 0; i < roomList.length; i++) {
            let btn = this.getBtn(roomList[i].name)
            btn.y = 40 * i;
            btn.x = 0;
            if (roomList[i].id == data) {
                btn.currentState = "up"
            }
            if (roomList[i].isNew) {
                btn.icon_new.visible = true
            } else {
                btn.icon_hot.visible = true
            }
            this.scrollerGroup.addChild(btn)
        }
    }


    private getBtn(name) {
        var btn = new eui.Button();
        btn.skinName = 'loginList';
        btn.label = name;
        btn.labelDisplay.text = name;
        // btn.currentState = "down";
        btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnTouch, this);
        return btn;
    }

    private onBtnTouch(event) {
        for (let i = 0; i < this.scrollerGroup.$children.length; i++) {
            this.scrollerGroup.$children[i].currentState = 'normal'
        }
        event.target.currentState = 'up'
        let roomList = window['getRoomList']()
        for (let i = 0; i < roomList.length; i++) {
            if (roomList[i].name == event.target.label) {
                egret.localStorage.setItem('serverid', JSON.stringify(roomList[i].id));
                egret.localStorage.setItem('serverPort', JSON.stringify(roomList[i].port));
                egret.localStorage.setItem('serverAddress', JSON.stringify(roomList[i].address));
            }
        }

        this.loginpb.visible = true
        this.roompb.visible = false
        this.updateRoomListIcon()
        this.updateRoomName()
    }

    private updateRoomListIcon() {
        let roomList = window['getRoomList']()
        var data = JSON.parse(<string>egret.localStorage.getItem('serverid'));
        for (let i = 0; i < roomList.length; i++) {
            if (roomList[i].id == data) {
                this.scrollerGroup.$children[i].currentState = "up"
            } else {
                this.scrollerGroup.$children[i].currentState = "normal"
            }
            if (roomList[i].isNew) {
                this.scrollerGroup.$children[i].icon_new.visible = true
                this.scrollerGroup.$children[i].icon_hot.visible = false
            } else {
                this.scrollerGroup.$children[i].icon_hot.visible = true
                this.scrollerGroup.$children[i].icon_new.visible = false
            }
        }
    }


}