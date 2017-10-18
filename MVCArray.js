(function() {

	var root = this;

  	var ObjProto = Object.prototype;

  	var nativeIsArray = Array.isArray;

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
	 * 
	 * @return {Boolean}        如果是函数则为true，不是则为false
	 */
	var isFunction = function(source) {
        return '[object Function]' == Object.prototype.toString.call(source);
	};

	/**
	 * MVCArray构造函数
	 * @param {Array} arr 传入一个Array
	 */
	var MVCArray = function(arr) {
		if(!isArray(arr)) return false;
		this.arr = arr;
	}

	/**
	 * 注册事件监听器
	 * @param {string} type    自定义事件名称
	 * @param {functon} handler 自定义事件被触发时的回调函数
	 */
	MVCArray.prototype.addEventListener = function(type, handler, key) {
		if(!isFunction(handler)) return;
		if(!this._listeners) this._listeners = {};

		if(typeof this._listeners[type] != 'object') this._listeners[type] = {};
		var id = key || 'TANGRAM__' + (_counter ++).toString(36);

		this._listeners[type][id] = handler;
	}

	/**
	 * 注册事件触发器
	 * @param  {string} type 自定义事件名称
	 */
	MVCArray.prototype.trigger = function(type) {
		if(typeof this._listeners[type] == 'undefined') return;
		var listener = this._listeners[type];
		for(var i = 0, l = listener.length; i < l; i++) {
			listener[i].call(this);
		}
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
	 * 
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
	 * @remark 只有一个参数时在数组尾部插入
	 */
	MVCArray.prototype.setAt = function(index, element) {
		if(arguments.length == 1) {
			this.arr[this.arr.length] = arguments[0];
		}else {
			this.arr[arguments[0]] = arguments[1];
		}
		this.trigger('insert_at');
	}

	/**
	 * 删除数组的最后一个元素并传回该元素
	 * @return {string} 被删除的元素
	 */
	MVCArray.prototype.pop = function() {
		return this.arr.pop();
		this.trigger('remove_at');
	}

	/**
	 * 在指定索引处插入元素
	 * @param  {number} index   数组的索引
	 * @param  {string} element 数组指定索引插入的元素
	 */
	MVCArray.prototype.insertAt = function(index, element) {
		this.arr.splice(index, 1, element);
		this.trigger('insert_at');
	}

	/**
	 * 在指定索引处删除元素
	 * @param  {number} index 数组的索引
	 * 
	 * @return {string}       数组中被删除的元素
	 */
	MVCArray.prototype.removeAt = function(index) {
		return this.arr.splice(index, 1);
		this.trigger('remove_at');
	}

	/**
	 * 获取数组的长度
	 * @return {number} 返回数组的长度
	 */
	MVCArray.prototype.getLength = function() {
		return this.arr.length;
	}

	root.MVCArray = MVCArray;

}.call(this));


