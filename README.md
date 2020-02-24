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
            </div>
         );
    }
}
export default TodoList;
```


