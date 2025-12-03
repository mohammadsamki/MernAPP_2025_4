//  
import api from "./api";
export async function login(email,password){

    const {data} = await api.post('users/login', { email, password });
    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify(data.user));

    return data;
}
export async function register(username, email, password) {
    const { data } = await api.post('users/create', { username, email, password });
    localStorage.setItem('user', JSON.stringify(data.user));
    return data;
}
export async function logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('user');
}
//  regester 

export  function getCurrentUSer(){
    const raw = localStorage.getItem('user');
    if(!raw) return null
    const user =  JSON.parse(raw)
    return user
}