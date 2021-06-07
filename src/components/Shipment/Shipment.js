import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { UserContext } from '../../App';
import { getDatabaseCart, processOrder } from '../../utilities/databaseManager';
import './Shipment.css';

const Shipment = () => {
const { register, handleSubmit, watch, formState: { errors } } = useForm();
const [loggedInUser, setLoggedInUser]= useContext(UserContext);
  const onSubmit = data => {
    console.log(data);
    const savedCart = getDatabaseCart();
    console.log(savedCart);
    const orderDetails = {...loggedInUser, products: savedCart, shipment: data, orderTime: new Date()};
    console.log(orderDetails);


    fetch('http://localhost:5000/addOrder', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json'},
      body: JSON.stringify(orderDetails)
    })
    .then(res => res.json())
    .then(data => {
      if(data){
        processOrder();
        alert('Your Order placed successfully');
      }
    })
  };

  return (

    <form className="ship-from" onSubmit={handleSubmit(onSubmit)}>
      <input defaultValue={loggedInUser.name} {...register("name",{ required: true })} placeholder="your name" />
      {errors.name && <span className="error">Name is required</span>}
      
      <input defaultValue={loggedInUser.email} {...register("email" ,{ required: true })} placeholder="your email" />
      {errors.email && <span className="error">Email is required</span>}

      <input defaultValue={loggedInUser.address} {...register("address" ,{ required: true })} placeholder="your address" />
      {errors.address && <span className="error">Address is required</span>}

      <input defaultValue={loggedInUser.error} {...register("phone" ,{ required: true })} placeholder="your phone number"/>
      {errors.phone && <span className="error">Phone is required</span>}

      <input type="submit" />
    </form>
  );
};

export default Shipment;