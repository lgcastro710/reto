import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});


const products = [
    {
        "quantity": 308,
        "price": "$8,958",
        "available": false,
        "sublevel_id": 3,
        "name": "aute",
        "id": "58b5a5b1b6b6c7aacc25b3fb"
    },
    {
        "quantity": 891,
        "price": "$5,450",
        "available": true,
        "sublevel_id": 3,
        "name": "mollit",
        "id": "58b5a5b117bf36cf8aed54ab"
    },
    {
        "quantity": 698,
        "price": "$17,001",
        "available": false,
        "sublevel_id": 10,
        "name": "eiusmod",
        "id": "58b5a5b18607b1071fb5ab5b"
    },
    {
        "quantity": 449,
        "price": "$6,864",
        "available": true,
        "sublevel_id": 7,
        "name": "proident",
        "id": "58b5a5b13881e97291384813"
    },
    {
        "quantity": 736,
        "price": "$13,253",
        "available": false,
        "sublevel_id": 4,
        "name": "laboris",
        "id": "58b5a5b1b82dc20c7dd52260"
    },
    {
        "quantity": 850,
        "price": "$10,930",
        "available": false,
        "sublevel_id": 11,
        "name": "anim",
        "id": "58b5a5b1996384dbbc556718"
    },
    {
        "quantity": 644,
        "price": "$16,972",
        "available": true,
        "sublevel_id": 12,
        "name": "duis",
        "id": "58b5a5b17326875fe21aebc1"
    },
    {
        "quantity": 722,
        "price": "$6,904",
        "available": true,
        "sublevel_id": 9,
        "name": "sunt",
        "id": "58b5a5b1ac8306b5d1d3d5fd"
    },
    {
        "quantity": 620,
        "price": "$13,813",
        "available": true,
        "sublevel_id": 8,
        "name": "reprehenderit",
        "id": "58b5a5b1f9ebd51b88636467"
    },
    {
        "quantity": 297,
        "price": "$14,552",
        "available": true,
        "sublevel_id": 1,
        "name": "non",
        "id": "58b5a5b1a20b39205ba99c50"
    },
    {
        "quantity": 514,
        "price": "$11,042",
        "available": false,
        "sublevel_id": 1,
        "name": "dolor",
        "id": "58b5a5b11f741600608205ca"
    },
    {
        "quantity": 887,
        "price": "$17,532",
        "available": true,
        "sublevel_id": 13,
        "name": "dolor",
        "id": "58b5a5b1ef62cb996bb87c45"
    }]

export default function SimpleTable() {
    const classes = useStyles();

    return (
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Producto</TableCell>
                        <TableCell align="right">Cantidad</TableCell>
                        <TableCell align="right">Precio</TableCell>
                        <TableCell align="right">Disponible</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {products.map((product) => (
                        <TableRow key={product.name}>
                            <TableCell component="th" scope="row">
                                {product.name}
                            </TableCell>
                            <TableCell align="right">{product.quantity}</TableCell>
                            <TableCell align="right">{product.price}</TableCell>
                            <TableCell align="right">{product.available}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
