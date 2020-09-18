import React, {useState} from 'react';
import clsx from 'clsx';
import {get, reduce} from 'lodash';
import { makeStyles, useTheme, Theme, createStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import TreeView from '@material-ui/lab/TreeView';
import TreeItem from '@material-ui/lab/TreeItem';
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Avatar from '@material-ui/core/Avatar';

import Table from './Table'
import "./Header.css";

const categories = [
  {
    "id": 1,
    "name": "Bebidas",
    "sublevels": [
      {
        "id": 1,
        "name": "Gaseosas",
        "sublevels": [
          {
            "id": 2,
            "name": "Con azúcar"
          },
          {
            "id": 3,
            "name": "Sin azúcar"
          }
        ]
      }
    ]
  },
  {
    "id": 2,
    "name": "Desayunos",
    "sublevels": [
      {
        "id": 4,
        "name": "Calientes",
        "sublevels": [
          {
            "id": 5,
            "name": "Avena"
          },
          {
            "id": 6,
            "name": "Cafes",
            "sublevels": [
              {
                "id": 7,
                "name": "Late"
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "id": 8,
    "name": "Almuerzos",
    "sublevels": [
      {
        "id": 9,
        "name": "Carnes"
      },
      {
        "id": 10,
        "name": "Ensaladas"
      }
    ]
  },
  {
    "id": 11,
    "name": "Vinos",
    "sublevels": [
      {
        "id": 12,
        "name": "Tintos"
      },
      {
        "id": 13,
        "name": "Blancos"
      }
    ]
  }

]


const drawerWidth = 240;



const useStyles = makeStyles((theme) =>
  createStyles({
    tree: {
      textAlign: 'left',
      flexGrow: 1,
      maxWidth: 400,
    },
    root: {
      display: 'flex',
    },
    appBar: {
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    appBarShift: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    hide: {
      display: 'none',
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    drawerPaper: {
      width: drawerWidth,
    },
    drawerHeader: {
      display: 'flex',
      alignItems: 'center',
      padding: theme.spacing(0, 1),
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
      justifyContent: 'flex-end',
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      marginLeft: -drawerWidth,
    },
    contentShift: {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    },
  }),
);


const MiniDrawer = () =>{
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const buildRecursiveMenu = (items)=>(
    <TreeView
      className={classes.tree}
      defaultCollapseIcon={<ExpandMoreIcon />}
      defaultExpandIcon={<ChevronRightIcon />}
    >
      {
        items.map((item, index)=>{
          return(
            <TreeItem nodeId={index} label={item.name}>
              {item.sublevels && // esto es equivalente a que fuera hecho un if(item.sublevels){...}
              buildRecursiveMenu(item.sublevels)
              }
            </TreeItem>
          )
        })
      }
    </TreeView>
  )


  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            El Retoooo
          </Typography>

        </Toolbar>
        <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg"><img src="./img/perfil.JPG" alt=""/></Avatar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </div>
        <Divider />
        { buildRecursiveMenu(categories) }
      </Drawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <div className={classes.drawerHeader} />
        <Table/>
        <div/>
      </main>
    </div>
  );
}
export default MiniDrawer;

