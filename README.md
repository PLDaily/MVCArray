### MVCArray类

一个可变的MVC数组

### 构造函数

| 构造函数                     |
| :----------------------- |
| `MVCArray(array?:Array)` |

###  方法

| 方法                                  | 返回值      | 说明                                       |
| ----------------------------------- | -------- | ---------------------------------------- |
| `forEach(callback:Function)`        | `none`   | 循环访问每个元素，调用所提供的回调。回调会被每个元素调用。如：callback(element, index) |
| `getAt(index:Number)`               | `*`      | 获取指定索引处的元素。                              |
| `setAt(index:Number, element:*)`    | `none`   | 设置指定索引处的元素。                              |
| `getLength()`                       | `Number` | 传回此数组中的元素数。                              |
| `pop()`                             | `*`      | 删除数组的最后一个元素并传回该元素。                       |
| `setAt(element:*)`                  | `Number` | 将一个元素添加到数组末尾并传回数组的新长度。                   |
| `insertAt(index:Number, element:*)` | `none`   | 在指定索引处插入元素。                              |
| `removeAt()`                        | `*`      | 从指定索引处删除元素。                              |

### 事件

| 事件名          | 参数                       | 说明                 |
| ------------ | ------------------------ | ------------------ |
| `insert_at`  | `element:*,index:Number` | 当数组加入新的元素时会触发此事件。  |
| ` remove_at` | `element:*,index:Number` | 当从数组中删除某个元素时触发此事件。 |