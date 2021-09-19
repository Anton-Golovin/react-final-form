import React from 'react';
import { Form, Field } from 'react-final-form'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const TextFieldUI = ({ input, meta, ...restProps }) => (
    <>
        <TextField {...restProps} {...input} />
        {meta.error && meta.touched && <span>{meta.error}</span>}
    </>
)

const composeValidators = (...validators) => value =>
    validators.reduce((error, validator) => error || validator(value), undefined);

const required = value => (value ? undefined : "Required");
const checkEmail = value => (/\S+@\S+\.\S+/.test(value) ? undefined : 'Invalid Email')

export default function LoginForm() {
    const onSubmit = (value) => { console.log(value) };
    return (
        <Form
            onSubmit={onSubmit}
            render={({ handleSubmit }) => (
                <form className="form" onSubmit={handleSubmit}>
                    <Field
                        component={TextFieldUI} validate={composeValidators(required, checkEmail)}
                        name="email" className="input" label="Email" margin="dense"
                    />
                    <Field
                        component={TextFieldUI} validate={required} name="password"
                        className="input" type="password" label="Password" margin="dense"/>
                    <Button className="button" variant="outlined" type="submit">Отправить</Button>
                </form>
            )}
        />
    );
}
