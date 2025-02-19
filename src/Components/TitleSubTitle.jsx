import PropTypes from 'prop-types';

const TitleSubTitle = ({ title, subTitle }) => {
  return (
    <div className="flex flex-col justify-center items-center mx-auto mt-4 mb-9 space-y-3 p-6 rounded-xl shadow-2xs">
      {/* Title with Gradient Text */}
      <h1 
        className="text-3xl  font-bold uppercase tracking-wide bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-transparent bg-clip-text"
        aria-label={title}
      >
        {title}
      </h1>

      {/* Subtitle */}
      <h3 
        className="text-base  text-center max-w-lg sm:max-w-2xl"
        aria-label={subTitle}
      >
        {subTitle}
      </h3>
    </div>
  );
};

TitleSubTitle.propTypes = {
  title: PropTypes.string.isRequired,
  subTitle: PropTypes.string.isRequired,
};

export default TitleSubTitle;
