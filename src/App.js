import './App.css';
import { Suggestic } from "@suggestic/sdk";
import { MealTime } from '@suggestic/sdk/dist/__generated_sdk';
import CustomMealPlan from './components/CutomMealPlan';

require('dotenv').config();

const App = () =>{

  const client = new Suggestic(process.env.REACT_APP_TOKEN);
  const user = client.getUser(process.env.REACT_APP_USER_ID);

  const getCustomMealPlan = async() => {
    const customMealplan = await user.customMealPlan({
        calories: 1600,
        carbs: 0.45,
        protein: 0.25,
        fat: 0.3,
        days: 1,
        format: [MealTime.Breakfast, MealTime.Lunch, MealTime.Dinner]});
    console.log(customMealplan);
  }
  getCustomMealPlan();

  return(
    <div className="App">
      <h2>Welcome to nutrition app</h2>
      <CustomMealPlan />
    </div>
  );
}

export default App;
