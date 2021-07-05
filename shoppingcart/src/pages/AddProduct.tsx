import React, { useState } from "react";
import { Grid, Button, TextField, Typography } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import ActionBase from "../actions/ActionBase";
import Product from '../components/Product';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
        display: 'flex',
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
    },
    addedItem: {
        fontWeight: 'bold',
        marginBottom: 16,
        marginTop: 10
    }
  })
);  

export default function AddProduct() {
    const classes = useStyles();
    const [name, setName] = useState('');
    const [storeName, setStoreName] = useState('');
    const [storeUrl, setStoreUrl] = useState('');
    const [isAdded, setIsAdded] = useState(false);

    const handleChange = (type: string) => (e: { target: { value: any; }; }) => {
        const n = e.target.value;
        if (type === 'name') {
            setName(n);
        }
        if (type === 'storeName') {
            setStoreName(n);
        }
        if (type === 'storeUrl') {
            setStoreUrl(n);
        }
    }

    const handleAdd = () => {
        setIsAdded(false);
        const actionBase = new ActionBase();
        const newProduct:Product = {
            name,
            storeName,
            storeUrl
        };
        const result = actionBase.createItem(newProduct);
        result.then(r => {
            if (r.status === 200) {
                setIsAdded(true);
                setName('');
                setStoreUrl('');
                setStoreName('');
            }
        })
    }

    return (
        <div className={classes.root}>
            <div className={classes.drawerHeader} />
            <Grid container >
                <Grid item xs={12} className={classes.title}> ADD A NEW PRODUCTS</Grid>
                {isAdded && (
                    <Grid item xs={12}>
                        <Typography className={classes.addedItem}>Success adding Image!</Typography>
                    </Grid>
                )}
                <Grid item xs={12}>
                    <TextField required id="name" label="Product Name" defaultValue={name} onChange={handleChange('name')} />
                </Grid>
                <Grid item xs={12}>
                    <TextField required id="store" label="Store Name" defaultValue={storeName} onChange={handleChange('storeName')} />
                </Grid>
                <Grid item xs={12}>
                    <TextField required id="storeUrl" label="Store URL" defaultValue={storeUrl} onChange={handleChange('storeUrl')} />
                </Grid>
                <Grid item xs={12} className={classes.addedItem}>
                <Button variant="outlined" color="primary" onClick={handleAdd}>
                    Add New Product
                </Button>
                </Grid>
            </Grid>
        </div>
    );
}