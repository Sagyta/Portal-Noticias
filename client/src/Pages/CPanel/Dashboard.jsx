import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getNews } from "../../redux/action/action";
import { FaNewspaper } from "react-icons/fa"; // ejemplo de ícono para noticias

const Dashboard = () => {

  const dispatch = useDispatch();
  const news = useSelector(state => state.news);

  useEffect(() => {
    dispatch(getNews());
  }, [dispatch]);

  /* vistas */
  const mostViewed = news?.reduce((max,n)=>
  n.views > (max?.views || 0) ? n : max
  ,null);
  
  console.log("news:", news);
console.log("mostViewed:", mostViewed);

/* Mas reciente */
const mostRecent = news?.[0];

const timeAgo = (date) => {

    const now = new Date();
    const past = new Date(date);
  
    const diff = Math.floor((now - past) / 1000); // segundos
  
    if (diff < 60) return `hace ${diff} segundos`;
  
    const minutes = Math.floor(diff / 60);
    if (minutes < 60) return `hace ${minutes} min`;
  
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `hace ${hours} horas`;
  
    const days = Math.floor(hours / 24);
    return `hace ${days} días`;
  
  };

  return (
    <div className="dashboard">

    <div className="dashboard-line"></div>

      <div className="dashboard-top">

{/* total noticias */}
      <div className="card total-news">

        <h3>Total de noticias publicadas</h3>

        <div className="card-divider"></div>

        <div className="news-content">
        <FaNewspaper className="news-icon" />
        <span className="news-number">{news?.length}</span>
        </div>

     </div>

        <div className="right-cards">

        <div className="card most-viewed">

<h3>Noticia más vista</h3>

<div className="card-line"></div>

<p className="news-title">{mostViewed?.title}</p>

<div className="card-line"></div>

<p className="news-meta">
<strong>{mostViewed?.views}</strong> visitas
</p>

</div>


<div className="card most-recent">

<h3>Noticia más reciente</h3>

<div className="card-line"></div>

<p className="news-title">{mostRecent?.title}</p>

<div className="card-line"></div>

<p className="news-meta">
<strong>Publicado</strong> {mostRecent ? timeAgo(mostRecent.createdAt) : "--"}
</p>

</div>

        </div>

      </div>

      <div className="dashboard-line"></div>
      <div className="card comments-review">
        <h3>Comentarios por revisar</h3>
        <p>--</p>
      </div>

    </div>
  );
};

export default Dashboard;
