import { Loader } from "@mantine/core";
import "./chat.scss"
import { useAuth, useUser } from '@clerk/clerk-react';
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRedirectContext } from '../../../../context/RedirectContext';

const Chat = () => {
  const { redirect, setRedirect } = useRedirectContext();
  const { user } = useUser();
  const { userId, isLoaded } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (isLoaded && !userId) {
      navigate('/login');
      setRedirect("chat")
    }
    
  }, [isLoaded, userId, navigate]);

  if (!isLoaded)
    return (
      <div className="loading">
        <Loader color="blue" />;
      </div>
    );


  return (
    <div className='chatpage'>
      
      <div className="lastchats">
        <div className="newmessagewrapper">

        <span>New Chat</span>
        {/* <img src="/newmessage.png" alt="" /> */}
        </div>
        <div className="chatwrapper">

        <span>aaaaaaaaaaaaa</span>
        <img src="/delete.png" alt="" />
        </div>
        <div className="chatwrapper">

        <span>aaaaaaaaaaaaa</span>
        <img src="/delete.png" alt="" />
        </div>
        <div className="chatwrapper">

        <span>aaaaaaaaaaaaa</span>
        <img src="/delete.png" alt="" />
        </div>
        <div className="chatwrapper">

        <span>aaaaaaaaaaaaa</span>
        <img src="/delete.png" alt="" />
        </div>
        <div className="chatwrapper">

        <span>aaaaaaaaaaaaa</span>
        <img src="/delete.png" alt="" />
        </div>
        <div className="chatwrapper">

        <span>aaaaaaaaaaaaa</span>
        <img src="/delete.png" alt="" />
        </div>
        <div className="chatwrapper">

        <span>aaaaaaaaaaaaa</span>
        <img src="/delete.png" alt="" />
        </div>
        <div className="chatwrapper">

        <span>aaaaaaaaaaaaa</span>
        <img src="/delete.png" alt="" />
        </div>
        <div className="chatwrapper">

        <span>aaaaaaaaaaaaa</span>
        <img src="/delete.png" alt="" />
        </div>
        <div className="chatwrapper">

        <span>aaaaaaaaaaaaa</span>
        <img src="/delete.png" alt="" />
        </div>
        <div className="chatwrapper">

        <span>aaaaaaaaaaaaa</span>
        <img src="/delete.png" alt="" />
        </div>
        <div className="chatwrapper">

        <span>aaaaaaaaaaaaa</span>
        <img src="/delete.png" alt="" />
        </div>
        <div className="chatwrapper">

        <span>aaaaaaaaaaaaa</span>
        <img src="/delete.png" alt="" />
        </div>
        <div className="chatwrapper">

        <span>aaaaaaaaaaaaa</span>
        <img src="/delete.png" alt="" />
        </div>
        <div className="chatwrapper">

        <span>aaaaaaaaaaaaa</span>
        <img src="/delete.png" alt="" />
        </div>
        <div className="chatwrapper">

        <span>aaaaaaaaaaaaa</span>
        <img src="/delete.png" alt="" />
        </div>
        <div className="chatwrapper">

        <span>aaaaaaaaaaaaa</span>
        <img src="/delete.png" alt="" />
        </div>
        <div className="chatwrapper">

        <span>aaaaaaaaaaaaa</span>
        <img src="/delete.png" alt="" />
        </div>
        <div className="chatwrapper">

        <span>aaaaaaaaaaaaa</span>
        <img src="/delete.png" alt="" />
        </div>
        <div className="chatwrapper">

        <span>aaaaaaaaaaaaa</span>
        <img src="/delete.png" alt="" />
        </div>
        <div className="chatwrapper">

        <span>aaaaaaaaaaaaa</span>
        <img src="/delete.png" alt="" />
        </div>
        <div className="chatwrapper">

        <span>aaaaaaaaaaaaa</span>
        <img src="/delete.png" alt="" />
        </div>
        <div className="chatwrapper">

        <span>aaaaaaaaaaaaa</span>
        <img src="/delete.png" alt="" />
        </div>
        <div className="chatwrapper">

        <span>aaaaaaaaaaaaa</span>
        <img src="/delete.png" alt="" />
        </div>
        <div className="chatwrapper">

        <span>aaaaaaaaaaaaa</span>
        <img src="/delete.png" alt="" />
        </div>
        <div className="chatwrapper">

        <span>aaaaaaaaaaaaa</span>
        <img src="/delete.png" alt="" />
        </div>
        <div className="chatwrapper">

        <span>aaaaaaaaaaaaa</span>
        <img src="/delete.png" alt="" />
        </div>
        <div className="chatwrapper">

        <span>aaaaaaaaaaaaa</span>
        <img src="/delete.png" alt="" />
        </div>
        <div className="chatwrapper">

        <span>aaaaaaaaaaaaa</span>
        <img src="/delete.png" alt="" />
        </div>
        <div className="chatwrapper">

        <span>aaaaaaaaaaaaa</span>
        <img src="/delete.png" alt="" />
        </div>
        <div className="chatwrapper">

        <span>aaaaaaaaaaaaa</span>
        <img src="/delete.png" alt="" />
        </div>
        <div className="chatwrapper">

        <span>aaaaaaaaaaaaa</span>
        <img src="/delete.png" alt="" />
        </div>
        <div className="chatwrapper">

        <span>aaaaaaaaaaaaa</span>
        <img src="/delete.png" alt="" />
        </div>
        <div className="chatwrapper">

        <span>aaaaaaaaaaaaa</span>
        <img src="/delete.png" alt="" />
        </div>
        <div className="chatwrapper">

        <span>aaaaaaaaaaaaa</span>
        <img src="/delete.png" alt="" />
        </div>
        <div className="chatwrapper">

        <span>aaaaaaaaaaaaa</span>
        <img src="/delete.png" alt="" />
        </div>
        <div className="chatwrapper">

        <span>aaaaaaaaaaaaa</span>
        <img src="/delete.png" alt="" />
        </div>
        <div className="chatwrapper">

        <span>aaaaaaaaaaaaa</span>
        <img src="/delete.png" alt="" />
        </div>
        <div className="chatwrapper">

        <span>aaaaaaaaaaaaa</span>
        <img src="/delete.png" alt="" />
        </div>
        <div className="chatwrapper">

        <span>aaaaaaaaaaaaa</span>
        <img src="/delete.png" alt="" />
        </div>
        <div className="chatwrapper">

        <span>aaaaaaaaaaaaa</span>
        <img src="/delete.png" alt="" />
        </div>
        <div className="chatwrapper">

        <span>aaaaaaaaaaaaa</span>
        <img src="/delete.png" alt="" />
        </div>
        <div className="chatwrapper">

        <span>aaaaaaaaaaaaa</span>
        <img src="/delete.png" alt="" />
        </div>
        <div className="chatwrapper">

        <span>aaaaaaaaaaaaa</span>
        <img src="/delete.png" alt="" />
        </div>
        <div className="chatwrapper">

        <span>aaaaaaaaaaaaa</span>
        <img src="/delete.png" alt="" />
        </div>
        <div className="chatwrapper">

        <span>aaaaaaaaaaaaa</span>
        <img src="/delete.png" alt="" />
        </div>
        <div className="chatwrapper">

        <span>aaaaaaaaaaaaa</span>
        <img src="/delete.png" alt="" />
        </div>
        
      </div>
      <div className="messagecontainer">
        b
      </div>
    </div>
  )
}

export default Chat