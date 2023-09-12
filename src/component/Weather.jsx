import React, { useEffect, useRef, useState } from 'react'
// import { styled } from '@mui/system';
import moring from "../../src/assets/images/moringimage.jpg"
import night from "../../src/assets/images/nightimage.jpeg"
import { Alert, Box, Grid, Stack, Typography, useMediaQuery } from '@mui/material';
import { styled } from '@mui/system';

function Weather({ error, response,nav }) {
  const currentTime = new Date();
  const currentHour = currentTime.getHours();
  let matches=useMediaQuery('(max-width:900px)')
  let[feh,setfeh]=useState(null)
  const degree=useRef(null)
  const d = new Date;
  const dayWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const monthDate = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const MorningBackground = styled(Box)({
    backgroundImage: currentHour >= 6 && currentHour < 18 ? `url(${moring})` : `url(${night})`,
    width: "100%",
    height:response?.forecast?.forecastday&&matches?"unset":"100vh",
    backgroundSize: 'cover',
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  });

  const NightBackground = styled("Box")({
    backgroundImage: night,
  });
  function ConvertFahrenheit(value,valuefeh){
    if(value==feh){
      setfeh(null)
    }else{
      setfeh(value)
    }
  }
  useEffect(() => {

  }, [currentHour])
  useEffect(() => {
    // if (response) {
    //   setDetailResponce({ current: response.data.current, location: response.data.location, forecast: response.data.forecast.forecastday })
    // }
  }, [error, response])
  return (<>
    {nav}
      <MorningBackground>
      {response && <Grid container sx={{alignItems:"center", height:"100%",backgroundImage: currentHour >= 6 && currentHour < 18 ? `url(${moring})` : `url(${night})`,}}>
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
              <Typography component={"p"} >
               max temp in celsius {ele.day.maxtemp_c} c
              </Typography>
           
              
              <Typography component={"p"}>
              min temp in celsius   {ele.day.mintemp_c} c
              </Typography>
              
              <Typography component={"button"} onClick={()=>ConvertFahrenheit(index,ele.day.maxtemp_f)}>
                convet to fahrenheit
              </Typography>
              {index==feh?<><Typography component={"p"} >
               max temp in fahrenheit {ele.day.maxtemp_f} f
              </Typography><Typography component={"p"}>
               min temp in fahrenheit {ele.day.mintemp_f} f
              </Typography></>:""}
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