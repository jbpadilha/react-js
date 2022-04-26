import React, { useState, lazy } from "react";
import { Route, Switch } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import LandingPage from "./LandingPage";
import Menu from "./Menu";
import clsx from "clsx";

const History = lazy(() => import("./History"));
const AddProduct = lazy(() => import("./AddProduct"));

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex"
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    marginLeft: -240
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    }),
    marginLeft: 0
  }
}));

export enum MenuRoutes {
  LANDING = "/",
  ITEMPAGE = "/product",
  LISTPRODUCT = "/products",
  DELETEPRODUCT = "/delete"
}

export default function Navigation() {
  const classes = useStyles();

  const [open, setOpen] = useState(false);

  const handleDrawer = () => {
    setOpen(!open);
  };

  return (
    <div className={classes.root}>
      <Menu open={open} handleDrawer={handleDrawer} />
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open
        })}
      >
        <Switch>
          <Route
            exact
            path={MenuRoutes.LANDING}
            render={() => <LandingPage />}
          />
          <Route
            exact
            path={MenuRoutes.LISTPRODUCT}
            render={() => <History />}
          />
          <Route
            exact
            path={MenuRoutes.ITEMPAGE}
            render={() => <AddProduct />}
          />
        </Switch>
      </main>
    </div>
  );
}
