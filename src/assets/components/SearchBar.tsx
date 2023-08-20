import { useCallback, useState } from "react";
import { Button, InputGroup, Form } from "react-bootstrap";
import tmdbAPIConfig from "../../../config";

interface Props {
  callbackMovies: (movies: any[]) => void;
  callbackSearchKeyword: (keyword: string) => void;
}

const SearchBar = ({ callbackMovies, callbackSearchKeyword }: Props) => {
  const { tmdb_base_url, tmdb_api_key } = tmdbAPIConfig;
  let apiAction;

  const [movies, setMovies] = useState([]);
  const [searchText, setSearchText] = useState("");

  const img_url = "https://image.tmdb.org/t/p/h632"; //default height

  const findMovies = async () => {
    apiAction = "search/movie";
    let url =
      tmdb_base_url +
      apiAction +
      "?query=" +
      searchText +
      "&api_key=" +
      tmdb_api_key;

    // console.log("url", url);

    const res = await fetch(url)
      .then((response) => response.json())
      .then((data) => {
        // console.log("results", data.results);

        data.results.map((movie: any) => {
          return (movie.img = movie.backdrop_path
            ? img_url + movie.backdrop_path
            : null);
        });

        // console.log("results2", data.results);

        callbackMovies(data?.results.slice(0, 5));
        callbackSearchKeyword(searchText);

        // Promise.all(
        //   data?.results.map(async (movie: any): Promise<any> => {
        //     return (movie.imDbRating = await getImdbRating(movie.id));
        //   })
        // );

        //   data?.results.map(async (movie: any) => {
        //   movie.imDbRating = await getImdbRating(movie.id);
        //   console.log(movie.imDbRating);
        // });

        // console.log("with IMDB", data?.results);
        // getImdbRating(data?.results.id)

        // let moviesx: typeof movies = await Promise.all(data?.results.map(async (id))= > {
        // let apiAction = "Title"
        // let url =
        // tmdb_base_url + "/" + apiAction + "/" + tmdb_api_key + "/" + searchText;
        // })
      })
      .catch((error) => console.log(error));
  };

  const getImdbRating = (id: number) => {
    apiAction = "Title";
    let url = tmdb_base_url + "/" + apiAction + "/" + tmdb_api_key + "/" + id;
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        return data?.imDbRating;
      })
      .catch((error) => console.log(error));
  };

  const handleFindMovies = (e: React.SyntheticEvent) => {
    e.preventDefault();
    findMovies();
  };

  const onChangeSearch = useCallback((event: React.SyntheticEvent) => {
    let target = event.target as HTMLInputElement;
    setSearchText(target.value);
  }, []);
  return (
    <InputGroup className="p-2 d-flex">
      <Form.Control
        id="searchText"
        value={searchText}
        onChange={onChangeSearch}
        onKeyDown={(e: React.KeyboardEvent) => {
          if (e.key === "Enter") {
            handleFindMovies(e);
          }
        }}
        placeholder="Find Movies"
      />
      <Button onClick={handleFindMovies}>Search</Button>
    </InputGroup>
  );
};

export default SearchBar;
