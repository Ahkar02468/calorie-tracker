class CalorieTracker{
     constructor(){
          this._calorieLimit = 2000;
          this._totalCalorie = 0;
          this._meals = [];
          this._workouts = [];
     }

     addMeal(meal){
          this._meals.push(meal);
          this._totalCalorie += meal.calorie;
     }

     addWorkout(workout){
          this._workouts.push(workout);
          this._totalCalorie -= workout.calorie;
     }
}

class Meal{
     constructor(name, calorie){
          this.id = Math.random().toString(16).slice(2);
          this.name = name;
          this.calorie = calorie;
     }
}

class Workout{
     constructor(name, calorie){
          this.id = Math.random().toString(16).slice(2);
          this.name = name;
          this.calorie = calorie;
     }
}

const tracker = new CalorieTracker();

const breakfast  = new Meal('Bread', 1000);
const run  = new Workout('run', 500);
tracker.addMeal(breakfast);
tracker.addWorkout(run);

console.log(tracker._meals);
console.log(tracker._workouts);
console.log(tracker._totalCalorie);

