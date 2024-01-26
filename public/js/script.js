// log(1,2,3...) 美化debug输出，与console.log差不多是打印输了出到控制台的简化命今
var log = function () {
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
};
