import React, { useContext, useState } from 'react'

// import { createNewUser, loginUser } from '../../API/ServerAPI/server.users';
import { appContext } from '../../../context/appContext';
// import { useHistory } from 'react-router-dom';
import Spinner from '../../../components/Spinner/Spinner'

import './RegisterBox.css'
import { Link } from 'react-router-dom';

const initialState = {
  firstName: '',
  lastName: '',
  age: '',
  email: '',
  password: ''
}


function RegisterBox() {
  const [formRegister, setFormRegister] = useState(initialState);
  const [errorMsg, setErrorMsg] = useState(false)
  const [spinner, setSpinner] = useState(false)
  // let history = useHistory();
  // Global State
  const { setToken } = useContext(appContext);

  const handleChange = ({ target: { name: nameInput, value } }) => {
    setFormRegister({ ...formRegister, [nameInput]: value })

  }


  const handleClick = async (event) => {
    event.preventDefault()
    // const { firstName, lastName, age, email, password } = formRegister;
    // if (!firstName || !lastName || !age || !email || !password) return setErrorMsg('Please enter all fields');

    // setSpinner(true)
    // const userCreated = await createNewUser({ ...formRegister, age: +age });
    // setSpinner(false)
    // if (userCreated.response && userCreated.response.status === 400) return setErrorMsg(userCreated.response.statusText);

    // const userToken = userCreated.token;
    // setToken(userToken);
    // localStorage.setItem('token', userToken);
    // history.push('/')
  }

  return (
    <div className='register-container'>

      {spinner ? <Spinner /> :
        <>
          <form className='register-form' action="">
            <div className='register-inputs'>

              <input onChange={handleChange} placeholder="First Name"
                name='firstName' value={formRegister.firstName} type="text" required />

              <input onChange={handleChange} placeholder="Last Name"
                name='lastName' value={formRegister.lastName} type="text" required />

              <input onChange={handleChange} placeholder="Age"
                name='age' value={formRegister.age} type="number" required />

              <input onChange={handleChange} placeholder="Email"
                name='email' value={formRegister.email} type="email" required />

              <input onChange={handleChange} placeholder="Password"
                name='password' autoComplete="true" password={formRegister.password} type="password" required />
            </div>



            <button onClick={handleClick} type='submit'>Register</button>
          </form>

          <div className='register-bottom'>
            {errorMsg && <h3 style={{ color: 'red', textAlign: 'center'  }}>{errorMsg}</h3>}
            {<h4>Do you already have an account? <Link to='/login'>Log in</Link></h4>}

          </div>
        </>
      }
    </div>
  )
}

export default RegisterBox;