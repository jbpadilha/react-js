/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-restricted-syntax */
import React, { useEffect, useState } from "react";
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ActionBase from '../actions/ActionBase';
import Product from '../components/Product';
import { FORMAT_TIME } from '../config/config';
import dayjs from 'dayjs';
import { DataGrid, GridColDef, GridValueFormatterParams } from '@material-ui/data-grid';

const useStyles = makeStyles((theme) => ({
    root: {
        flexWrap: 'wrap',
        minWidth: 300,
        width: '100%',
    },
    drawerHeader: {
      display: 'flex',
      alignItems: 'center',
      padding: theme.spacing(0, 1),
      ...theme.mixins.toolbar,
      justifyContent: 'flex-end',
    },
    title: {
        fontWeight: 'bold',
        marginBottom: 16
    }
}));

const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 150 },
    {
      field: 'name',
      headerName: 'Name',
      width: 200
    },
    {
      field: 'purchaseDate',
      headerName: 'Purchase Date',
      width: 200,
      valueFormatter: (params: GridValueFormatterParams) => {
        const date = params.value as string;
        return dayjs(date).format(FORMAT_TIME);
      }
    },
    {
      field: 'storeName',
      headerName: 'Store Name',
      width: 200

    },
    {
      field: 'storeUrl',
      headerName: 'Store URL',
      width: 200
    }
  ];

export default function History() {
    const classes = useStyles();
    const [listProducts, setListProducts] = useState<Product[]>([]);

    const fillProducts = async () => {
        const actionBase = new ActionBase();
        const response = await actionBase.getProducts().then( r => r);
        setListProducts(response.data);
    };

    useEffect(() => {
        fillProducts();
    }, []);

    return (
        <div className={classes.root}>
            <div className={classes.drawerHeader} />
            <Grid container style={{ height: 500}}>
                <Grid item xs={12} className={classes.title}> LIST OF PRODUCTS</Grid>
                {listProducts && (
                    <DataGrid
                        rows={listProducts}
                        columns={columns}
                        pageSize={5}
                        checkboxSelection
                        disableSelectionOnClick
                    />
                )}
            </Grid>
        </div>
    );
}