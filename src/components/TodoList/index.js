import React, { Component } from 'react'
import { Input, Button, List } from 'antd';
import store from '../../store';
import { CHANGE_MESSAGE } from '../../store/actionTypes';

export default class TodoList extends Component {
  constructor(props) {
    super(props);
    this.state = store.getState();
    this.changeMessage = this.changeMessage.bind(this);
    console.log(this.state)
    // 订阅模式
    store.subscribe(this.changeStore)
  }
  changeMessage(e) {
    const action = {
      type: CHANGE_MESSAGE,
      value: e.target.value
    }
    store.dispatch(action);
  }
  changeStore = () => {
    this.setState(store.getState())
  }
  render() {
    return (
      <div className='todolist'>
        <h1>TodoList component</h1>
        <Input style={{ width: '330px', margin: '0 10px' }} placeholder="请输入您的信息"
               value={this.state.inputMessage}
               onChange={this.changeMessage} />
        <Button>添加</Button>
        <div style={{ margin:'10px', width:'300px' }}>
          <List
                  bordered
                  dataSource={this.state.list}
                  renderItem={item=>(<List.Item key={item.id}>{item.title}</List.Item>)}
              />
          </div>
      </div>
    )
  }
}
