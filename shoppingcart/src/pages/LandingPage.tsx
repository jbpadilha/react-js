import React, { useEffect , useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import { ButtonBase, Typography } from '@material-ui/core';

import { setInterval } from "timers";

const IMAGES = [
    {
        url: 'https://i.cbc.ca/1.4714852.1582235125!/fileImage/httpImage/russia-soccer-wcup-burger-bungle.jpg',
        title: 'BK - Burger King Whopper',
        description: 'Description of First Image! Description of First Image! Description of First Image! Description of First Image! Description of First Image!'
    },
    {
        url: 'https://pbs.twimg.com/media/BgHdBuxCYAAtCpM.png',
        title: 'BK - Burger King - Picanha',
        description: 'Description of Second Image! Description of Second Image! Description of Second Image! Description of Second Image! Description of Second Image!'
    }
]

const useStyles = makeStyles((theme) => ({
    drawerHeader: {
      display: 'flex',
      alignItems: 'center',
      padding: theme.spacing(0, 1),
      ...theme.mixins.toolbar,
      justifyContent: 'flex-end',
    },
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        minWidth: 300,
        width: '100%',
      },
    image: {
        position: 'relative',
        height: 700,
        [theme.breakpoints.down('xs')]: {
            width: '100% !important', // Overrides inline-style
            height: 100,
        },
        '&:hover, &$focusVisible': {
            zIndex: 1,
            '& $imageBackdrop': {
            opacity: 0.15,
            },
            '& $imageTitle': {
            border: '4px solid currentColor',
            },
        },
    },
    focusVisible: {},
    imageButton: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: theme.palette.common.white,
    },
    imageSrc: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        backgroundSize: 'cover',
        backgroundPosition: 'center 100%'
    },
    imageBackdrop: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        backgroundColor: theme.palette.common.black,
        opacity: 0.4,
        transition: theme.transitions.create('opacity'),
    },
    imageTitle: {
        position: 'relative',
        padding: `${theme.spacing(2)}px ${theme.spacing(4)}px ${theme.spacing(1) + 6}px`,
    },
    imageDescription: {
        textAlign: 'justify'
    }
}));

export default function LandingPage() {
    const classes = useStyles();
    const [banner, setBanner] = useState(IMAGES[0]);

    useEffect(() => {
        setInterval(() => {
            const index = Math.floor(Math.random() * IMAGES.length);
            setBanner(IMAGES[index]);
        }, 10000);
    }, []);

    return (
        <div className={classes.root}>
            <div className={classes.drawerHeader} />
            <ButtonBase
                focusRipple
                key={banner.title}
                className={classes.image}
                focusVisibleClassName={classes.focusVisible}
                style={{
                    width: '100%',
                }}
            >
                <span
                    className={classes.imageSrc}
                    style={{
                    backgroundImage: `url(${banner.url})`,
                    }}
                />
                <span className={classes.imageBackdrop} />
                <span className={classes.imageButton}>
                    <Typography
                    component="span"
                    variant="subtitle1"
                    color="inherit"
                    className={classes.imageTitle}
                    >
                    {banner.title}
                    </Typography>
                </span>
            </ButtonBase>
            <Typography className={classes.imageDescription}>{banner.description}</Typography>
        </div>
    );
}