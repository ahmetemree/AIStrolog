import { Link } from 'react-router-dom';
import { useMyContext } from '../../context/Context';
import './aipreview.scss';

const AiPreview = ({ chats }) => {
  const { eSelected, setESelected } = useMyContext();
  return (
    <div className="aipreview">
      <div className="header">
        <h6 style={{color:"white"}}>AI-Strolog</h6>
      </div>  
      { chats?.history && chats?.history.slice(0, 2).map((chat, index) => (
          <div className={chat.role === "user" ? "messagewrapper" : "messageaiwrapper"}>
            <h6 className="message">
              {chat.parts[0].text.slice(0, 100)}
            </h6>
          </div>
      ))}
      <div className="messagewrapper">
        <Link to={`/chat/${chats?.chatId}`}>
          <button>{eSelected ? "Son Sohbete Git" : "Son Sohbete Git"}</button>
        </Link>
        <img src="/arrow.png" alt="" />
      </div>
    </div>
  );
};

export default AiPreview;
