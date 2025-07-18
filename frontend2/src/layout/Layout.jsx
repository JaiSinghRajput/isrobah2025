import { Link, Outlet } from "react-router";
import logo from "/mitrc.png";
import logo2 from "/main_title.png";

export default function Page() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <nav className={` shadow-md px-6 py-2`}>
        <div className=" mx-auto justify-between flex items-center gap-12">
          <div className="bg-white p-2 rounded">
            <Link to="/">
              <img className="h-auto w-46" src={logo} alt="" />
            </Link>
          </div>
          <div className="lg:text-3xl text-sm sm:text-xl md:text-2xl tracking-widest font-bold">
            <h1>Bharat Solar Sentinel</h1>
            <h1 className="text-base">-CME Identifier in SWIS Instrument</h1>
          </div>
          <div className="p-2 rounded">
            <img className="h-auto w-46" src={logo2} alt="" />
          </div>
        </div>
      </nav>

      <main className="flex-1">
        <Outlet />
      </main>

      <footer className="bg-gray-200 text-center p-4 text-sm text-gray-600">
        © 2025 MissionSpace All rights reserved.
      </footer>
    </div>
  );
}
