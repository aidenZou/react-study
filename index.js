import React, {Component, PropTypes} from 'react'
import ReactDOM from 'react-dom'
import {createStore} from 'redux'
import {Provider, connect} from 'react-redux'

// React component
class Counter extends Component {
    render() {
        const {value, onIncreaseClick} = this.props
        return (
            <div>
                <span>{value}</span>
                <button onClick={onIncreaseClick}>Increase</button>
            </div>
        )
    }
}

// 属性校验
Counter.propTypes = {
    value: PropTypes.number.isRequired,
    onIncreaseClick: PropTypes.func.isRequired
}


// Action
const increaseAction = {type: 'increase'}

// Reducer
function counter(state = {count: 0}, action) {
    console.log(state, action)
    const count = state.count
    switch (action.type) {
        case 'increase':
            return {count: count + 1}
        default:
            return state
    }
}

// Store
const store = createStore(counter)

// Map Redux state to component props
// 哪些 Redux 全局的 state 是我们组件想要通过 props 获取的？
function mapStateToProps(state) {
    console.log('state', state)
    return {
        value: state.count
    }
}

// Map Redux actions to component props
// 哪些 action 创建函数是我们想要通过 props 获取的？
function mapDispatchToProps(dispatch) {
    return {
        onIncreaseClick: () => dispatch(increaseAction)
    }
}

// Connected Component
const App = connect(
    mapStateToProps,
    mapDispatchToProps
)(Counter)

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
)