const express = require('express');
const server = require('./server.js');
const db = require('../data/dbConfig');

server.use(express.json());

const request = require('supertest');

describe('server', () =>{

  beforeEach(() => {
    return db('users').truncate()
  })

  describe('environment', () => {
    it('should set test env', () => {
      expect(process.env.DB_ENV).toBe('testing');

    });
  });

  describe('GET /', () => {
    it('should return status 200', async () => {
      const res = await request(server).get('/');
      expect(res.status).toBe(200);
    });

    it('should return json', async () => {
      const res = await request(server).get('/');
      expect(res.type).toBe('application/json');
    });

    it('should return { api: "up"} for the root page', async () => {
      const res = await request(server).get('/');
      expect(res.body).toEqual({ api: "up"});
    });

  });

  describe('GET /users', () => {
    it('should return json', async () => {
      const res = await request(server).get('/users');
      expect(res.status).toBe(200);
      expect(res.type).toBe('application/json');
      expect(res.body).toEqual([]);
    });

    it('should get a res with all users from db', async () => {
      await db('users').insert([
        {name: 'joe'},
        {name: 'snow'},
      ])

      const res = await request(server).get('/users');
      expect(res.body.length).toBe(2)
      expect(res.status).toBe(200);
      expect(res.body[0].name).toBe('joe')
      expect(res.body[0].id).toBe(1)
      expect(res.type).toBe('application/json');

    });
  });

  describe('POST /users', () => {
    it('should res with new inserted user', async () => {
      const res = await request(server).post('/users').send({name: 'kim'});
      expect(res.status).toBe(201);
    })
  })

});
