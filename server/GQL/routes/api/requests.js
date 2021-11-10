const fetch = require("node-fetch");
const { Headers } = require('node-fetch');

exports.get_user_token = async(token) => {
    return fetch('http://localhost:4000/api/user/graphqlAuth', {
            method: 'GET',
            headers: new Headers({
                'Authorization': 'Token ' + token,
                'Content-Type': 'application/x-www-form-urlencoded'
            }),
        })
        .then(response => response.json())
        .then(data => {
            return data;
        });

}