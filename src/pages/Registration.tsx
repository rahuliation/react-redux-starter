import { useCreateUserMutation } from '@/services/user';
import { userSchema } from '@/types/User';
import { yupResolver } from '@hookform/resolvers/yup';
import _ from 'lodash';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import * as yup from 'yup';

const regisTrationSchema = userSchema.shape({
  password: yup
    .string()
    .label('Password')
    .min(8, 'Password length must be more than 8 ')
    .required(),
  confirmPassword: yup
    .string()
    .label('Confirm Password')
    .min(8, 'Password length must be more than 8 ')
    .required()
    .oneOf([yup.ref('password'), ''], 'Passwords must match'),
});

export type RgistrationInput = yup.InferType<typeof regisTrationSchema>;

const RegistratonPage = () => {
  const [createUser] = useCreateUserMutation();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<RgistrationInput>({
    resolver: yupResolver(regisTrationSchema),
  });

  const onSubmit: SubmitHandler<RgistrationInput> = async (values) => {
    try {
      const regData = _.omit(values, 'confirmPassword');
      await createUser(regData);
      reset();
      navigate('/login');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='flex justify-center h-screen w-screen items-center'>
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
              Registration
            </h3>

            <form onSubmit={handleSubmit(onSubmit)}>
              <div className='w-full mt-4'>
                <input
                  className='block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300'
                  type='text'
                  placeholder='First Name'
                  aria-label='First Name'
                  {...register('firstName')}
                />
                <p className='text-xs text-red-500 mt-3'>{errors.firstName?.message}</p>
              </div>
              <div className='w-full mt-4'>
                <input
                  className='block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300'
                  type='text'
                  placeholder='Last Name'
                  aria-label='Last Name'
                  {...register('lastName')}
                />
                <p className='text-xs text-red-500 mt-3'>{errors.lastName?.message}</p>
              </div>
              <div className='w-full mt-4'>
                <input
                  className='block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300'
                  type='email'
                  placeholder='Email Address'
                  aria-label='Email Address'
                  {...register('email', { required: true })}
                />
                <p className='text-xs text-red-500 mt-3'>{errors.email?.message}</p>
              </div>

              <div className='w-full mt-4'>
                <input
                  className='block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300'
                  type='password'
                  placeholder='Password'
                  aria-label='Password'
                  {...register('password', { required: true })}
                />
                <p className='text-xs text-red-500 mt-3'>{errors.password?.message}</p>
              </div>

              <div className='w-full mt-4'>
                <input
                  className='block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300'
                  type='password'
                  placeholder='Confirm Password'
                  aria-label='ConfirmPassword'
                  {...register('confirmPassword', { required: true })}
                />
                <p className='text-xs text-red-500 mt-3'>{errors.confirmPassword?.message}</p>
              </div>
              <div className='flex items-center justify-between mt-4'>
                <button className='px-6 py-2 w-full text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50'>
                  Register
                </button>
              </div>
            </form>
          </div>

          <div className='flex items-center justify-center py-4 text-center bg-gray-50 dark:bg-gray-700'>
            <span className='text-sm text-gray-600 dark:text-gray-200'>Already have acccount?</span>

            <Link
              to='/login'
              className='mx-2 text-sm font-bold text-blue-500 dark:text-blue-400 hover:underline'
            >
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistratonPage;
