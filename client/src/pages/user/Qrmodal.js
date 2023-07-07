import axios from 'axios';
import React, { useEffect, useState } from 'react';
import QRCode from 'qrcode.react';

const Qrmodal = ({ totalPrice }) => {
  const [address, setAddress] = useState('');
  const [btcValue, setBtcValue] = useState(0);

  const generateqrcode = async () => {
    try {
      const data = await axios.get('/api/v1/auth/generateqrcode');
      setAddress(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const calculateBtcValue = async () => {
    try {
      const response = await axios.get(
        'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=inr'
      );
      const btcRate = response?.data?.bitcoin?.inr;
      if (btcRate) {
        const numericPrice = parseFloat(totalPrice.replace(/[^0-9.-]+/g, '')); // Remove currency symbol and parse as float
        const btc = numericPrice / parseFloat(btcRate);
        setBtcValue(btc.toFixed(8)); // Round BTC value to 8 decimal places
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    generateqrcode();
    calculateBtcValue();
  }, [totalPrice]);

  return (
    <div>
      {address && (
        <div>
          <h4>Send Bitcoin</h4>
          <p>BTC Value: {btcValue}</p>
          <QRCode value={`${address}?amount=${btcValue}`} />
        </div>
      )}
    </div>
  );
};

export default Qrmodal;
