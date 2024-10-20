'use client'
import Cookies from 'js-cookie';
import { addData } from '../Store/reducers/UsersReducer';
import dynamic from 'next/dynamic';


export function SignInAuth(data, dispatch) {
  dispatch(addData(data?.data));
  Cookies.set('Mbwoy_JWT', data?.data?.bearer_token)
  // sessionStorage !== "undefined" && (sessionStorage['Mbwoy_JWT'] = data?.data?.bearer_token)
}


export function SignOut(dispatch) {
  dispatch(addData({}))
  Cookies.remove('Mbwoy_JWT')
}

export function Session(user) {
  const session = {
    status: '',
    user
  }

  console.log(user,Object?.keys(user).length);
  
  if (Object?.keys(user).length !== 0 && Cookies.get('Mbwoy_JWT')) {
    session.status = verifyJWT(user.value.bearer_token)
  } else {
    session.status = 'unauthenticated'
  }
  return session
}

export function verifyJWT(jwtToken) {
  if (jwtToken) {
    return 'authenticated'
  } else {
    return 'unauthenticated'
  }
  // if (jwtToken) {
  //   try {
  //     const [, payload] = jwtToken.split('.');
  //     const { exp: expires } = JSON.parse(window.atob(payload));
  //     if (typeof expires === 'number') {
  //       const expired = (Date.now() >= expires * 1000)
  //       if(expired){
  //         return 'unauthenticated'
  //       }else{
  //         return 'authenticated'
  //       }
  //     }
  //   } catch {
  //     return 'unauthenticated'
  //   }
  // }
  return null;
}






