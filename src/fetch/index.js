import axios from 'axios'
import Vue from 'vue'
import {productionUrl} from './url'
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
    return fetchGet('http://localhost:9081/TMS_war_exploded/api/user/login',params)
  }
}
