import axios from 'axios';

const API_URL = 'http://localhost:8000';

class AuthService {
  login(user) {
    return axios
      .post(API_URL + '/api/token/', {
        username: user.username,
        password: user.password
      })
      .then(response => {
        if (response.data.accessToken) {
          localStorage.setItem('username',user.username)  
          localStorage.setItem('user', JSON.stringify(response.data));
        }

        return response.data;
      });
  }

  logout() {
    localStorage.removeItem('user');
  }

  register(user) {
    return axios.post(API_URL + '/car-service/user-api/', {
      first_name: user.first_name,
      last_name: user.last_name,
      username: user.username,
      password: user.password,
      mobile_phone:user.mobile_phone,
      gender:user.gender,
      address: user.address
    });
  }
}

export default new AuthService()