// 这个是定义types-name.
import { createActions } from 'redux-actions'

export const { setHome,setCity,setRegister,
     setLogin,
     setCommon,
     setError,
     setLogout,
     sendMsg,
     recMsg,
     msgList,
     updataRead
   }=createActions({},
  'SET-HOME',
  'SET-CITY',
  'SET-REGISTER',
  'SET-LOGIN',
  'SET-COMMON',
  'SET-ERROR',
  'SET-LOGOUT',
  'SEND-MSG',
  'REC-MSG',
  'MSG-LIST',
  'UPDATA-READ'
);
