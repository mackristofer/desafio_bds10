import './styles.css';
type Props = {
  imgUrl?:string;
  nomeFilme?:string;
  anoFilme?:string;
  subNomeFilme?:string;
};
const MovieCard = ({imgUrl, nomeFilme, anoFilme, subNomeFilme}:Props) => {
  return (
    <div className='card-container'>
      <div>
          <img src={imgUrl}
          alt={nomeFilme} 
          className='img-container'/>
      </div>
      <div className='info-container'>
          <h1>{nomeFilme}</h1>
          <h4>{anoFilme}</h4>
          <p>{subNomeFilme}</p>
      </div>
    </div>
  );
};

export default MovieCard;
