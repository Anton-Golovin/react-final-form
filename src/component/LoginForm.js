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
            initialValues={{
                email: 'test@forforce.com',
            }}
            mutators={{
                setNewValue: (args, state, utils) => {
                    utils.changeValue(state, 'email', () => 'newValue@forforce.com')
                },
            }}
            render={({ handleSubmit, form }) => (
                <form className="form" onSubmit={handleSubmit}>
                    <Field
                        component={TextFieldUI} validate={composeValidators(required, checkEmail)}
                        name="email" className="input" label="Email" margin="dense"
                    />
                    <Field
                        component={TextFieldUI} initialValue={'11'} validate={required} name="password"
                        className="input" type="password" label="Password" margin="dense"/>
                    <Button className="button" variant="outlined" type="submit">Отправить</Button>
                    <Button className="button" variant="outlined" onClick={form.mutators.setNewValue}>Set New Value</Button>
                </form>
            )}
        />
    );
}
