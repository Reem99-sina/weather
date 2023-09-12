import { Box, InputAdornment, TextField, Typography, useMediaQuery } from '@mui/material'
import React, { createContext, useContext, useState } from 'react'
import logo from "../src/assets/images/logo.png"
import SearchIcon from "@mui/icons-material/Search";
import axios from 'axios';
import { UserContext } from './App';

function Nav() {
  let{country,onSearch,onSubmit,keyenter}=useContext(UserContext)
  let matches=useMediaQuery('(max-width:600px)')
  
  return (
    <>
    <Box sx={{position: "absolute",
    width: "100%",
    height: "10%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",backgroundColor:"#1e202b"}}>
      <img src={logo}/>
      <Typography component={"h2"} sx={{color:"white",display:matches?"none":"block"}}>Temperture For Three Day By Country Name</Typography>
      <TextField
            variant="standard"
            // className="DialogPeopleWindow__searchInput"
            sx={{
              width: "100%",
              "& .MuiInputBase-root": { bgcolor: "white" ,border:0},
              "& .MuiInputBase-root:before":{borderBottom:"unset"},
              "& .MuiInput-root:hover:not(.Mui-disabled, .Mui-error):before":{borderBottom:"unset"},
              
              border:"1px solid",borderRadius: "30px",
              width: "50%",
              padding: "8px",
              backgroundColor:"white"
            }}
            placeholder={"search"}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end" sx={{ paddingInline: "5px" }}>
                  <SearchIcon sx={{ opacity: ".5" }} />
                </InputAdornment>
              ),
            }}
            value={country}
            onChange={onSearch}
            onBlur={onSubmit}
            onKeyDown={keyenter}
          />
    </Box>
    </>
  )
}

export default Nav