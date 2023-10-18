import React, { useContext, useEffect, useState } from "react";
import Form from 'react-bootstrap/esm/Form'
import Button from 'react-bootstrap/esm/Button'
import {
  PaymentElement,
  LinkAuthenticationElement,
  useStripe,
  useElements
} from "@stripe/react-stripe-js";
import { Store } from "../Store";
import LoadingBox from "./LoadingBox";




export default function StripeForm() {
    const stripe = useStripe();
    const elements = useElements();
  
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const {state} = useContext(Store)
    const {userInfo} = state
  
    useEffect(() => {
      if (!stripe) {
        return;
      }
  
      const clientSecret = new URLSearchParams(window.location.search).get(
        "payment_intent_client_secret"
      );
  
      if (!clientSecret) {
        return;
      }
  
      stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
        switch (paymentIntent.status) {
          case "succeeded":
            setMessage("Payment succeeded!");
            break;
          case "processing":
            setMessage("Your payment is processing.");
            break;
          case "requires_payment_method":
            setMessage("Your payment was not successful, please try again.");
            break;
          default:
            setMessage("Something went wrong.");
            break;
        }
      });
    }, [stripe]);
  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      if (!stripe || !elements) {
        // Stripe.js hasn't yet loaded.
        // Make sure to disable form submission until Stripe.js has loaded.
        return;
      }
  
      setIsLoading(true);
  
      const { error } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          // Make sure to change this to your payment completion page
          return_url: `${window.location.origin}/`,
        },
      });
  
      // This point will only be reached if there is an immediate error when
      // confirming the payment. Otherwise, your customer will be redirected to
      // your `return_url`. For some payment methods like iDEAL, your customer will
      // be redirected to an intermediate site first to authorize the payment, then
      // redirected to the `return_url`.
      if (error.type === "card_error" || error.type === "validation_error") {
        setMessage(error.message);
      } else {
        setMessage("An unexpected error occurred.");
      }
  
      setIsLoading(false);
    };
  
    const paymentElementOptions = {
      layout: "tabs"
    }
  
  return (
    <Form id="payment-form" onSubmit={handleSubmit}>
     <LinkAuthenticationElement
      id="link-authentication-element"
      onChange={(e) => setEmail(e.value.email)}
      options={{defaultValues: {email: JSON.stringify(userInfo.email)}}}
    />
    <PaymentElement id="payment-element" options={paymentElementOptions} />
    <Button disabled={isLoading || !stripe || !elements} type="submit" className="w-full my-2">
      <span id="button-text">
        {isLoading ? <LoadingBox/> : "Pay now"}
      </span>
    </Button>
    {/* Show any error or success messages */}
    {message && <div id="payment-message">{message}</div>}
  </Form>
  )
}
