import React, { useEffect, useState } from 'react';

const formatPrice = ({ amount, currency, quantity }) => {
  const numberFormat = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    currencyDisplay: 'symbol',
  });
  const parts = numberFormat.formatToParts(amount);
  let zeroDecimalCurrency = true;
  for (let part of parts) {
    if (part.type === 'decimal') {
      zeroDecimalCurrency = false;
    }
  }
  amount = zeroDecimalCurrency ? amount : amount / 100;
  const total = (quantity * amount).toFixed(2);
  return numberFormat.format(total);
};

const Checkout = () => {
  const [quantity, setQuantity] = useState(1);
  const [quantity2, setQuantity2] = useState(1);
  const [quantity3, setQuantity3] = useState(1);

  const [amount, setAmount] = useState(0);
  const [amount2, setAmount2] = useState(0);
  const [amount3, setAmount3] = useState(0);

  const [currency, setCurrency] = useState('USD');

  useEffect(() => {
    async function fetchConfig() {
      // Fetch config from our backend.
      const {
        unitAmount,
        unitAmount2,
        currency
      } = await fetch('/config').then(r => r.json());
      setAmount(unitAmount);
      setAmount2(unitAmount2);
      setCurrency(currency);
    }
    fetchConfig();
  }, []);

  return (
    <div className="sr-root">
      <h2>Car Shop</h2>
      <div className="sr-main">
        <section className="container">
          <div>
            <h1>An Entire Car</h1>
            <h4>Purchase a new Lambo</h4>
            <div className="pasha-image">
              <img
                alt="Lambo"
                src="https://cryptogoodies.shop/wp-content/uploads/2021/10/kiss-cut-stickers-5.5x5.5-default-6165ff1b58692.png"
                width="300"
                height="300"
              />
            </div>
          </div>
          <form action="/create-checkout-session" method="POST">
            <input type="hidden" id="quantity-input" name="quantity2" value={quantity2}/>
            <div className="quantity-setter">
              <button
                className="increment-btn"
                disabled={quantity === 0}
                onClick={() => setQuantity(quantity - 1)}
                type="button"
              >
                -
              </button>
              <input
                type="number"
                id="quantity-input"
                min="0"
                max="3"
                value={quantity}
                name="quantity"
                readOnly
              />
              <button
                className="increment-btn"
                disabled={quantity === 3}
                onClick={() => setQuantity(quantity + 1)}
                type="button"
              >
                +
              </button>
            </div>
            <p className="sr-legal-text">Current Stock: 3</p>

            <button role="link" id="submit" type="submit">
              Buy {quantity} for {formatPrice({amount, currency, quantity})}
            </button>
          </form>
        </section>
        <section className="container">
          <div>
            <h1>Car Engine</h1>
            <h4>Used Car Engine 10000 miles</h4>
            <div className="pasha-image">
              <img
                alt="Car Engine"
                src="https://media.istockphoto.com/photos/car-engine-picture-id520977101"
                width="300"
                height="300"
              />
            </div>
          </div>
          <form action="/create-checkout-session" method="POST">
            <input type="hidden" id="quantity-input" name="quantity" value={quantity}/>
            <div className="quantity-setter">
              <button
                className="increment-btn"
                disabled={quantity2 === 1}
                onClick={() => setQuantity2(quantity2 - 1)}
                type="button"
              >
                -
              </button>
              <input
                type="number"
                id="quantity-input"
                min="1"
                max="10"
                value={quantity2}
                name="quantity2"
                readOnly
              />
              <button
                className="increment-btn"
                disabled={quantity2 === 10}
                onClick={() => setQuantity2(quantity2 + 1)}
                type="button"
              >
                +
              </button>
            </div>
            <p className="sr-legal-text">Current Stock: 10</p>

            <button role="link" id="submit" type="submit">
              Buy {quantity2} for {formatPrice({amount: amount2, currency: currency, quantity: quantity2})}
            </button>
          </form>
        </section>
      </div>
    </div>
  );
};

export default Checkout;
