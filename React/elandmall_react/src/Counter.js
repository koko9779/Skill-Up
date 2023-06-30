import React, {useReducer} from "react";

function reducer(state, action) {
    switch(action.type) {
        case 'INCREMENT' :
            return state + 1;
        case 'DECREMENT' :
            return state - 1;
        default : 
            throw new Error('Unhandled action');
    }
}

function Counter(){
    // useReducer(함수, 초기값);
    const [number, dispatch] = useReducer(reducer,0);

    const onIncrease = () => {
        dispatch({
        type : 'INCREMENT'
        })
    };
    
    const onDecrease = () => {
        dispatch({
            type : 'DECREMENT'
        })
    };

    return (
        <div style={{marginTop:'50px'}}>
            <div>Hello World!</div>
            <h1 style={{color:"red"}}>{number}</h1>
            <button onClick={onIncrease}>+1</button>
            <button onClick={onDecrease}>-1</button>
        </div>
    )
}

export default Counter;