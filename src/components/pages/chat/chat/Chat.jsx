import { Loader, Notification } from '@mantine/core';
import './chat.scss';
import { ClerkProvider, useAuth, useClerk, useUser } from '@clerk/clerk-react';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRedirectContext } from '../../../../context/RedirectContext';
import { model, model2 } from '../../../../lib/gemini';
import { notifications } from '@mantine/notifications';

const Chat = () => {
  const { redirect, setRedirect } = useRedirectContext();
  const { user } = useUser();
  const { userId, isLoaded, getToken, isSignedIn } = useAuth({
    template: 'tokennn'
  });

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
  const [chatId, setChatId] = useState('');
  const [answer, setAnswer] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [firstMessage, setFirstMessage] = useState(true);
  const [handleAnswer, setHandleAnswer] = useState(false);
  const [stop, setStop] = useState(false);
  const [credits, setCredits] = useState(0);
  const [birthDay, setBirthDay] = useState('');
  const [birthTime, setBirthTime] = useState('');
  const [birthPlace, setBirthPlace] = useState('');
  const [subscription, setSubscription] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const [token, setUserToken] = useState('');

  const refreshToken = async () => {
    if (isSignedIn) {
      const newToken = await getToken({ template: 'aistrolog-template' });
      setUserToken(newToken);
    }
  };

  

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
      setCredits(data.credits);
      const date = new Date(data.birthDate);
      const formattedDate = date.toLocaleDateString('tr-TR');
      setBirthDay(formattedDate);
      setBirthTime(data.birthTime);
      setBirthPlace(data.birthPlace);
      setSubscription(data.subscription);
      if (formattedDate == 'Invalid Date') {
        notifications.show({
          title: 'Hata',
          message: 'Doğum tarihinizi giriniz!',
          color: 'red',
          position: 'top-right'
        });
        navigate('/user-informations');
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    refreshToken();
    const intervalId = setInterval(refreshToken, 12 * 60 * 60 * 1000); // Her 12 saatte bir yenile

    return () => clearInterval(intervalId);
  }, [isSignedIn, getToken]);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'auto', block: 'end' });
    }
  };

  useEffect(() => {}, [chatHistory, answer]);

  const chat = model.startChat({
    history: chatHistory.length > 0
      ? chatHistory.map(({ role, parts }) => ({
          role,
          parts: parts?.length > 0 && parts[0]?.text ? [{ text: parts[0].text }] : []
        }))
      : [],
    generationConfig: {
      //  maxOutputTokens:100,
    },
    safetySettings: [
      {
        category: "HARM_CATEGORY_HARASSMENT",
        threshold: "BLOCK_NONE",
      },
    ],
    // Context bilgisini mesaj olarak gönderelim
    history: [
      {
        role: "user",
        parts: [{ 
          text: `Kullanıcı Bilgileri:
          İsim: ${user?.fullName}
          Doğum Tarihi: ${birthDay}
          Doğum Saati: ${birthTime}
          Doğum Yeri: ${birthPlace}`
        }]
      }
    ]
  });
  const chat2 = model2.startChat({
    generationConfig: {
      //  maxOutputTokens:100,
    }
  });

  const handleNewChat = async () => {
    setIsMessageExist(false);
    setFirstMessage(true);
    setAnswer('');
    setChatHistory([]);
    setChatId('');
  };

  const add = async (text, isInitial, generatedchatId) => {
    debugger;
    refreshToken();
    setHandleAnswer(true);

    let currentChatId = '';
    if (firstMessage && generatedchatId != '') {
      currentChatId = generatedchatId;
    } else {
      currentChatId = chatId;
    }
    setLoading(true);

    if (!isInitial) setQuestion(text);
    if (!firstMessage) {
      await updateChat('user', [{ text: text }], currentChatId);
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
      
      let result = '';
    
        const firstResult = await chat.sendMessage(text);
        result = await firstResult.response.text();
      
      clearInterval(animateDots);
      setIsTyping(false);

      const response = result;
      const formattedResponse = response.replace(/\*\*(.*?)\*\*/g, '\n$1\n');

      let displayedAnswer = '';
      const lines = formattedResponse.split('\n');

      setIsTyping(true);
      for (let line of lines) {
        if (!stop) {
          for (let char of line) {
            refreshToken();
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
      }
      refreshToken();
      setIsTyping(false);
      await refreshToken();
      await updateChat('model', [{ text: displayedAnswer }], currentChatId);
      await getChatHistory(currentChatId);
      setHandleAnswer(false);
      setAnswer('');
    } catch (err) {
      console.log(err);
      setIsTyping(false);
      setAnswer('Bir hata oluştu lütfen daha sonra tekrar deneyiniz.');
    }
    setLoading(false);
  };

  const decreaseCredits = async () => {

    await refreshToken();
    if(subscription === 'premium'){
      return;
    }
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/user/updatecredits`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ credits: credits - 1 })
      }
    );
  };

  const handleSendMessage = async () => {
    getUserInformations(token);
    debugger
    if (credits > 0) {
      decreaseCredits();
      getUserInformations(token);
    }
    refreshToken();
    // Mesaj gönderildikten sonra en aşağıya kaydırma
    if (credits <= 0) {
      notifications.show({
        title: 'Hata',
        message: 'Kredi bitti!',
        color: 'red',
        position: 'top-right'
      });
      throw new Error('Kredi bitti!');
    }
    setTimeout(() => {
      if (messagesEndRef.current) {
        messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
    if (loading) return;
    setIsMessageExist(true);
    let newChatId = '';
    try {
      if (firstMessage) {
        setFirstMessage(false);
        newChatId = await createNewChat();
      }

      const inputValue = inputRef.current.value;
      if (inputValue == '') {
        notifications.show({
          title: 'Hata',
          message: 'Mesajınızı giriniz!',
          color: 'red',
          position: 'top-right'
        });
        throw new Error('Mesajınızı giriniz!');
      }
      inputRef.current.value = '';

      setChatHistory(prevHistory => [
        ...prevHistory,
        { role: 'user', parts: [{ text: inputValue }] }
      ]);

      await add(inputValue, true, newChatId);
    } catch (error) {
      console.error('Mesaj gönderme hatası:', error);
    }
  };

  const updateChat = async (role, parts, generatedchatId) => {
    await refreshToken();
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/chat/updatechat/${generatedchatId}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        credentials: 'include',
        body: JSON.stringify({
          role: role,
          parts: parts,
          chatId: generatedchatId
        })
      }
    );
    const data = await response.json();
  };

  const createNewChat = async () => {
    refreshToken();
    const generatedChatId = Date.now().toString();

    const title = inputRef.current ? inputRef.current.value.slice(0, 10) : '';
    const history = [
      { role: 'user', parts: [{ text: inputRef.current.value }] }
    ];

    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/chat/createchat`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
          credentials: 'include',
          body: JSON.stringify({
            userId,
            chatId: generatedChatId,
            title,
            history
          })
        }
      );

      if (!response.ok) {
        throw new Error('Yeni sohbet oluşturulamadı');
      }

      setChatId(generatedChatId);
      getChatHistory(generatedChatId);
      setChats(prevChats => [
        ...prevChats,
        { chats: [{ _id: generatedChatId, title }] }
      ]);
      return generatedChatId;
    } catch (error) {
      console.error('Yeni sohbet oluşturma hatası:', error);
      throw error;
    }
  };

  const getChatHistory = async generatedchatId => {
    refreshToken();
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/chat/getchat/${generatedchatId}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        credentials: 'include',
        body: JSON.stringify({ chatId })
      }
    );

    const data = await response.json();
    await setChatHistory(data.history);
  };

  const handleDeleteChat = async chatId => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/chat/deletechat/${chatId}`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
          credentials: 'include'
        }
      );
      if (!response.ok) {
        throw new Error('Sohbet silinemedi');
      }
      const data = await response.json();
      setChats(data);
      notifications.show({
        title: 'Başarılı!',
        message: 'Sohbet başarıyla silindi.',
        color: 'green',
        autoClose: 3000,
        position:"bottom-right",
        radius:"md"
      
    });
    } catch (error) {
      console.error('Sohbet silme hatası:', error);
      notifications.show({
        title: 'Hata!',
        message: 'Sohbet silinemedi.',
        color: 'red',
        autoClose: 3000,
        position:"bottom-right",
        radius:"md"
      
    });
    }
  };

  const getchats = async () => {
    refreshToken();
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/chat/getchats`,
        {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
          
        }
      );

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
  }, [isLoaded, userId, navigate, token]);

  useEffect(() => {
    refreshToken();
    getchats();
    getUserInformations(token);
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
          <span
            onClick={() => {
              handleNewChat();
            }}
          >
            Yeni Sohbet
          </span>
        </div>

        {chats.length === 0 ? (
          <div className="loading">Yükleniyor...</div>
        ) : (
          chats.map(chat => (
            <div
              key={chat.chats._id}
              className="chatwrapper"
              onClick={() => setFirstMessage(false)}
            >
              <span
                onClick={async () => {
                  await refreshToken();
                  getChatHistory(
                    chat.chats[0]._id,
                    setIsMessageExist(true),
                    setChatId(chat.chats[0]._id)
                  );
                }}
              >
                {chat.chats[0].title}
              </span>
              <img
                src="/delete.png"
                alt=""
                onClick={async () => {
                  await refreshToken();
                  handleDeleteChat(chat.chats[0]._id);
                  getChatHistory(chats[chats.length - 2]?.chats[0]._id);
                }}
              />
            </div>
          ))
        )}
      </div>
      <div className="messagecontainer">
        <div className="credits">
          <span>{subscription === 'premium' ? 'Sınırsız Kredi Hakkı!' : `${credits} Kredi kaldı!`}</span>
        </div>
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
                    {answer
                      ? answer
                      : isTyping && <span className="blinking-cursor">|</span>}
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
              required
              placeholder="Mesajınızı giriniz..."
              ref={inputRef}
              onKeyPress={e => {
                if (e.key === 'Enter') {
                  handleSendMessage();
                }
              }}
            />
            <button
              onClick={() => {
                handleSendMessage();
              }}
              ref={buttonRef}
              disabled={loading}
            >
              {loading ? 'Gönderiliyor...' : 'Gönder'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
