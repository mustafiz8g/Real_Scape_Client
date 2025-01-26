
import { Helmet } from 'react-helmet-async'
import Banner from '../Components/Home/Banner'

const Home = () => {
  return (
    <div>
      <Helmet>
        <title> Real-Scape | Home </title>
      </Helmet>
   <Banner></Banner>
    </div>
  )
}

export default Home
