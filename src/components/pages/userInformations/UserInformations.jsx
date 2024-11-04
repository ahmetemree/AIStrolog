import './userinformations.scss';
import { useUser, useAuth } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

const UserInformations = () => {
    const {isLoaded, userId,getToken} = useAuth();
    const navigate = useNavigate();
    const nameRef = useRef(null);
    const birthdateRef = useRef(null);
    const birthtimeRef = useRef(null);
    const {user} = useUser();
    const [token, setUserToken] = useState("");
    const [name, setName] = useState("");
    const [birthdate, setBirthdate] = useState("");
    const [birthtime, setBirthtime] = useState("");
    const [isFirstTime, setIsFirstTime] = useState(true);
    let zodiacSign = "";
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        await refreshToken();
        const zodiacReturned = findZodiacSign();
        createUser();
    }

    const findZodiacSign = async () => {
        const birthDate = birthdateRef.current.value;
        const [month, day] = birthDate.split('-').slice(1).map(Number);
        

        if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) {
            zodiacSign = 'Koç';
        } else if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) {
            zodiacSign = 'Boğa';
        } else if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) {
            zodiacSign = 'İkizler';
        } else if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) {
            zodiacSign = 'Yengeç';
        } else if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) {
            zodiacSign = 'Aslan';
        } else if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) {
            zodiacSign = 'Başak';
        } else if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) {
            zodiacSign = 'Terazi';
        } else if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) {
            zodiacSign = 'Akrep';
        } else if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) {
            zodiacSign = 'Yay';
        } else if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) {
            zodiacSign = 'Oğlak';
        } else if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) {
            zodiacSign = 'Kova';
        } else {
            zodiacSign = 'Balık!';
        }
        // setZodiacSign(zodiacSign);
        return zodiacSign
    }

    useEffect(() => {
        
    }, [token]);


    const refreshToken = async () => {
        if (isLoaded && userId) {
          const newToken = await getToken({template: 'aistrolog-template'});
          setUserToken(newToken);
            
            if (newToken) {
                getUserInformations(newToken);
            }
        
        }
      };
      useEffect(() => {
    
        refreshToken();
        const intervalId = setInterval(refreshToken, 12 * 60 * 60 * 1000); // Her 12 saatte bir yenile
        
        return () => clearInterval(intervalId);
        
      }, [isLoaded, userId, getToken]);

    const getUserInformations = async (token) => {
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/user/getUserInfo`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });
            const data = await response.json();
            setName(data.name);
            const birthDate = new Date(data.birthDate);
            setBirthdate(birthDate.toISOString().split('T')[0]);
            setIsFirstTime(data.isFirstTime);
            setBirthtime(data.birthTime);
        } catch (error) {
            console.log(error);
        }
        
    }

    const createUser = async () => {
        console.log(zodiacSign,"zodiacSignaaa");
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/user/createuser`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({
                    name: nameRef.current.value,
                    birthDate: birthdateRef.current.value, 
                    birthTime: birthtimeRef.current.value,
                    email: user.emailAddresses[0].emailAddress,
                    zodiacSign : zodiacSign,
                    subscription: "free",

                })
            });
            if (response.ok) {
                navigate("/");
            }
        } catch (error) {
            console.log(error);
    }
}

    useEffect(() => {
        if (isLoaded && !userId) {
             navigate("/login");
           
            
        }
    }, [isLoaded, userId, navigate]);

    return (
        !isLoaded ? (
            <div className='userinformations-loading'>Loading...</div>
        ) : !userId ? (
            navigate("/login")
        ) : (
            <div className="userinformations">
                <h1>Hadi burç analizin için gerekli bilgilerini girelim!</h1>
                <div className="userinformations-content">
                    <form>
                        <input type="text" placeholder="Adınızı giriniz" ref={nameRef} defaultValue={name}/>
                        <input type="date" placeholder="Doğum tarihinizi giriniz" ref={birthdateRef} defaultValue={isFirstTime ? "" : birthdate}/>
                        <input type="time" placeholder="Doğum saatinizi giriniz" ref={birthtimeRef} defaultValue={isFirstTime ? "" : birthtime}/>
                        <button type="submit" onClick={handleSubmit}>Onayla!</button>
                    </form>
                </div>
            </div>
        )
    );
};

export default UserInformations;