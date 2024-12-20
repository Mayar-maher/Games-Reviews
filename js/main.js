const rowBox=document.getElementById('rowBox');
const clickInner = document.querySelector('.click-inner');
const navBar = document.querySelector('.navbar');
const imgBack = document.querySelector('.imgBack');
const closeButton = clickInner.querySelector('.btn-close');
let games=[];
let btns = document.querySelectorAll(".nav-link");


const options = {
	method: 'GET',
	headers: {
		'x-rapidapi-key': 'a3f2c7ff3amsh46cde6fdd2cbe5dp1fcd58jsn4f571d13ea1a',
		'x-rapidapi-host': 'free-to-play-games-database.p.rapidapi.com'
	}
};

async function getGame(id) {
  let data = await fetch(
    `https://free-to-play-games-database.p.rapidapi.com/api/games?category=${id ? id : "mmorpg"}`,options
  );
  let res=await data.json();
  games=res;
  display();
  console.log(res);
  
}
getGame();

function display(){
  let blackBox='';
  for(let i=0;i<games.length;i++){
    blackBox += ` <div class="col-md-3">
        <div class="card m-1 bg-dark" data-index="${i}">
          <img class="w-100 p-2" src="${games[i].thumbnail}" alt="img" />
          <div class="d-flex justify-content-between align-items-center px-3">
            <h5 class="text-white">${games[i].title}</h5> 
            <button class="btn custom-bg rounded">Free</button>
          </div>
          <p class="text-center text-muted ">${games[i].short_description}</p>
          <div class="d-flex justify-content-between align-items-center mt-3 border-top border-secondary">
            <button class="btn rounded text-muted ">MMORPG</button>
            <button class="btn rounded text-muted ">PC (Windows)</button>
          </div>
        </div>
        
      </div>`;
  }
  rowBox.innerHTML=blackBox;


   // Attach event listeners to the cards 
   const cards = document.querySelectorAll('.card');
   cards.forEach((card) => {
     card.addEventListener('click', function () {
       const index = this.getAttribute('data-index');
       showGameDetails(index);
     });
   });
}


// new data when i click on navs
btns.forEach(function(btn){
  btn.addEventListener('click',function(){
    getGame(btn.innerHTML);
  })
  })


// ---------------------- 
function showGameDetails(index) {
  const game = games[index];
  console.log(game);
  
  clickInner.querySelector('img').src = game.thumbnail;
  clickInner.querySelector('h3').textContent = `Title: ${game.title}`;
  clickInner.querySelectorAll('p span')[0].textContent = game.genre;
  clickInner.querySelectorAll('p span')[1].textContent = game.platform;
  clickInner.querySelectorAll('p span')[2].textContent = game.id;

  // Hide other sections and show `.click-inner` section 
  rowBox.parentElement.classList.add('d-none');
  navBar.classList.add('d-none');
  imgBack.classList.add('d-none'); 
  clickInner.classList.remove('d-none'); 
}


// Close the `.click-inner` section 
closeButton.addEventListener('click', () => {
  clickInner.classList.add('d-none'); 
  rowBox.parentElement.classList.remove('d-none'); 
  navBar.classList.remove('d-none'); 
  imgBack.classList.remove('d-none'); 
});

