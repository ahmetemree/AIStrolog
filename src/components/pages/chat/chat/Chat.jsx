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
  const { userId, isLoaded, getToken, isSignedIn } = useAuth();
  
  useEffect(() => {
    if (isLoaded && userId) {
      getchats();
    }
    
  }, [isLoaded, userId]);

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
  const answerRef = useRef(null);
  const [handleAnswer,setHandleAnswer] = useState(false);
  
  
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const [token, setUserToken] = useState("");

  const refreshToken = async () => {
    if (isSignedIn) {
      const newToken = await getToken();
      setUserToken(newToken);
      
    }
  };
  useEffect(() => {

    refreshToken();
    const intervalId = setInterval(refreshToken, 50 * 60 * 1000); // Her 5 dakikada bir yenile

    return () => clearInterval(intervalId);
  }, [isSignedIn, getToken]);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "auto", block: "end" });
    }
  };
  

  useEffect(() => {
    
  }, [chatHistory, answer]);

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

  const handleNewChat = async () => {
    setIsMessageExist(false);
    setFirstMessage(true);
    setAnswer('');
    setChatHistory([]);
    setChatId("");
    
  }

  const add = async (text, isInitial,generatedchatId) => {
    
    refreshToken();
    setHandleAnswer(true);
    
    let currentChatId = ""
    if(firstMessage && generatedchatId != ""){
      currentChatId = generatedchatId;
    }
    else{
     currentChatId = chatId;
    }
    setLoading(true);
    
    if (!isInitial) setQuestion(text);
    if(!firstMessage){
      await updateChat("user",[{text:text}],currentChatId);
      getChatHistory(currentChatId);
    }
    // Mesaj gönderilmeden önce scroll yapma
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
    try {
      
      let dots = '.';
      const animateDots = setInterval(() => {
        dots = dots.length < 3 ? dots + '.' : '.';
        setAnswer('' + dots);
      }, 500);
      
      const result = await chat.sendMessage(text);
      clearInterval(animateDots);
      setIsTyping(false);

      const response = result.response.text();
      let displayedAnswer = '';
      const lines = response.split('\n');

      setIsTyping(true);
      for (let line of lines) {
        for (let char of line) {
          displayedAnswer += char;
          setAnswer(displayedAnswer);
          await new Promise(resolve => setTimeout(resolve, 20));
        }
        displayedAnswer += '\n';
        setAnswer(displayedAnswer);
        
        if (messagesEndRef.current) {
          messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
        
        await new Promise(resolve => setTimeout(resolve, 100)); // Satır sonu beklemesi
      }
      refreshToken();
      setIsTyping(false);
      await updateChat("model", [{ text: displayedAnswer }], currentChatId);
      await getChatHistory(currentChatId);
      setHandleAnswer(false);
      setAnswer('');
      
    } catch (err) {
      console.log(err);
      setIsTyping(false);
      setAnswer("Bir hata oluştu lütfen daha sonra tekrar deneyiniz.");
    }
    setLoading(false);
  };

  const handleSendMessage = async () => {
    refreshToken();
    // Mesaj gönderildikten sonra en aşağıya kaydırma
    setTimeout(() => {
      if (messagesEndRef.current) {
        messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
    if (loading) return;
    setIsMessageExist(true);
    let newChatId ="";
    try {
      if (firstMessage) {
        setFirstMessage(false);
        newChatId = await createNewChat();
      }
      
      const inputValue = inputRef.current.value;
      inputRef.current.value = '';
      
      setChatHistory(prevHistory => [...prevHistory, { role: 'user', parts: [{ text: inputValue }] }]);
      
      await add(inputValue, true,newChatId);
    } catch (error) {
      console.error('Mesaj gönderme hatası:', error);
    }
  };

  const updateChat = async (role,parts,generatedchatId) => {
    refreshToken();
    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/updatechat/${generatedchatId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      credentials: 'include',
      body: JSON.stringify({ role:role,parts:parts ,chatId:generatedchatId})
    });
    const data = await response.json();
  }

  const createNewChat = async () => {
    refreshToken();
    const generatedChatId = Date.now().toString();
       
    const title = inputRef.current ? inputRef.current.value.slice(0, 10) : '';
    const history = [
      { role: 'user', parts: [{ text: inputRef.current.value }] }
    ];
    
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/createchat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        credentials: 'include',
        body: JSON.stringify({ userId, chatId: generatedChatId, title, history })
      });

      if (!response.ok) {
        throw new Error('Yeni sohbet oluşturulamadı');
      }
      
      setChatId(generatedChatId);
      getChatHistory(generatedChatId);
      setChats(prevChats => [...prevChats, { chats: [{ _id: generatedChatId, title }] }]);
      return generatedChatId;
    } catch (error) {
      console.error('Yeni sohbet oluşturma hatası:', error);
      throw error;
    }
  };

  const getChatHistory = async (generatedchatId) => {
    refreshToken();
    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/getchat/${generatedchatId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      credentials: 'include',
      body: JSON.stringify({ chatId })
    });

    const data = await response.json();
    await setChatHistory(data.history);
  };

  const handleDeleteChat = async chatId => {
      try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/deletechat/${chatId}`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          credentials: 'include',
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
    refreshToken();
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/getchats`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        credentials: 'include',
        
      });

      if (!response.ok) {
        throw new Error('Sohbetler alınamadı');
      }

      const data = await response.json();
      setChats(data);
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
    const fetchChatFromUrl = async () => {
      refreshToken();
      const urlParams = new URLSearchParams(window.location.search);
      const chatIdFromUrl = urlParams.get('id');
      const pathSegments = window.location.pathname.split('/');
      const chatIdFromPath = pathSegments[pathSegments.length - 1];
      if (chatIdFromPath && chatIdFromPath !== 'chat') {
        setIsMessageExist(true);
        setChatId(chatIdFromPath);
        await getChatHistory(chatIdFromPath);
        setFirstMessage(false);
        
      }
      if (chatIdFromUrl) {
        setIsMessageExist(true);
        setChatId(chatIdFromUrl);
        await getChatHistory(chatIdFromUrl);
      }
    };
    
    if (isLoaded && userId) {
      fetchChatFromUrl();
    }
  }, [isLoaded, userId, navigate,token]);
  
  useEffect(() => {
    refreshToken();
    getchats();
  }, [token]);

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
          <span onClick={() => {handleNewChat()}}>Yeni Sohbet</span>
        </div>

        {chats.length === 0 ? (
          <div className="loading">Yükleniyor...</div>
        ) : (
          chats.map(chat => (
            <div key={chat.chats._id} className="chatwrapper" onClick={()=>setFirstMessage(false)}>
              <span
                onClick={() =>
                  getChatHistory(chat.chats[0]._id, setIsMessageExist(true),setChatId(chat.chats[0]._id))
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
          ))
        )}
      </div>
      <div className="messagecontainer">
        <div
          className={
            isMessageExist ? 'messageswrapper' : 'firstmessageswrapper'
          }
        >
          {isMessageExist ? (
            <>
              {chatHistory.map((message, index) => (
                <div
                  key={index}
                  className={
                    message.role === 'user' ? 'usermessages' : 'aimessages'
                  }
                >
                  <span>{message.parts[0].text}</span>
                </div>
              ))}
              {handleAnswer && (
                <div className="answer">
                  <span>
                    {answer ? answer : isTyping && <span className="blinking-cursor">|</span>}
                    {isTyping && <span className="blinking-cursor">|</span>}
                  </span>
                </div>
              )}
              <div ref={messagesEndRef} />
            </>
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
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  handleSendMessage();
                }
              }}
            />
            <button onClick={handleSendMessage} ref={buttonRef} disabled={loading}>
              {loading ? 'Gönderiliyor...' : 'Gönder'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
