

import PropTypes from 'prop-types';

const TitleSubTitle = ({ title, subTitle }) => {
    return (
      <div
        className="flex flex-col justify-center items-center mx-auto mt-4 mb-9 space-y-3 p-6 rounded-xl 
        bg-gradient-to-b   
        
        

        ">
        <h1 className="text-4xl font-medium uppercase ">{title}</h1>
        <h3 className="font-medium uppercase ">{subTitle}</h3>
      </div>
    );
  };
  TitleSubTitle.propTypes = {
    title: PropTypes.string.isRequired,
    subTitle: PropTypes.string.isRequired,
  }
  export default TitleSubTitle;
  
  