import { Loader } from '@mantine/core';
import './chat.scss';
import { useAuth, useUser } from '@clerk/clerk-react';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRedirectContext } from '../../../../context/RedirectContext';
import model from '../../../../lib/gemini';

const Chat = () => {
  const { redirect, setRedirect } = useRedirectContext();
  const { user } = useUser();
  const { userId, isLoaded } = useAuth();
  const [isMessageExist, setIsMessageExist] = useState(false);
  const [chats, setChats] = useState([]);
  const navigate = useNavigate();
  const inputRef = useRef(null);
  const buttonRef = useRef(null);
  const [chatHistory, setChatHistory] = useState([]);
  const [chatId, setChatId] = useState("");
  const [answer, setAnswer] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [firstMessage, setFirstMessage] = useState(true);
  const chat = model.startChat({
    history:
      chatHistory.length > 0
        ? chatHistory.map(({ role, parts }) => ({
            role,
            parts:
              parts?.length > 0 && parts[0]?.text
                ? [{ text: parts[0].text }]
                : []
          }))
        : [],
    generationConfig: {
      //  maxOutputTokens:100,
    }
  });

  const add = async (text, isInitial) => {
    if (!isInitial) setQuestion(text);

    try {
      const result = await chat.sendMessage(text);
      const response = result.response.text();
      setIsTyping(true);
      let displayedAnswer = '';
      for (let i = 0; i < response.length; i++) {
        displayedAnswer += response[i];
        setAnswer(displayedAnswer);
        await new Promise(resolve => setTimeout(resolve, 20)); // Her harf için 50ms bekle
      }
      setIsTyping(false);
    } catch (err) {
      console.log(err);
      setIsTyping(false);
    }
    updateChat("ai",[{text:answer}]);
  };

  const handleSendMessage = async () => {
    debugger
    setIsMessageExist(true);
    
    if(firstMessage){
      await createNewChat();
      setFirstMessage(false);
    }
    getchats();
    
   
    add(inputRef.current.value, true);
  };

  const updateChat = async (role,parts) => {
    const response = await fetch(`http://localhost:3002/updatechat/${chatId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ role:role,parts:parts ,chatId:chatId})
    });
    const data = await response.json();
    console.log(data);
    
  }
  const createNewChat = async () => {
    const generatedChatId = Date.now().toString();
    
    // setChatId'yi beklemek yerine doğrudan generatedChatId'yi kullanın
    const title = inputRef.current ? inputRef.current.value.slice(0, 10) : '';
    const history = [
      { role: 'user', parts: [{ text: inputRef.current.value }] }
    ];
    
    const response = await fetch('http://localhost:3002/createchat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ userId, chatId: generatedChatId, title, history })
    });

    // State'i güncelleyin ve getChatHistory'yi çağırın
    await setChatId(generatedChatId);
    await getChatHistory(generatedChatId);
    
  };

  const getChatHistory = async chatId => {
    const response = await fetch(`http://localhost:3002/getchat/${chatId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ chatId })
    });

    const data = await response.json();
    await setChatHistory(data.history);
    console.log("data.history:");
    console.log(data.history);
    console.log("chatHistory:");
    console.log(chatHistory);
  };

  const handleDeleteChat = async chatId => {
    try {
      const response = await fetch(
        `http://localhost:3002/deletechat/${chatId}`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
      if (!response.ok) {
        throw new Error('Sohbet silinemedi');
      }
      const data = await response.json();
      setChats(data);
    } catch (error) {
      console.error('Sohbet silme hatası:', error);
    }
  };

  const getchats = async () => {
    try {
      const response = await fetch('http://localhost:3002/getchats', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
        // GET isteğinde body kullanılmaz, bu satırı kaldırıyoruz
      });

      if (!response.ok) {
        throw new Error('Sohbetler alınamadı');
      }

      const data = await response.json();
      setChats(data);
      // Burada, alınan sohbetleri state'e kaydedebilirsiniz
    } catch (error) {
      console.error('Sohbetleri alma hatası:', error);
    }
  };

  useEffect(() => {
    if (isLoaded && !userId) {
      navigate('/login');
      setRedirect('chat');
    }
  }, [isLoaded, userId, navigate]);

  useEffect(() => {
    getchats();
  }, []); // Boş bağımlılık dizisi, sadece bileşen monte edildiğinde çalışır

  if (!isLoaded)
    return (
      <div className="loading">
        <Loader color="blue" />
      </div>
    );

  return (
    <div className="chatpage">
      <div className="lastchats">
        <div className="newmessagewrapper">
          <span onClick={() => {setIsMessageExist(false); setFirstMessage(true)}}>Yeni Sohbet</span>
          {/* <img src="/newmessage.png" alt="" /> */}
        </div>

        {chats.map(chat => (
          <div key={chat.chats._id} className="chatwrapper" onClick={()=>setFirstMessage(false)}>
            <span
              onClick={() =>
                getChatHistory(chat.chats[0]._id, setIsMessageExist(true))
              }
            >
              {chat.chats[0].title}
            </span>
            <img
              src="/delete.png"
              alt=""
              onClick={() => {
                handleDeleteChat(chat.chats[0]._id);
                getChatHistory(chats[chats.length - 2]?.chats[0]._id);
              }}
            />
          </div>
        ))}
      </div>
      <div className="messagecontainer">
        <div
          className={
            isMessageExist ? 'messageswrapper' : 'firstmessageswrapper'
          }
        >
          {isMessageExist ? (
            // Mesajlar varsa buraya gösterilecek içerik gelecek
            chatHistory.map((message, index) => (
              <>
                <div
                  key={index}
                  className={
                    message.role === 'user' ? 'usermessages' : 'aimessages'
                  }
                >
                  <span>{message.parts[0].text}</span>
                </div>
                <div className="usermessage">
                  <span>{inputRef.current.value}</span>
                </div>
                <div className="answer">
                  {isTyping ? (
                    <span>{answer}<span className="blinking-cursor">|</span></span>
                  ) : (
                    <span>{answer}</span>
                  )}
                </div>
              </>
            ))
          ) : (
            <div className="wrapper">
              <img src="/logo.png" alt="" />
              <h6>Hadi hemen burç analizini yapalım!</h6>
            </div>
          )}
        </div>
        <div className="messagebox">
          <div className="inputcontainer">
            <input
              type="text"
              placeholder="Mesajınızı giriniz..."
              ref={inputRef}
            />
            <button onClick={handleSendMessage} ref={buttonRef}>
              Gönder
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
