


import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import LoadingSpinner from '../Shared/LoadingSpinner'
import Container from '../Shared/Container'
import Card from './Card'
import TitleSubTitle from '../TitleSubTitle'

const Advertise = () => {
  const { data :properties, isLoading } = useQuery({
    queryKey: ['properties'],
    queryFn: async () => {
      const {data} = await axios(`${import.meta.env.VITE_API_URL}/propertiesverified`)
      return data
    }
  })
  if(isLoading) return <LoadingSpinner />
  return (
    <Container>
        <TitleSubTitle title='Discover Your Dream Property

' subTitle='Explore verified listings with stunning visuals, prime locations, and flexible price ranges. Click for more details and make it yours today!'></TitleSubTitle>
     {
      properties && properties.length>0

      ?   
         <div className='pt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8'>
        {
          properties.map(property => <Card key={property._id} property={property} />)
        }
        
      </div>
      : 
      
      <h1>No Property Found</h1>
     }
    </Container>
  )
}

export default Advertise

