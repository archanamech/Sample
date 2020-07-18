import React, { useState } from "react";
import axios from "axios";

import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import CardInput from "./CardInput";

const CheckoutForm = () => {

  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }
    
    let clientSecret;
    
    const res =  await axios({
      method: 'POST',
      url: 'https://gopoolit.herokuapp.com/payment/paymentIntent',
      headers: {
        'Content-Type' : 'application/json'
      } ,
      data:  JSON.stringify({customer_id: "cus_HYAMJCsca4khpK", amount: "500", currency: "gbp" }),
      withCredentials: true
    })
    .then(res => {
      clientSecret = res.data.secret; 
      console.log(res)})
    // const resJson = res.json();
    // console.log(resJson);


    

    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement)
      }
    });

    if (result.error) {
      // Show error to your customer (e.g., insufficient funds)
      console.log(result.error.message);
    } else {
      // The payment has been processed!
      if (result.paymentIntent.status === "succeeded") {
        console.log("Money is in the bank!");
        // Show a success message to your customer
        // There's a risk of the customer closing the window before callback
        // execution. Set up a webhook or plugin to listen for the
        // payment_intent.succeeded event that handles any business critical
        // post-payment actions.
      }
    }
  };

  return (
    <div>
    {/* <input type="text" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="amount" /> */}
      <CardInput />
      <button onClick={handleSubmit}>Pay</button>
    </div>
  );
};

export default CheckoutForm;
