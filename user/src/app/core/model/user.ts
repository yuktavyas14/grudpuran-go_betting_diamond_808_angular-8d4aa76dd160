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
  setData(data) {
    localStorage.setItem('userinfoUser', JSON.stringify(data));
  }
  // Gets Data from storage.
  getData() {
    return JSON.parse(localStorage.getItem('userinfoUser'));
  }

  // Sets token to storage
  setToken(token: string) {
    localStorage.setItem('tokenUser', token);
  }

  // Gets the token from storage
  getToken() {
    return localStorage.getItem('tokenUser');
  }

  // checks if user is loggedin
  isLoggedIn() {
    return this.getToken() !== null;
  }
}
