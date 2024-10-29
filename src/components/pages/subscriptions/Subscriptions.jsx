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
  const data = [
    { 
      option: '10% İndirim', 
      style: { 
        backgroundColor: '#ff8f43', 
        textColor: 'white',
        textPosition: 'horizontal'
      } 
    },
    { 
      option: '20% İndirim', 
      style: { 
        backgroundColor: '#70bbe0', 
        textColor: 'white',
        textPosition: 'horizontal'
      } 
    },
    { 
      option: '5% İndirim', 
      style: { 
        backgroundColor: '#ff5252', 
        textColor: 'white',
        textPosition: 'horizontal'
      } 
    },
    { 
      option: 'Bedava Ay', 
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
          <button>Subscribe</button>
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
              startingOptionIndex={2}
              disableInitialAnimation={true}
              radiusLineWidth={1}
              radiusLineColor="white" 
              outerBorderWidth={3}
              outerBorderColor="white"
              innerBorderColor="white"
              innerBorderWidth={2}
              innerRadius={10}
              textDistance={60}
              fontSize={16}
              numberOfSpins={10}
              rotationTime={0.8}
              onStopSpinning={() => {
                setFinished(true);
                setTimeout(() => {
                  setMustSpin(false);
                  console.log(data[prizeNumber].option);
                }, 1000);
              }}
            />
            <Button 
              onClick={handleSpinClick} 
              disabled={mustSpin} 
              style={{ marginTop: '30px' }}
              size="lg"
            >
              {mustSpin ? 'Çark Dönüyor...' : 'Çarkı Çevir!'}
            </Button>
            {finished && <span title="We notify you that">
              {data[prizeNumber].option}
            </span>}
          </Modal>
          <button onClick={open}>Çark Çevir</button>
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