import { useMyContext } from '../../context/Context';
import './aipreview.scss';

const AiPreview = () => {
  const { eSelected, setESelected } = useMyContext();

  return (
    <div className="aipreview">
      <div className="header">
        <h6 style={{color:"white"}}>AI-Strolog</h6>
      </div>
      <div className="messagewrapper">
        <h6 className="message">
          {eSelected
            ? 'What awaits me today, AIStrolog?'
            : 'Bugün beni neler bekliyor AIStrolog?'}
        </h6>
      </div>
      <div className="messageaiwrapper">
        <h6 className="messageai">
          {eSelected ? (
            <>
              Everything will go wonderfully for you today. <br />I believe you
              will find the love of your life.
            </>
          ) : (
            <>
              Bugün her şey senin için çok güzel geçecek. <br />
              Hayatının aşkını bulacağına inanıyorum.
            </>
          )}
        </h6>
      </div>
      <div className="messagewrapper">
        <h6 className="message">
          {eSelected
            ? "Can I find the love of my life?"
            : "Peki hayatımın aşkını şimdi bulabilecek miyim?"}
        </h6>
      </div>
      <div className="messageaiwrapper">
        <h6 className="messageai">
          {eSelected
            ? "Waiting for you right now!"
            : "Şu anda seni bekliyor!"}
        </h6>
      </div>
      <div className="messagewrapper">
        <button>{eSelected ? "Go To The Latest Chat" : "Son Sohbete Git"}</button>
        <img src="/arrow.png" alt="" />
      </div>
    </div>
  );
};

export default AiPreview;
