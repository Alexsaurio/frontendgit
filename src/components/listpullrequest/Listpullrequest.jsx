import React, { useState, useEffect } from 'react';

// componentes
import Button from '../../components/utils/button/Button';
// url servicios
import { urlRepo } from '../../service/git.service.jsx';

const ListPullRequest = ( ) =>{

    const [prs, setPrs] = useState([]);
    const [msg, setMsg] = useState({});

    useEffect(() => {
        getPullRequestRepo();
    },[])

    return <React.Fragment>
        <div className="Listpullrequest"> 
            <h2> 
            { (prs.length) ? "Listado de pullrequest" : "Sin pullrequest pendientes" }
                <Button text="refrescar" class="ligth" click={( )=> getPullRequestRepo()} /> 
            </h2>

            { prs.map((pr,index) => (
                <div key={index} className="pullrequest"> 
                    <div className="pullrequest-user"> 
                        <img src={pr.avatar_url} />
                        <h2> {pr.author} </h2> 
                    </div>
                    <div className="pullrequest-info"> 
                        <span className="number badge">No. {pr.number} </span> 
                        <span className={pr.status + " badge"}> {pr.status} </span> 
                        <span className={pr.merged ? "merge_on badge" : "merge_off badge"}> {pr.merged ? "merge" : "sin merge"} </span> 
                        <h3> {pr.title} </h3> 
                        <p> {pr.description} </p>
                        { pr.status === "open" ?
                            <Button text="Cerrar pullrequest" class="danger" click={()=>setChangeStatePR(pr.number)} /> : ""
                        }
                    </div>
                </div>
            )) }
        </div>
    </React.Fragment>

    function getPullRequestRepo() {
        fetch(urlRepo + 'pullrequest/',
        {
            method: "GET",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        })
        .then((response) => response.json())
        .then((responseData) => {
            console.log(responseData)
            if (responseData.length) {   
                setPrs(responseData);
            }
        })
        .catch(error => console.warn(error));
    }

    function setChangeStatePR(number_pr) {
        fetch(urlRepo + 'pullrequest/changestate/'+number_pr,
        {
            method: "GET",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        })
        .then((response) => response.json())
        .then((responseData) => {
            console.log(responseData);
            getPullRequestRepo();
            setMsg(responseData);
        })
        .catch(error => console.warn(error));
    }

}

export default ListPullRequest;