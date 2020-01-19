var Request = undefined;
Request = GetRequest();
var channel = Request['channel'];
var token = Request['token'];
var serverPortAry = []
var address = []

var paramObj = {
    httpUrl: 'http://winyso.com/gm/index.php?m=ServerInfo&a=server_list',
    type: 'post',
}
var self = this
this.loading = $.openCustomLoading("数据请求中");
httpRequest(paramObj, function (respondDada) {
    self.loading.hide();
    var _data = JSON.parse(respondDada);
    if (_data.code == 0) {
        for (var i = 0; i < _data.data.length; i++) {
            if (_data.data[i].is_test == 2) {
                self.add_div(_data.data[i])
            }
        }
        var num = localStorage.getItem("selectedIndex")
        if(num){
            document.getElementById("list" + num).className = 'room hot'
        }
        
        // var myScroll = new IScroll('#serverSelect', { scrollX: true, scrollY: true, scrollbars: true });
        // document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
    } else {
        alert(_data.msg);
    }
})


function add_div(data) {
    var div = document.createElement("div");
    div.className = "room boom";
    var num = localStorage.getItem("selectedIndex")
    if (!num) {
        localStorage.setItem("selectedIndex", parseInt(data.server_id));
    }
    div.id = "list" + data.server_id;
    serverPortAry[data.server_id] = data.server_port
    address[data.server_id] = data.database_host
    document.getElementById("scroller").appendChild(div);

    var span = document.createElement('span')
    span.innerHTML = data.server_name
    div.appendChild(span)

    var i = document.createElement('i')
    if(data.server_state == 4){
        i.className = "icon font new"
    }else{
        i.className = "icon font boom"
    }
    div.appendChild(i)

    var _div = document.createElement("div");
    _div.className = "_room";
    div.appendChild(_div)
    _div.onclick = (function (event) {
        var ary = event.target.parentNode.id.split('')
        var ary2 = ary.splice(4)
        var number = ary2.join('')
        if (!number) return
        self.button_onclick(number)
    });
}

function GetRequest() {
    var url = decodeURI(window.location.search); //获取url中"?"符后的字串
    var theRequest = new Object();
    if (url.indexOf("?") != -1) {
        var str = url.substr(1);
        strs = str.split("&");
        for (var i = 0; i < strs.length; i++) {
            theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
        }
    }
    return theRequest;
}

function button_onclick(number) {
    for (var i = 0; i < document.getElementById("scroller").children.length; i++) {
        document.getElementById("scroller").children[i].className = 'room boom';
    }
    document.getElementById("list" + number).className = 'room hot';
    localStorage.setItem("selectedIndex", parseInt(number));
    if (token) {
        var serverPort = serverPortAry[number];
        var srvaddr = address[number];
        var paramObj2 = {
            httpUrl: 'http://winyso.com/gm/index.php?m=Regi&a=channel_login&',
            type: 'post',
            data: {
                token: token,
                channel: channel,
                serverid: number
            }
        }
        var self = this;
        this.loading = $.openCustomLoading("登录中，长时间未响应请刷新网页");
        httpRequest(paramObj2, function (respondDada) {
            self.loading.hide();
            var _data = JSON.parse(respondDada);
            if (_data.code == 0) {
                var arr = window.location.href.split('?');
                var ar = arr[0];
                var paraUrl = ar
                    + "?srvid=" + number
                    + "&user=" + _data.data.username
                    + "&spverify=" + _data.data.password
                    + "&serverid=" + number
                    + "&srvaddr=" + srvaddr
                    + "&srvport=" + serverPort
                var data = {};
                data.id = "eE";
                data.urlParam = paraUrl;
                window.parent.postMessage(data, "*");
            } else {
                alert(_data.msg);
            }
        })
    }

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
        //  httpUrl =  'http://ezz25.com/gm/?m=Regi&a=index&serverid=80&name=test123465&password=123456&ID_card=2121212342342'
        xmlhttp.open("POST", httpUrl, async);
        //发送合适的请求头信息
        xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xmlhttp.send(requestData);
    }
}