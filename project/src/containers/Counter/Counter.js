import React, { Component } from 'react';
import { connect } from 'react-redux';

import CounterControl from '../../components/CounterControl/CounterControl';
import CounterOutput from '../../components/CounterOutput/CounterOutput';
import * as actionTypes from '../../store/actions';

class Counter extends Component {
    state = {
        counter: 0
    }

    counterChangedHandler = ( action, value ) => {
        switch ( action ) {
            case 'inc':
                this.setState( ( prevState ) => { return { counter: prevState.counter + 1 } } )
                break;
            case 'dec':
                this.setState( ( prevState ) => { return { counter: prevState.counter - 1 } } )
                break;
            case 'add':
                this.setState( ( prevState ) => { return { counter: prevState.counter + value } } )
                break;
            case 'sub':
                this.setState( ( prevState ) => { return { counter: prevState.counter - value } } )
                break;
            default:
                console.log('default');
        }
    }

    render () {
        return (
            <div>
              <CounterOutput value={this.props.ctr} />
              <CounterControl label="Increment" clicked={this.props.onIncrementCounter} />
              <CounterControl label="Decrement" clicked={this.props.onDecrementCounter}  />
              <CounterControl label="Add 5" clicked={this.props.onAddCounter}  />
              <CounterControl label="Subtract 5" clicked={this.props.onSubtractCounter}  />
              <hr />
              <button onClick={() => this.props.onStoreResult(this.props.ctr)}>Store Result</button>
              <ul>
                {this.props.res.map(result => (
                  <li key={result.id} onClick={() => this.props.onDeleteResult(result.id)}>{result.value}</li>
                ))}
              </ul>
            </div>
        );
    }
}

const mapStateToProps = state => {
  return {
    ctr: state.ctr.counter,
    res: state.res.results
  };
}

const mapDispatchToProps = dispatch => {
  return {
    onIncrementCounter: () => dispatch({type: actionTypes.INC}),
    onDecrementCounter: () => dispatch({type: actionTypes.DEC}),
    onAddCounter: () => dispatch({type: actionTypes.ADD, value: 5}),
    onSubtractCounter: () => dispatch({type: actionTypes.SUB, value: 5}),
    onStoreResult: (result) => dispatch({type: actionTypes.STORE_RESULT, result: result}),
    onDeleteResult: (id) => dispatch({type: actionTypes.DELETE_RESULT, id: id})
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Counter);
