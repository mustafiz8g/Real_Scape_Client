import PropTypes from "prop-types";
import { TbFidgetSpinner } from "react-icons/tb";
import useAuth from "../../hooks/useAuth";

const AddPropertyForm = ({handleSubmit, uploadImage,setuUploadImage,loading}) => {
    const {user} = useAuth();
    const agent = {
        name: user?.displayName,
        email: user?.email,
  
      }
  
  return (
    <div className='w-full min-h-[calc(100vh-40px)] flex flex-col justify-center items-center text-gray-800 rounded-xl bg-gray-50'>
      <form onSubmit={handleSubmit} className='w-full max-w-3xl p-8 space-y-6 bg-white rounded-lg shadow-lg'>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-10'>
          <div className='space-y-6'>
            {/* Name */}
            <div className='space-y-1 text-sm'>
              <label htmlFor='title' className='block text-gray-600'>
                Property title
              </label>
              <input
                className='w-full px-4 py-3 text-gray-800 border border-blue-300 focus:outline-blue-500 rounded-md bg-white'
                name='title'
                id='title'
                type='text'
                placeholder='Property title'
                required
              />
            </div>
            {/* Location */}
            <div className='space-y-1 text-sm'>
              <label htmlFor='location' className='block text-gray-600'>
                Property Location
              </label>
              <input
                className='w-full px-4 py-3 text-gray-800 border border-blue-300 focus:outline-blue-500 rounded-md bg-white'
                name='location'
                id='location'
                type='text'
                placeholder='Property Location'
                required
              />
            </div>
       
         
          
        
          
          </div>
          <div className='space-y-6 flex flex-col'>
        
            <div className=''>
              {/* Price */}
              <div className='space-y-1 text-sm'>
                <label htmlFor='price' className=' text-gray-600 '>
                  Price Range
                </label>
              <div className="flex gap-2">
              <input
                  className='w-full px-4 py-3 text-gray-800 border border-blue-300 focus:outline-blue-500 rounded-md bg-white'
                  name='price1'
                  id='price1'
                  type='number'
                  placeholder='min price'
                  required
                />
                  <input
                  className='w-full px-4 py-3 text-gray-800 border border-blue-300 focus:outline-blue-500 rounded-md bg-white'
                  name='price2'
                  id='price2'
                  type='number'
                  placeholder='max price'
                  required
                />
              </div>
              </div>

         
            </div>
            {/* Image */}
          
            
                <div className='flex flex-col text-center'>
                  <label>
                    <input
                    onChange={(e) => setuUploadImage({
                     image: e.target.files[0], url: URL.createObjectURL(e.target.files[0])
                    })}
                      className='text-sm cursor-pointer w-36 hidden'
                      type='file'
                      name='image'
                      id='image'
                      accept='image/*'
                      hidden
                    />
                    <div className='bg-blue-500 text-white border border-gray-300 rounded font-semibold cursor-pointer p-1 px-3 hover:bg-blue-500'>
                      {uploadImage?.name}
                    </div>
                  </label>
                </div>
           
        

      {
        uploadImage && (
          <div className='text-center text-sm text-gray-500'>
           
            <img
              className='w-40 h-40 mx-auto mt-2 object-cover rounded-md'
              src={uploadImage?.url}
              alt='Image Preview'
            />
          </div>
        )
      }

            {/* Submit Button */}
            <button
              type='submit'
              className='w-full p-3 mt-5 text-center font-medium text-white transition duration-200 rounded shadow-md bg-blue-500 '
            >
              {loading ? (<TbFidgetSpinner className="animate-spin m-auto"/>) : 'Add Property'}
            </button>
          </div>
        </div>
      </form>
    </div>
  )}
AddPropertyForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  uploadImage: PropTypes.object.isRequired,
  setuUploadImage: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default AddPropertyForm;


