import { Link } from 'react-router-dom';
import { useMyContext } from '../../../context/Context';
import './homepage.scss';
import { motion } from 'framer-motion';

export function HomePage() {

  const { eSelected, setESelected } = useMyContext();

  return (
    <div className="homepage">
      <div className="imgcontainer">
        <div className="leftimage">
          <div className="astrolog">

        <img src="/astrolog.png" alt="" />
          </div>
          <div className="astrology">

        <img src="/astrology.png" alt="" />
          </div>
        </div>
        <motion.div className="righttext"
         initial={{ opacity: 0, y: 250 }}
         whileInView={{ opacity: 1, y: 0 }}
         transition={{ duration: 0.7 }}
        >
          <motion.h1
          initial={{ opacity: 0, y: 250 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          >{eSelected ? "An AI-powered horoscope assistant designed just for you, offering detailed analysis." : "Senin için hazırlanmış Yapay zeka destekli analiz yapan bir burç asistanı"}</motion.h1>
          <motion.h3
          initial={{ opacity: 0, y: 250 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1}}
          >{eSelected ? "Go ahead and enter your birth date to discover your horoscope analyses!" : "Hadi hemen sen de doğum tarihini girerek burç analizlerini öğren!"}</motion.h3>
          <Link to={'/dashboard'}>
          
          <motion.button
          initial={{ opacity: 0, y: 150 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.3 }}
          >{eSelected ? "Let's start!" : "Haydi Başlayalım!"}</motion.button>
          </Link>
        </motion.div>

      </div>
        <div className="privacy">
          <Link to={'/privacy-policy'}>
          
          <div className="text">{eSelected ? "Privacy & Policy" : "Gizlilik & Güvenlik"}</div>
          </Link>
          <div className="text">|</div>
          <Link to={'/contact'}>
          
          <div className="text">{eSelected ? "Contact" : "İletişim"}</div>
          </Link>
        </div>
    </div>
  );
}
