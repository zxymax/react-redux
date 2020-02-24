### React
#### Learn Redux
```
npx create-react-app redux
cd redux
yarn add redux
yarn add antd
yarn start
```
##### redux 工作流程
![redux工作流程图.png](https://upload-images.jianshu.io/upload_images/8053630-72b2c91e5a9e23c5.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


![redux工作流程图2.png](https://upload-images.jianshu.io/upload_images/8053630-51461e9184e4e967.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

##### redux 介绍
`Redux` 是一个用来管理数据状态和 UI 状态的 JavaScript 应用工具，随着JavaScript单页应用（SPA）开发日趋复杂，JavaScript 需要管理比任何时候都要多的 `state` (状态)，`Redux` 就是降低难度的。（Redux支持React，Angular、jQuery甚至纯JavaScript）
`Redux` 中，可以把数据放在数据仓库（`store` 公用状态存储空间）中，这里可以统一管理状态，然后哪个组件用到了，就去 `store` 中查找状态。如果途中的紫色组件想要改变状态时，只需要改变 `store` 中的状态，然后其它组件就会跟着中的自动变化。

##### src/index.js 项目入口文件写入：
```javascript
import React from 'react';
import ReactDOM from 'react-dom';
// 导入 antd UI 样式
import 'antd/dist/antd.css';
import './index.css';
// 导入 TodoList 组件
import { TodoList } from './components';

const App = () => {
  return (
    <div>
      <TodoList />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'));
```
##### src/components/index.js 文件将所有组件以别名形式导出
```javascript
export { default as TodoList } from './TodoList';
```
##### src/components/TodoList/index.js 创建 TodoList 组件
```javascript
import React, { Component } from 'react';
import { Input, Button, List } from 'antd';
// 先声明一个 list 数组，填写一些内容
const list = [
    { id: 1, title: '早晨 6 点起床' },
    { id: 2, title: '早晨 7 吃完早饭' },
    { id: 3, title: '早晨 8 点学习' },
    { id: 4, title: '早晨 11 点做午饭' },
    { id: 5, title: '早晨 13 点午休' }
]
class TodoList extends Component {
    render() {
        return (
            <div>
                <div>
                    <Input placeholder='Jorna' style={{ width:'250px' }}/>
                    <Button type="primary">增加</Button>
                </div>
                 <div style={{ margin:'10px',width:'300px' }}>
                    <List
                        bordered
                        dataSource={list}
                        renderItem={item=>(<List.Item>{item.title}</List.Item>)}
                    />
                </div>
            </div>
         );
    }
}
export default TodoList;
```
##### src/ 创建 `store` 文件夹 store/ 文件夹下创建 index.js
`index.js` 就是整个项目的 `store` 文件，编写以下代码：
```javascript
import { createStore } from 'redux'; // 引入 createStore 方法
const store = createStore(); // 创建数据存储仓库
export default store; // 将数据仓库暴露出去
```
为了避免 `store` 仓库变得很混乱，这时候就需要有一个管理能力的模块出现，这就是 `Reducers`。
##### 在 `store/` 文件夹下，新建一个 `reducer.js` 文件，编写以下代码：
```javascript
const defaultState = {}; // 默认数据
export default (state = defaultState, action) => { // 就是一个方法函数
  return state;
}
```
##### 把 reducer.js 引入到 store 中，以参数的形式传给 store。
```javascript
import { createStore } from 'redux';
import reducer from './reducer.js';
const store = createStore(reducer);
export default store;
```
#### 在 store 中为 TodoList 初始化数据
仓库 `store` 和 `reducer` 都创建好了，可以初始化一下 TodoList 中的数据了，在 `reducer.js` 文件的 `defaultState` 对象中，加入两个属性：`inputValue` 和 `list`。代码如下：
```javascript
// 相当于给 store 增加了两个新的数据
const defaultState = {
  inputValue: '请输入你的信息',
  list: [
    { id: 1, title: '早晨 6 点起床' },
    { id: 2, title: '早晨 7 吃完早饭' },
    { id: 3, title: '早晨 8 点学习' }
  ]
}
export default (state = defaultState, action) => {
  return state;
}
```
#### TodoList.js 组件获得 store 中的数据
更新 TodoList.js 文件
```javascript
import React, { Component } from 'react';
import { Input, Button, List } from 'antd';
import store from '../../store'; // 引入 store
// 先声明一个 list 数组，填写一些内容

class TodoList extends Component {
    constructor(props) {
      super(props);
      this.state = store.getState();
    }
    render() {
        return (
            <div>
                <div>
                    <Input placeholder='Jorna' style={{ width:'250px' }}/>
                    <Button type="primary">增加</Button>
                </div>
                 <div style={{ margin:'10px',width:'300px' }}>
                    <List
                        bordered
                        dataSource={list}
                        renderItem={item=>(<List.Item>{item.title}</List.Item>)}
                    />
                </div>
            </div>
         );
    }
}
export default TodoList;
```
#### Redux DevTools 浏览器插件安装



