import Header from '../../components/Header';
import Footer from '../../components/Footer';

export default function MainLayout(props) {
  const { children } = props;
  return (
    <div className="main-layout">
      <Header />
      {children}
      <Footer />
    </div>
  );
}
