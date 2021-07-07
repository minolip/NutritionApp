import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
    Typography,
    Slide,
    Dialog,
    AppBar,
    Toolbar,
    IconButton,
    Divider,
    Box,
    Card
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import SingleMealPlan from './SingleMealPlan';

const useStyles = makeStyles((theme) => ({
    appBar: {
        position: 'relative',
        backgroundColor: '#000C22',
    },
    title: {
        marginLeft: theme.spacing(2),
        flex: 1,
    },
    dayMealContent: {
        padding: '20px',
        margin: theme.spacing(4)
    }
}));

    const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const MealPlanDialog = ({
    open,
    handleClose,
    mealPlan }) => {

    const classes = useStyles();

    return (
        <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
            <AppBar className={classes.appBar}>
                <Toolbar>
                    <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
                        <CloseIcon />
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        Custom Meal Plans for Requeted Number of Days
                    </Typography>
                </Toolbar>
            </AppBar>
            <Box>
                {mealPlan.length !== 0 && (
                    mealPlan.map((plan, index) => {
                        return (
                            <Card className={classes.dayMealContent} key={index}>
                                <Typography><b>Day&nbsp;&nbsp;{plan.day}</b></Typography>
                                <Divider /><br />
                                <Typography>Number of calories suggested for the day:&nbsp;&nbsp;{plan.calories}</Typography>
                                <SingleMealPlan
                                    mealDetails={plan.meals}
                                />
                            </Card>
                        );
                    })
                )}
                {/* {mealPlan.length === 0 &&(
                    <Typography>Nothing to display</Typography>
                )} */}
            </Box>
        </Dialog>
    );
}

export default MealPlanDialog;