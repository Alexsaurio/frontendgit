import React, { useState, useEffect } from 'react';
// componentes

// url servicios
import { urlBase } from '../../service/git.service.jsx';


const Header = () =>{

    const [userData, setUserData] = useState({})

    useEffect(() => {
        getDataUser()
    },[])

    function getDataUser() {
        fetch(urlBase,
            {
                method: "GET",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
            })
            .then((response) => response.json())
            .then((responseData) => {
                setUserData(responseData);
            })
            .catch(error => console.warn(error));
    }

    return <React.Fragment>
        <div className="Header"> 
             <h3 className="Header-Title">Bievenido: {userData.name}</h3>
             <img src={userData.avatar_url} />
        </div>
    </React.Fragment>

}

export default Header;