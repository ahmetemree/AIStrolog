import './analysis.scss';

const Analysis = () => {
  const messages = [
    { text: "Mesaj 1", positive: 80 },
    { text: "Mesaj 2", positive: 60 },
    { text: "Mesaj 3", positive: 40 },
    { text: "Mesaj 4", positive: 20 },
    { text: "Mesaj 5", positive: 10 },
  ];

  return (
    <div className='analysissss'>
      <div className='left-div'>Left Div</div>
      <div className='right-div'>
        {messages.map((msg, index) => (
          <div key={index} className='message'>
            <p>{msg.text}</p>
            <p>Olumlu Yüzde: {msg.positive}%</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Analysis