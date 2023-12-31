class CalorieTracker{
     constructor(){
          this._calorieLimit = Storage.getCalorieLimit();
          this._totalCalorie = Storage.getTotalCalorie(0);
          this._meals = Storage.getMeals();
          this._workouts = Storage.getWorkouts();

          this._displayCalorieLimit();
          this._displayCalorieTotal();
          this._displayCalorieComsumed();
          this._displayCalorieBurned();
          this._displayCalorieRemain();
          this._displayProgressRemain();

          document.getElementById('limit').value = this._calorieLimit;
          
     }

     //public method//
     addMeal(meal){
          this._meals.push(meal);
          this._totalCalorie += meal.calorie;
          Storage.updateTotalCalorie(this._totalCalorie);
          Storage.setMeals(meal);
          this._displayAddedMeal(meal);
          this._render();
     }

     addWorkout(workout){
          this._workouts.push(workout);
          this._totalCalorie -= workout.calorie;
          Storage.updateTotalCalorie(this._totalCalorie);
          Storage.setWorkouts(workout);
          this._displayAddedWokout(workout);
          this._render()
     }

     removeMeal(id) {
          // console.log(this._meals);
          const index = this._meals.findIndex((meal) => meal.id === id);
          console.log(index);
          
          if (index !== -1) {
               const meal = this._meals[index];
               // console.log(this._meals[index]);
               // console.log(meal);
               confirm('Are you sure you want to delete?');
               this._totalCalorie -= meal.calorie;
               Storage.updateTotalCalorie(this._totalCalorie);
               this._meals.splice(index, 1);
               Storage.removeStorageMeals(id);
               this._render();
          }
     }

     
     removeWrokout(id) {
     const index = this._workouts.findIndex((workout) => workout.id === id);
     console.log(index);
     
          if (index !== -1) {
               const workout = this._workouts[index];
               confirm('Are you sure you want to delete?');
               this._totalCalorie += workout.calorie;
               Storage.updateTotalCalorie(this._totalCalorie);
               this._workouts.splice(index, 1);
               Storage.removeStorageWorkouts(id);
               this._render();
          }
     }

     changeLimit(value){
          this._calorieLimit = value;
          Storage.setCalorieLimit(value);
          this._displayCalorieLimit();
          this._render();
     }

     reset(){
          this._totalCalorie = 0;
          this._meals = [];
          this._workouts = [];
          this._render();
     }

     loadItems(){
          this._meals.forEach(meal => this._displayAddedMeal(meal));
          this._workouts.forEach(workout => this._displayAddedWokout(workout));
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
          mealElement.classList.add('card', 'my-2')
          mealElement.setAttribute('data-id', meal.id);
          mealElement.innerHTML = `
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
          `; 

          mealsElement.appendChild(mealElement);
     }

     _displayAddedWokout(workout){
          const workoutsElement = document.getElementById('workout-items');
          const workoutElement = document.createElement('div');
          workoutElement.classList.add('card', 'my-2')
          workoutElement.setAttribute('data-id', workout.id);
          workoutElement.innerHTML = `
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

class Storage{
     static getCalorieLimit(defaultCalorieLimit = 2000){
          let newcalorieLimit;
          if(localStorage.getItem('calorieLimit') === null){
               newcalorieLimit = defaultCalorieLimit;
          }else{
               newcalorieLimit = +localStorage.getItem('calorieLimit');
          }
          return newcalorieLimit;
     }

     static setCalorieLimit(calorielimit){
          localStorage.setItem('calorieLimit', calorielimit);
     }

     static getTotalCalorie(totalCalorieDefalult = 0){
          let totalCalorie;
          if(localStorage.getItem('totalCalorie') === null){
               totalCalorie = totalCalorieDefalult;
          }else{
               totalCalorie = +localStorage.getItem('totalCalorie');
          }
          return totalCalorie;
     }

     static updateTotalCalorie(updateCalorie){
          localStorage.setItem('totalCalorie', updateCalorie);
     }

     static getMeals(){
          let meals;
          if(localStorage.getItem('meals') === null){
               meals = [];
          }else{
               meals = JSON.parse(localStorage.getItem('meals'));
          }
          return meals;
     }
     static setMeals(meal){
          const meals = Storage.getMeals();
          // console.log(meals);
          meals.push(meal);
          localStorage.setItem('meals', JSON.stringify(meals));
     }

     static removeStorageMeals(id){
          const meals = Storage.getMeals();
          meals.forEach((meal, index) => {
               if(meal.id === id){
                    meals.splice(index, 1);
               }
          });
          localStorage.setItem('meals', JSON.stringify(meals));
     }

     static getWorkouts(){
          let workouts;
          if(localStorage.getItem('workouts') === null){
               workouts = [];
          }else{
               workouts = JSON.parse(localStorage.getItem('workouts'));
          }
          return workouts;
     }
     static setWorkouts(workout){
          const workouts = Storage.getWorkouts();
          // console.log(meals);
          workouts.push(workout);
          localStorage.setItem('workouts', JSON.stringify(workouts));
     }
     static removeStorageWorkouts(id){
          const workouts = Storage.getWorkouts();
          workouts.forEach((workout, index) => {
               if(workout.id === id){
                    workouts.splice(index, 1);
               }
          });
          localStorage.setItem('workouts', JSON.stringify(workouts));
     }

     static clearAll(){
          localStorage.removeItem('totalCalorie');
          localStorage.removeItem('meals');
          localStorage.removeItem('workouts');
     }
}

class App{
     constructor(){
          this._tracker = new CalorieTracker();

          document.getElementById('meal-form').addEventListener('submit', this._newFoodAndWorkout.bind(this, 'meal'));
          document.getElementById('workout-form').addEventListener('submit', this._newFoodAndWorkout.bind(this, 'workout'));
          document.getElementById('meal-items').addEventListener('click', this._removeItem.bind(this, 'meal'));
          document.getElementById('workout-items').addEventListener('click', this._removeItem.bind(this, 'workout'));
          document.getElementById('filter-meals').addEventListener('keyup', this._filterItems.bind(this, 'meal'));
          document.getElementById('filter-workouts').addEventListener('keyup', this._filterItems.bind(this, 'workout'));
          document.getElementById('reset').addEventListener('click', this._reset.bind(this));
          document.getElementById('limit-form').addEventListener('submit', this._changeCalorieLimit.bind(this));
          this._tracker.loadItems();
     }

     _filterItems(type, e){
          const typedText = e.target.value.toLowerCase();
          console.log(typedText);
          document.querySelectorAll(`#${type}-items .card`).forEach(item => {
               const name = item.firstElementChild.firstElementChild.textContent;
               console.log(name);

               if(name.toLowerCase().indexOf(typedText) !== -1){
                    item.style.display = 'block';
               }else{
                    item.style.display = 'none';
               }
          })
     }

     _removeItem(type, e){
          // console.log(e.target);
          if(e.target.classList.contains('delete') || e.target.classList.contains('fa-xmark')){
               const id = e.target.closest('.card').getAttribute('data-id');
               type === 'meal'
               ? this._tracker.removeMeal(id)
               : this._tracker.removeWrokout(id);

               e.target.closest('.card').remove();
          }
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

     _reset(){
          this._tracker.reset();
          document.getElementById('meal-items').innerHTML = '';
          document.getElementById('workout-items').innerHTML = '';
          document.getElementById('filter-meals').value = '';
          document.getElementById('filter-workouts').value = '';
          Storage.clearAll();
     }

     _changeCalorieLimit(e){
          e.preventDefault();
          const calorieLimit = document.getElementById('limit');
          if(calorieLimit.value === ''){
               alert('The form should not be empty.');
               return;
          }
          this._tracker.changeLimit(+calorieLimit.value);
          // console.log(calorieLimit.value);
          calorieLimit.value = '';

          //close the modal
          const modalElement = document.getElementById('limit-modal');
          const modal = bootstrap.Modal.getInstance(modalElement);
          modal.hide();
     }
}

const app = new App();

