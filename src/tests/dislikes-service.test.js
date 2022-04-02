// /**
// * @jest-environment node
// */

// import {
//     findAllTuitsDislikedByUser,
//     findAllUsersThatDislikedTuit, userDislikesTuit
//   } from "../services/dislikes-service";

// import {
//   createUser, deleteUsersByUsername
// } from "../services/users-service";

// import {
//   createTuit
// } from "../services/tuits-service";
  
//   describe('dislikeTuit', () => {
//     // sample user to insert
//     const ripley = {
//       username: 'ellenripley',
//       password: 'lv426',
//       email: 'ellenripley@aliens.com'
//     };
  
//     test('can insert new users with REST API', async () => {
//       // insert new user in the database
//       const newUser = await createUser(ripley);
//       const newTuit = await createTuit();
  
//       // verify inserted user's properties match parameter user
//       expect(newUser.username).toEqual(ripley.username);
//       expect(newUser.password).toEqual(ripley.password);
//       expect(newUser.email).toEqual(ripley.email);
//     });
//   });
  