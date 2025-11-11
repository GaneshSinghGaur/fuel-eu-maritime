import React from "react";
import { Link } from "react-router-dom";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen">
      <header className="bg-slate-800 text-white p-4">
        <div className="container mx-auto flex gap-4 items-center">
          <h1 className="font-bold">FuelEU Dashboard</h1>
          <nav className="flex gap-3">
            <Link to="/" className="hover:underline">
              Routes
            </Link>
            <Link to="/compare" className="hover:underline">
              Compare
            </Link>
          </nav>
        </div>
      </header>
      <main className="container mx-auto p-6">{children}</main>
    </div>
  );
}
