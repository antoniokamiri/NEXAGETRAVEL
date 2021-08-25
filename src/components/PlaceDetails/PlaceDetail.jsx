import React from 'react';
import { Box, Typography, Button, Card, CardMedia, CardContent, CardActions, Chip } from '@material-ui/core';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import PhoneIcon from '@material-ui/icons/Phone';
import { Rating } from '@material-ui/lab';

import useStyles from './styles';

const PlaceDetail = ({place,  selected, refProp}) => {
    const classes = useStyles();
    
    if(selected) refProp?.current?.scrollIntoView({behavior: 'smooth', block: 'start'})

    return(
        <Card> 
            <CardMedia 
                style ={{height: 350}}
                image ={place.photo ? place.photo.image.large.url : 'https://unsplash.com/photos/N_Y88TWmGwA'}
                title ={place.name}
            />
            <CardContent>
                <Typography gutterBottom variant='h5'>{place.name}</Typography>
                <Box display='flex' justifyContent='space-between'>
                    <Rating value={Number(place.Rating)} readOnly />
                    <Typography gutterBottom variant='subtitle1'>out of {place.num_reviews} reviews</Typography>
                </Box>
                <Box display='flex' justifyContent='space-between'>
                    <Typography variant='subtitle1'>Price</Typography>
                    <Typography gutterBottom variant='subtitle1'>{place.price_level}</Typography>
                </Box>
                <Box display='flex' justifyContent='space-between'>
                    <Typography variant='subtitle1'>Ranking</Typography>
                    <Typography gutterBottom variant='subtitle1'>{place.ranking}</Typography>
                </Box>
                {place?.awards?.map((awards) => (
                    <Box my={1} display='flex' justifyContent='space-between' alignItems='center'>
                        <img src={awards.image.small} alt={awards.display_name} />
                        <Typography variant='subtitle2' color='textSecondary'>{awards.display_name}</Typography>

                    </Box>
                ))}
                {place?.cuisine?.map(({name}) => (
                    <Chip key={name} size='small' label={name} className={classes.chip} />

                ))}
                {place?.address && (
                    <Typography gutterBottom variant='subtitle2' color='textSecondary' className={classes.subtitle}>
                        <LocationOnIcon /> {place.address}
                    </Typography>
                )}
                {place?.phone && (
                    <Typography gutterBottom variant='subtitle2' color='textSecondary' className={classes.spacing}>
                        <PhoneIcon /> {place.phone}
                    </Typography>
                )}
                <CardActions>
                    <Button size='small' color='primary' onclick={() => window.open(place.web_url, '_blank')}>
                        Trip Advisor
                    </Button>
                    <Button size='small' color='primary' onclick={() => window.open(place.website, '_blank')}>
                        Website
                    </Button>
                </CardActions>               
            </CardContent>
        </Card>
    );
}

export default PlaceDetail;