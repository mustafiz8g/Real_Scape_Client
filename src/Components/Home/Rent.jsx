
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import LoadingSpinner from '../Shared/LoadingSpinner'
import Container from '../Shared/Container'
import TitleSubTitle from '../TitleSubTitle'
import RentCard from './RentCard'

const Rent = () => {
  const { data :propertiess, isLoading } = useQuery({
    queryKey: ['propertiess'],
    queryFn: async () => {
      const {data} = await axios(`${import.meta.env.VITE_API_URL}/propertiesRent`)
      return data
    }
  })
  if(isLoading) return <LoadingSpinner />
  return (
    <Container>
     <TitleSubTitle 
               title='Properties for Rent' 
               subTitle='Spacious 2-bedroom apartment available for rent. Prime location, modern amenities, secure parking, and 24/7 maintenance. Contact now for viewing!'></TitleSubTitle>
     {
      propertiess && propertiess.length>0

      ?   
         <div className=' grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3  gap-10'>
        {
          propertiess.map(propertyy => <RentCard key={propertyy._id} propertyy={propertyy} />)
        }
        
      </div>
      : 
      
      <h1>No Property Found</h1>
     }
    </Container>
  )
}

export default Rent

