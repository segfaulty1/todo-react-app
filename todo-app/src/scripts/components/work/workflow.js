import React, {useEffect, useState} from 'react';
import Project from './project';
import formHandler from '../shared/form/formHandler';
const {FORM_MODE, showForm, formAction} = formHandler;
import {sharedState, sharedRenerer, listChildren, renderForm} from '../shared/sharedUtils';

export default function Workflow(props) {
    const [state, setState] = useState(sharedState(props.itemObj));

    const style = {
        parent: {
            position: 'relative',
            padding: '.5rem',
            marginTop: '2rem',
            // boxShadow: 'rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgb(209, 213, 219) 0px 0px 0px 1px inset',

            title: {
                position: 'relative',
                width: 'max-content',

                edit: {
                    cursor: 'pointer',
                    position: 'absolute',
                    top: '-6px',
                    right: '-35px',
                },
            },

            addItem: {
                width: 'max-content',
                cursor: 'pointer',
            },

            list: {
                display: 'flex',
                justifyContent: 'flex-start',
                alignItems: 'stretch',
                marginTop: '.5rem',
            },
        },
    };

    return (
        <div style={style.parent}>
            <h2 style={style.parent.title}>
                {state.itemObj.fields.title.value}
                <div
                    style={style.parent.title.edit}
                    onClick={formHandler.showForm.bind(this, {setState, state}, FORM_MODE.edit)}
                >
                    ...
                </div>
            </h2>

            {/* new project button*/}
            <div
                style={style.parent.addItem}
                onClick={formHandler.showForm.bind(this, {setState, state}, FORM_MODE.create)}
            >
                ADD ITEM
            </div>

            <div style={style.parent.list}>{listChildren(state.itemObj.children, Project)}</div>

            {/* form */}
            {renderForm({state, setState})}
        </div>
    );
}