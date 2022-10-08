import {
  faCalendar,
  faClock,
  faHome,
  faLanguage,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Loading from "../../Components/Loading";

const SingleMoviePage = () => {
  const navigate = useParams();
  const movieId = navigate.id;
  const [loading, setLoading] = useState(false);
  const [movie, setMovie] = useState({});

  useEffect(() => {
    setLoading(true);
    const apiUrl = ` https://movie-task.vercel.app/api/movie?movieId=${movieId}`;
    axios.get(apiUrl).then((res) => {
      setMovie(res.data.data);
      setLoading(false);
    });
  }, [movieId]);
  const {
    title,
    homepage,
    imdb_id,
    revenue,
    budget,
    backdrop_path,
    popularity,
    production_companies,
    production_countries,
    spoken_languages,
    vote_average,
    vote_count,
    original_language,
    overview,
    genres,
    poster_path,
    release_date,
    runtime,
    tagline,
    video,
  } = movie;
  console.log(movie);
  return (
    <main className="p-8">
      {loading ? (
        <Loading />
      ) : (
        <div>
          <div className="text-center">
            <Link to="/">
              <button className="hover:bg-gray-600 transition duration-500 px-2 py-1">
                <FontAwesomeIcon icon={faHome} /> HOME
              </button>
            </Link>
          </div>

          <section className="sm:flex flex-row justify-between py-4">
            <div className="space-y-3">
              <h1 className="text-4xl font-bold text-white">{title}</h1>
              <h5 className="text-md text-gray-400 ">{tagline}</h5>
              <div className="flex flex-row justify-between text-white space-x-3">
                <p className="text-lg">
                  <FontAwesomeIcon icon={faCalendar} /> {release_date}
                </p>
                <p className="text-lg uppercase">
                  <FontAwesomeIcon icon={faLanguage} /> {original_language}
                </p>
                <p className="text-lg">
                  <FontAwesomeIcon icon={faClock} /> {runtime}min
                </p>
              </div>
              <div className="flex flex-row justify-start space-x-2 text-white">
                {genres &&
                  genres.map((gn) => (
                    <div>
                      <button className="bg-[#574c4c73] hover:bg-gray-700 transition duration-500 rounded-md py-1 px-2">
                        {gn.name}
                      </button>
                    </div>
                  ))}
              </div>
              <h3 className="text-white">
                <a href={homepage}>{homepage}</a>
              </h3>
            </div>
          </section>

          <section className="sm:flex md:flex flex-row gap-2">
            <div className="basis-1/3">
              <img
                src={`https://image.tmdb.org/t/p/original${poster_path}`}
                alt=""
              />
            </div>
            <div className="basis-1/3 justify-between">
              <div className="bg-[#706b6b69] rounded-lg text-white p-2 h-fit m-2">
                <h3 className="font-semibold">IMDb ID</h3>
                <p>{imdb_id}</p>
              </div>

              <div className="bg-[#706b6b69] rounded-lg text-white p-2  h-fit m-2">
                <h3 className="font-semibold uppercase">POPULARITY</h3>
                <p>{popularity}</p>
              </div>

              <div className="bg-[#706b6b69] rounded-lg text-white p-2 h-fit m-2">
                <h3 className="font-semibold uppercase">VOTE AVG</h3>
                <p>{vote_average}</p>
              </div>

              <div className="bg-[#706b6b69] rounded-lg text-white p-2 h-fit m-2">
                <h3 className="font-semibold uppercase">VOTE COUNT</h3>
                <p>{vote_count}</p>
              </div>

              <div className="bg-[#706b6b69] rounded-lg text-white p-2 h-fit m-2">
                <h3 className="font-semibold uppercase">Spoken Language</h3>
                {spoken_languages &&
                  spoken_languages.map((lang) => <p>{lang.english_name}</p>)}
              </div>
              <div className="bg-[#706b6b69] rounded-lg text-white p-2 h-fit m-2">
                <h3 className="font-semibold uppercase">
                  Production companies
                </h3>
                {production_companies &&
                  production_companies.map((company) => (
                    <p>
                      {company.name} ({company.origin_country})
                    </p>
                  ))}
              </div>
              <div className="bg-[#706b6b69] rounded-lg text-white p-2 h-fit m-2">
                <h3 className="font-semibold uppercase">
                  Production countries
                </h3>
                {production_countries &&
                  production_countries.map((country) => (
                    <p>
                      {country.name} ({country.iso_3166_1})
                    </p>
                  ))}
              </div>

              <div className="flex flex-row">
                <div className="bg-[#706b6b69] rounded-lg text-white p-2 h-fit m-1 w-full">
                  <h3 className="font-semibold uppercase">Budget</h3>
                  <p>${budget}</p>
                </div>
                <div className="bg-[#706b6b69] rounded-lg text-white p-2 h-fit m-1 w-full">
                  <h3 className="font-semibold uppercase">Revinue</h3>
                  <p>${revenue}</p>
                </div>
              </div>
            </div>
            <div className="basis-1/3 ">
              <div>
                <img
                  src={`https://image.tmdb.org/t/p/original${backdrop_path}`}
                  alt=""
                />
              </div>
              <h4 className="text-lg">{overview}</h4>
              {
                video && <div>
                <iframe
                  
                  src={video}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  title={title}
                />
              </div>
              }
            </div>
          </section>
        </div>
      )}

<h5 className="text-center text-lg p-4">Developed by <a href="https://www.linkedin.com/in/shahman-riaz/" className="font-semibold">Shahman Riaz</a></h5>      
    </main>
  );
};

export default SingleMoviePage;
