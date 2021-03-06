import Vue from 'vue'
import axios from 'axios'

const client = axios.create({
  baseURL: 'http://localhost:8081/',
  json: true
})

export default {
  async execute(method, resource, data){
    let accessToken = await Vue.prototype.$auth.getAccessToken()
    return client({
      method,
      url: resource,
      data,
      headers:{
        Authorization: `Bearer ${accessToken}`
      }
    }).then(req => {
      return req.data
    })
  },
  getTeams() {
    return this.execute('get', '/teams')
  },
  getTeam(id) {
    return this.execute('get', `/teams/${id}`)
  },

  // createPost(data){
  //   return this.execute('post', '/posts', data)
  // },

  // updatePost(id, data){
  //   return this.execute('put', `/posts/${id}`, data)
  // },

  // deletePost(id) {
  //   return this.execute('delete', `/posts/${id}`)
  // }
}