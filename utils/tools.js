// utils/tools.js
// tools.typeOf({})

// 创建一个对象来存放工具函数
const tools = {
    // 校验数据类型
    typeOf: function (obj) {
        return Object.prototype.toString.call(obj).slice(8, -1).toLowerCase();
    },
    // 判断是否为 Array 数组
    isArray: function (obj) {
        // return toString.apply(obj) === "[object Array]";
        return this.typeOf(obj) === "array";
    },
    // 判断是否为 Object 对象
    isObject: function (obj) {
        // return Object.prototype.toString.call(obj) === "[object Object]";
        return this.typeOf(obj) === "object";
    },
    // 去掉字符串前后空格
    trim: function (text) {
        return (text || "").replace(/^\s+|\s+$/g, "");
    },
    //  将字符串转为JSON对象或将JSON转为字符串
    JSON: function () {
        var _obj = arguments[0];
        // toString.apply(_obj) js判断对象数组或字符串还是json
        if (typeof _obj === "string") {
            return JSON.parse(_obj); // 将字符串转为JSON对象
        } else {
            return JSON.stringify(_obj); // 将对象返回为字符串
        }
    },
    // 在网页中所有DOM结构绘制加载完毕后就执行的函数。
    ready: function (fn) {
        if (window.document.readyState != "loading") {
            fn();
        } else {
            window.document.addEventListener("DOMContentLoaded", fn);
        }
    },
    // 获取网站根路径(站点及虚拟目录)，获得网站的根目录或虚拟目录的根地址
    getRootPath: function () {
        var url = window.location.href,
            urlarr = url.split("/");
        delete urlarr[urlarr.length - 1];
        return urlarr.join("/");
    },
    // 获取网站主域名根域名
    getDomain: function () {
        var hostname = window.location.hostname;
        var _arr = hostname.match(/(\w+\.\w+)$/);
        return _arr && _arr[0];
    },

    /*
    Cookie操作，获取、设置、删除Cookie
    ----------------------------------
    ps:当有value为设置为空为获取，当expireday小于0时为删除
        FKCookie("token", "del", -1, "/");
        FKCookie('mycooikes'); // 获取名字为mycooikes的cookie
        FKCookie('mycooikes','你的值'); //设置会话Cookie,一旦浏览器关闭，Cookie就失效了。
        FKCookie('mycooikes','你的值',2); //设置定时Cookie，例设定保存2天
 
        高级操作 
        FKCookie('mycooikes','你的值',2,'/'); // 指定与cookie关联的WEB页Path路径
        如果http://www.abc.com/1/新建一个cookie，那么在这个目录里的所有页面和子目录 都可以访问这个cookie。
        但是，页面http://www.abc.com/2/不能访问这个的cookes！ 这时，我们应该吧把cookies 的path属性设置成“/”。
 
        FKCookie('mycooikes','你的值',2,'/'); // 指定关联的WEB服务器或域Domain，这是对path路径属性的一个延伸
        如果我们想让 www.abc.com 能够访问 bbs.abc.com 设置的cookies。
        我们可以把domain属性设置成“.abc.com”，并把path属性设置成“/”。注意不能跨abc.com主域
    */
    FKCookie: function (c_name, value, expireday, path, domain) {
        if (value === undefined) {
            // getCookie
            var COOKIE = window.document.cookie;
            if (COOKIE.length > 0) {
                var c_start = COOKIE.indexOf(c_name + "=");
                if (c_start != -1) {
                    c_start = c_start + c_name.length + 1;
                    var c_end = COOKIE.indexOf(";", c_start);
                    if (c_end == -1) c_end = COOKIE.length;
                    return decodeURIComponent(COOKIE.substring(c_start, c_end));
                }
            }
        } else {
            // setCookie
            var exdate = new Date();
            exdate.setDate(exdate.getDate() + expireday);
            // 这里不能用 COOKIE 变量来进行赋值
            window.document.cookie = c_name + "=" + encodeURIComponent(value) +
                (expireday == null ? "" : "; expires=" + exdate.toGMTString()) +
                (path == null ? "" : "; path=" + path) +
                (domain == null ? "" : "; domain=" + domain);
            return true;
        }
        return undefined;
    },

    // 获取所有Cooike成为对象
    getCookieArray: function (cookiestr) {
        var _cookiestr = cookiestr || window.document.cookie;
        if (!_cookiestr) return {};
        var arr = _cookiestr.split(";");
        var _temp = {};
        for (var i = 0; i < arr.length; i++) {
            var t = arr[i].split("=");
            var key = t[0].replace(/(^\s*)|(\s*$)/g, "");
            var val = t[1];
            _temp[key] = decodeURIComponent(val);
        }
        return _temp;
    },

    // 复制文本到剪切版 成功:true 或 失败:false  执行完函数后，按ctrl + v试试
    copy(text) {
        var textareaEl = document.createElement('textarea');
        textareaEl.setAttribute('readonly', 'readonly'); // 防止手机上弹出软键盘
        textareaEl.value = text;
        document.body.appendChild(textareaEl);
        textareaEl.select();
        var res = document.execCommand('copy');
        document.body.removeChild(textareaEl);
        // console.log("复制成功");
        return res;
    },

    // 防抖 debounce: 从最后一次触发开始，在wait毫秒后执行函数。 因为是最后一次触发，所以会把中间的触发盖掉。
    // 需要赋值才可以用
    debounce(func, wait) {
        let timeout;
        return function () {
            let context = this;
            let args = arguments;
            if (timeout) clearTimeout(timeout);
            timeout = setTimeout(() => {
                func.apply(context, args)
            }, wait);
        }
    },

    // 节流 throttle: 从最初一次触发开始，在wait毫秒后执行函数。 中间无论触发多少次都不会执行。
    // 需要赋值才可以用 
    throttle(func, wait) {
        let previous = 0;
        return function () {
            let now = Date.now();
            let context = this;
            let args = arguments;
            if (now - previous > wait) {
                func.apply(context, args);
                previous = now;
            }
        }
    },

    log() {
        if (arguments.length == 0) return;
        for (var index = 0; index < arguments.length; index++) {
            var element = arguments[index];
            var _type = typeof element;
            if (_type === 'object') {
                console.info(
                    '%c' + index + '.' + _type + '%c' + (toString.apply(element)),
                    'background-color:#606060;color:#fff;border-bottom-left-radius:5px;border-top-left-radius:5px;padding:2px 5px;', 'background-color:#0073b5;color:#fff;color:#fff;border-bottom-right-radius:5px;border-top-right-radius:5px;padding:2px 5px;'
                );
                if (toString.apply(element) === '[object Array]') {
                    console.table(element);
                } else {
                    console.warn(element);
                }
            } else {
                var _bg = "#dd8400";
                if (_type === 'string') _bg = "#00ad2e";
                console.log(
                    '%c' + index + '.' + _type + '%c' + element,
                    'background-color:#606060;color:#fff;border-bottom-left-radius:5px;border-top-left-radius:5px;padding:2px 5px;', 'background-color:' + _bg + ';color:#fff;color:#fff;border-bottom-right-radius:5px;border-top-right-radius:5px;padding:2px 5px;'
                );
            }
        }
    },


};

// 导出工具对象
export default tools;
