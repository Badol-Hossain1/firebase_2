import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
} from 'firebase/auth';
import auth from '../../firebase/firebase.config';
import { useState } from 'react';

const Register = () => {
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [show, setShow] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    const email = e.target.email.value;
    console.log('🚀 ~ handleSubmit ~ email:', email);
    const pass = e.target.password.value;
    console.log('🚀 ~ handleSubmit ~ pass:', pass);
    const name = e.target.name.value;
    console.log('🚀 ~ handleSubmit ~ name:', name);

    if (pass.length < 6) {
      setError('min 6 cha');
      return;
    } else if (!/[A-Z]/.test(pass)) {
      setError('one upercase ');
      return;
    }
    createUserWithEmailAndPassword(auth, email, pass)
      .then((res) => {
        console.log(res.user);
        setSuccess('successfully');
        // update user profile
        updateProfile(auth.currentUser, {
          displayName: name,
        })
          .then((res) => {
            console.log('🚀 ~ .then ~ res:', res);
          })
          .catch((error) => {
            console.log('🚀 ~ .then ~ error:', error);
          });
        // send verification mail
        sendEmailVerification(auth.currentUser).then((res) => console.log(res));
      })
      .catch((error) => {
        setError(error.message);
        console.log('🚀 ~ createUserWithEmailAndPassword ~ error:', error);
      });
  };
  return (
    <div className="flex justify-center">
      <form onSubmit={handleSubmit} className="">
        <h2 className="text-3xl mb-4 font-bold">please register</h2>
        <label className="input mb-4 input-bordered flex items-center gap-2">
          <input type="text" className="grow" name="name" placeholder="name" />
        </label>
        <label className="input input-bordered flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="h-4 w-4 opacity-70"
          >
            <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
            <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
          </svg>
          <input
            type="email"
            className="grow"
            name="email"
            placeholder="Email"
          />
        </label>
        <br />
        <label className="input input-bordered flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="h-4 w-4 opacity-70"
          >
            <path
              fillRule="evenodd"
              d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
              clipRule="evenodd"
            />
          </svg>
          <input
            type={show ? 'text' : 'password'}
            className="grow"
            name="password"
          />
          <p onClick={() => setShow(!show)} className="cursor-pointer">
            {show ? 'hide' : 'show'}
          </p>
        </label>
        <br />
        <input className="btn btn-secondary" type="submit" value="register" />
      </form>
      {error && <p>{error}</p>}
      {success && <p>{success}</p>}
    </div>
  );
};

export default Register;
