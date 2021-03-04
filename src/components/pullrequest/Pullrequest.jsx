import React, { useState, useEffect } from 'react';

// componentes
import Button from '../../components/utils/button/Button';
import ListPullRequest from '../listpullrequest/Listpullrequest';
import Swal from 'sweetalert2';
// url servicios
import { urlRepo } from '../../service/git.service.jsx';

const Pullrequest = ( props ) =>{

    const [repoBranches, setRepoBranches] = useState([]);
    const [validateMsg, setValidateMsg] = useState(false);
    const [datas, setDatas] = useState({
        title: '',
        body: '',
        base: '',
        compare: ''
    })

    useEffect(() => {
        getBranchesRepo();
    },[])

    return <React.Fragment>
        <div className="Pullrequest"> 
            <form>
                <label> Base: </label>
                <select name="base" onChange={handleInputChange} >
                    <option value="" selected disabled>Sin selección*</option>
                    {repoBranches.map((branch,index) => (
                        <option key={index} value={branch}>{branch}</option>
                    ))}
                </select>
                <label> Compare: </label>
                <select name="compare" onChange={handleInputChange} >
                    <option value="" selected disabled>Sin selección*</option>
                    {repoBranches.map((branch,index) => (
                        <option key={index} value={branch}>{branch}</option>
                    ))}
                </select>
                <Button text="Visualizar commits" class="secondary" click={props.click} />
                <br />
                <label> 
                    Titulo: 
                    <input type="text" name="title" 
                    onChange={handleInputChange} placeholder="Escribe el titulo*"/>
                </label>

                <label> 
                    Descripción: 
                    <input type="text" name="body" 
                    onChange={handleInputChange} placeholder="Escribe la descripcion*" />  
                </label>

                <Button text="Guardar PR" class="secondary" click={() => validateData("pullrequest")} />
                <Button text="Crear Merge" class="primary" click={() => validateData("marge")}/>
            </form>

            { validateMsg ? 
                <span className="Pullrequest-alert"> los  en los campos * son necesarios </span>: ""
            }
            <hr/>
            <ListPullRequest />
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

    function handleInputChange(event){
        if (event.target.value === "") {            
            setValidateMsg(true);
        } else{
            setValidateMsg(false);
        }

        setDatas({
            ...datas,
            [event.target.name] : event.target.value
        })
    }

    function validateData(target) {
        if (datas.title !== "" && datas.body !== "" && datas.base !== "" && datas.compare !== "") {
            if (target === "marge") {
                setMergePullRequestRepo(datas)
            }else{
                setCreatePullRequestRepo(datas)
            }
        }else {
            setValidateMsg(true);
        }
        
    }

    function setCreatePullRequestRepo (data){
        fetch(urlRepo + 'pullrequest/create',
            {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            })
            .then((response) => response.json())
            .then((responseData) => {
                console.log(responseData)
                if (responseData.code == 200) {
                    Swal.fire("Creado", responseData.message, "success");
                }else{
                    try {
                        Swal.fire(responseData.code +" "+ responseData.message.message , 
                            responseData.message.errors[0].message + " - " +
                            responseData.message.errors[0].resource
                        , "error");
                    } catch (error) {
                        Swal.fire("Error", responseData.message, "error");
                    }
                }
            })
            .catch(error => console.warn(error));
    }

    function setMergePullRequestRepo (data){
        fetch(urlRepo + 'pullrequest/create/merge',
            {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            })
            .then((response) => response.json())
            .then((responseData) => {
                console.log(responseData)
                if (responseData.code == 200) {
                    Swal.fire("Creado", responseData.message, "success");
                }else{
                    try {
                        Swal.fire(responseData.code +" "+ responseData.message.message , 
                            responseData.message.errors[0].message + " - " +
                            responseData.message.errors[0].resource
                        , "error");
                    } catch (error) {
                        Swal.fire("Error", responseData.message, "error");
                    }
                }
            })
            .catch(error => console.warn(error));
    }



}

export default Pullrequest;