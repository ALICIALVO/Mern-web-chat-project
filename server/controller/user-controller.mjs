import User from '../model/User.mjs';

// addUser function adding a new user to the database, if the user does not already exist

export const addUser = async (request, response) => {

  try {
    console.log('Request body:', request.body);
    let exist = await User.findOne({ sub: request.body.sub });

    if (exist) {

      console.log('User already exists:', exist);
      response.status(200).json({ msg: 'User already exists' });
      return;
    }
    //create new user
    const newUser = new User(request.body);
    await newUser.save();
    console.log('New user created:', newUser);

    response.status(200).json(newUser);

  } catch (error) {

    console.error('Error in addUser:', error.message);
    return response.status(500).json({ error: error.message });
  }
};

export const getUsers = async (request, response) => {

  try {
    const users = await User.find({});
    return response.status(200).json(users);

  } catch (error) {
    console.error('Error in getUsers:', error.message);
    return response.status(500).json({ error: error.message });
  }
};
