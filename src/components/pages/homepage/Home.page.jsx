import './homepage.scss';
export function HomePage() {
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
          <h1>Senin için hazırlanmış Yapay zeka destekli analiz yapan bir burç asistanı</h1>
          <h3>Hadi hemen sen de doğum tarihini girerek burç analizlerini öğren!</h3>
          <button>Haydi Başlayalım!</button>
        </div>
      </div>
    </div>
  );
}
