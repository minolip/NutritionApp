import React, { useEffect, useState } from 'react';
import {
    Typography,
    Button
} from '@material-ui/core/';
import { makeStyles } from '@material-ui/core/styles';
import { 
    Card,
    CardHeader
 } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    buttonLine: {
        display: 'flex',
        justifyContent: 'space-around',
        marginTop: theme.spacing(2),
        '& > *': {
            margin: theme.spacing(2),
        },
    },
    mealButton: {
        backgroundColor: '#100837',
        color: 'white',
        width: '25ch',
    }
}));

const SingleMealPlan = (mealDetails) => {

    const classes = useStyles();
    const [mealArray, setMealArray] = useState([]);

    useEffect(() => {
        setMealArray(mealDetails.mealDetails);
    },[mealDetails]);

    // const mealArray = mealDetails.mealDetails;
    console.log('meals:', mealArray);
    return (
        <div className={classes.buttonLine}>
            {mealArray !== undefined && (
                mealArray.map((meal, index) => {
                    return (
                        <div key={index}>
                            <Button className={classes.mealButton}>{meal.meal}</Button>
                            {/* <Card>
                                <CardHeader className={classes.mealButton}>
                                    <Typography>{meal.meal}</Typography>
                                </CardHeader>
                            </Card> */}
                        </div>
                    );
                })
            )}
        </div>
    );
}

export default SingleMealPlan;