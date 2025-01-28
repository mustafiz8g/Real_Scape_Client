import { useState } from "react"
import { imageUpload } from "../../hooks/Utils"
import axios from "axios"
import toast from "react-hot-toast"
import { Helmet } from "react-helmet-async"
import PropertyUpdateForm from "../../Components/Form/PropertyUpdateForm"

const PropertyUpdate = () => {
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
   

    // plant object
    const property = {
      title,
      location,
      minPrice,
      maxPrice,
      image: imageUrl,
      
      verification: 'pending'
    }

    // save plant in db   
    try{
      // post req
      await axios.put(`/properties`, property)
      toast.success('Property updated successfully')
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

      {/* Form */}
      <PropertyUpdateForm handleSubmit = {handleSubmit} uploadImage={uploadImage} 
      setuUploadImage={setUploadImage} loading={loading}/>
    </div>
  )
}

export default PropertyUpdate

