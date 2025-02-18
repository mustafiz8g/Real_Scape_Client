
import { Helmet } from 'react-helmet-async'
import Banner from '../Components/Home/Banner'
import Advertise from '../Components/Home/Advertise'
import Review from '../Components/Home/Review'
import Faq from '../Components/Home/Faq'
import Top from '../Components/Home/Top'
import Rent from '../Components/Home/Rent'
import Featured from '../Components/Home/Featured'
import Contact from '../Components/Home/Contact'

const Home = () => {
  return (
    <div >
      <Helmet>
        <title> Real-Scape | Home </title>
      </Helmet>
   <Banner></Banner>
   <Advertise></Advertise>
   <Review></Review>
   <Rent></Rent>
   <Featured></Featured>
   <Contact></Contact>
   <Faq></Faq>
   <Top></Top>
    </div>
  )
}

export default Home
