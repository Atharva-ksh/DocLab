import user from './schema/User.js'
import userDocs from './schema/userDocs.js';

export const addUser = async (request, response) => {
    try {
        const userExist = await user.findOne({ email: request.body.email })

        if (userExist) {
            response.status(200).json('User already exists!!');
            return
        }

        const newUser = new user(request.body);
        await newUser.save();
        response.status(200).json('New user added succesfully to the Database!!');
    }
    catch (error) {
        // response.status(500).json('Error while adding user: ', error.message);
        console.log('Here', request.body);
    }
}

export const getUsers = async (request, response) => {
    try {
        const users = await user.find({})
        response.status(200).json(users);
    }
    catch (error) {
        response.status(500).json('Error while fetching/getting users: ', error.message);
    }
}

export const addUserDocs = async (request, response) => {
    try {
        const user = await userDocs.findOne({ email: request.body.email, id: request.body.id, name: request.body.name })

        if (user) {
            response.status(200).json('User already exists!!');
            return
        }

        const newUser = new userDocs(request.body);
        await newUser.save();
        // await user.documents.push({_id: "aa"}).save()
        response.status(200).json('User doc added succesfully to the Database!!');
    }
    catch (error) {
        // response.status(500).json('Error while adding user: ', error.message);
        console.log('Here', request.body);
        console.log(error.message);
    }
}

export const getUserDocs = async (request, response) => {
    try {
        console.log(request.body.email);
        const users = await userDocs.find({ email: request.body.email })
        response.status(200).json(users);
    }
    catch (error) {
        response.status(500).json({ error: 'Error while fetching/getting user docs: ' + error.message });
    }
}