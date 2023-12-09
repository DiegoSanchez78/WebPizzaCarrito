const carrito = document.getElementById('carrito');
const pizzas = document.getElementById('lista-pizzas');
const listapizzas = document.querySelector('#lista-carrito tbody')
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
const totalCarrito = document.querySelector('#total');

eventslisteners();

function eventslisteners() 
{
    pizzas.addEventListener('click', comprarpizza);
    carrito.addEventListener('click', eliminarpizza);

    vaciarCarritoBtn.addEventListener('click', vaciarcarrito);

    document.addEventListener('DOMContentLoaded', leerLS)
    

}

function calcularTotal() {
    const pizzas = obtenerpizzasLocalStorage();
    let total = 0;
  
    pizzas.forEach((pizza) => {
      total += parseInt(pizza.precio) 
      
    });

   
    return total;
  }
 
  

function comprarpizza(e) 
{
    e.preventDefault();
    if (e.target.classList.contains("agregar-carrito")) {
        const pizza = e.target.parentElement.parentElement;
        leerDatospizza(pizza);
    }    
}

function leerDatospizza(pizza) {
    const infopizza = {
        imagen: pizza.querySelector('img').src,
        titulo: pizza.querySelector('h4').textContent,
        precio: pizza.querySelector('.precio span').textContent,
        id: pizza.querySelector('a').getAttribute('data-id')
    }

    insertarpizza(infopizza);
}

function insertarpizza(pizza) {
    const row = document.createElement('tr');
    row.innerHTML = `
        <td><img src="${pizza.imagen}" width="100"></td>
        <td>${pizza.titulo}</td>
        <td>${pizza.precio}</td>
        <td><a href="#" class="borrar-pizza" data-id="${pizza.id}">X</a></td>    
    `;
    listapizzas.appendChild(row);
    guardarpizzaLocalStorage(pizza);

}

function eliminarpizza(e) 
{
    e.preventDefault();

    let pizza, pizzaId;

    if (e.target.classList.contains('borrar-pizza')) {
        e.target.parentElement.parentElement.remove(); 
    }  
    pizza = e.target.parentElement.parentElement;
    pizzaId = pizza.querySelector('a').getAttribute('data-id');   
    eliminarpizzaLS(pizzaId);
}

function vaciarcarrito() 
{
    while(listapizzas.firstChild){
        listapizzas.removeChild(listapizzas.firstChild);
    }    
    vaciarLs();

    return false;    
}

function guardarpizzaLocalStorage(pizza)
{
    let pizzas;
    pizzas = obtenerpizzasLocalStorage();
    pizzas.push(pizza);
    localStorage.setItem('pizzas', JSON.stringify(pizzas));
    actualizarImporte()
}


function obtenerpizzasLocalStorage() 
{
    let pizzasLS;
    if (localStorage.getItem('pizzas') === null) {
        pizzasLS = [];        
    } else {
        pizzasLS = JSON.parse(localStorage.getItem('pizzas'));
    }
    
    return pizzasLS;
    
}

function leerLS() 
{
    let pizzasLS;

    pizzasLS = obtenerpizzasLocalStorage();

    pizzasLS.forEach(function (pizza) {
        const row = document.createElement("tr");
        row.innerHTML = `
        <td><img src="${pizza.imagen}" width="100"></td>
        <td>${pizza.titulo}</td>
        <td>${pizza.precio}</td>
        <td><a href="#" class="borrar-pizza" data-id="${pizza.id}">X</a></td> 
       
    `;
    
        listapizzas.appendChild(row);
    })
}

function eliminarpizzaLS(pizza) 
{
    let pizzasLS;
    pizzasLS = obtenerpizzasLocalStorage();
    pizzasLS.forEach(function(pizzaLS, index) {
      if (pizzaLS.id === pizza) {
        pizzasLS.splice(index, 1);
      }
    });
  
    localStorage.setItem('pizzas', JSON.stringify(pizzasLS));
    actualizarImporte()
    
  

}


function vaciarLs() {
    localStorage.clear();
}

function actualizarImporte() {
    const total = calcularTotal(pizzas);
  
    document.getElementById('total').innerHTML = total;
    
  }
  actualizarImporte()

