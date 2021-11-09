//importamos fetch
const fetch = require("node-fetch");
const { Headers } = require('node-fetch');

exports.get_all_yuks = async() => {
    return fetch('http://localhost:3000/api/yuks')
        .then(response => response.json())
        .then(data => {
            return data;
        });
}

exports.get_user_by_username = async(username) => {
    return fetch(`http://localhost:3000/api/profiles/${username}`)
        .then(response => response.json())
        .then(data => {
            return data;
        });
}

exports.get_user_by_email = async(email) => {
    return fetch(`http://localhost:3000/api/user_email/${email}`)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            return data;
        });
}

exports.get_user_by_id = async(id) => {
    return fetch(`http://localhost:3000/api/user_id/${id}`)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            return data;
        });
}

exports.get_user_token = async(token) => {
    return fetch('http://localhost:3000/api/user_full', {
            method: 'GET',
            headers: new Headers({
                'Authorization': 'Token ' + token,
                'Content-Type': 'application/x-www-form-urlencoded'
            }),
        }).then(response => response.json())
        .then(data => {
            return data;
        });

}