import React from 'react';

const Button = ( props ) =>{

    return <React.Fragment>
        <button type="button" className={props.class + " base-button"} onClick={props.click}> {props.text} </button>
    </React.Fragment>

}

export default Button;