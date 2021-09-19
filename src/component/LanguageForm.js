import React from 'react';
import {Form, Field} from 'react-final-form'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {FieldArray} from 'react-final-form-arrays'
import arrayMutators from 'final-form-arrays'

const TextFieldUI = ({input, meta, ...restProps}) => (
    <>
        <TextField {...restProps} {...input} />
        {meta.error && meta.touched && <span>{meta.error}</span>}
    </>
)

export default function LanguageForm() {
    const onSubmit = (value) => {
        console.log(value)
    };
    return (
        <Form
            onSubmit={onSubmit}
            mutators={{ ...arrayMutators }}
            initialValues={{ customers: [{}] }}
            render={({ handleSubmit, form: { mutators: {push, pop} }}) => (
                <form className="form" onSubmit={handleSubmit}>
                    <Field component={TextFieldUI} name="company" className="input" label="Company" margin="dense"/>
                    <fieldset>
                        <legend>Customers</legend>
                        <FieldArray name="customers">
                            {({fields}) =>
                                fields.map((name, index) => (
                                    <div key={name}>
                                        {console.log(fields)}
                                        <Field component={TextFieldUI} name="name" className="input" label="Name" margin="dense"/>&nbsp;
                                        <Field component={TextFieldUI} name="surname" className="input" label="Surname" margin="dense"/>
                                        <button className="remove">x</button>
                                    </div>
                                ))
                            }
                        </FieldArray>
                    </fieldset>
                    <Button className="button" variant="outlined" onClick={() => push('customers', undefined)}>Add</Button>
                    <Button className="button" variant="outlined" onClick={() => pop('customers')}>Remove Last</Button>
                    <Button className="button" variant="outlined" type="submit">Send</Button>
                </form>
            )}
        />
    );
}
