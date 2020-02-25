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
使用Chrome浏览器安装插件
##### 配置 Redux DevTools
```javascript
import { createStore } from 'redux';
import reducer from './reducer.js';
const sore = createStore(reducer,
window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()) // 创建数据存储仓库
export default store   //暴露出去
```
其实就是加了下面代码这样一句话，这句话的意思是：看 `window` 里有没有这个方法，有则执行这个方法。
window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()

##### 增加 input 响应事件
如果想 `input` 发生改变，`redux` 也跟着变，需要在 `input` 增加 `onChange` 响应事件，修改
`TodoList.js` 文件代码：
```javascript
<Input placeholder='Jorna' style={{ width:'250px' }}
  onChange={this.changeInputValue} />
```
写完这一步，还需要在 `constructor` 进行 `this` 绑定，修改 `this` 指向。
```javascript
constructor(props) {
  super(props);
  this.state = store.getState();
  this.changeInputValue = this.changeInputValue.bind(this);
}
```
`changeInputValue` 方法可以打印出 `input` 的变化
```javascript
changeInputValue(e) {
  console.log(e.target.value)
}
```
更新 TodoList.js 组件代码
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
    // 新增加的 input 事件
    changeInputValue(e) {
      console.log(e.target.value)
    }
    render() {
        return (
            <div>
                <div>
                    <Input placeholder={this.state.inputValue}
                      onChange={this.changeInputValue} style={{ width:'250px' }}
                      />
                    <Button type="primary">增加</Button>
                </div>
                 <div style={{ margin:'10px',width:'300px' }}>
                    <List
                        bordered
                        dataSource={this.state.list}
                        renderItem={item=>(<List.Item>{item.title}</List.Item>)}
                    />
                </div>
            </div>
         );
    }
}
export default TodoList;
```
#### 创建 Action 来改变 Redux 里的 State 的值。
`Action` 就是一个对象，这个对象一般有两个属性，第一个是对 `Action` 的描述，第二个是要改变的值。
```javascript
changeInputValue(e) {
  const action = {
    type: 'change_input',
    value: e.target.value
  }

}
```
`action` 创建好了，但是要通过 `dispatch` 方法传递给 `store`。代码如下：
```javascript
changeInputValue(e) {
  const action = {
    type: 'change_input',
    value: e.target.value
  }
  store.dispatch(action)
}
```
这时候 `Action` 已经创建完了，也和 `store` 有了联系。
##### store 的自动推送策略
`state` 和 `action` 参数：
- `state`: 指的是原始仓库里的状态。
- `action`: 指的是 `action` 新传递的状态。
```javascript
export default (state = defaultState, action) => {
  console.log(state, action)
  return state;
}
```
通过打印看出，`Reducer` 已经拿到了原来的数据和新传递过来的数据，现在要做的就是改变 `store`
里的值。先判断 `type` 是否正确，如果正确，则需要声明一个新的变量 `newState`。（`Reduer` 里只能
接收 `state`，不能改变 `state`），所以，声明了一个新的变量，需要用 `return` 返回出去。
```javascript
export default (state = defaultState, action) => {
  if (action.type === 'change_input') {
    let newState = JSON.parse(JSON.stringfy(state));
    newState.inputValue = action.value;
    return newState;
  }
  return state;
}
```
#### 让组件更新
`store` 里的数据已经更新了，现在需要更新组件，`TodoList.js` 修改如下：
```javascript
constructor(props) {
      super(props);
      this.state = store.getState();
      this.changeInputValue = this.changeInputValue.bind(this);
      this.storeChange = this.storeChange.bind(this)
      store.subscribe(this.storeChange) // 订阅 Redux 的状态
}
// 下面的方法 更新组件变化
storeChange () {
  this.setState(store.getState());
}
```
#### 创建 Action 并用 dispatch 传递给 store
编写添加按钮响应事件
```javascript
<Button
    type="primary"
    onClick={this.addItem}
>增加</Button>
```
方法添加 `action` 并用 `dispatch` 传递给 `store`
```javascript
addItem() {
  const action = {
    type: 'add_item'
  }
  store.dispatch(action)
}
```
方法 `addItem` 在 `constructor` 构造函数里进行绑定
```javascript
this.addItem = this.addItem.bind(this);
```
##### 编写 Reducer 的业务逻辑
```javascript
export default (state = defaultState, action) => {
  if (action.type === 'change_input') {
    let newState = JSON.parse(JSON.stringfy(state));
    newState.inputValue = action.value;
    return newState;
  }
  if (action.type === 'add_item') {
    let newState = JSON.parse(JSON.stringfy(state));
    newState.list.push(newState.inputValue); // push 新的内容到 list 列表中去
    newState.inputValue = '';
    return newState
  }
  return state;
}
```
##### 增加 删除功能 绑定 子项响应事件
`TodoList.js` 找到 `List` 组件的 `renderItem` 属性：
```javascript
<div style={{margin:'10px',width:'300px'}}>
    <List
        bordered
        dataSource={this.state.list}
        renderItem={(item,index)=>(<List.Item onClick={this.deleteItem.bind(this,index)}>{item.title}</List.Item>)}
    />
</div>
```
编写 `deleteItem` 方法，该方法接收一个 `index` 参数
在方法里编写 `Redux` 的 `Action`
```javascript
deleteItem(index) {
  const action = {
    type: 'delete_item',
    index
  }
  store.dispatch(action);
}
```
##### 继续增加 Reducer 的业务逻辑 delete
```javascript
if (action.type === 'delete_item') {
  let newState = JSON.parse(JSON.stringfy(state));
  newState.list.splice(action.index, 1);
  return newState;
}
```
--未完 待更新呢～--
