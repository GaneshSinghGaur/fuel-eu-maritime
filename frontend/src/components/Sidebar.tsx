import React from "react";
import { Link } from "react-router-dom";

const Sidebar: React.FC = () => {
  const menu = [
    { name: "Routes", path: "/" },
    { name: "Comparison", path: "/comparison" },
    { name: "Banking", path: "/banking" },
    { name: "Pooling", path: "/pooling" },
    { name: "Compliance", path: "/compliance" },
  ];

  return (
    <aside className="w-64 bg-gray-900 text-white flex flex-col p-4">
      <div className="text-xl font-bold mb-6">Menu</div>
      <nav className="space-y-3">
        {menu.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            className="block px-3 py-2 rounded hover:bg-gray-700"
          >
            {item.name}
          </Link>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
