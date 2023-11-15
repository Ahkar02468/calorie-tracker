class CalorieTracker{
     constructor(){
          this._calorieLimit = 2000;
          this._totalCalorie = 0;
          this._meals = [];
          this._workouts = [];

          this._displayCalorieLimit();
          this._displayCalorieTotal();
          this._displayCalorieComsumed();
          this._displayCalorieBurned();
          this._displayCalorieRemain();
          
     }

     //public method//
     addMeal(meal){
          this._meals.push(meal);
          this._totalCalorie += meal.calorie;
          this._render();
     }

     addWorkout(workout){
          this._workouts.push(workout);
          this._totalCalorie -= workout.calorie;
          this._render()
     }

     //prvate method
     _displayCalorieTotal(){
          const CalorieTotalEL = document.getElementById('calories-total');
          CalorieTotalEL.innerHTML = this._totalCalorie;
     }

     _displayCalorieLimit(){
          const calorieLimitEL = document.getElementById('calories-limit');
          calorieLimitEL.innerHTML = this._calorieLimit;
     }

     _displayCalorieComsumed(){
          const CalorieComsumedEL = document.getElementById('calories-consumed');
          const comsumed = this._meals.reduce((total, meal) => total + meal.calorie, 0);

          CalorieComsumedEL.innerHTML = comsumed;
     }

     _displayCalorieBurned(){
          const CalorieBurnedEL = document.getElementById('calories-burned');
          const burned = this._workouts.reduce((total, workout) => total + workout.calorie, 0);

          CalorieBurnedEL.innerHTML = burned;
     }

     _displayCalorieRemain(){
          const CalorieRemainEL = document.getElementById('calories-remaining');
          // console.log(burned);
          const remain = this._calorieLimit - this._totalCalorie;

          CalorieRemainEL.innerHTML = remain;
     }
     //need to render under method when the method is called in constructor and as soon as the instace is changed
     _render(){
          this._displayCalorieTotal();
          this._displayCalorieComsumed();
          this._displayCalorieBurned();
          this._displayCalorieRemain();
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
const drink = new Meal('Orange Juice', 300);
tracker.addMeal(drink);
tracker.addMeal(breakfast);

const run  = new Workout('run', 500);
tracker.addWorkout(run);

// console.log(tracker._meals);
// console.log(tracker._workouts);
// console.log(tracker._totalCalorie);

