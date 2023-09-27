import { FC, ReactNode, useState } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import ScrollUpBtn from './ScrollUpBtn';
import Form from './Form';

interface LayoutePropsInterface {
  children: ReactNode;
}

const Layout: FC<LayoutePropsInterface> = ({ children }) => {
  const [formActive, setFormActive] = useState(false);

  const onSetFormActive = (isActive: boolean) => {
    setFormActive(isActive);
  };

  return (
    <>
      <Navbar handleOpenCloseForm={onSetFormActive}/>
      {children}
      {formActive && <Form formActive={formActive} onSetFormActive={setFormActive} />}
      <ScrollUpBtn/>
      <Footer />
    </>
  );
};

export default Layout;
