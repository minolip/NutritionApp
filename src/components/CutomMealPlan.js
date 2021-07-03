import React, { useState } from 'react';
import {
    TextField,
    Button
} from '@material-ui/core/';
import { makeStyles } from '@material-ui/core/styles';
import { MealTime } from '@suggestic/sdk/dist/__generated_sdk';
import { Suggestic } from "@suggestic/sdk";
require('dotenv').config();

const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#DAF7A6',
        alignItems: 'center'
    },

    requestForm: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'
    },

    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
}));

const CustomMealPlan = () => {

    const classes = useStyles();
    const client = new Suggestic(process.env.REACT_APP_TOKEN);
    const user = client.getUser(process.env.REACT_APP_USER_ID);

    const [caloryLevel, setCaloryLevel] = useState(0);
    const [carbsLevel, setCarbsLevel] = useState(0);
    const [proteinLevel, setProteinLevel] = useState(0);
    const [fatsLevel, setFatsLevel] = useState(0);

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

    const getCustomMealPlan = async (props) => {
        const customMealplan = await user.customMealPlan(props);
        console.log(customMealplan);
    }

    const requestCustomMealPlan = () => {
        const data = {
            calories: parseFloat(caloryLevel),
            carbs: parseFloat(carbsLevel),
            protein: parseFloat(proteinLevel),
            fat: parseFloat(fatsLevel),
            days: 1,
            format: [MealTime.Breakfast, MealTime.Lunch, MealTime.Dinner]
        };
        getCustomMealPlan(data);
    }

    return (
        <div className={classes.container}>
            <h2>Request Custom Meal Plan</h2>
            <div className={classes.requestForm}>
                <div className={classes.root}>
                    <TextField
                        required
                        id="calory"
                        label="Calories"
                        variant="filled"
                        value={caloryLevel}
                        onChange={changeCaloryLevel}
                    />
                    <TextField
                        required
                        id="carbs"
                        label="Carbohidrates"
                        variant="filled"
                        value={carbsLevel}
                        onChange={changeCarbsLevel}
                    />
                    <TextField
                        required
                        id="protein"
                        label="Protein"
                        variant="filled"
                        value={proteinLevel}
                        onChange={changeProteinLevel}
                    />
                    <TextField
                        required
                        id="fats"
                        label="Fats"
                        variant="filled"
                        value={fatsLevel}
                        onChange={changeFatLevel}
                    />
                </div>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={requestCustomMealPlan}
                >
                    Submit
                </Button>
            </div>
        </div>
    );
}

export default CustomMealPlan;