import './userinformations.scss';
import { useUser, useAuth } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const UserInformations = () => {
    const {isLoaded, userId} = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (isLoaded && !userId) {
             navigate("/login");
           
            
        }
    }, [isLoaded, userId, navigate]);

    return (
        !isLoaded ? (
            <div>Loading...</div>
        ) : !userId ? (
            navigate("/login")
        ) : (
            <div className="userinformations">
                <h1>Hadi burç analizin için gerekli bilgilerini girelim!</h1>
                <div className="userinformations-content">
                    <form>
                        <input type="text" placeholder="Adınızı giriniz" />
                        <input type="date" placeholder="Doğum tarihinizi giriniz" />
                        <input type="time" placeholder="Doğum saatinizi giriniz" />
                        <button type="submit">Onayla!</button>
                    </form>
                </div>
            </div>
        )
    );
};

export default UserInformations;