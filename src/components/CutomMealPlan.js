import React, { useEffect, useState } from 'react';
import {
    TextField,
    Button,
    Typography,
    Card
} from '@material-ui/core/';
import { makeStyles } from '@material-ui/core/styles';
import { MealTime } from '@suggestic/sdk/dist/__generated_sdk';
import { Suggestic } from "@suggestic/sdk";
import BackgroundImage from '../images/2.jpg';
import MealPlanDialog from './MealPlanDialog';
require('dotenv').config();

const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        minHeight: '80vh',
        width: '60%'
    },

    requestImage: {
        display: 'flex',
        width: '60%',
        minHeight: '80vh',
        backgroundImage: `url(${BackgroundImage})`,
        backgroundRepeat: 'no-repeat'
    },

    requestForm: {
        display: 'flex',
        width: '40%',
        flexDirection: 'column',
        minHeight: '80vh'
    },

    inputLine: {
        display: 'flex',
        marginBottom: theme.spacing(2),
        marginRight: theme.spacing(2)
    },

    formHeading: {
        color: '#000C22',
        marginTop: theme.spacing(6),
        marginRight: theme.spacing(2),
        marginLeft: theme.spacing(2)
    },

    formContent: {
        margin: theme.spacing(2)
    },

    buttonLine: {
        display: 'flex',
        justifyContent: 'flex-end',
        marginTop: theme.spacing(5),
        '& > *': {
            margin: theme.spacing(2),
            width: '16ch',
        },
    },

    blueBerryButton: {
        backgroundColor: '#000C22',
        color: 'white'
    }
}));

const CustomMealPlan = () => {

    const classes = useStyles();
    const client = new Suggestic(process.env.REACT_APP_TOKEN);
    const user = client.getUser(process.env.REACT_APP_USER_ID);

    const [caloryLevel, setCaloryLevel] = useState('');
    const [carbsLevel, setCarbsLevel] = useState('');
    const [proteinLevel, setProteinLevel] = useState('');
    const [fatsLevel, setFatsLevel] = useState('');
    const [days, setDays] = useState('');  
    const [mealPlan, setMealPLan] = useState([]);

    const [open, setOpen] = useState(false);

    useEffect(() => {
        setMealPLan([]);
    },[]);

    const changeCaloryLevel = (e) => {
        setCaloryLevel(e.target.value);
    }

    const changeCarbsLevel = e => {
        setCarbsLevel(e.target.value);
    }

    const changeProteinLevel = e => {
        setProteinLevel(e.target.value);
    }

    const changeFatLevel = e => {
        setFatsLevel(e.target.value);
    }

    const changeNoOfDays = e => {
        setDays(e.target.value);
    }

    const getCustomMealPlan = async (props) => {
        const customMealplan = await user.customMealPlan(props);
        setMealPLan(customMealplan.customMealPlan);
        console.log("cm", customMealplan);
        handleClickOpen();
    }

    const requestCustomMealPlan = async() => {
        let data = {
            calories: parseFloat(caloryLevel),
            carbs: parseFloat(carbsLevel),
            protein: parseFloat(proteinLevel),
            fat: parseFloat(fatsLevel),
            days: parseInt(days),
            format: [MealTime.Breakfast, MealTime.Lunch, MealTime.Dinner]
        };
        await getCustomMealPlan(data);
        data = {};
    }

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Card className={classes.container}>
            <div className={classes.requestImage} />
            <div className={classes.requestForm}>
                <h2 className={classes.formHeading}>Request Custom Meal Plan</h2>
                <div className={classes.formContent}>
                    <div className={classes.inputLine}>
                        <Typography>Calories:&nbsp;&nbsp;&nbsp;</Typography>
                        <TextField
                            required
                            id="calory"
                            fullWidth
                            value={caloryLevel}
                            onChange={changeCaloryLevel}
                        />
                    </div>
                    <div className={classes.inputLine}>
                        <Typography>Carbohidrates:&nbsp;&nbsp;&nbsp;</Typography>
                        <TextField
                            required
                            id="carbs"
                            fullWidth
                            value={carbsLevel}
                            onChange={changeCarbsLevel}
                        />
                    </div>
                    <div className={classes.inputLine}>
                        <Typography>Protein:&nbsp;&nbsp;&nbsp;</Typography>
                        <TextField
                            required
                            id="protein"
                            fullWidth
                            value={proteinLevel}
                            onChange={changeProteinLevel}
                        />
                    </div>
                    <div className={classes.inputLine}>
                        <Typography>Fats:&nbsp;&nbsp;&nbsp;</Typography>
                        <TextField
                            required
                            id="fats"
                            fullWidth
                            value={fatsLevel}
                            onChange={changeFatLevel}
                        />
                    </div>
                    <div className={classes.inputLine}>
                        <Typography>Days:&nbsp;&nbsp;&nbsp;</Typography>
                        <TextField
                            required
                            id="days"
                            fullWidth
                            value={days}
                            onChange={changeNoOfDays}
                        />
                    </div>
                    <div className={classes.buttonLine}>
                        <Button
                            variant="contained"
                        >
                            Cancel
                        </Button>
                        <Button
                            variant="contained"
                            className={classes.blueBerryButton}
                            onClick={requestCustomMealPlan}
                        >
                            Submit
                        </Button>
                    </div>
                </div>

            </div>
            <MealPlanDialog
                open = {open}
                handleClose = {handleClose}
                mealPlan = {mealPlan}
            />
        </Card>
    );
}

export default CustomMealPlan;
