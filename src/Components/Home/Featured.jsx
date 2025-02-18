

import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import LoadingSpinner from '../Shared/LoadingSpinner'
import Container from '../Shared/Container'
import TitleSubTitle from '../TitleSubTitle'
import FeaturedCard from './FeaturedCard'

const Rent = () => {
  const { data :propertiesff, isLoading } = useQuery({
    queryKey: ['propertiesff'],
    queryFn: async () => {
      const {data} = await axios(`${import.meta.env.VITE_API_URL}/propertiesFeatured`)
      return data
    }
  })
  if(isLoading) return <LoadingSpinner />
  return (
    <Container>
     <TitleSubTitle 
               title='Featured Properties
' 
               subTitle='Here are two listings displayed with the featured property shortcode, which you can use when you have some special properties to present.
'></TitleSubTitle>
     {
      propertiesff && propertiesff.length>0

      ?   
         <div className='flex justify-center  gap-10'>
        {
          propertiesff.map(propertyff => <FeaturedCard key={propertyff._id} propertyff={propertyff} />)
        }
        
      </div>
      : 
      
      <h1>No Property Found</h1>
     }
    </Container>
  )
}

export default Rent

