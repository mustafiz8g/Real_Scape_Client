


import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import LoadingSpinner from '../Shared/LoadingSpinner'
import Container from '../Shared/Container'
import Card from './Card'

const Advertise = () => {
  const { data :plants, isLoading } = useQuery({
    queryKey: ['plants'],
    queryFn: async () => {
      const {data} = await axios(`${import.meta.env.VITE_API_URL}/properties`)
      return data
    }
  })
  if(isLoading) return <LoadingSpinner />
  return (
    <Container>
     {
      plants && plants.length>0

      ?   
         <div className='pt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8'>
        {
          plants.map(property => <Card key={property._id} property={property} />)
        }
        
      </div>
      : 
      
      <h1>No Property Found</h1>
     }
    </Container>
  )
}

export default Advertise

