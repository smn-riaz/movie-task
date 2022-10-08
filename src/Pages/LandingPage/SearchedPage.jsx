import { faFilter, faHome } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useEffect,  useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Loading from "../../Components/Loading";

const SearchedPage = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const movieData = useParams();
  const navigate = useNavigate()
  const movieName = movieData.movie;
 
  useEffect(() => {
    setLoading(true);
    const apiUrl = `https://movie-task.vercel.app/api/search?page=1&query=${movieName}`;
    axios.get(apiUrl).then((res) => {
      setMovies(res.data.data.results);
      setLoading(false);
    });
  }, [movieName]);


  return (
    <main className="">
      <section>
        <div className="navbar sm:flex sm:flex-row">
          <div className="flex-1">
            <Link to="/">
              <button className="bg-gray-600 transition duration-500 p-2 rounded-lg">
                <FontAwesomeIcon icon={faHome} /> HOME
              </button>
             </Link>
          </div>
        </div>
      </section>

      {loading ? (
        <div className="text-center">
            <Link to="/">
              <button className="bg-gray-600 transition duration-500 p-3 hover:bg-gray-500 text-white">
                <FontAwesomeIcon icon={faHome} /> HOME
              </button>
            </Link>
            <Loading />
          </div>
        
      ) : (
        <section>
          <div className="px-6 py-4">
            {
              movies.length > 0 && <h1 className="text-2xl text-white uppercase">{movieName}</h1>
            }
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 px-6">
            { movies.length?
            movies.map((movie) => (
              <div
                className="relative group cursor-pointer"
                onClick={() => navigate(`/${movie.id}`)}
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
            ))
            :
            <div className="flex flex-row justify-center text-center  items-center">
              <h2 className=" text-4xl font-bold text-white">No Data Available</h2>
            </div>
          }
          </div>
        </section>
      )}
    </main>
  );
};

export default SearchedPage;
