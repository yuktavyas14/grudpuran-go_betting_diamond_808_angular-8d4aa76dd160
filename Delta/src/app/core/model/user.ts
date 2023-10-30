class Data {
  is_change_password: string = '';
  name: string = '';
  parent_id: number = 0;
  token: string = '';
  user_id: any = 0; 
  user_name: string = '';
  user_type_id: number = 0;
}
export class User {
  data = Data  ;
  errors?: string  = '';
  message: string  = '';
  status: boolean = false;
  
  setData(data :any) {
    localStorage.setItem('userinfo', JSON.stringify(data));
  }
  
  // Gets Data from storage.
  getData() {
    return JSON.parse(localStorage.getItem('userinfo') || 'null');
  }
  // Sets token to storage
  setToken(token: string) {
    localStorage.setItem('token', token);
  }

  // Gets the token from storage
  getToken() : any{
    return localStorage.getItem('token');
  }

  // checks if user is loggedin
  isLoggedIn() {
    return this.getToken() !== null;
  }
}
