import React, {useState, useEffect} from 'react';
import { CssBaseline,Grid } from '@material-ui/core';

import { getPlacesData, getWeatherDate } from './api';
import Header from './components/Header/Header';
import List from './components/List/list';
import Map from './components/Map/Map';
import { LocationCityRounded } from '@material-ui/icons';

const App = () => {
    const [places, setPlaces] = useState([]);
    const [weatherData, setWeatherData] = useState([]);
    const [filteredPlace, setFilteredPlace] = useState([]);
    const [coordinates, setCoordinates] = useState({});
    const [bounds, setBounds] = useState({});
    const [childClicked, setChildClicked] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [type, setType] = useState('restaurants');
    const [rating, setRating] = useState('');

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(({coordinates: {latitude, longitude}}) => {
            setCoordinates({lat: latitude, lng: longitude});
        })
    }, []);

    useEffect(() => {
        const filteredPlace = places.filter((rating) => places.rating > rating)

        setFilteredPlace(filteredPlace);
    }, [rating])


    useEffect(() => {
        if(bounds.sw && bounds.ne){
            setIsLoading(true);
            getWeatherDate(coordinates.lat, coordinates.lng)
            .then((data) => setWeatherData(data));
            getPlacesData(type, bounds.sw , bounds.ne)
            .then((data) => {
                setPlaces(data?.filter((places) => places.name && Number(places.num_reviews) > 0));
                setFilteredPlace([]);
                setIsLoading(false);
            })
        }

    }, [type, bounds] );
    return(
        <>
            <CssBaseline />
            <Header setCoordinates={setCoordinates} />
            <Grid container spacing ={3} style={{width : '100%'}}>
                <Grid items xs={12} md={4}>
                    <List 
                        places={filteredPlace.length ? filteredPlace : places} 
                        childClicked={childClicked}
                        isLoading={isLoading}
                        type={type}
                        setType={setType}
                        rating={rating}
                        setRating={setRating}
                        // use react context
                    />
                </Grid>
                <Grid items xs={12} md={8}>
                    <Map 
                        setCoordinates ={setCoordinates}
                        setBounds ={setBounds}
                        coordinates = {coordinates}
                        places ={filteredPlace.length ? filteredPlace : places}
                        setChildClicked ={setChildClicked}
                        weatherData={weatherData}

                    />
                </Grid>
            </Grid>

        </>

    );
}

export default App;