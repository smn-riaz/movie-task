import { faFilter } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Loading from "../../Components/Loading";

const LandingPage = () => {
  const navigate = useNavigate();
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("avengers");

  useEffect(() => {
    setLoading(true);
    const apiUrl = "https://movie-task.vercel.app/api/popular?page=1";
    axios.get(apiUrl).then((res) => {
      setMovies(res.data.data.results);
      setLoading(false);
    });
  }, []);

//  console.log(search)



  return (
    <main className="">
      <section>
        <div className="navbar sm:flex flex-row">
          <div className="sm:flex-1">
            <Link to="/" className="btn btn-ghost normal-case text-xl">
              Movie
            </Link>
          </div>
          <div className="flex-none sm:gap-2 sm:px-4">
            <div className="form-control">
              <input
                // ref={searchRef}
                defaultValue={search}
                type="text"
                placeholder="Search"
                className="input input-bordered"
                onBlur={(e) => setSearch(e.target.value)}
              />
            </div>
            <div>
              <button onClick={() => navigate(`/search/${search}`)}  className="p-2 bg-gray-600 hover:bg-gray-500 text-white rounded-lg">SEARCH</button>
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
          <div className="grid sm:grid-cols-2 md:grid-cols-4 sm:gap-4 mx-auto px-6">
            {movies.map((movie) => (
              <div
                className="relative group cursor-pointer mx-auto my-2"
                onClick={() => navigate(`${movie.id}`)}
              >
                <img
                  src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                  alt=""
                  className="rounded-lg w-full h-full"
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

      <h5 className="text-center text-lg p-4">
        Developed by{" "}
        <a
          href="https://www.linkedin.com/in/shahman-riaz/"
          className="font-semibold"
        >
          Shahman Riaz
        </a>
      </h5>
    </main>
  );
};

export default LandingPage;
