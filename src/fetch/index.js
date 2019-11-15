import axios from 'axios'
import Vue from 'vue'
import {Url} from './url'
// import store from '../pages/index/vuex'


export function fetchPost(url, params) {
  return new Promise((resolve, reject) => {
    axios.post(url, params)
      .then(response => {
        resolve(response.data);
      }, err => {
        reject(err);
      })
      .catch((error) => {
        reject(error)
      })
  })
}

//get请求
export function fetchGet(url, params) {
  return new Promise((resolve, reject) => {

    axios.get(url, {
      params: params
    })
      .then(response => {
        resolve(response.data);
      }, err => {
        reject(err);
      })
      .catch((error) => {
        reject(error)
      })
  })
}


export default {
  login(params) {
    return fetchGet('http://localhost:9081/api/user/login',params)
  },
  edit(params) {
    return fetchPost('http://localhost:9081/api/user/edit',params)
  },
  getByPeople(params) {
    return fetchGet('http://localhost:9081/api/user/getByPeople',params)
  },
  selectByPeople(params) {
    return fetchGet('http://localhost:9081/api/user/selectByPeople',params)
  },
  deleteByPeople(params) {
    return fetchPost('http://localhost:9081/api/user/deleteByPeople',params)
  },
  getByPlace(params) {
    return fetchGet('http://localhost:9081/api/user/getByPlace',params)
  },
  selectByPlace(params) {
    return fetchGet('http://localhost:9081/api/user/selectByPlace',params)
  } ,
  getByFamily(params) {
    return fetchGet('http://localhost:9081/api/user/getByFamily',params)
  },
  selectByFamily(params) {
    return fetchGet('http://localhost:9081/api/user/selectByFamily',params)
  },
  requestGet(url, params) {
    url=Url+url
    return new Promise((resolve, reject) => {
      axios.get(url, {
        params: params
      })
        .then(response => {
          resolve(response.data);
        }, err => {
          reject(err);
        })
        .catch((error) => {
          reject(error)
        })
    })
  },
  requestPost(url, params) {
    url=Url+url
    return new Promise((resolve, reject) => {
      axios.post(url, params)
        .then(response => {
          resolve(response.data);
        }, err => {
          reject(err);
        })
        .catch((error) => {
          reject(error)
        })
    })
  }
  
}
