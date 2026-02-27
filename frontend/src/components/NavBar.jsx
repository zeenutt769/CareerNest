import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";

const NavBar = ({ items }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const [activeTab, setActiveTab] = useState("");

    useEffect(() => {
        const currentPath = location.pathname;
        const activeItem = items.find((item) => item.url === currentPath);
        if (activeItem) {
            setActiveTab(activeItem.name);
        }
    }, [location.pathname, items]);

    return (
        <div className="tubelight-nav-container">
            <div className="tubelight-nav-inner glass-panel">
                {items.map((item) => {
                    const Icon = item.icon;
                    const isActive = activeTab === item.name;

                    return (
                        <div
                            key={item.name}
                            onClick={() => {
                                if (item.onClick) {
                                    item.onClick();
                                } else {
                                    setActiveTab(item.name);
                                    navigate(item.url);
                                }
                            }}
                            className={`tubelight-nav-item ${isActive ? "active" : ""}`}
                        >
                            <span className="nav-text">{item.name}</span>
                            <span className="nav-icon">
                                <Icon size={18} strokeWidth={2.5} />
                            </span>

                            {isActive && (
                                <motion.div
                                    layoutId="lamp"
                                    className="nav-lamp"
                                    initial={false}
                                    transition={{
                                        type: "spring",
                                        stiffness: 300,
                                        damping: 30,
                                    }}
                                >
                                    <div className="lamp-top">
                                        <div className="lamp-glow-1" />
                                        <div className="lamp-glow-2" />
                                        <div className="lamp-glow-3" />
                                    </div>
                                </motion.div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default NavBar;
