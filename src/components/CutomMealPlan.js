import React, { useState } from 'react';
import {
    TextField,
    Button,
    Typography,
    Input,
    InputLabel
} from '@material-ui/core/';
import { makeStyles } from '@material-ui/core/styles';
import { MealTime } from '@suggestic/sdk/dist/__generated_sdk';
import { Suggestic } from "@suggestic/sdk";
import SingleMealPlan from './SingleMealPlan';
import BackgroundImage from '../images/2.jpg';
require('dotenv').config();

const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        backgroundColor: '#DAF7A6',
        minHeight: '80vh',
        borderRadius: '2%',
        marginLeft: theme.spacing(25),
        marginRight: theme.spacing(25)
    },

    requestImage: {
        display: 'flex',
        width: '60%',
        minHeight: '80vh',
        backgroundImage: `url(${BackgroundImage})`,
        backgroundRepeat: 'no-repeat',
        borderRadius: '2%'
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
        marginRight: theme.spacing(2)
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
    const [requestData, setRequestData] = useState({});
    const [mealPlan, setMealPLan] = useState([]);

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
        setMealPLan(customMealplan.customMealPlan);
        console.log(customMealplan);
    }

    const requestCustomMealPlan = async() => {
        setRequestData({
            calories: parseFloat(caloryLevel),
            carbs: parseFloat(carbsLevel),
            protein: parseFloat(proteinLevel),
            fat: parseFloat(fatsLevel),
            days: 2,
            format: [MealTime.Breakfast, MealTime.Lunch, MealTime.Dinner]
        });
        await getCustomMealPlan(requestData);
    }

    return (
        <div className={classes.container}>
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
            <div>
                {mealPlan.length !== 0 && (
                    mealPlan.map((plan, index) => {
                        return (
                            <div key={index}>
                                <Typography>{plan.calories}</Typography>
                                <Typography>{plan.day}</Typography>
                                <SingleMealPlan
                                    mealDetails={plan.meals}
                                />
                            </div>
                        );
                    })
                )}
                {/* {mealPlan.length === 0 &&(
                    <Typography>Nothing to display</Typography>
                )} */}
            </div>
        </div>
    );
}

export default CustomMealPlan;