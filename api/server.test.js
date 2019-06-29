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
    })
    it('should return json', async () => {
      const res = await request(server).get('/');
      expect(res.type).toBe('application/json');
    })
    it('should return { api: "up"} for the root page', async () => {
      const res = await request(server).get('/');
      expect(res.body).toEqual({ api: "up"});
    })
  })

})
