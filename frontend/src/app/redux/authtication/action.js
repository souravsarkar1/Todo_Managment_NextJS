import axios from "axios";
import { LOGIN_REQUEST } from "./actionTypes"

export const login = (data) =>(dispatch)=>{
    dispatch({type : LOGIN_REQUEST});
    axios.post(``)
}