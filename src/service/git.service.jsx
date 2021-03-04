
// servicios para consumo de las api

export const urlRepo = 'http://127.0.0.1:8000/user/repos/';
export const urlBase = 'http://127.0.0.1:8000/user/';

export const getUserData = () => {
    return fetch(urlBase,
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
      return responseData;
    })
    .catch(error => console.warn(error));
}

export const getBranchesRepo = () => {
    return fetch(urlRepo + 'branches/',
    {
        method: "GET",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
    })
    .then((response) => response.json())
    .then((responseData) => {
      return responseData;
    })
    .catch(error => console.warn(error));
}

export const getBranchCommits = (branch) => {
    return fetch(urlRepo + 'branch/commits/' + branch,
    {
        method: "GET",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
    })
    .then((response) => response.json())
    .then((responseData) => {
      return responseData;
    })
    .catch(error => console.warn(error));
}

export const getComparateTwoBranches = (base,compare) => {
    return fetch(urlRepo + 'branch/compare/' + base + "/" + compare,
    {
        method: "GET",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
    })
    .then((response) => response.json())
    .then((responseData) => {
      return responseData;
    })
    .catch(error => console.warn(error));
}

export const getPullRequestRepo = () => {
    return fetch(urlRepo + 'pullrequest/',
    {
        method: "GET",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
    })
    .then((response) => response.json())
    .then((responseData) => {
      return responseData;
    })
    .catch(error => console.warn(error));
}

export const setCreatePullRequestRepo = (data) => {
    return fetch(urlRepo + 'pullrequest/create',
    {
        method: "GET",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
    })
    .then((response) => response.json())
    .then((responseData) => {
      return responseData;
    })
    .catch(error => console.warn(error));
}

export const setChangeStatePR = (number_pr) => {
    return fetch(urlRepo + 'pullrequest/changestate/<number_pr>',
    {
        method: "GET",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
    })
    .then((response) => response.json())
    .then((responseData) => {
      return responseData;
    })
    .catch(error => console.warn(error));
}