import axios from 'axios'
import Vue from 'vue'
import qs from 'qs'
import {productionUrl, testingUrl} from './url'
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

  login() {
    return fetchGet('http://192.168.180.136:8080/TMS-WEB/login/login')
  }
}
