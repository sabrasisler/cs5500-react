/**
* @jest-environment node
*/

import { createUser, deleteUsersByUsername } from "../services/users-service";
import { createTuit, deleteTuit, findTuitById, findAllTuits } from "../services/tuits-service";


describe('can create tuit with REST API', () => {
  //create sample user to post tuit
  const bobUser = {
    username: 'bob123',
    password: 'password',
    email: 'bob@gmail.com'
  };

  const bobTuit = { tuit: "hello my name is Bob." };
  var tid;

  //setup test before running test
  beforeAll(() => {
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

  // clean up after test runs
  afterAll(() => {
    return deleteUsersByUsername(user2.username)
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

  // setup before running test
  beforeAll(() => {
    return deleteUsersByUsername(testUser.username);
  });

  afterAll(() => {
    // remove any data we inserted
    deleteUsersByUsername(testUser.username);
    return deleteTuit(tid)
  });

  test('can retrieve tuit from REST API by primary key', async () => {
    // insert the tuit in the database
    const user = await createUser(testUser);
    const newTuit = await createTuit(user._id, testTuit);
    tid = newTuit._id;

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

describe('can retrieve all tuits with REST API', () => {

  const user = {
    username: 'user',
    password: 'userpassword',
    email: 'user@gmail.com'
  };
  const tuitStrings = ["tuit 1", "tuit 2", "tuit 3"];
  var tids;

  afterAll(() => {
    // remove any data we inserted
    deleteUsersByUsername(user.username);
    deleteTuit(tids[0]);
    deleteTuit(tids[1]);
    return deleteTuit(tids[2])
  });

  // sample tuits to insert and then retrieve
  test('can retrieve all tuits from REST API', async () => {

    const createdUser = await createUser(user);

    const newTuit1 = await createTuit(createdUser._id, { tuit: tuitStrings[0] });
    const newTuit2 = await createTuit(createdUser._id, { tuit: tuitStrings[1] });
    const newTuit3 = await createTuit(createdUser._id, { tuit: tuitStrings[2] });
    
    const newTuits = [newTuit1, newTuit2, newTuit3];
    tids = [newTuit1._id, newTuit2._id, newTuit3._id];

    const tuits = await findAllTuits();

    expect(tuits.length).toBeGreaterThanOrEqual(newTuits.length);

    //Look for users we made tuit with
    const tuitsWeInserted = tuits.filter(
      tuit => (tuitStrings.indexOf(tuit.tuit) >= 0) && (tuit.postedBy == createdUser._id));

    //Verify properties
    tuitsWeInserted.forEach(retrievedTuit => {
      const insertedTuit = newTuits.find(tuit => retrievedTuit.tuit == tuit.tuit);
      expect(retrievedTuit.tuit).toEqual(insertedTuit.tuit);
      expect(retrievedTuit.postedBy).toEqual(insertedTuit.postedBy);
    });
  });
});


