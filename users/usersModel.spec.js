const Users = require('./usersModel');
const db = require('../data/dbConfig');

describe('User Model', () => {

  describe('insert fn', () => {

    beforeEach(() => {
      return db('users').truncate()
    })

    it('should insert single user', async () =>  {
      await Users.insert({name: 'sam'});
      const users = await db('users');
      expect(users.length).toBe(1)
      expect(users[0].name).toBe('sam')
    })

    it('should add a user and return an id', async () =>  {
      const user = await Users.insert({name: 'sam'});
      expect(user.id).toBe(1)
      expect(user.name).toBe('sam')
    });

  })


  describe('getUsers fn', () => {

    beforeEach(() => {
      return db('users').truncate()
    })

    it('should retrieve all users', async () => {
      await db('users').insert([
        {name: 'jim'},
        {name: 'mary'},
      ])

      const users = await Users.getUsers();

      expect(users.length).toBe(2)
      expect(users[0].name).toBe('jim')

    });
  });

  describe('delete user fn', () => {
    it('should delete user by id', async () => {
      const [id] = await db('users').insert([
        {name: 'joe'}
      ])

      await Users.remove(id);

      const user = await Users.getUserById(id);

      expect(user).toBeUndefined();

    });
  });

});

// remember to add ( --env=testing ) when running migrations/seeding to be in the testing environment
