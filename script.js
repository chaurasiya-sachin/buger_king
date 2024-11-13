const order = document.querySelector("#order-btn");
let form = document.querySelector('.food-form');



order.addEventListener('click',()=>{
    const checkboxes = document.querySelectorAll('input[name="food"]:checked');
    let selectedFood = [];

    checkboxes.forEach((checkbox)=>{
        selectedFood.push(checkbox.value);
    })

    const displayDiv = document.querySelector('#selected-foods');

    setTimeout(()=>{
        processOrder(selectedFood,displayDiv).then((message)=>{
            console.log(message); // it will display success message when resolved
            
        }).catch((error)=>{
            console.error(error); // it will dispaly error if rejected.
            
        });
    },Math.ceil(Math.random()*1000+1));
    
   
})

function orderId(){
    let id = Math.floor(Math.random()*100000+1);
    return id;
}


function processOrder(selectedFood,displayDiv){
    return new Promise((resolve,reject)=>{
        // reset the displayDiv to ensure it is empty before appending the item
        displayDiv.innerHTML="";
        if(selectedFood.length>0){           

            // display selected food items as images
            for(let i=0;i<selectedFood.length;i++){
                displayDiv.innerHTML+= `<img src="images/${selectedFood[i]}.png" alt="" height="200px">`;
                console.log(selectedFood[i]);                
            }

            // Set the order id
            document.querySelector('#orderId').textContent="Ordered Id : "+orderId();

            // reset the form
            form.reset();

            // resolve the promise indicating sucess
            resolve('order Processed Sucessfully.')
        }else{
            // if user not selected any item from menu
            document.querySelector('#orderId').textContent=' Please select at least one item';
            reject('No items selected.');
        }
    })
}