import React from 'react';
import {ITodo} from "../../interfaces/todo.interface";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    MenuItem,
    Select,
    TextField
} from "@mui/material";
import {Status} from "../../interfaces/status.enum";
import './tododialog.style.css';

export interface RefTodoFormDialog {
    open: (submit: (elem: ITodo) => void, elem?: ITodo) => void;
    close: () => void;
}

const defaultTodo: ITodo = {
    titlu: '',
    descriere: '',
    status: Status.DeFacut,
    id: ''
}

export const TodoFormDialog = React.forwardRef<RefTodoFormDialog>((props, ref) => {
    const [state, setState] = React.useState<{data: ITodo, open: boolean, submit: (elem: ITodo) => void}>({data: defaultTodo, open: false, submit: () => {} })

    const open = (submit: (elem: ITodo) => void, elem?: ITodo) => setState({data: elem === undefined ? defaultTodo : elem, open: true, submit});
    const close = () => setState({data: defaultTodo, open: false, submit: () => {}})

    React.useImperativeHandle(ref, () => ({
        open,
        close
    }))

    const validate = () => (!state.data.titlu && !state.data.descriere)


    return (
        <Dialog open={state.open} onClose={close}>
            <DialogTitle>{state.data.titlu ? `Update ${state.data.titlu}`: 'Create todo'}</DialogTitle>
            <DialogContent>
                <form className={'form'}>
                    <TextField value={state.data.titlu} label={'Titlu'} onChange={(e) => setState(prevState => {
                        return {
                            ...prevState,
                            data: {
                                ...prevState.data,
                                titlu: e.target.value
                            }
                        }
                        })
                    } />
                    <TextField value={state.data.descriere} label={'Descriere'} onChange={(e) => setState(prevState => {
                        return {
                            ...prevState,
                            data: {
                                ...prevState.data,
                                descriere: e.target.value
                            }
                        }
                    })
                    } />
                    <Select value={state.data.status} onChange={(e) => setState(prevState => {
                        return {
                            ...prevState,
                            data: {
                                ...prevState.data,
                                status: e.target.value as Status
                            }
                        }
                    })}>
                        <MenuItem value={Status.DeFacut}>{Status.DeFacut}</MenuItem>
                        <MenuItem value={Status.InProgres}>{Status.InProgres}</MenuItem>
                        <MenuItem value={Status.Terminat}>{Status.Terminat}</MenuItem>
                    </Select>
                </form>
            </DialogContent>
            <DialogActions sx={{display: 'flex', justifyContent: 'center'}}>
                <Button variant={'contained'} onClick={() => {
                    if(!validate()) {
                        state.submit(state.data)
                        close();
                    }
                }}>
                    Submit
                </Button>
            </DialogActions>
        </Dialog>
    )
})