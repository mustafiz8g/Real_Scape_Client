import { Helmet } from 'react-helmet-async'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { imageUpload } from '../../hooks/Utils'
import useAuth from '../../hooks/useAuth'
import useAxiosSecure from '../../hooks/useAxiosSecure'
import AddPropertyForm from '../../Components/Form/AddPropertyForm'
import TitleSubTitle from '../../Components/TitleSubTitle'
const AddProperty = () => {
  const {user} = useAuth()
  const axiosSecure = useAxiosSecure()
  const [uploadImage, setUploadImage] = useState({
    name: 'Upload Image',
  })
  const [loading, setLoading] = useState(false)
  const handleSubmit = async(e) => {
    e.preventDefault()
    const form = e.target;
    setLoading(true)
    const title = form.title.value;
    const location = form.location.value;
    const minPrice = parseFloat(form.price1.value);
    const maxPrice = parseFloat(form.price2.value);
    const image = form.image.files[0];
    const imageUrl = await imageUpload(image);
    // agent info
    const agent = {
      name: user?.displayName,
      email: user?.email,
      image: user?.photoURL
    }

    // plant object
    const property = {
      title,
      location,
      minPrice,
      maxPrice,
      image: imageUrl,
      agent,
      verification: 'pending'
    }

    // save plant in db   
    try{
      // post req
      await axiosSecure.post(`/properties`, property)
      toast.success('Property added successfully')
    }
    catch(err){
    //   console.log(err)
    }
    finally{
      setLoading(false)
    }
  }
  return (
    <div>
      <Helmet>
        <title>Add properties | Dashboard</title>
      </Helmet>
       <TitleSubTitle title='Add Property'></TitleSubTitle>
      {/* Form */}
      <AddPropertyForm handleSubmit = {handleSubmit} uploadImage={uploadImage} 
      setuUploadImage={setUploadImage} loading={loading}/>
    </div>
  )
}

export default AddProperty
