import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div>
      <div className="group relative overflow-hidden flex justify-center items-center  transition-shadow hover:shadow-2xl  hover:shadow-black/30">
        <div className="h-96 w-full ">
          <img
            className=" w-full h-96 object-cover rounded-md transition-transform"
            src="banner.jpg"
            alt=""
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-neutral-900 "></div>
          <div className="absolute inset-0 flex justify-center items-center text-white text-3xl capitalize ">
            <h1 className="font-sans font-extrabold text-6xl text-custom-purple">
              Listening Stats
            </h1>
            <Link to="/home">
              <button className="absolute bottom-0 left-1/2 transform -translate-x-1/2 mb-20 w-40 h-10 bg-black rounded-full font-sans text-lg font-semibold">
                Check it out
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;