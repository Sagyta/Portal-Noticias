import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteUserModifications, getModifications, markAsRead } from "../../redux/action/action";
import "./CPanel.css";

const NotifHistory = ({ onBack }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const modifications = useSelector((state) => state.modifications || []);
  const [notifications, setNotifications] = useState([]);

  // Filtrar notificaciones del usuario
  const userNotifications = notifications.filter((m) => m.receiverId === user.id);

  const formatDate = (date) => new Date(date).toLocaleString();

  // Actualizar estado local cuando Redux cambie
useEffect(()=> {
  dispatch(getModifications());
}, [dispatch]);

  useEffect(() => {
    setNotifications(modifications);
  }, [modifications]);

  // Descargar historial como .txt
  const downloadTxt = () => {
    let text = "Historial de Notificaciones\r\n\r\n";
    userNotifications.forEach((n) => {
      text += `Fecha: ${formatDate(n.createdAt)}\r\n`;
      text += `Título: ${n.new?.title || "Sin título"}\r\n`;
      text += `Acción: ${n.action}\r\n`;
      text += `Usuario: ${n.user?.username || "Sistema"}\r\n`;
      text += `--------------------------------------\r\n`;
    });

    const blob = new Blob([text], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "historial_notificaciones.txt";
    link.click();
  };

  // Eliminar todo el historial del usuario
  const clearHistory = async () => {
    if (window.confirm("¿Seguro que querés eliminar todo el historial?")) {
      await dispatch(deleteUserModifications(user.id));
      setNotifications([]);
    }
  };

  // Marcar notificación como leída al hacer click
  const handleNotificationClick = async (n) => {
    if (!n.read) {
      await dispatch(markAsRead(n.id));
      setNotifications((prev) =>
        prev.map((m) => (m.id === n.id ? { ...m, read: true } : m))
      );
    }
  };

  return (
    <div className="notif-history-container">
      <button className="manager-btn-back" onClick={onBack}>
        ← Volver
      </button>

      <h2>Historial de Notificaciones</h2>

      <div className="notif-history-header notif-history-row">
        <div className="notif-history-col">Fecha</div>
        <div className="notif-history-col">Título</div>
        <div className="notif-history-col">Acción</div>
        <div className="notif-history-col">Usuario</div>
      </div>

      {userNotifications.length > 0 ? (
        userNotifications.map((n) => (
          <div
            className={`notif-history-row ${n.read ? "" : "unread"}`}
            key={n.id}
            onClick={() => handleNotificationClick(n)}
          >
            <div className="notif-history-col">{formatDate(n.createdAt)}</div>
            <div className="notif-history-col">{n.new?.title || "Sin título"}</div>
            <div className="notif-history-col">{n.action}</div>
            <div className="notif-history-col">{n.user?.username || "Sistema"}</div>
          </div>
        ))
      ) : (
        <p>No hay notificaciones en el historial.</p>
      )}

      <div className="notif-history-buttons">
        <button className="download-btn" onClick={downloadTxt}>
          Descargar todo
        </button>
        <button className="clear-btn" onClick={clearHistory}>
          Eliminar todo
        </button>
      </div>
    </div>
  );
};

export default NotifHistory;