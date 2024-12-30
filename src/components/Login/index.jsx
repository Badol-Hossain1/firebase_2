import {

  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import auth from '../../firebase/firebase.config';
import { useRef, useState } from 'react';

const Login = () => {
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const refEmail = useRef(null);
  const handleSubmit = (e) => {
    setSuccess('');
    setError('');
    e.preventDefault();
    const email = e.target.email.value;
    const pass = e.target.password.value;
    console.log('🚀 ~ handleSubmit ~ pass:', pass, email);
    signInWithEmailAndPassword(auth, email, pass)
      .then((res) => {
        console.log('🚀 ~ handleSubmit ~ res:', res.user);
        setSuccess('login success');
      })
      .catch((error) => {
        console.log('🚀 ~ handleSubmit ~ error:', error);
        setError('sorry check you email and pass again ');
      });

      
  };
 
  const handleForgetMail = () => {
    const email = refEmail.current.value;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      console.log('please give me current email');
      return;
    } else if (!email) {
      console.log('please give me email in order to forget pass');

      return;
    }

    sendPasswordResetEmail(auth, email)
      .then((res) => {
        console.log('🚀 ~ handleForgetMail ~ res:', res);
      })
      .catch((error) => {
        console.log('🚀 ~ handleForgetMail ~ error:', error);
      });
  };
  return (
    <div>
      <div className="hero bg-base-200 min-h-screen">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold">Login now!</h1>
            <p className="py-6">
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
              excepturi exercitationem quasi. In deleniti eaque aut repudiandae
              et a id nisi.
            </p>
          </div>
          <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
            <form onSubmit={handleSubmit} className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  ref={refEmail}
                  type="email"
                  placeholder="email"
                  name="email"
                  className="input input-bordered"
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  placeholder="password"
                  name="password"
                  className="input input-bordered"
                  required
                />
                <label className="label">
                  <a
                    onClick={handleForgetMail}
                    href="#"
                    className="label-text-alt link link-hover"
                  >
                    Forgot password?
                  </a>
                </label>
              </div>
              <div className="form-control mt-6">
                <button className="btn btn-primary">Login</button>
              </div>
            </form>
            {success && <p>{success}</p>}
            {error && <p>{error}</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
