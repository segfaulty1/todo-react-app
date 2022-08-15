import TODO from '../../../todoModule';

const formHandler = (() => {
    const FORM_MODE = {create: 'create', edit: 'edit', delete: 'delete', cancel: 'cancel'};

    const showForm = ({setState, state}, mode) => {
        // console.log(state);
        const newObj = {
            itemObj: state.itemObj,
            form: {
                ...state.form,
                show: true,
                mode,
                title:
                    mode == FORM_MODE.create
                        ? `create a new ${state.itemObj.childType}`
                        : `${state.itemObj.childType}: ${state.form.fields.self.title.value}`,
                submit: mode,
            },
        };

        setState(newObj);
    };
    const formAction = ({setState, state}, options, action) => {
        switch (action) {
            case FORM_MODE.create:
                //! blindly trandporting properties over to the factory function
                TODO.create[state.itemObj.childType](options.itemObj.ID, {
                    ...options.form.fields.child,
                });
                break;
            case FORM_MODE.edit:
                TODO.modifyItem(options.itemObj.ID, options.form.fields.self);
                break;
            case FORM_MODE.delete:
                TODO.deleteItemByID(state.itemObj.ID);
                //TODO: render the parent
                return;
                break;
        }
        options.form.show = false;
        setState(options);
    };

    return {FORM_MODE, showForm, formAction};
})();

export default formHandler;