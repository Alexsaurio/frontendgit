import React, { useState, useEffect } from 'react';

// componentes
import Commits from '../../components/commits/Commits';
import Button from '../../components/utils/button/Button';
// url servicios
import { urlRepo } from '../../service/git.service.jsx';

const Branchs = ( props ) =>{

    const [repoBranches, setRepoBranches] = useState([]);
    const [sltBranch, setStlBranch] = useState("");
    const [commits, setCommits] = useState([]);
    const [ msg, setMsg] = useState("Sin commits")

    useEffect(() => {
        getBranchesRepo()
    },[])

    return <React.Fragment>
        <div className="Branchs"> 
            <form>
                <label>
                    Selecciona la branch:
                </label>
                <select onChange={handleSelectChange} value={sltBranch}>
                    <option value="" selected disabled>Sin selección*</option>
                    {repoBranches.map((branch,index) => (
                        <option key={index} value={branch}>{branch}</option>
                    ))}
                </select>
                <Button text="Crear PullRequest" class="primary" click={props.click} />
            </form>
            <hr/>
            {/* despligue de commits */}
            { commits.length ? 
                <Commits commits={commits} /> :  msg
            }    
        </div>
    </React.Fragment>

    function getBranchesRepo() {
        fetch(urlRepo + 'branches/',
        {
            method: "GET",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        })
        .then((response) => response.json())
        .then((responseData) => {
            setRepoBranches(responseData.branches)
        })
        .catch(error => console.warn(error));
    }

    function getBracnCommits(branch) {
        fetch(urlRepo + 'branch/commits/' + branch,
        {
            method: "GET",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        })
        .then((response) => response.json())
        .then((responseData) => {
            setCommits(responseData.commits);
            setMsg("Sin commits.");
        })
        .catch(error => console.warn(error));
    }

    function handleSelectChange(event) {
        setMsg("Cargando commits...");
        setCommits([]);
        setStlBranch(event.target.value);
        getBracnCommits(event.target.value);
    }


}

export default Branchs;