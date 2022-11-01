import { FormInputLabel, Input, Group } from './form-input.styles.jsx';
import React from 'react';

const FormInput = ({ label, ...otherProps }) => {
    return (<Group>
        <Input className='form-input' {...otherProps} />
        {label && (
            <FormInputLabel
                shrink={otherProps.value.length}
            >
                {label}
            </FormInputLabel>
        )}
    </Group>
    )
}
export default FormInput;