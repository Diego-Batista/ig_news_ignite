import { useSession, signIn } from 'next-auth/react';
import { api } from '../../services/api';
import { getStripeJs } from '../../services/stripe-js';
import styles from './styles.module.scss';

interface SubscribButtonProps {
    priceId: string;
}

export function SubscribButton({priceId}: SubscribButtonProps) {
    const { data: session } = useSession()
    async function handleSubscrib(){
        if(!session){
            signIn('github')
            return;
        }
        // criacao da checkout sesseion
        try {
            const response = await api.post('/subscribe')

            const { sessionId } = response.data

            const stripe = await getStripeJs()

            stripe.redirectToCheckout({sessionId})
        } catch (err) {
            alert(err.message)
        }

    }
    return (
        <button
            type="button"
            className={styles.subscribButton}
            onClick={() => handleSubscrib()}
        >
            Subscribe now
        </button>
    )
}