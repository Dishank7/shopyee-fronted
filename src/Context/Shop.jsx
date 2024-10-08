import { createContext, useEffect, useState } from "react";
// import all_product from "../Components/Assets/all_product"



export const ShopContext = createContext(null);

const getDefaultCart = ()=>{
    let cart = {};
    for (let index = 0; index < 300+1; index++) {
        cart[index] = 0; 
    }
    return cart;
}

const ShopContextProvider = (props)=>{

    const[all_product,setAll_Product] = useState([]);
    const[cartItems, setCartItems] = useState(getDefaultCart())
   
  useEffect(()=>{
   fetch('https://shopyee-server.onrender.com/allproduct')
   .then((resp)=>resp.json())
   .then((data)=>setAll_Product(data))

   if(localStorage.getItem('auth-token')){
    fetch('https://shopyee-server.onrender.com/getcart',{
        method:'POST',
        headers:{
            Accept:"application/form-data",
            'auth-token':`${localStorage.getItem('auth-token')}`,
            'Content-Type':"application/json"
        },
        body:""
    }).then((resp)=>resp.json())
    .then((data)=> setCartItems(data))
   }
  },[])

//    const addToCart = (itemId) =>{
//     console.log(itemId);
//      setCartItems((prev)=>({...prev,[itemId]:prev[itemId]+1}))
//      if(localStorage.getItem('auth-token')){
//         fetch('https://shopyee-server.onrender.com/addtocart',{
//             method:"POST",
//             headers:{
//                 Accept:"application/form-data",
//                 "auth-token":`${localStorage.getItem('auth-token')}`,
//                 "Content-Type":"application/json"
//             },
//             body:JSON.stringify({"itemId":itemId})
//         })
//         .then((resp)=>resp.json())
//         .then((data)=>console.log(data));
//      }
//    }

const addToCart = (itemId) => {
    console.log(itemId);

    // Update the cart items state
    setCartItems((prev) => ({
        ...prev,
        [itemId]: (prev[itemId] || 0) + 1 // Initialize to 0 if undefined, then increment
    }));

    // Check for authentication token
    if (localStorage.getItem('auth-token')) {
        fetch('https://shopyee-server.onrender.com/addtocart', {
            method: "POST",
            headers: {
                Accept: "application/json", // Corrected to 'application/json'
                "auth-token": `${localStorage.getItem('auth-token')}`,
                "Content-Type": "application/json"
            },
            body:JSON.stringify({ "itemId": itemId })
        })
        .then((resp) => resp.json())
        .then((data) => console.log(data))
        .catch((error) => console.error('Error adding to cart:', error)); // Handle fetch errors
    }
}

   const removefromCart = (itemId) =>{
    setCartItems((prev)=>({...prev,[itemId]:prev[itemId]-1}))
    if(localStorage.getItem('auth-token')){
        fetch('https://shopyee-server.onrender.com/removefromcart', {
            method: "POST",
            headers: {
                Accept: "application/json", // Corrected to 'application/json'
                "auth-token": `${localStorage.getItem('auth-token')}`,
                "Content-Type": "application/json"
            },
            body:JSON.stringify({ "itemId": itemId })
        })
        .then((resp) => resp.json())
        .then((data) => console.log(data))
        .catch((error) => console.error('Error adding to cart:', error)); // Handle fetch errors
    }
     }

    const getTotalCartAmount = () =>{
        let totalAmount = 0;
        for(const item in cartItems){

            if(cartItems[item]>0){
            
                let itemInfo = all_product.find((product)=>product.id === Number(item))
               
                totalAmount += itemInfo.new_price * cartItems[item];
            }
        }
        return totalAmount;
    } 

    const getTotalCartItems = () =>{
        let totalItem = 0;
        for(const item in cartItems){
            if(cartItems[item] > 0){
                totalItem+= cartItems[item];
            }
        }

        return totalItem;
    }

 const contextValue = {getTotalCartItems,getTotalCartAmount,all_product,cartItems, addToCart,removefromCart}

    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider