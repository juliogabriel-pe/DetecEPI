import React from "react";
import './home.css';
// import navbar
import {Container} from "@mui/material";
import NavMenu from "../../components/navmenu/navMenu";
import Dashboard from "../../components/dashboard/dashboard";

function Home() {

    return (
        <>
            <Container className="container-home" maxWidth="lx">
                <NavMenu divOpen={
                    <div className="container">   
                        <Dashboard />
                    </div>
                }>
                </NavMenu>
            </Container>
        </>
    )
}

export default Home;