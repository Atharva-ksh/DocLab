import express from 'express';
import { addUser, addUserDocs, getUserDocs, getUsers } from './Controller.js';

const Routes = express.Router();

Routes.post('/add', addUser);
Routes.get('/get', getUsers);
Routes.post('/addDoc', addUserDocs);
Routes.post('/getDocs', getUserDocs);

export default Routes;