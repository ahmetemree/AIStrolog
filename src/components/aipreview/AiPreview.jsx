import './aipreview.scss';
const AiPreview = () => {
  return (
    <div className="aipreview">
        <div className="header">
            <h6>Your AI</h6>
        </div>
      <div className="messagewrapper">
        <h6 className="message">Bugün beni neler bekliyor AIStrolog?</h6>
      </div>
      <div className="messageaiwrapper">
        <h6 className="messageai">Bugün her şey senin için çok güzel geçecek. <br/>Hayatının aşkını bulacağına inanıyorum.</h6>
      </div>
      <div className="messagewrapper">
        <h6 className="message">Peki hayatımın aşkını şimdi bulabilecek miyim?</h6>
      </div>
      <div className="messageaiwrapper">
        <h6 className="messageai">Şu anda seni bekliyor! </h6>
      </div>
    </div>
  );
};

export default AiPreview;
