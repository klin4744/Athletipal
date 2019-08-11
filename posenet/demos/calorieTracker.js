const addButton = document.getElementById('add-food-btn');
const modal = document.getElementById('modal');
const searchButton = document.getElementById('searchBtn');
const searchInput = document.getElementById('search');
const foodsList = document.getElementById('foods');
const mainList = document.getElementById('list');
import secrets from './secrets';

addButton.addEventListener('click', () => {
   modal.style.display = 'block';
});

modal.addEventListener('click', (event) => {
   if (event.target.id === 'modal') {
      modal.style.display = 'none';
   }
});
searchButton.addEventListener('click', async () => {
   const query = searchInput.value;
   const {data: food} = await axios.get(
      `https://trackapi.nutritionix.com/v2/search/instant?query=${query}`,
      {
         headers: secrets,
      },
   );
   for (let i = 0; i < 5; i++) {
      let current = food.branded[i];
      const li = document.createElement('li');
      li.name = current.brand_name_item_name + '+' + current.nf_calories;
      li.innerHTML = `<div class='brand-item m-2' 
      >
            <h5>Name: ${current.brand_name_item_name}</h5>
            <p>Calories: ${current.nf_calories}</p>
            <button class="btn btn-success li-button w-100" type="button">Add</button>
      </div>`;
      foodsList.appendChild(li);
   }
   Array.from(
      document.getElementsByClassName('btn btn-success li-button'),
   ).forEach((button) =>
      button.addEventListener('click', (event) => {
         const liToAppend = document.createElement('li');
         const names = event.target.parentNode.parentNode.name.split('+');
         liToAppend.innerHTML = `<div class='brand-item m-2' 
         >
               <h5>Name: ${names[0]}</h5>
               <p>Calories: ${names[1]}</p>
               <button class="btn btn-danger li-button w-75" type="button">Remove</button>
         </div>`;
         mainList.appendChild(liToAppend);
         Array.from(
            document.getElementsByClassName('btn btn-danger li-button w-75'),
         ).forEach((button) => {
            button.addEventListener('click', (event) => {
               console.log(
                  event.target.previousElementSibling.innerText.split(' ')[1],
               );
               document.getElementById('cals').innerText =
                  'Total calories: ' +
                  (Number(
                     document.getElementById('cals').innerText.split(' ')[2],
                  ) -
                     Number(
                        button.previousElementSibling.innerText.split(' ')[1],
                     ));
               button.parentNode.remove();
            });
         });
         document.getElementById('cals').innerText =
            'Total calories: ' +
            (Number(document.getElementById('cals').innerText.split(' ')[2]) +
               Number(names[1]));
         foodsList.innerHTML = '';
         modal.style.display = 'none';
      }),
   );
});
