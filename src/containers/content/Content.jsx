import React, { useState } from 'react';

// componentes
import  Branchs from '../../components/branchs/Branchs';
import  Pullrequest from '../../components/pullrequest/Pullrequest';
// url servicios

const Content = () =>{

    const [switchView, setSwitchView] = useState(true)

    function handleClicked() {
        setSwitchView(!switchView);
    }

    return <React.Fragment>
        <div className="Content"> 
            { switchView ? 
                <Branchs click={handleClicked} />:
                <Pullrequest click={handleClicked} />
            }
        </div>
    </React.Fragment>
}

export default Content;