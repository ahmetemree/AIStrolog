import { useMyContext } from '../../context/Context';
import './aipreview.scss';

const AiPreview = ({ chats }) => {
  const { eSelected, setESelected } = useMyContext();
  
  return (
    <div className="aipreview">
      <div className="header">
        <h6 style={{color:"white"}}>AI-Strolog</h6>
      </div>  
      { chats.history && chats.history.map((chat, index) => (
          <div className={chat.role === "user" ? "messagewrapper" : "messageaiwrapper"}>
            <h6 className="message">
              {chat.parts[0].text.slice(0, 100)}
            </h6>
          </div>
      ))}
      <div className="messagewrapper">
        <button>{eSelected ? "Go To The Latest Chat" : "Son Sohbete Git"}</button>
        <img src="/arrow.png" alt="" />
      </div>
    </div>
  );
};

export default AiPreview;
