import React from 'react';
import {Form, Field} from 'react-final-form'
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import FormControlLabel from '@mui/material/FormControlLabel';
import { OnChange, OnBlur, OnFocus } from 'react-final-form-listeners'

const TextFieldUI = ({input, meta, ...restProps}) => (
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
    const onSubmit = (value) => {
        console.log(value)
    };
    return (
        <Form
            onSubmit={onSubmit}
            initialValues={{email: 'test@forforce.com'}}
            mutators={{
                setNewValue: (args, state, utils) => {
                    utils.changeValue(state, 'email', () => 'newValue@forforce.com')
                },
            }}
            render={({handleSubmit, form}) => (
                <form className="form" onSubmit={handleSubmit}>
                    <Field
                        component={TextFieldUI} validate={composeValidators(required, checkEmail)}
                        name="email" className="input" label="Email" margin="dense"
                    />
                    <Field
                        component={TextFieldUI} initialValue={'11'} validate={required} name="password"
                        className="input" type="password" label="Password" margin="dense"/>
                    <Button className="button" variant="outlined" type="submit">Отправить</Button>
                    <Field
                        component={
                            ({
                                 input,
                                 meta,
                                 ...restProps
                             }) => <FormControlLabel control={<Checkbox/>} {...restProps} {...input} />
                        }
                        type="checkbox"
                        name="disabled" label="Disabled"
                    />
                    <OnChange name="disabled">
                        {(value, previous) => {
                            console.log(value, previous);
                        }}
                    </OnChange>
                    <OnFocus name="disabled">
                        {(value, previous) => {
                            console.log(value, previous);
                        }}
                    </OnFocus>
                    <OnBlur name="disabled">
                        {(value, previous) => {
                            console.log(value, previous);
                        }}
                    </OnBlur>
                    <Button className="button" variant="outlined" onClick={form.mutators.setNewValue}>
                        Set New Value
                    </Button>
                </form>
            )}
        />
    );
}
