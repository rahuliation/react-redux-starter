import { useLoginMutation } from '@/services/auth';
import { LoginInput, loginSchema } from '@/types/User';
import { yupResolver } from '@hookform/resolvers/yup';
import _ from 'lodash';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInput>({
    resolver: yupResolver(loginSchema),
  });
  const [login] = useLoginMutation();

  const onSubmit: SubmitHandler<LoginInput> = async (values) => {
    try {
      await login(values);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='flex justify-center h-screen w-screen bg-gray-200 dark:bg-gray-500 items-center'>
      <div className='w-full max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800'>
        <div className='px-6 py-4'>
          <div className='flex justify-center mx-auto'>
            <img
              className='w-auto h-7 sm:h-8'
              src='https://ixorasolution.com/wp-content/uploads/iXora-Solution-logo-w.svg'
              alt=''
            />
          </div>

          <h3 className='mt-3 text-xl font-medium text-center text-gray-600 dark:text-gray-200'>
            Welcome Back
          </h3>

          <p className='mt-1 text-center text-gray-500 dark:text-gray-400'>Login</p>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className='w-full mt-4'>
              <input
                className='block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300'
                type='email'
                placeholder='Email Address'
                aria-label='Email Address'
                {...register('email')}
              />
              <p className='text-xs text-red-500 mt-3'>{errors.email?.message}</p>
            </div>

            <div className='w-full mt-4'>
              <input
                className='block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300'
                type='password'
                placeholder='Password'
                aria-label='Password'
                {...register('password')}
              />
              <p className='text-xs text-red-500 mt-3'>{errors.password?.message}</p>
            </div>
            <button className='px-6 py-2 w-full text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50'>
              Sign In
            </button>
          </form>
          <div className='flex items-center justify-between mt-4'>
            <Link
              to='/registration'
              className='text-sm text-gray-600 dark:text-gray-200 hover:text-gray-500'
            >
              Forget Password?
            </Link>
          </div>
        </div>

        <div className='flex items-center justify-center py-4 text-center bg-gray-50 dark:bg-gray-700'>
          <span className='text-sm text-gray-600 dark:text-gray-200'>Don't have an account? </span>

          <Link
            to='/registration'
            className='mx-2 text-sm font-bold text-blue-500 dark:text-blue-400 hover:underline'
          >
            Register
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
