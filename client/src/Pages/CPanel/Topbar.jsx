import React, { useState, useRef, useEffect } from "react";

const Topbar = ({ onEditProfile, onToggleSidebar, onLogout }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleToggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="cpanel-header">
      <div className="hamburger" onClick={onToggleSidebar}>☰</div>
      <div className="logo">Radar Informativo</div>
      <div className="user-menu" ref={dropdownRef}>
        <span onClick={handleToggleDropdown}>Beti (Admin) ▼</span>
        {dropdownOpen && (
          <div className="user-dropdown">
            <button onClick={onEditProfile}>Editar Perfil</button>
            <button onClick={onLogout}>Logout</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Topbar;