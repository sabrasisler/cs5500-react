/**
* @jest-environment node
*/

import { createTuit, deleteTuit, findTuitById } from "../services/tuits-service";
import { createUser, deleteUsersByUsername } from "../services/users-service";

describe('can create tuit with REST API', () => {
  //create sample user to post tuit
  const bobUser = {
    username: 'bob123',
    password: 'password',
    email: 'bob@gmail.com'
  };

  const bobTuit = { tuit: "hello my name is Bob." };
  var tid;

  // setup test before running test
  beforeAll(() => {
    // remove any/all users to make sure tuit won't exist because user who posted it won't exist
    return deleteUsersByUsername(bobUser.username);
  })

  afterAll(() => {
    // remove any data we created
    deleteUsersByUsername(bobUser.username);
      return deleteTuit(tid);
    
  })

  test('can insert new tuits with REST API', async () => {

    const newUser = await createUser(bobUser);
    const newTuit = await createTuit(newUser._id, bobTuit);
    tid = newUser._id;

    // verify inserted tuit's properties match parameter tuit
    expect(newTuit.tuit).toEqual(bobTuit.tuit);
    expect(newTuit.postedBy).toEqual(newUser._id);
  });
});

describe('can delete tuit wtih REST API', () => {
  // sample user to delete
  const user2 = {
    username: 'user2',
    password: 'user2password',
    email: 'user2@gmail.com'
  };

  const tuit2 = { tuit: "user 2's tuit" };
  var tid;

  // // setup the tests before verification
  // beforeAll(() => {
  //   // insert the sample user we then try to remove
  //   return createTuit(user2, tuit2);
  // });


  // clean up after test runs
  afterAll(() => {
    return deleteUsersByUsername(user2);
  })

  test('can delete tuit from REST API by id', async () => {


    const newUser2 = await createUser(user2);
    const newTuit2 = await createTuit(newUser2._id, tuit2);
    const status = await deleteTuit(newTuit2._id);

    // verify we deleted at least one user by their username
    expect(status.deletedCount).toBeGreaterThanOrEqual(1);

  });
});

describe('can retrieve a tuit by their primary key with REST API', () => {
  const testUser = {
    username: 'testUser',
    password: 'password1',
    email: 'test@gmail.com'
  };
  var tid;

  const testTuit = { tuit: "Test get tuit by primary key" };

  // // setup before running test
  // beforeAll(() => {
  //     // delete a tuit
  // });

  afterAll(() => {
    // remove any data we inserted
    return deleteTuit(tid)
  });

  test('can retrieve tuit from REST API by primary key', async () => {

    // insert the tuit in the database
    const user = await createUser(testUser);
    console.log("createduser");

    const newTuit = await createTuit(user._id, testTuit);
    console.log("createdtuit");

    // verify new tuit matches the parameter tuit
    expect(newTuit.tuit).toEqual(testTuit.tuit);
    expect(newTuit.postedBy).toEqual(user._id);

    // retrieve the tuit from the database by its primary key
    const retrievedTuit = await findTuitById(newTuit._id);

    // verify retrieved user matches parameter user
    expect(retrievedTuit.tuit).toEqual(testTuit.tuit);
    expect(retrievedTuit.postedBy._id).toEqual(user._id);
  });
});

// describe('can retrieve all tuits with REST API', () => {
//   const kevinUser = {
//     username: 'kevin123',
//     password: 'password',
//     email: 'kevin@gmail.com'
//   };

//   // sample tuits to insert and then retrieve
//   const tuitStrings = [
//     "tuit 1", "tuit 2", "tuit 3"
//   ];

//   test('can retrieve all users from REST API', async () => {

//     const user = await createUser(kevinUser);

//     tuitStrings.map(tuitString =>
//       createTuit(user._id, { tuit: tuitString })
//     )
//     tids = newTuits.map(response => response.then(res => { res._id }))

//     // retrieve all the tuits
//     const tuits = await findAllTuits();

//     // // there should be a minimum number of users
//     // expect(tuits.length).toBeGreaterThanOrEqual(tuitStrings.length);

//     // // let's check each tuit we inserted
//     // const tuitsWeInserted = tuits.filter(
//     //   tuit => tuitString.indexOf(tuit.tuit) >= 0);

//     // // compare the actual users in database with the ones we sent
//     // tuitsWeInserted.forEach(tuit => {
//     //   const tuitString = tuitStrings.find(username => username === user.username);
//     //   expect(tuit.tuit).toEqual(tuitString);
//     //   //expect(tuit.postedBy).toEqual(`${username}123`);
//     // });
//   });
// });