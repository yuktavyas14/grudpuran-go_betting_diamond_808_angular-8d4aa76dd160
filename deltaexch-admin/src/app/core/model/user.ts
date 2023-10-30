class Data {
  is_change_password: string;
  name: string;
  parent_id: number;
  token: string;
  user_id: number;
  user_name: string;
  user_type_id: number;
}
export class User {
  data: Data;
  errors?: string;
  message: string;
  status: boolean;

  // Sets data to storage.
  setData(data) {
    localStorage.setItem('useradmininfo', JSON.stringify(data));
  }
  // Gets Data from storage.
  getData() {
    return JSON.parse(localStorage.getItem('useradmininfo'));
  }

  // Sets token to storage
  setToken(token: string) {
    localStorage.setItem('admintoken', token);
  }

  // Gets the token from storage
  getToken() {
    return localStorage.getItem('admintoken');
  }

  // checks if user is loggedin
  isLoggedIn() {
    return this.getToken() !== null;
  }
}
