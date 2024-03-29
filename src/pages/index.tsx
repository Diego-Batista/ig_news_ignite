import { GetStaticProps } from 'next';
import Head from 'next/head';
import { SubscribButton } from '../components/SubscribButton';
import { stripe } from '../services/stripe';
import styles from './home.module.scss';
import image from './igniteNews.png';

interface HomeProps {
  product: {
    priceId: string;
    amount: number;
  }
}

export default function Home({product}: HomeProps) {
  return (
    <>
      <Head>
          <title>Home | ig.news</title>
          <meta property="og:image" content="/igniteNews.png" />
          <meta property="og:image:secure_url" content="/igniteNews.png" />
      </Head>
      <main className={styles.contentContainer}>
        <section className={styles.hero}>
          <span>👋 Hey, welcome</span>
          <h1>News about <br/> the <span>React</span> world.</h1>
          <p>
            Get acess to all the publications <br/>
            <span>for {product.amount} month</span>
          </p>
          <SubscribButton priceId={product.priceId}/>
        </section>
        <img src="/images/avatar.svg" alt="Girl coding" />
      </main>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const price = await stripe.prices.retrieve('price_1L1G0FGD1fz3S7pozQ6gDVoH')

  const product = {
    priceId: price.id,
    amount: new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price.unit_amount / 100),
  };

  return {
    props: {
      product
    },
    revalidate: 60 * 60 * 24, // 24 hours
  }
}