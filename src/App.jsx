import { useEffect} from 'react'
import { useDispatch } from 'react-redux'
import { setApiConfiguration, setGenres } from './features/home/homeSlice'
import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from "react-router-dom";

import Layout from './components/layout/Layout'
import { fetchDataFromApi } from './utils/api'
import Home from './pages/home/Home'
import Details from './pages/details/Details'
import PageNotFound from './pages/404/PageNotFound'
import Explore from './pages/explore/Explore'
import SearchResult from './pages/searchResult/SearchResult'





function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        fetchApiConfig();
        setGenre()
    }, [])

    //storing url's using redux
    const fetchApiConfig = () => {
        const response = fetchDataFromApi("/configuration");
        response.then(resp => {
            // console.log(resp);
            const url = {
                backdrop:resp.images.secure_base_url + "original",  //size avialable:- ['w300', 'w780', 'w1280', 'original']
                poster:resp.images.secure_base_url + "w500",    //size avialable:- ['w92', 'w154', 'w185', 'w342', 'w500', 'w780', 'original']
                profile:resp.images.secure_base_url + "h632",  //size avialable:- ['w45', 'w185', 'h632', 'original']
            }
            dispatch(setApiConfiguration(url));
        })
    }

    //storing geners in store using redux
    async function setGenre() {
        const movieGenres = await fetchDataFromApi("/genre/movie/list");
        const tvGenres =await  fetchDataFromApi("/genre/tv/list");
        let allGenres={};
        await movieGenres.genres.map((genre) => {
            allGenres[genre.id] = genre;
        })
        await tvGenres.genres.map((genre) => {
            allGenres[genre.id] = genre;
        })
        // console.log(allGenres);
        //store all generes
        dispatch(setGenres(allGenres));
    }

    //routing
    const router = createBrowserRouter(
        createRoutesFromElements(  
            <Route path='/' element={<Layout/>}>
                <Route path="" element={<Home />} />
                <Route path="/:mediaType/:id" element={<Details />} />
                <Route path="/search/:query" element={<SearchResult />} />
                <Route path="/explore/:mediaType" element={<Explore />} />
                <Route path="*" element={<PageNotFound />} />
            </Route>
        )
    )

    return (
        <>
            <RouterProvider router={router}/>
        </>
    )
}

export default App
