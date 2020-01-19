; (function ($) {
    $.fn.customtoast = function (msg) {
        var html = $('<div class="default_toast" style="background: rgba(0,0,0,.8);border-radius: 1rem;color: #fff;padding: .5rem;font-size: 1.2rem;line-height: 1.5;position: fixed;z-index: 11000;width: auto;left: 50%;margin-top: 0;top: 50%;text-align: center;border-radius: .1rem;-webkit-transform: translate3d(0,0,0) scale(1.185);transform: translate3d(0,0,0) scale(1.185);-webkit-transform: translateX(-50%);transform: translateX(-50%)">' + msg + '</div>').appendTo(this);
        var t = setTimeout(function () { $(".default_toast").remove(); clearTimeout(t) }, 1500)
    };
    $.fn.customloading = function (msg) {
        var html = $('<div class="default_loading" style=" position: fixed; z-index: 11000;top: 0;left: 0;bottom: 0;background: rgba(0,0,0,0.7);height: 100%;width: 100%;"><div  style="color: #fff;font-size: 1.2rem;line-height: 1.5;position: absolute;left: 50%;top: 30%;-webkit-transform: translate3d(0,0,0) scale(1.185);transform: translate3d(0,0,0) scale(1.185);-webkit-transform: translateX(-50%);transform: translateX(-50%);"><h5 style = "color:#4f504f">'+msg+'</h5><div id="ddr"><div class="ddr ddr1"></div><div class="ddr ddr2"></div><div class="ddr ddr3"></div><div class="ddr ddr4"></div><div class="ddr ddr5"></div></div></div></div>').appendTo(this);
        return $(".default_loading")
    }; $.extend({
        openToast: function (msg) { $('body').customtoast(msg) },
        openLoading: function () { return $('body').customloading('正在操作。。。。') },
        openCustomLoading: function (msg) { return $('body').customloading(msg) }
    })
})(jQuery)