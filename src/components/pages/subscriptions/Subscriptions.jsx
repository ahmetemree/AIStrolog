import "./subscriptions.scss"
import { useDisclosure } from '@mantine/hooks';
import { Modal, Button, Group } from '@mantine/core';
import { useState } from 'react';
import { Wheel } from 'react-custom-roulette';
const Subscriptions = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);
  const [finished, setFinished] = useState(false);
  const [startingOption, setStartingOption] = useState(2);
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
    },
    
  ];

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
          <div className="buttonwrapper">
          <button>Choose Plan</button>
          <button onClick={open}>Çark Çevir</button>
          </div>
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
              onClick={()=>{handleSpinClick(); setFinished(false);}} 
              disabled={mustSpin} 
              style={{ marginTop: '30px' }}
              size="lg"

            >
              {mustSpin ? 'Çark Dönüyor...' : 'Çarkı Çevir!'}
            </Button>
            
            {finished && <span title="We notify you that" style={{display: 'block', fontSize: '20px', fontWeight: 'bold', color: '#4caf50',marginTop: '20px', textAlign: 'center'}}>
              Tebrikler! {data[prizeNumber].option} Kazandınız!
            </span>}
          </Modal>
          
        </div>
        <div className="plan2">
          <h3>AI-Strolog Plus</h3>
        </div>
        <div className="plan3">
          <h3>AI-Strolog Premium</h3>
        </div>
      </div>
    </div>
  )
}

export default Subscriptions