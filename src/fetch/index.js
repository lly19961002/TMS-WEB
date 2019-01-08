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
    return fetchGet('http://localhost:9081/api/user/login',params)
  },
  edit(params) {
    return fetchPost('http://localhost:9081/api/user/edit',params)
  },
  getEmployeeInfo(params){
    return fetchGet('http://localhost:9081/api/sys/getEmployeeInfo',params)
  },
  getEmployeeInfoByName(params){
    return fetchGet('http://localhost:9081/api/sys/getEmployeeInfoByName',params)
  },
  getEmployeeInfoByPost(params){
    return fetchGet('http://localhost:9081/api/sys/getEmployeeInfoByPost',params)
  },
  getEmployeeInfoById(params){
    return fetchGet('http://localhost:9081/api/sys/getEmployeeInfoById',params)
  },
  addEmployeeInfo(params) {
  return fetchPost('http://localhost:9081/api/sys/addEmployeeInfo',params)
},
  updateEmployeeInfo(params) {
    return fetchPost('http://localhost:9081/api/sys/updateEmployeeInfo',params)
  },
  deleteEmployeeInfo(params) {
    return fetchPost('http://localhost:9081/api/sys/deleteEmployeeInfo',params)
  }
}
