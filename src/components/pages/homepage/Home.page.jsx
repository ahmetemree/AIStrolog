import { useMyContext } from '../../../context/Context';
import './homepage.scss';
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
        <div className="righttext">
          <h1>{eSelected ? "An AI-powered horoscope assistant designed just for you, offering detailed analysis." : "Senin için hazırlanmış Yapay zeka destekli analiz yapan bir burç asistanı"}</h1>
          <h3>{eSelected ? "Go ahead and enter your birth date to discover your horoscope analyses!" : "Hadi hemen sen de doğum tarihini girerek burç analizlerini öğren!"}</h3>
          <a href="/dashboard"><button>{eSelected ? "Let's start!" : "Haydi Başlayalım!"}</button></a>
        </div>

      </div>
        <div className="privacy">
          <a href="/privacy-policy"><div className="text">Privacy&policy</div></a>
          <div className="text">|</div>
          <a href="/contact"><div className="text">Contact</div></a>
        </div>
    </div>
  );
}
