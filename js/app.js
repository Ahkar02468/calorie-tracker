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
          this._displayProgressRemain();
          
     }

     //public method//
     addMeal(meal){
          this._meals.push(meal);
          this._totalCalorie += meal.calorie;
          this._displayAddedMeal(meal);
          this._render();
     }

     addWorkout(workout){
          this._workouts.push(workout);
          this._totalCalorie -= workout.calorie;
          this._displayAddedWokout(workout);
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
          const calorieRemainEL = document.getElementById('calories-remaining');
          const calorieProgressEL = document.getElementById('calorie-progress');
          // console.log(burned);
          const remain = this._calorieLimit - this._totalCalorie;

          calorieRemainEL.innerHTML = remain;

          if(remain <= 0){
               calorieRemainEL.parentElement.parentElement.classList.remove('bg-light');
               calorieRemainEL.parentElement.parentElement.classList.add('bg-danger');
               calorieProgressEL.classList.add('bg-danger');
               calorieProgressEL.classList.remove('bg-success');
          }else{
               calorieRemainEL.parentElement.parentElement.classList.remove('bg-danger');
               calorieRemainEL.parentElement.parentElement.classList.add('bg-light'); 
               calorieProgressEL.classList.add('bg-success');
               calorieProgressEL.classList.remove('bg-danger');
          }
     }

     _displayProgressRemain(){
          const calorieProgressEL = document.getElementById('calorie-progress');
          // console.log(burned);
          const percent = (this._totalCalorie / this._calorieLimit) * 100;
          const width = Math.min(percent, 100);
          // console.log(width);

          calorieProgressEL.style.width = `${width}%`;
          // console.log(calorieProgressEL.classList);
          
     }

     _displayAddedMeal(meal){
          const mealsElement = document.getElementById('meal-items');
          const mealElement = document.createElement('div');
          mealElement.innerHTML = `
               <div class="card my-2">
               <div class="card-body">
                    <div class="d-flex align-items-center justify-content-between">
                    <h4 class="mx-1">${meal.name}</h4>
                         <div
                              class="fs-1 bg-primary text-white text-center rounded-2 px-2 px-sm-5"
                         >
                              ${meal.calorie}
                         </div>
                    <button class="delete btn btn-danger btn-sm mx-2">
                         <i class="fa-solid fa-xmark"></i>
                    </button>
                    </div>
               </div>
          </div>
          `; 

          mealsElement.appendChild(mealElement);
     }

     _displayAddedWokout(workout){
          const workoutsElement = document.getElementById('workout-items');
          const workoutElement = document.createElement('div');
          workoutElement.innerHTML = `
          <div class="card my-2">
              <div class="card-body">
                <div class="d-flex align-items-center justify-content-between">
                  <h4 class="mx-1">${workout.name}</h4>
                  <div
                    class="fs-1 bg-secondary text-white text-center rounded-2 px-2 px-sm-5"
                  >
                    ${workout.calorie}
                  </div>
                  <button class="delete btn btn-danger btn-sm mx-2">
                    <i class="fa-solid fa-xmark"></i>
                  </button>
                </div>
              </div>
            </div>
          `; 

          workoutsElement.appendChild(workoutElement);
     }
     //need to render under method when the method is called in constructor and as soon as the instace is changed
     _render(){
          this._displayCalorieTotal();
          this._displayCalorieComsumed();
          this._displayCalorieBurned();
          this._displayCalorieRemain();
          this._displayProgressRemain()
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

class App{
     constructor(){
          this._tracker = new CalorieTracker();

          document.getElementById('meal-form').addEventListener('submit', this._newFoodAndWorkout.bind(this, 'meal'));
          document.getElementById('workout-form').addEventListener('submit', this._newFoodAndWorkout.bind(this, 'workout'));
     }

     _newFoodAndWorkout(type, e){
          e.preventDefault();
          // console.log(this);
          const name = document.getElementById( `${type}-name`);
          const calories = document.getElementById(`${type}-calories`);

          if(name.value === '' || calories.value === ''){
               alert('The form can not be empty.');
               return;
          }
          if(type === 'meal'){
               const meal = new Meal(name.value, +calories.value);
               this._tracker.addMeal(meal);
          }else{
               const workout = new Workout(name.value, +calories.value);
               this._tracker.addWorkout(workout);
          }
          name.value = '';
          calories.value = '';

          const collapseItem = document.getElementById(`collapse-${type}`);
          const bsCollapse = new bootstrap.Collapse(collapseItem, {
               toggle: true
          });

     }
}

const app = new App();

