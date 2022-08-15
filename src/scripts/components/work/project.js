import React, {useState} from 'react';
import {Link} from 'react-router-dom';

import Form from '../shared/form/form';
import formHandler from '../shared/form/formHandler';
const {FORM_MODE, showForm, formAction} = formHandler;
import sharedState from '../shared/sharedState';

import TODO from '../../todoModule';

export default function Project(props) {
    const [state, setState] = useState(sharedState(props.itemObj));

    const style = {
        project: {
            position: 'relative',
            padding: '1rem',
            borderRadius: '10px',
            marginRight: '1.5rem',
            boxShadow: 'rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgb(209, 213, 219) 0px 0px 0px 1px inset',

            edit: {
                cursor: 'pointer',
                position: 'absolute',
                top: '6px',
                right: '1rem',
                fontWeight: 'bolder',
                fontSize: '1.5rem',
            },
        },
    };

    return (
        <div style={style.project}>
            <h3 style={{paddingRight: '25px'}}>
                <Link to={`/project/${state.itemObj.ID}`}>{state.itemObj.fields.title.value}</Link>
            </h3>
            <div
                style={style.project.edit}
                onClick={formHandler.showForm.bind(this, {setState, state}, FORM_MODE.edit)}
            >
                ...
            </div>
            <p style={{marginTop: '.5rem'}}>{state.itemObj.fields.desc.value}</p>

            {/* form */}
            {state.form.show ? (
                <Form
                    action={formHandler.formAction.bind(this, {setState, state})}
                    itemObj={state.itemObj}
                    form={state.form}
                />
            ) : (
                <></>
            )}
        </div>
    );
}