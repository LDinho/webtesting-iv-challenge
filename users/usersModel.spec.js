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

  })
})

// remember to add ( --env=testing ) when running migrations/seeding to be in the testing environment
