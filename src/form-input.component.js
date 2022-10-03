import './form-input.styles.scss';
import React from 'react';

const FormInput = ({ label,...otherProps   }) => {
    return (<div className="group" >
        <input className='form-input' {...otherProps}  />
        {label &&(
                <label
                htmlFor=""
                className={`${otherProps.value.length>0?'shrink':''}
                form-input-label`} >
                {label}
                </label>
        )}
        </div>
    )
}
export default FormInput;