// Pages/CPanel/Content.jsx
//import React, { useState } from "react";
import CategoryManager from "./Management/CategoryManager";
import NewsManager from "./Management/NewsManager";
import RoleManager from "./Management/RoleManager";
import AuthorManager from "./Management/AuthorManager";
import UserManager from "./Management/UserManager";
import Dashboard from "./Dashboard";
import NotifHistory from "./NotifHistory";
import CommentManager from "./Management/CommentManager";
import "./CPanel.css";
import AdsLateralManager from "./Management/AdsLateralManager";

const Content = ({ activeGestion, activeCrear, showNotifHistory, setShowNotifHistory }) => {

  //const [showNotifHistory, setShowNotifHistory] = useState(false);

  if (showNotifHistory) {
    return <NotifHistory onBack={() => setShowNotifHistory(false)} />;
  }

  return (
    <div className="content">

      {!activeGestion && !activeCrear && <Dashboard />}

      {activeGestion === "Category" || activeCrear === "Category" ? (
        <CategoryManager activeGestion={activeGestion} activeCrear={activeCrear} />
      ) : null}

      {activeGestion === "News" || activeCrear === "News" ? (
        <NewsManager activeGestion={activeGestion} activeCrear={activeCrear} />
      ) : null}

      {activeGestion === "Role" || activeCrear === "Role" ? (
        <RoleManager activeGestion={activeGestion} activeCrear={activeCrear} />
      ) : null}

      {activeGestion === "Author" || activeCrear === "Author" ? (
        <AuthorManager activeGestion={activeGestion} activeCrear={activeCrear} />
      ) : null}

      {activeGestion === "Users" || activeCrear === "Users" ? (
        <UserManager activeGestion={activeGestion} activeCrear={activeCrear} />
      ) : null}

      {activeGestion === "Comments" ? (
        <CommentManager activeGestion={activeGestion} />) : null}

      {activeGestion === "Ads Lateral" || activeCrear === "Ads Lateral" ? (
        <AdsLateralManager activeGestion={activeGestion} activeCrear={activeCrear} />
      ) : null}

    </div>
  );
};

export default Content;