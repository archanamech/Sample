import React from 'react'
// Stripe
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import CheckoutForm from './CheckoutForm';

const stripePromise = loadStripe('pk_test_51GyanyJPiytddR8UUzl4OmOae7zBk6IcwKI9CfjcctOQWBwMYB4pIWWqQtcOZYFG9k8to2MWYG6gOJF8nhZifjgq00nfIvoQtD');

const ParentPoint = () => {
    return (
        <Elements stripe={stripePromise}>
            <CheckoutForm />
        </Elements>
    )
}

export default ParentPoint;
