import { v4 as uuidv4 } from 'uuid';

import * as fs from 'fs';
// const fs = require('fs');
// let users = [];

export const getUser = (req, res) => {
    const users = getUserData();
    res.send(users);
}

export const createUser = (req, res) => {
    const existUsers = getUserData();
    const userData = req.body;
    if (userData.title == null || userData.url == null || userData.image == null) {
        return res.status(401).send({error: true, msg: 'Article data missing'})
    }
    existUsers.push({ ...userData, id: uuidv4() });
    saveUserData(existUsers);
    res.send({success: true, msg: 'User data added successfully'});
}

export const getUserWithId = (req, res) => {
    const { id } = req.params;
    const existUsers = getUserData();
    const foundUser = existUsers.find((user) => user.id == id);
    res.send(foundUser);
}

export const deleteUser = (req, res) => {
    const { id } = req.params;
    let existUsers = getUserData();
    const filterUser = existUsers.filter((user) => user.id != id);
    saveUserData(filterUser);
    res.send(`User with the id ${id} got deleted from database`);
}

export const updateUser = (req, res) => {
    const { id } = req.params;
    const { title, url, image } = req.body;
    const existUsers = getUserData();
    const findExist = existUsers.find( user => user.id === id )
    if (!findExist) {
        return res.status(409).send({error: true, msg: 'id not exist'})
    }
    let user = existUsers.find((user) => user.id == id);
    if(title) user.title = title;
    if(url) user.url = url;
    if(image) user.image = image;

    res.send(`User with the id ${id} got updated in the database`);
}

/* util functions */
//read the user data from json file
const saveUserData = (data) => {
    const stringifyData = JSON.stringify(data)
    fs.writeFileSync('./users.json', stringifyData)
}
//get the user data from json file
const getUserData = () => {
    const jsonData = fs.readFileSync('./users.json')
    return JSON.parse(jsonData)    
}
/* util functions ends */