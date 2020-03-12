

class Pay extends BaseClass {

    canNoSend: boolean = false;
    timeStar: boolean = true;
    sendNum: number = 0;
	/**
	 * 构造函数
	 */
    public constructor() {
        super();
    }

    public static ins(): Pay {
        return super.ins() as Pay;
    }

    public sendPayStyte(money: number, type: number, yuanbao: number) {
        let self = this
        if (!yuanbao) return
        if (!type) type = 1
        if (self.sendNum == 3) {
            UserTips.ins().showTips(`请求过于频繁，请过段时间在试试`);
            return
        } else {
            if (this.timeStar) {
                this.timeStar = false
                TimerManager.ins().doTimer(20000, 1, () => {
                    // this.show(part, step - 1);
                    self.timeStar = true
                    self.sendNum = 0
                }, this);
            }
        }
        // let url = 'http://ezz25.com/gm/index.php?m=Payment&a=Placeorder'
        let url = window['getChargeUrl']()
        if(!url){
            WarnWin.show("请求地址出错，请重新点击购买按钮", function () { }, this);
            return
        }
        
        url += '&user_id=' + LocationProperty.userID;
        url += '&role_name=' + LocationProperty.userName;
        url += '&role_id=' + LocationProperty.roleID;
        url += '&pay_type=' + type;
        url += '&amount=' + money;
        url += '&gold=' + yuanbao;
        url += '&serverid=' + LocationProperty.serverID;
        
        console.log(LocationProperty.userName)
        Http.ins().send(url, true, false, function (event: egret.Event) {
            self.sendNum++
            var request = <egret.HttpRequest>event.currentTarget;
            let data = JSON.parse(request.response)
            let url = data.data.url;
            if (url) {
                ViewManager.ins().close(WarnWin);
                if (type == 1) {
                    url = url.replace(/&amp;/g, "&")
                } else {
                    url = decodeURIComponent(url)
                }

                console.log(url)
                // if (window['isSafari']()) {
                //     window.open(url)
                //     WarnWin.show("请允许浏览器打开支付弹窗\n  设置->浏览器->阻止弹出窗口(关闭)", function () { }, this);
                // } else {
                //     ViewManager.ins().close(ChargeFirstWin)
                //     window['createIframe'](url)
                    
                // }
                egret.ExternalInterface.call("openURL", url);

            }

            // {"status":1,"info":"\u6dfb\u52a0\u6210\u529f","data":{"order_no":"YYCQ-2019112005-346635","user_id":"111","Payment_return":"{\"code\":98157,\"msg\":\"\\u52a0\\u5bc6\\u9519\\u8bef\"}"},"api_version":1}
        })


    }


}
