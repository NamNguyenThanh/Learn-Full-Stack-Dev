import Header from '../../components/Header';
import Footer from '../../components/Footer';
import NavbarMobile from '../../components/NavbarMobile';

export default function MainLayout(props) {
  const { children } = props;
  return (
    <div className="main-layout">
      <Header />
      {children}
      <NavbarMobile />
      <Footer />
    </div>
  );
}
