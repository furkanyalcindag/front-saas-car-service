export default function authHeader() {
    let user = localStorage.getItem('user_token');
    let active_branch = localStorage.getItem('active_branch');
    if (user) {
      return {

          Authorization: 'Bearer ' + user,
          'x-active-branch':active_branch };
    } else {
      return {};
    }
  }
  