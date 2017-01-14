# c-templte-1.0 简化版模板引擎
## 快速上手

### 编写模板

使用一个``type="text/html"`` 或者 ``type="text/plain"``的``script``标签存放模板：

	<script id="tpl" type="text/html">
            <!--注释-->
            <p>Today: { date }</p>
            <a href="/{ user.id|safe }">{ user.company }</a>
    </script>
    { user.id|safe }中“|safe” 表示不进行转义

### 渲染模板

    //tpl 可以缓存
    var tpl = new cTemplate(document.getElementById('tpl').innerHTML);
	var data = {
                   date: 20150101,
                   user: {
                       id: 'A-000&001',
                       company: 'AT&T'
                   }
               }
	var s = tpl.render(data);//
	document.body.innerHTML = s;


[参考博客](http://blog.csdn.net/caoyihome/article/details/53697283)