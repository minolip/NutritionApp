import react from 'react';
import './CustomMealPlan.css';

const CustomMealPlan = () => {
    const requestCustomMealPlan = () => {
        console.log('click submit button');
    }

    return(
        <div className="container">
            <h2>Request Custom Meal Plan</h2>
            <form className="requestForm" onSubmit={requestCustomMealPlan}>
                <input type="text" name="calory" placeholder="Maximum number of calories do you expect"></input>
                <input type="text" name="carbs" placeholder="Maximum number of carbohidrate level do you expect"></input>
                <input type="text" name="protein" placeholder="Maximum number of protein level do you expect"></input>
                <input type="text" name="fats" placeholder="Maximum number of fat level do you expect"></input>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default CustomMealPlan;