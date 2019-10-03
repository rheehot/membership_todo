/* eslint-disable no-undef */
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../../app.js');
const { userModel } = require('../models/users');

const { expect } = chai;
chai.use(chaiHttp);

describe('GET /api/accounts', () => {
  /* 로그인 세션체크 api */
  it('세션 db에 쿠키 없으면 204 응답', (done) => {
    chainp
      .request(app)
      .get('/api/users/login')
      .end((err, res) => {
        expect(res).to.have.status(204);
        done();
      });
  });
  /* 아이디 중복체크 api */
  it('중복되는 아이디가 없으면 {status:unusedID} 객체 응답', (done) => {
    chai
      .request(app)
      .get('/api/users/id/a')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.be.a('string');
        expect(res.body.status).to.equal('unused ID');
        done();
      });
  });
});

describe('POST /api/users', () => {
  /* 회원가입 데이터 post api */
  it('회원가입 데이터 db에 저장 후 204 응답', (done) => {
    chai
      .request(app)
      .post('/api/users/signin')
      .send(userModel({ id: 4, name: 'react' }))
      .end((err, res) => {
        expect(res).to.have.status(204);
        done();
      });
  });
  /* 로그인 post api 성공 */
  it('저장된 아이디가 있으면 로그인 성공 200 응답', (done) => {
    chai
      .request(app)
      .post('/api/users/login')
      .send({ id: 'dofl5576', pw: 'Doflwh0328!' })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.be.a('string');
        expect(res.body.status).to.equal('login sucsess');
        done();
      });
  });
  /* 로그인 post api 실패 */
  it('저장된 아이디가 없으면 로그인 실패 204 응답', (done) => {
    chai
      .request(app)
      .post('/api/users/login')
      .send(userModel({ id: 'aa', pw: 'pwpw' }))
      .end((err, res) => {
        expect(res).to.have.status(204);
        done();
      });
  });
});
