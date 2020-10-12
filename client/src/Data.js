import config from './config';

export default class Data {
  // path = endpoint, method = HTTP Method (get), body = information
  api(path, method = 'GET', body = null, requiresAuth = false, credentials = null) {
    // Fetches info from localhost:5000/api
    const url = config.apiBaseUrl + path;

    const options = {
      method,
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      }
    };

    if (body !== null) {
      options.body = JSON.stringify(body);
    }

    // Check if auth is required
    if (requiresAuth && credentials !== null && path != "/users") { 
      options.headers['Authorization'] = `Basic ${credentials}`;
    } 
    else if (requiresAuth) {    
      const encodedCredentials = btoa(`${credentials.username}:${credentials.password}`);
      options.headers['Authorization'] = `Basic ${encodedCredentials}`;
    } 
    

    return fetch(url, options);
  }

  async getUser(username, password) {
    // Look at the parameters of api() above if confused what these values are.
    const response = await this.api(`/users`, 'GET', null, true, { username, password });
    if (response.status === 200) {
      const user = await response.json().then(data => data);
      const encodedCredentials = btoa(`${user.emailAddress}:${password}`);
      user.encodedCredentials = encodedCredentials;
      return user;
    }
    else if (response.status === 401) {
      return null;
    }
    else {
      throw new Error();
    }
  }
  
  async createUser(user) {
    const response = await this.api('/users', 'POST', user);
    if (response.status === 201) {
      return [];
    }
    else if (response.status === 400) {
      return response.json().then(data => {
        return data.errors;
      });
    }
    else {
      throw new Error();
    }
  }

  // CREATE COURSE
  async createCourse(course, encodedCredentials) {
    const response = await this.api('/courses', 'POST', course, true, encodedCredentials);
    if (response.status === 201) {
      let blah = response.json().then(data => data)
      return blah;
    }
    else if (response.status === 400) {
      return response.json().then(data => {
        return data.errors;
      });
    }
    else {
      throw new Error();
    }
  }

  async deleteCourse (course, user) {

    const response = await this.api(`/courses/${course.id}`, 'DELETE', null, true, user.encodedCredentials)
    
    if (response.status === 204) {
      return [];
    }
    else if (response.status === 400) {
      return response.json().then(data => {
        return data.errors;
      });
    }
    else {
      throw new Error();
    }
    return [];
  }

  async updateCourse (course, user) {

    const response = await this.api(`/courses/${course.courseId}`, 'PUT', course, true, user.encodedCredentials)
    if (response.status === 204) {
      return [];
    }
    else if (response.status === 400) {
      return response.json().then(data => {
        return data.errors;
      });
    }
    else {
      throw new Error();
    }
    return [];

    return course
  }

}
