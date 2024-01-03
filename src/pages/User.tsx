import MainLayout from '@/components/layouts/MainLayout';
import { useGetUsersQuery } from '@/services/user';
import _ from 'lodash';

const UserPage = () => {
  const { data: usersData } = useGetUsersQuery();

  return (
    <MainLayout>
      <section className='container px-4 mx-auto'>
        <h2 className='text-lg font-medium text-gray-800 dark:text-white'>Users</h2>

        <p className='mt-1 text-sm text-gray-500 dark:text-gray-300'>
          These users exists in database
        </p>

        <div className='flex flex-col mt-6'>
          <div className='-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8'>
            <div className='inline-block min-w-full py-2 align-middle md:px-6 lg:px-8'>
              <div className='overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg'>
                <table className='min-w-full divide-y divide-gray-200 dark:divide-gray-700'>
                  <thead className='bg-gray-50 dark:bg-gray-800'>
                    <tr>
                      <th
                        scope='col'
                        className='py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400'
                      >
                        Email
                      </th>
                      <th
                        scope='col'
                        className='py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400'
                      >
                        First Name
                      </th>
                      <th
                        scope='col'
                        className='py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400'
                      >
                        Last Name
                      </th>
                      {/* <th
                        scope='col'
                        className='py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400'
                      >
                        Action
                      </th> */}
                    </tr>
                  </thead>
                  <tbody className='bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700'>
                    {_.map(usersData, (user) => (
                      <tr>
                        <td className='py-4 px-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100'>
                          {user.email}
                        </td>
                        <td className='py-4 px-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100'>
                          {user.firstName}
                        </td>
                        <td className='py-4 px-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100'>
                          {user.lastName}
                        </td>
                        {/* <td className='py-4 px-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100'>
                          <button className='text-blue-500 hover:text-blue-700 focus:outline-none'>
                            Edit
                          </button>
                        </td> */}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default UserPage;
