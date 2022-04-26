import React from "react";
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Drawer,
  Divider,
  List,
  ListItem,
  ListItemText
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import { useHistory } from "react-router-dom";
import { MenuRoutes } from "./Navigation";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex"
  },
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    width: `calc(100% - 240px)`,
    marginLeft: 240,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  hide: {
    display: "none"
  },
  drawer: {
    width: 240,
    flexShrink: 0
  },
  drawerPaper: {
    width: 240
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: "flex-end"
  }
}));

type MenuProps = {
  open: boolean;
  handleDrawer: any;
};

export default function Menu({ open, handleDrawer }: MenuProps) {
  const classes = useStyles();
  const theme = useTheme();
  const history = useHistory();

  const handleMenuOption = (menu: string) => {
    handleDrawer();
    history.push(menu);
  };

  return (
    <div className={classes.root}>
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawer}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            Menu
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawer}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </div>
        <Divider />
        <List>
          <ListItem button onClick={() => handleMenuOption(MenuRoutes.LANDING)}>
            <ListItemText primary="Landing Page" />
          </ListItem>
          <ListItem
            button
            onClick={() => handleMenuOption(MenuRoutes.LISTPRODUCT)}
          >
            <ListItemText primary="List of Products" />
          </ListItem>
          <ListItem
            button
            onClick={() => handleMenuOption(MenuRoutes.ITEMPAGE)}
          >
            <ListItemText primary="Add new Item" />
          </ListItem>
          <ListItem
            button
            onClick={() => handleMenuOption(MenuRoutes.DELETEPRODUCT)}
          >
            <ListItemText primary="Delete new Item" />
          </ListItem>
        </List>
      </Drawer>
    </div>
  );
}
