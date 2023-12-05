// import React from 'react'

// const Login = () => {
//     return (
//         <div className='container' style={{marginTop: "200px"}}>
//             <form>
//                 <div class="mb-3">
//                     <label for="email" class="form-label">Email address</label>
//                     <input type="email" class="form-control" id="email" name='email' aria-describedby="emailHelp" />
//                     <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
//                 </div>
//                 <div class="mb-3">
//                     <label for="password" class="form-label">Password</label>
//                     <input type="password" class="form-control" id="password" name='password' />
//                 </div>
                
//                 <button type="submit" class="btn btn-primary" onSubmit={handleSubmit}>Submit</button>
//             </form>
//         </div>
//     )
// }

// export default Login;


// src/components/Login.js
import React, { useState } from 'react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = () => {
    // Handle login logic here (e.g., API call, authentication)
    console.log('Email:', email);
    console.log('Password:', password);
  };

  return (
    <div className='container' style={{marginTop: "200px"}}>
      <h2>Login</h2>
      <form>
        <label>Email:</label>
        <input type="email" value={email} onChange={handleEmailChange} />

        <label>Password:</label>
        <input type="password" value={password} onChange={handlePasswordChange} />

        <button type="button" onClick={handleLogin}>
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;