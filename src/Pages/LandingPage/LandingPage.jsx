import { faFilter } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "../../Components/Loading";

const LandingPage = () => {
  const navigate = useNavigate();

  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const apiUrl = "https://movie-task.vercel.app/api/popular?page=1";
    axios.get(apiUrl).then((res) => {
      setMovies(res.data.data.results);
      console.log(res.data.data.results);
      setLoading(false);
    });
  }, []);
  return (
    <main className="">
      
      <section>
        <div className="navbar sm:flex sm:flex-row">
          <div className="flex-1">
            <a className="btn btn-ghost normal-case text-xl">
              MOVIE FRONTEND UI
            </a>
          </div>
          <div className="flex-none gap-2 px-4">
            <div className="dropdown dropdown-end">
              <FontAwesomeIcon className="text-2xl" icon={faFilter} />
            </div>
            <div className="form-control">
              <input
                type="text"
                placeholder="Search"
                className="input input-bordered"
              />
            </div>
          </div>
        </div>
      </section>


      {loading ? (
        <Loading />
      ) : (
        <section>
          <div className="px-6 py-4">
            <h1 className="text-2xl text-white">Popular Movies</h1>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 px-6">
            {movies.map((movie) => (
              <div
                className="relative group cursor-pointer"
                onClick={() => navigate(`${movie.id}`)}
              >
                <img
                  src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                  alt=""
                  className="rounded-lg"
                />
                <h5 className="absolute inset-0 flex items-center justify-center font-bold text-lg text-white group-hover:visible invisible transition duration-300 opacity-0 group-hover:opacity-100">
                  <button className="bg-[#646060bb] p-2 text-center rounded-xl shadow-md">
                    {movie.title}
                  </button>
                </h5>
              </div>
            ))}
          </div>
        </section>
      )}

<h5 className="text-center text-lg p-4">Developed by <a href="https://www.linkedin.com/in/shahman-riaz/" className="font-semibold">Shahman Riaz</a></h5>
    </main>
  );
};

export default LandingPage;
