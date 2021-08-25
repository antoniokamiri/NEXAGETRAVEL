import React from 'react';
import GoogleMapReact from 'google-map-react';
import { Paper, Typography, useMediaQuery } from '@material-ui/core';
import  LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined';
import {Rating} from '@material-ui/lab'
import mapStyles from './mapStyles'
import useStyles from './styles';

const Map = ({setCoordinates, setBounds, coordinates, places, setChildClick, weatherData}) => {
    const classes = useStyles();
    const isDesktop = useMediaQuery('(min-width:600px)');
    
 
    return(
        <div className={classes.mapContainer}>
            <GoogleMapReact
                bootstrapURLKeys={{key:process.env.React_App_Google_Maps_Api_Key}}
                defaultCenter={coordinates}
                center ={coordinates}
                defaultzoom ={14}
                margin = {[50,50,50,50]}
                options={{disableDefaultUI: true, zoomControl: true, styles: mapStyles}}
                onChange={(e) => {
                    setCoordinates ({lat: e.center.lat, lng: e.center.lng});
                    setBounds({ne: e.marginBounds.ne, sw: e.marginBounds.sw});
                }}
                onChildClick={(child) => setChildClick(child)}
            >
                {places?.map((places, i) => (
                    <div
                        className={classes.markerContainer}
                        lat={Number(places.latitude)}
                        lng={Number(places.longitude)}
                        key={i}
                    >
                        {
                            isDesktop ? (
                                <LocationOnOutlinedIcon color='primary' fontSize='large' />
                            ) : (
                                <Paper elevation={3} className={classes.paper}>
                                    <Typography className={classes.Typography} variant='subtitle2' gutterBottom>
                                        {places.name}
                                    </Typography>
                                    <img 
                                        className={classes.pointer}
                                        scr={places.photo ? places.photo.image.large.url : 'https://unsplash.com/photos/N_Y88TWmGwA'}
                                        alt={places.name}
                                    />
                                    <Rating size='small' value={Number(places.Rating)} readOnly />

                                </Paper>
                            )
                        }

                    </div>
                ))}
                {weatherData?.List?.map((data, i) => {
                    <div key={i} lat={data.coordinates.lat} lng={data.coordinates.lng}> 
                        <img height={100} src={`https://openweathermap.org/img/w/${data.weather[0].icon}.png`} />
                    </div>
                })}
            </GoogleMapReact>

        </div>
    );
}

export default Map;