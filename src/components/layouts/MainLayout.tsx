import { ReactNode } from 'react';
import Navbar from './Header';

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <>
      <Navbar />
      <main className='container px-6 py-3 mx-auto md:flex'>{children}</main>
    </>
  );
};

export default MainLayout;
