import React, { useEffect, useRef, useState } from 'react'
// import { styled } from '@mui/system';
import moring from "../src/assets/images/moring.jpeg"
import night from "../src/assets/images/night.jpg"
import { Alert, Box, Grid, Stack, Typography } from '@mui/material';
import { styled } from '@mui/system';

function Weather({ error, response }) {
  const currentTime = new Date();
  const currentHour = currentTime.getHours();
  const degree=useRef(null)
  const d = new Date;
  const dayWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const monthDate = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const MorningBackground = styled(Box)({
    backgroundImage: currentHour >= 6 && currentHour < 18 ? `url(${moring})` : `url(${night})`,
    width: "100%",
    height: "100vh",
    backgroundSize: 'cover',
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  });

  const NightBackground = styled("Box")({
    backgroundImage: night,
  });
  function ConvertFahrenheit(value){
    degree.current.innerText=value
  }
  useEffect(() => {

  }, [currentHour])
  useEffect(() => {
    // if (response) {
    //   setDetailResponce({ current: response.data.current, location: response.data.location, forecast: response.data.forecast.forecastday })
    // }
  }, [error, response])
  return (<>
    
      <MorningBackground>
      {response && <Grid container sx={{height:"73vh",alignItems:"center"}}>
        {response.forecast?.forecastday.map((ele,index) => {
        return  <Grid key={index} item lg={3.7} md={5} sm={12}xs={12} sx={{backgroundColor: "#1e202b",
          color: "white",
          margin:"1%",
          padding: "32px",
          borderRadius: "8px"}}>
            <Typography component={"Box"} >
              <Typography component={"h5"} sx={{textAlign:"center"}}>
                {dayWeek[d.getDay()+index]}
              </Typography>
              <Typography component={"h5"}>
                {d.getDate()+index} {monthDate[d.getMonth()]}
              </Typography>
            </Typography>
            <Typography component={"div"}>
              <Typography component={"p"}>
                {response.location?.name}
              </Typography>
              <Typography component={"p"} ref={degree}>
               max temp in celsius {ele.day.maxtemp_c} c
              </Typography>
              <Typography component={"p"} ref={degree}>
               max temp in fahrenheit {ele.day.maxtemp_f} f
              </Typography>
              <Typography component={"p"}>
              min temp in celsius   {ele.day.mintemp_c} c
              </Typography>
              <Typography component={"p"} ref={degree}>
               min temp in fahrenheit {ele.day.mintemp_f} f
              </Typography>
              
            </Typography>
            <Stack direction={"row"} justifyContent={"space-around"} alignItems={"center"}>
            <Typography component={"img"} src={ele.day.condition.icon}>

              </Typography>
              <Typography component={"p"}>
                {ele.day.condition.text}
              </Typography></Stack>
          </Grid>
        })}

      </Grid>}
      {error && <Alert severity="error" sx={{
        position: "fixed",
        bottom: 0
      }}>{error}</Alert>}
    </MorningBackground>
  </>
   
  )
}

export default Weather