import { useEffect, useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import './LoginForm.css';

function LoginFormModal() {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    try{
      const res = await dispatch(sessionActions.login({ credential, password }))
      if(res.ok){
        closeModal()
        return res
      }
    }
    catch(e){
      const errorObj ={}
      errorObj.credential = "The provided credentails were invalid"
      setErrors(errorObj)
    }
  };

  useEffect(() => {

    const errorObj = {}
    if (credential.length < 4) {
      errorObj.credential = "User name should greater than 4 character"
    }
    if (password.length < 6) {
      errorObj.password = "Password should greater than 6 character"
    }

    setErrors(errorObj)
  }, [credential, password])



  function loginDemo(){
    console.log('login as demo')
    const credential = "tester1";
    const password = "password";
    closeModal()
    dispatch(sessionActions.login({ credential, password }))
  }
  return (
    <div className='div-modal-login'>
      <h1>Log In</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Username or Email:
          <input
            type="text"
            value={credential}
            onChange={(e) => setCredential(e.target.value)}
            required
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        {errors.credential && <label>{errors.credential}</label>}
        {errors.password && <label>{errors.password}</label>}
        <button disabled={Object.values(errors).length > 0} type="submit">Log In</button>
      </form>
        <button onClick={loginDemo}>Login as Demo-user</button>
    </div>
  );
}

export default LoginFormModal;
