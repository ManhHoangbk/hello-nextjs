import { GET_ALL_USERS, USER_LOGIN, jwtSecret, GET_USER_FROM_TOKEN, TOKEN_EXPIRED } from "../../../apiConfig";
import { allUsers } from '../../../../../data.js'
import jwt from "jsonwebtoken";

export const config = {
  api: {
    bodyParser: true,
  },
}

export function jwtEncode (userId){
  return jwt.sign({ "id": userId }, jwtSecret, { expiresIn: TOKEN_EXPIRED })
}

export function jwtDecodeToken (token){
  try {
    let decoded = jwt.verify(token, jwtSecret);
    return decoded;
  } catch (err) {
    return null
  }
}

export default function userAuthention(req, res) {
  let {query, method, body, params} = req;
  let user = {};
  console.log('endpoint11 ', query.endpoint, ' method ', method, 'body ', body, ' param ', query.token)
  switch (query.endpoint){
    case USER_LOGIN:
      if(!body){
        res.status(405).json('body data not valid')
        return
      }
      allUsers.forEach(element => {
        if(element.email == body.email){
          user = element;
        }
      });
      if(user.email){
        user.token = jwtEncode(user.email)//s
       // setCookie(TOKEN, user.token)
        res.status(200).json(user)
      } else {
        res.status(405).json('data null')
      }
      break
    case GET_USER_FROM_TOKEN:
      let userToken = jwtDecodeToken(query.token)
      // console.log('userToken ', userToken)
      if(userToken && userToken.id){
        allUsers.forEach(element => {
          if(element.email == userToken.id){
            user = element;
            user.token = query.token
          }
        });
        res.status(200).json(user)
      } else {
        res.status(401).json({result :'token is exprired'})
      }
      break
    default:
      res.setHeader('Allow', ['GET', 'PUT'])
      res.status(404).end({result : 'endpoint not valid'})
  }
}