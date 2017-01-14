!(function(window){
    function Template(tpl) {
        var
            fn,
            match,
            code = ['var r=[];\nvar _html = function (str) { return str.replace(/&/g, \'&amp;\').replace(/"/g, \'&quot;\').replace(/\'/g, \'&#39;\').replace(/</g, \'&lt;\').replace(/>/g, \'&gt;\'); };'],
            re = /\{\s*([a-zA-Z\.\_0-9()]+)(\s*\|\s*safe)?\s*\}/m,
            addLine = function (text) {
                code.push('r.push(\'' + text.replace(/\'/g, '\\\'')
                                            .replace(/\n/g, '\\n')
                                            .replace(/\r/g, '\\r') + '\');');
            };//处理模板中html，转义
        /**
         * 模板中逻辑部分处理
         */
        while (match = re.exec(tpl)) {
            if (match.index > 0) {
                addLine(tpl.slice(0, match.index));
            }
            debugger;
            if (match[2]) {
                code.push('r.push(String(this.' + match[1] + '));');
            }else {
                code.push('r.push(_html(String(this.' + match[1] + ')));');
            }
            tpl = tpl.substring(match.index + match[0].length);
        }
        addLine(tpl);
        code.push('return r.join(\'\');');
        fn = new Function(code.join('\n'));//使代码字符串变可执行函数 code 从数组array为string
        this.render = function (model) {
            return fn.apply(model);//model绑定到this变量上。
        };
    }
    window.cTemplate = Template;
})(window);