import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import Loader from '../../components/loader/Loader';
import { hideLoader, showLoader } from '../../redux/slices/loaderSlice';
import { loginService } from '../../services/authService';
import './Login.css'; // Don't forget to import the CSS file

const Login = () => {

  const dispatch = useDispatch();
  const loading = useSelector((state) => state.loader.loading);
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!email || !password) {
      toast.error("All fields are required.");
      return;
    }

    try {
      dispatch(showLoader());
      const credential = { email, password }; 
      const response = await loginService(credential);
      if (response.status === "success") {
        setTimeout(() => {
          toast.success(response.message);
          localStorage.setItem('token', response.token);
          localStorage.setItem('user', JSON.stringify(response.user));
          navigate("/");
          dispatch(hideLoader());
        }, 300);
      } else {
        toast.error(response.message);
        dispatch(hideLoader());
      }
    } catch (error) {
      toast.error(error?.message || 'Login failed. Please try again.');
      dispatch(hideLoader());
    }

  };

  return (
    <div className="login-container login_sec">
      <div className="login-box">
        <h3>Login Eshop</h3>

        {/* Show loader when loading */}
        {loading && <Loader />}
    
        <form onSubmit={handleSubmit}>

          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={ (e) => setEmail(e.target.value) }
              placeholder="Enter your email"
            />
          </div>

          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              onChange={ (e) => setPassword(e.target.value) }
              placeholder="Enter your password"
            />
          </div>

          <button type="submit" className="login-btn">Login</button>
        </form>
        
      </div>
    </div>
  );
};

export default Login;
