import './subscriptions.scss';
import { useDisclosure } from '@mantine/hooks';
import { Modal, Button, Group } from '@mantine/core';
import { useEffect, useState } from 'react';
import { Wheel } from 'react-custom-roulette';
import { useAuth } from '@clerk/clerk-react';
const Subscriptions = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);
  const [finished, setFinished] = useState(false);
  const [startingOption, setStartingOption] = useState(2);
  const { isSignedIn } = useAuth();
  const [subscription, setSubscription] = useState('');
  const [token, setUserToken] = useState('');
  const { getToken } = useAuth();
  const data = [
    {
      option: 'Ücretsiz 3 Kredi',
      style: {
        backgroundColor: '#ff8f43',
        textColor: 'white',
        textPosition: 'horizontal'
      }
    },
    {
      option: 'Ücretsiz 5 Kredi',
      style: {
        backgroundColor: '#70bbe0',
        textColor: 'white',
        textPosition: 'horizontal'
      }
    },
    {
      option: 'AI-Strolog Plus %10 İndirim',
      style: {
        backgroundColor: '#ff5252',
        textColor: 'white',
        textPosition: 'horizontal'
      }
    },
    {
      option: 'AI-Strolog Premium %20 İndirim',
      style: {
        backgroundColor: '#ff8f43',
        textColor: 'white',
        textPosition: 'horizontal'
      }
    },
    {
      option: 'AI-Strolog Premium %15 İndirim',
      style: {
        backgroundColor: '#4caf50',
        textColor: 'white',
        textPosition: 'horizontal'
      }
    }
  ];

  useEffect(() => {
    getUserInformations(token);
  });

  useEffect(() => {
    const fetchToken = async () => {
      if (isSignedIn) {
        try {
          const newToken = await getToken();
          setUserToken(newToken);
        } catch (error) {
          console.error('Token alınamadı:', error);
        }
      }
    };

    fetchToken();
  }, [isSignedIn, getToken]);

  

  const getUserInformations = async token => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/user/getUserInfo`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          }
        }
      );
      const data = await response.json();
      setSubscription(data.subscription);
      console.log(subscription);
      
    } catch (error) {
      console.log(error);
    }
  };

  const handleSpinClick = () => {
    if (!mustSpin) {
      const newPrizeNumber = Math.floor(Math.random() * data.length);

      setPrizeNumber(newPrizeNumber);
      setMustSpin(true);
    }
  };

  return (
    <div className="subscriptions">
      <h1>Subscriptions</h1>
      <div className="plans">
        <div className="plan1">
          <h3>AI-Strolog Free</h3>

          <div className="list">
            <ul>
              <li>Haftalık ücretsiz 3 kredi mesaj hakkı</li>
              <li>Her hafta ücretsiz çark çevirme hakkı</li>
              <li>Reklam izleyerek kredi kazanın</li>
              <li>Kredi kullanımı sınırlıdır</li>
            </ul>
          </div>
          <span className='charge'>Free</span>
          <div className="buttonwrapper">
            {isSignedIn && subscription === 'free' && <button>Reklam İzle</button>}
            {isSignedIn && subscription === 'free' && <button onClick={open}>Çark Çevir</button>}
          </div>
          <button disabled={isSignedIn && subscription === 'free'} className={`${isSignedIn && subscription === 'free' ? 'selected' : 'button'}`}>{isSignedIn && subscription === 'free' ? 'Plan Seçildi!' : 'Planı Seç!'}</button>
          <Modal
            opened={opened}
            onClose={close}
            title="Çark Çevir"
            size="lg"
            centered
            styles={{
              inner: { padding: '40px' },
              content: {
                minHeight: '600px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden'
              },
              body: {
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center'
              }
            }}
          >
            <Wheel
              mustStartSpinning={mustSpin}
              prizeNumber={prizeNumber}
              data={data}
              spinDuration={0.5}
              startingOptionIndex={startingOption}
              disableInitialAnimation={false}
              radiusLineWidth={1}
              radiusLineColor="white"
              outerBorderWidth={3}
              outerBorderColor="white"
              innerBorderColor="white"
              innerBorderWidth={2}
              innerRadius={10}
              textDistance={60}
              fontSize={10}
              numberOfSpins={10}
              rotationTime={0.8}
              onStopSpinning={() => {
                setFinished(true);
                setStartingOption(prizeNumber);
                setTimeout(() => {
                  setMustSpin(false);
                }, 1000);
              }}
            />
            <Button
              onClick={() => {
                handleSpinClick();
                setFinished(false);
              }}
              disabled={mustSpin}
              style={{ marginTop: '30px' }}
              size="lg"
            >
              {mustSpin ? 'Çark Dönüyor...' : 'Çarkı Çevir!'}
            </Button>

            {finished && (
              <span
                title="We notify you that"
                style={{
                  display: 'block',
                  fontSize: '20px',
                  fontWeight: 'bold',
                  color: '#4caf50',
                  marginTop: '20px',
                  textAlign: 'center'
                }}
              >
                Tebrikler! {data[prizeNumber].option} Kazandınız!
              </span>
            )}
          </Modal>
        </div>
        <div className="plan2">
          <h3>AI-Strolog Plus</h3>
          

          <div className="list">
            <ul>
              <li>Aylık 200 kredi mesaj hakkı</li>
              <li>Her hafta özel çark çevirme hakkı</li>
              <li>Reklam izleyerek kredi kazanın</li>
              <li>Kredi kullanımı sınırlıdır</li>
            </ul>
          </div>
          <span className='charge'>$1.99</span>
          <div className="buttonwrapper">
            {isSignedIn && subscription === 'plus' && <button>Reklam İzle</button>}
            {isSignedIn && subscription === 'plus' && <button onClick={open}>Çark Çevir</button>}
          </div>
          <button disabled={isSignedIn && subscription === 'plus'} className={`${isSignedIn && subscription === 'plus' ? 'selected' : 'button'}`}>{isSignedIn && subscription === 'plus' ? 'Plan Seçildi!' : 'Planı Seç!'}</button>
        </div>
        <div className="plan3">
          <h3>AI-Strolog Premium</h3>
          <div className="list">
            <ul>
              <li>Sınırsız mesaj hakkı</li>
              <li>Her hafta premium çark çevirme hakkı</li>
              <li>Premium'a özel hediyeler!</li>
            </ul>
          </div>
          <span className='charge'>$3.99</span>
          <div className="buttonwrapper">
            {isSignedIn && subscription === 'premium' && <button>Çekilişe Katıl</button>}
            {isSignedIn && subscription === 'premium' && <button onClick={open}>Çark Çevir</button>}
          </div>
          <button disabled={isSignedIn && subscription === 'premium'} className={`${isSignedIn && subscription === 'premium' ? 'selected' : 'button'}`}>{isSignedIn && subscription === 'premium' ? 'Plan Seçildi!' : 'Planı Seç!'}</button>
        </div>
      </div>
    </div>
  );
};

export default Subscriptions;
