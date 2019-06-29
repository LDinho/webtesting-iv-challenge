const server = require('./server');

describe('server.js', () =>{

  it('should set test env', () => {

    expect(process.env.DB_ENV).toBe('testing');

  })
})
