import Annoucement from '../components/Home/Annoucement';
import Categories from '../components/Home/Categories';
import Footer from '../components/Home/Footer';
import Navbar from '../components/Home/Navbar';
import NewsLetter from '../components/Home/NewsLetter';
import Products from '../components/Home/Products';
import Slider from '../components/Home/Slider';

export default function Home() {
  return (
    <>
      <Annoucement />
      <Navbar />
      <Slider />
      <Categories />
      <Products />
      <NewsLetter />
      <Footer />
    </>
  );
}
