import { useEffect, useState } from 'react';
import './payment.scss';
import { motion } from 'framer-motion';
import styled from 'styled-components';

const CardContainer = styled.div`
  perspective: 1000px;
  width: 100px;
  height: 100px;
`;

const Card = styled(motion.div)`
  position: relative;
  width: 100px;
  height: 100px;
  transform-style: preserve-3d;
`;

const CardSide = styled.div`
  position: absolute;
  width: 100px;
  height: 100px;
  backface-visibility: hidden;
  border-radius: 10px;
`;

const CardFront = styled(CardSide)`
`;

const CardBack = styled(CardSide)`
transform: rotateY(180deg);
`;

const Payment = () => {
    const [plan, setPlan] = useState('premium');
    const [flipped, setFlipped] = useState(false);

    useEffect(() => {
        setPlan(new URLSearchParams(window.location.search).get('plan'));
    }, []);
  return (
    <div className='payment'>
      <div className='payment-container'>
       <div className="leftpart">
        <CardContainer className='card-container'>
          <Card className='card'
            initial={false}
            animate={{ rotateY: flipped ? 180 : 0 }}
            transition={{ duration: 0.6 }}
            style={{ width: '100%', height: '100%' }}
          >
            <CardFront className='card-front'>
              <img src="card.png" alt="" />
            </CardFront>
            <CardBack className='card-back'>
              <img src="card-back.png" alt="" />
            </CardBack>
          </Card>
        </CardContainer>
       
       </div>
       <div className="rightpart">
        <h1>{plan === 'premium' ? 'Premium Plan için ödeme yapıyorsunuz' : 'Plus Plan için ödeme yapıyorsunuz'}</h1>
        <form>
            <input 
              type="text" 
              placeholder='Kart Numarası'
              maxLength={19}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, '');
                const formattedValue = value.match(/.{1,4}/g)?.join(' ') || '';
                e.target.value = formattedValue;
              }}
            />
            <input 
              type="text" 
              placeholder='Kart Üzerindeki İsim'
              onChange={(e) => {
                const value = e.target.value.replace(/[^a-zA-Z\s]/g, '');
                e.target.value = value;
              }}
            />
            <input 
              type="text" 
              placeholder='Kartın Bitiş Tarihi'
              maxLength={5}
              onChange={(e) => {
                let value = e.target.value.replace(/\D/g, '');
                if (value.length > 2) {
                  value = value.slice(0, 2) + '/' + value.slice(2);
                }
                if (value.length > 0) {
                  const month = parseInt(value.slice(0, 2));
                  if (month > 12) {
                    value = '12' + value.slice(2);
                  }
                }
                e.target.value = value;
              }}
            />
            <input 
              type="text" 
              onClick={() => setFlipped(true)}
              onBlur={() => setFlipped(false)}
              placeholder='Kartın CVV'
              maxLength={3}
              pattern="\d{3}"
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, '');
                if (value.length > 3) {
                  e.target.value = value.slice(0, 3);
                } else {
                  e.target.value = value;
                }
              }}
            />
            <button type='submit'>Ödeme Yap</button>
            <div className="paymentmethods">
            <div className="paymentmethod">
                <img src="mastercard.png" alt="" />
                <img src="visa.png" alt="" />
                <img src="troy.png" alt="" />
            </div>
        </div>
            <div className="payment-info">
                <p>Ödeme bilgileri güvenli bir şekilde işlenmektedir.</p>
            </div>
        </form>
       </div>
      </div>
    </div>
  );
};

export default Payment;