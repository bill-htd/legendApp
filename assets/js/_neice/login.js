
document.getElementById("exdata").value = localStorage.getItem("exdata") || "";
document.getElementById("acount").value = localStorage.getItem("acount") || "";

var serverList = []
var serverPort = 9001;
var address = '';
var serverId = 1;

var paramObj = {
    httpUrl: 'http://ggm27.com/gm?m=ServerInfo&a=server_list',
    type: 'post',
}
var self = this
this.loading = $.openCustomLoading("数据请求中");
httpRequest(paramObj, function (respondDada) {
    self.loading.hide();
    var _data = JSON.parse(respondDada);
    if (_data.code == 0) {
        for (var i = 0; i < _data.data.length; i++) {
            if (_data.data[i].is_test == 1) {
                serverList.push(_data.data[i])
            }
        }

        var num = localStorage.getItem("selectedIndex");
        if (num) {
            for (var j = 0; j < serverList.length; j++) {
                if (serverList[j].server_id == num) {
                    var data = serverList[j]
                    document.getElementById("serverName").innerHTML = data.server_name;
                    serverPort = data.server_port;
                    address = data.database_host;
                    serverId = data.server_id;
                }
            }
        } else {
            var data = serverList[0]
            document.getElementById("serverName").innerHTML = data.server_name;
            serverPort = data.server_port;
            address = data.database_host;
            serverId = data.server_id;
        }


    } else {
        alert(_data.msg);
    }
})

function check_code() {
    //获取账号
    var code = document.getElementById("acount").value;
    //校验其格式(\w字母或数字或下划线)
    var span = document.getElementById("code_msg");
    var reg = /^\w{6,10}$/;
    if (reg.test(code)) {
        //通过，增加ok样式
        span.className = "ok";
        span.innerHTML = '*账号必须为6-10位字母、数字、下划线';
    } else {
        //不通过，增加error样式
        span.className = "error";
        span.innerHTML = '* 账号必须为6-10位字母、数字、下划线';
    }
}

function check_pwd() {
    var code2 = document.getElementById("exdata").value;
    var span2 = document.getElementById("code_msg");
    var reg2 = /^\w{8,20}$/;
    if (reg2.test(code2)) {
        span2.className = "ok";
        span2.innerHTML = '*密码必须为8-10位字母、数字、下划线';
    } else {
        span2.className = "error";
        span2.innerHTML = '*密码必须为8-10位字母、数字、下划线';
    }
}
function button_onclick() {
    var acount = document.getElementById("acount").value;
    var exdata = document.getElementById("exdata").value;
    var reg = /^\w{6,10}$/;
    var reg2 = /^\w{8,20}$/;
    if (!reg.test(acount) || !reg2.test(exdata)) {
        alert('格式错误，请重新输入')
        return
    }
    localStorage.setItem("exdata", exdata);
    localStorage.setItem("acount", acount);
    this.loading = $.openCustomLoading("登录中，长时间未响应请刷新网页");
    var self = this;
    var paramObj2 = {
        httpUrl: 'http://ggm27.com/gm?m=Regi&a=check_user&',
        type: 'post',
        data: {
            name: acount,
            serverid: serverId,
            password: hex_md5(exdata),
        }
    }
    httpRequest(paramObj2, function (respondDada) {
        self.loading.hide();
        var _data = JSON.parse(respondDada);
        if (_data.status == 1) {
            var arr = window.location.href.split('?');
            var ar = arr[0];
            var paraUrl = ar
                + "?srvid=" + serverId
                + "&user=" + acount
                + "&spverify=" + hex_md5(exdata)
                + "&serverid=" + serverId
                + "&srvaddr=" + address
                + "&srvport=" + serverPort;
            var data = {};
            data.id = "eE";
            data.urlParam = paraUrl;
            window.parent.postMessage(data, "*");
            fullScreen();
        } else {
            alert(_data.info);
        }
    })
}
function launchFullscreen() {
    var el = document.documentElement;
    var rfs = el.requestFullScreen || el.webkitRequestFullScreen || el.mozRequestFullScreen || el.msRequestFullscreen;
    if (typeof rfs != "undefined" && rfs) {
        rfs.call(el);
    };
}
function fullScreen() {
    if (!this.isFullScreen()) {
        if (confirm("是否进入全屏？")) {
            launchFullscreen();
        } else {
        }
    }
}
function isFullScreen() {
    return document.isFullScreen || document.mozIsFullScreen || document.webkitIsFullScreen;
}
function httpRequest(paramObj, fun, errFun) {
    var xmlhttp = null;
    /*创建XMLHttpRequest对象，
     *老版本的 Internet Explorer（IE5 和 IE6）使用 ActiveX 对象：new ActiveXObject("Microsoft.XMLHTTP")
     * */
    if (window.XMLHttpRequest) {
        xmlhttp = new XMLHttpRequest();
    } else if (window.ActiveXObject) {
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    /*判断是否支持请求*/
    if (xmlhttp == null) {
        alert('你的浏览器不支持XMLHttp');
        return;
    }
    /*请求方式，并且转换为大写*/
    var httpType = (paramObj.type || 'GET').toUpperCase();
    /*数据类型*/
    var dataType = paramObj.dataType || 'json';
    /*请求接口*/
    var httpUrl = paramObj.httpUrl || '';
    /*是否异步请求*/
    var async = paramObj.async || true;
    /*请求参数--post请求参数格式为：foo=bar&lorem=ipsum*/
    var paramData = paramObj.data || [];
    var requestData = '';
    for (var name in paramData) {
        requestData += name + '=' + paramData[name] + '&';
    }
    requestData = requestData == '' ? '' : requestData.substring(0, requestData.length - 1);

    /*请求接收*/
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            /*成功回调函数*/
            fun(xmlhttp.responseText);
        } else {
            /*失败回调函数*/
            errFun;
        }
    }
    /*接口连接，先判断连接类型是post还是get*/
    if (httpType == 'GET') {
        xmlhttp.open("GET", httpUrl, async);
        xmlhttp.send(null);
    } else if (httpType == 'POST') {
        httpUrl += requestData;
        //  httpUrl =  'http://ggm27.com/gm/?m=Regi&a=index&serverid=80&name=test123465&password=123456&ID_card=2121212342342'
        xmlhttp.open("POST", httpUrl, async);
        //发送合适的请求头信息
        xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xmlhttp.send(requestData);
    }
}
