import './subscriptions.scss';
import { useDisclosure } from '@mantine/hooks';
import { Modal, Button, Group } from '@mantine/core';
import { useEffect, useRef, useState } from 'react';
import { Wheel } from 'react-custom-roulette';
import { useAuth } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';
import { notifications } from '@mantine/notifications';
const Subscriptions = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);
  const [finished, setFinished] = useState(false);
  const [startingOption, setStartingOption] = useState(2);
  const { isSignedIn,isLoaded } = useAuth();
  const [subscription, setSubscription] = useState('');
  const [token, setUserToken] = useState('');
  const { getToken } = useAuth();
  const freeButton = useRef(null);
  const plusButton = useRef(null);
  const premiumButton = useRef(null);
  const navigate = useNavigate();
  const [canWeeklySpin, setCanWeeklySpin] = useState(true);

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
          const newToken = await getToken({template:'aistrolog-template'});
          setUserToken(newToken);
        } catch (error) {
          console.error('Token alınamadı:', error);
        }
      }
    };

    fetchToken();
  }, [isSignedIn, getToken]);

  const handleFreePlan = async () => {
    await fetch(`${import.meta.env.VITE_BACKEND_URL}/user/updatePlan`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ subscription: 'free', credits: 12 })
    });
    getUserInformations(token);
  }


  const handlePlusPlan = async () => {
    navigate('/payment');
    await fetch(`${import.meta.env.VITE_BACKEND_URL}/user/updatePlan`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ subscription: 'plus', subscriptionStartDate: new Date().toISOString(), subscriptionEndDate: new Date(new Date().getTime() + 30 * 24 * 60 * 60 * 1000).toISOString(), credits: 200 })
    });
    getUserInformations(token);
  }
  const handlePremiumPlan = async () => {
    navigate('/payment');
    await fetch(`${import.meta.env.VITE_BACKEND_URL}/user/updatePlan`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ subscription: 'premium', subscriptionStartDate: new Date().toISOString(), subscriptionEndDate: new Date(new Date().getTime() + 30 * 24 * 60 * 60 * 1000).toISOString(), credits: 999999 })
    });
    getUserInformations(token);
  }
  
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
      setCanWeeklySpin(data.canWeeklySpin);
      console.log(subscription);
      
    } catch (error) {
      console.log(error);
    }
  };
  const setWeeklySpin = async () => {
    await fetch(`${import.meta.env.VITE_BACKEND_URL}/user/weeklySpin`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ canWeeklySpin: false })
    });
  }

  const addUserCredits = async (credits) => {
    await fetch(`${import.meta.env.VITE_BACKEND_URL}/user/addcredits`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ credits: credits })
    });
  }


  const handleSpinClick = () => {
    getUserInformations(token);
    if(!canWeeklySpin){
     notifications.show({
      title: 'Hata!',
      message: 'Haftalık çark çevirme hakkınız bitmiştir. Daha fazla haftalık çark çevirme hakkı almak için aylık planınızı yükseltin.',
      color: 'red'
     });
     return;
    }
    if (!mustSpin) {
      const newPrizeNumber = Math.floor(Math.random() * data.length);

      setPrizeNumber(newPrizeNumber);
      setMustSpin(true);
      setWeeklySpin();
      getUserInformations(token);
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
              <li>Aylık 12 kredi mesaj hakkı</li>
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
          <button ref={freeButton} disabled={isSignedIn && subscription === 'free'} className={`${isSignedIn && subscription === 'free' ? 'selected' : 'button'}`} onClick={()=>{
             if(isLoaded && !isSignedIn){
              navigate('/login');
            }
            handleFreePlan();
          }}>{isSignedIn && subscription === 'free' ? 'Plan Seçildi!' : 'Planı Seç!'}</button>
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
                addUserCredits(prizeNumber === 0 ? 3 : prizeNumber === 1 ? 5 : 0);
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
          <button ref={plusButton} disabled={isSignedIn && subscription === 'plus'} className={`${isSignedIn && subscription === 'plus' ? 'selected' : 'button'}`} onClick={()=>{
             if(isLoaded && !isSignedIn){
              navigate('/login');
            }
            handlePlusPlan();
          }}>{isSignedIn && subscription === 'plus' ? 'Plan Seçildi!' : 'Planı Seç!'}</button>
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
          <button ref={premiumButton} disabled={isSignedIn && subscription === 'premium'} className={`${isSignedIn && subscription === 'premium' ? 'selected' : 'button'}`} onClick={()=>{
             if(isLoaded && !isSignedIn){
              navigate('/login');
            }
            handlePremiumPlan();
          }}>{isSignedIn && subscription === 'premium' ? 'Plan Seçildi!' : 'Planı Seç!'}</button>
        </div>
      </div>
    </div>
  );
};

export default Subscriptions;
