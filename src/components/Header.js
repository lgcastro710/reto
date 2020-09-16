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
import "./Header.css";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Avatar from '@material-ui/core/Avatar';
import Table from './Table';




const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: 36,
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
    },
    drawerOpen: {
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerClose: {
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        overflowX: 'hidden',
        width: theme.spacing(7) + 1,
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9) + 1,
        },
    },
    toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
}));

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

    const buildAllItemsMenu = (items) =>{
        return( reduce(items.categories, (list,category,i) =>{
            return list.concat(buildChildrenMenu(category, true));
        },[]));
    }
​
    const buildChildrenMenu = (rawItem, parent) => {
        let item = buildItem(rawItem,  parent || null);
        if(get(rawItem, 'sublevels')){
            return {
                ...item, children:
                    reduce(rawItem.sublevels, (final,children)=> {
                        return final.concat(get(children,'sublevels')
                            ? buildChildrenMenu(children,false)
                            : buildItem(children, false) )
                    },[])
            };
        }else{
            return { ...item };
        }
    }
​
    const buildItem = (rawItem,isParent) => {
        return {
            title : rawItem.name || 'unknow',
            link: isParent ? [] : `/pages/products/${rawItem.id}` || 'unknow',
            pathMatch: 'full'
        }
    }

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
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"

                    >
                        <ListItem button >
                            <span className="tete">Categorias</span>

                        </ListItem>
                    </AccordionSummary>
                    <AccordionDetails>
                        <List>
                            {categories.map((category, index) => (
                                <Accordion>
                                    <AccordionSummary
                                        expandIcon={<ExpandMoreIcon />}
                                        aria-controls="panel1a-content"
                                        id="panel1a-header"

                                    >
                                        <ListItem button key={index}>
                                            <span>{category.name}</span>

                                        </ListItem>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <List>
                                            {category.sublevels.map((sublevel, index2) => (
                                                <Accordion>
                                                    <AccordionSummary
                                                        expandIcon={<ExpandMoreIcon />}
                                                        aria-controls="panel1a-content"
                                                        id="panel1a-header"

                                                    >
                                                        <ListItem button key={index2}>
                                                            <span>{sublevel.name}</span>
                                                        </ListItem>
                                                    </AccordionSummary>
                                                    <AccordionDetails>
                                                        <List>
                                                            {category.sublevels.map((sublevel, index3) => (
                                                                <ListItem button key={index3}>
                                                                    {!sublevel.sublevels &&
                                                                    <span>{sublevel.name}</span>
                                                                    }
                                                                    {sublevel.sublevels &&
                                                                    sublevel.sublevels.map((_sublevel, index3) => (
                                                                        <List>
                                                                            <ListItem button key={index3}>
                                                                                <span>{_sublevel.name}</span>
                                                                            </ListItem>
                                                                        </List>
                                                                    ))}
                                                                </ListItem>
                                                            ))}
                                                        </List>
                                                    </AccordionDetails>
                                                </Accordion>

                                            ))}
                                        </List>
                                    </AccordionDetails>
                                </Accordion>
                            ))}
                        </List>
                    </AccordionDetails>
                </Accordion>

            </Drawer>
            <main
                className={clsx(classes.content, {
                    [classes.contentShift]: open,
                })}
            >
                <div className={classes.drawerHeader} />
                <Table></Table>
                <div/>
            </main>
        </div>
    );
}
export default MiniDrawer;
