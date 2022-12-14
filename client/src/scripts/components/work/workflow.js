import {
    React,
    useEffect,
    useState,
    FORM_MODE,
    showForm,
    sharedState,
    showMenu,
    renderMenu,
    listChildren,
    renderForm,
    Bridge,
} from '../../imports/tools';
import {FaPlus, FaPencilAlt} from 'react-icons/fa';
import {Project} from '../../imports/components';

export default function Workflow(props) {
    const [state, setState] = useState(sharedState(props.itemObj));

    // state bridger
    useEffect(() => {
        const bridges = {
            itemObj: {
                state: state,
                render: (newState = undefined) => {
                    let newStateCpy = newState ?? state;
                    // console.log(newStateCpy);
                    setState({
                        ...newStateCpy,
                        itemObj: props.itemObj,
                    });
                },
            },
        };
        Bridge.initBridge(state.itemObj.id, bridges);
    }, []);

    const style = {
        parent: {
            position: 'relative',
            padding: '.5rem',
            marginTop: '2rem',
            // boxShadow: 'rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgb(209, 213, 219) 0px 0px 0px 1px inset',

            titleContainer: {display: 'flex', justifyContent: 'space-between', marginBottom: '20px'},
            title: {
                position: 'relative',
                width: 'max-content',

                edit: {
                    fontSize: '1.3rem',
                    cursor: 'pointer',
                    position: 'absolute',
                    top: '-1px',
                    right: '-45px',
                    color: 'rgb(40, 150, 200)',
                },
            },

            addItem: {
                width: 'max-content',
                cursor: 'pointer',
                color: 'rgb(40, 150, 200)',
                fontSize: '1.3rem'
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
            <div style={style.parent.titleContainer}>
                <h2 style={style.parent.title}>
                    {state.itemObj.fields.title.value}
                    <div
                        style={style.parent.title.edit}
                        onClick={(e) => {
                            e.stopPropagation();
                            showMenu(state.itemObj.id);
                        }}
                    >
                        <FaPencilAlt />
                    </div>
                </h2>

                {/* new project button*/}
                <div
                    style={style.parent.addItem}
                    onClick={(e) => {
                        e.stopPropagation();
                        showForm(state.itemObj.id, FORM_MODE.create);
                    }}
                >
                    <FaPlus />
                </div>
            </div>

            <div style={style.parent.list}>{listChildren(state.itemObj, Project)}</div>

            {state.menu.show ? renderMenu(state.itemObj.id) : <></>}
            {state.form.show ? renderForm(state.itemObj.id) : <></>}
        </div>
    );
}
