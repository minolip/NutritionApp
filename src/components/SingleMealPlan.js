import React, { useEffect, useState } from 'react';
import {
    Typography
} from '@material-ui/core/';

const SingleMealPlan = (mealDetails) => {

    const [mealArray, setMealArray] = useState([]);

    useEffect(() => {
        setMealArray(mealDetails.mealDetails);
    },[mealDetails]);

    // const mealArray = mealDetails.mealDetails;
    console.log('meals:', mealArray);
    return (
        <div>
            {mealArray !== undefined && (
                mealArray.map((meal, index) => {
                    return (
                        <div key={index}>
                            <Typography>cal: {meal.calories}</Typography>
                            <Typography>cal: {meal.recipe.id}</Typography>
                        </div>
                    );
                })
            )}
        </div>
    );
}

export default SingleMealPlan;