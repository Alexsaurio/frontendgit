import React, { useState, useEffect } from 'react';

// componentes

// url servicios
import { urlRepo } from '../../service/git.service.jsx';

const Commits = ( props ) =>{

    useEffect(() => {
        console.log(props.commits);
    },[])

    return <React.Fragment>
        <div className="commits"> 
            <h2> Listado de commits </h2>
            {
                props.commits.map((commit,index) => (
                    <div key={index} className="commit"> 
                        <div className="commit-user"> 
                            <img src={commit.autor.avatar_url} />
                            <h2> {commit.autor.author} </h2> 
                        </div>
                        <div className="commit-info"> 
                            <h3> {commit.autor.name} - {commit.timestamp} </h3> 
                            <h2> {commit.message} </h2> 
                            
                            <h2> 
                                <span>cantidad de archivos modificados {commit.files.length},</span>
                                {commit.files.map((file,index) => ( file.filename +" " ))} 
                            </h2> 
                            <h4> sha: {commit.sha} </h4>
                        </div>
                    </div>
                ))
            }
        </div>
    </React.Fragment>

}

export default Commits;
