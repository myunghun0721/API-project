import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import * as sessionActions from '../../store/session';
import './SignupForm.css';

function SignupFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [isfilled, setIsfilled] = useState(false)
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    try{
      const res = await dispatch(
        sessionActions.signup({
          email,
          username,
          firstName,
          lastName,
          password
        })
      )
      if(res.ok){
        closeModal()
      }
    }
    catch(error){
      const data = await error.json()
      if(data?.errors){
        setErrors(data.errors)
      }
    }
  };

  //check form
  useEffect(() => {
    const errorObj = {}
    if (email.length && username.length && firstName.length && lastName.length && password.length && confirmPassword.length) {
      setIsfilled(true)
    }
    else {
      setIsfilled(false)
    }

    if (username.length < 4) {
      setIsfilled(false)
      errorObj.username = "Username must greater than 4 characters"

    }
    if (password.length < 6) {
      setIsfilled(false)
      errorObj.password = "Password must greater than 6 characters"
    }

    if (password !== confirmPassword) {
      setIsfilled(false)
      errorObj.confirmPassword = "Confirm Password field must be the same as the Password field"
    }

    const regex = /^[a-zA-Z0-9.+_-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,15}$/;
    const result = regex.test(email);
    if (!result) {
      setIsfilled(false)
      errorObj.email = "Please provide a valid email."
    }

    setErrors(errorObj)
  }, [email, username, firstName, lastName, password, confirmPassword])

  return (
    <div className='div-modal-signup'>
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Email:
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        {errors.email && <p>{errors.email}</p>}
        <label>
          Username:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>
        {errors.username && <p>{errors.username}</p>}
        <label>
          First Name:
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </label>
        {errors.firstName && <p>{errors.firstName}</p>}
        <label>
          Last Name:
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </label>
        {errors.lastName && <p>{errors.lastName}</p>}
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        {errors.password && <p>{errors.password}</p>}
        <label>
          Confirm Password:
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </label>
        {errors.confirmPassword && <p>{errors.confirmPassword}</p>}
        <button disabled={!isfilled} type="submit">Sign Up</button>
      </form>
    </div>
  );
}

export default SignupFormModal;
