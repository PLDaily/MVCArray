(function() {

	var root = this;

  	var ArrayProto = Array.prototype, ObjProto = Object.prototype, FuncProto = Function.prototype;

  	var nativeIsArray = Array.isArray,

  	/**
  	 * 用于返回当前页面的唯一标识字符串
  	 */
  	var _counter = 1;


	/**
	 * 判断给定的对象是否为数组
	 * @param  {object}  source 要检测的对象
	 * 
	 * @return {Boolean}        如果是数组则为true，不是则为false
	 */
	var isArray = nativeIsArray || function(source) {
        return '[object Array]' === ObjProto.toString.call(source);
	}

	/**
	 * 判断给定的对象是否为数组
	 * @param  {function}  source 要检测的对象
	 * @return {Boolean}        如果是函数则为true，不是则为false
	 */
	var isFunction = function(source) {
        return '[object Function]' == Object.prototype.toString.call(source);
	};

	var MVCArray = function(arr) {
		if(isArray(arr)) return false;
		this.arr = arr;
	}

	/**
	 * 注册时间监听器
	 * @param {string} type    自定义事件名称
	 * @param {functon} handler 自定义事件被触发时的回调函数
	 * @param {[type]} key     [description]
	 * @remark 事件类型区分大小写。如果自定义事件名称不是以小写"on"开头，该方法会给它加上"on"再进行判断，即"click"和"onclick"会被认为是同一种事件。 
	 */
	MVCArray.prototype.addEventListener = function(type, handler, key) {
		if(isFunction(handler)) return;
		if(!this._listeners) this._listeners = {};
		if(type.indexOf('on') != 0) type = "on" + type;

		if(typeof this._listeners[type] != 'object') this._listeners[type] = {};
		var id = key || 'TANGRAM__' + (_counter ++).toString(36);

		this._listeners[type][id] = handler;
	}

	/**
	 * 循环访问每个元素，调用所提供的回调
	 * @param  {function} callback 需要执行的回调函数
	 */
	MVCArray.prototype.forEach = function(callback) {
		if(isFunction(callback)) return;
		var arr = this.arr;
		for(var i = 0, length = arr.length; i < l; i++) {
			callback.call(this, arr[i], i, arr);
		}
	}

	/**
	 * 获取指定索引处的元素
	 * @param  {number} num 数组的索引
	 * @return {string}     返回对应索引的元素
	 */
	MVCArray.prototype.getAt = function(num) {
		num = parseInt(num);
		if(num < 0) num = 0;
		if(num >= this.arr.length) num = this.arr.length - 1;
		return this.arr[num];
	}

	/**
	 * 设置数组指定索引处的元素
	 * @param {number} index   数组的索引
	 * @param {string} element 数组指定索引处的元素
	 */
	MVCArray.prototype.setAt = function(index, element) {
		if(arguments.length == 1) {
			this.arr[this.arr.length] = arguments[0];
		}else {
			this.arr[arguments[0]] = arguments[1];
		}
	}

	/**
	 * 删除数组的最后一个元素并传回该元素
	 * @return {string} 被删除的元素
	 */
	MVCArray.prototype.pop = function() {
		return this.arr.pop();
	}

}.call(this));


