import React from "react";
import {ITodo} from "../../interfaces/todo.interface";
import {IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import { Delete, Edit } from '@mui/icons-material'

export interface TableComponentProps {
    headers: {key: string, value: string}[];
    items: ITodo[];
    rowActions?: {[index: string]: (elem: ITodo) => void};
    updateFunc: (event: ITodo) => void;
    deleteFunc: (event: ITodo) => void;
}
export const TableComponent: React.FC<TableComponentProps> = ({ headers, items, rowActions = {}, updateFunc, deleteFunc}) => {
    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        {headers.map((value, index) => (<TableCell key={index}>{value.key}</TableCell>))}
                        <TableCell>
                            Actiuni
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {items.map((todo, index) => (
                        <TableRow key={index}>{headers.map((value, index) =>
                            <TableCell sx={{userSelect: 'none'}} key={index} onClick={() => rowActions[value.value]?.(todo)}>{todo[value.value]}</TableCell>)}
                            <TableCell>
                                <IconButton color={'primary'} onClick={() => updateFunc(todo)} >
                                    <Edit />
                                </IconButton>
                                <IconButton color={'error'} onClick={() => deleteFunc(todo)}>
                                    <Delete />
                                </IconButton>
                            </TableCell>
                        </TableRow>)
                    )}
                </TableBody>
            </Table>
        </TableContainer>
    )
}