import Container from "../Shared/Container";
import TitleSubTitle from "../TitleSubTitle";


const Contact = () => {
    return (
      <Container>
          <div className="flex items-center justify-center  ">
            <div className=" p-8 rounded-xl shadow-sm ">
               
                      <TitleSubTitle 
                                   title='Schedule a meeting with our team' 
                                   subTitle='Our experts and developers would love to contribute their expertise and insights to your real estate plans.

                    '></TitleSubTitle>
                <form className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <input type="text" placeholder="Name" className="p-2 border rounded w-full"/>
                        <input type="text" placeholder="Mobile" className="p-2 border rounded w-full"/>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <input type="email" placeholder="Email" className="p-2 border rounded w-full"/>
                        <input type="text" placeholder="City" className="p-2 border rounded w-full"/>
                    </div>
                    <textarea placeholder="Message" className="p-2 border rounded w-full h-24"></textarea>
                    <button className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
                        Send Email
                    </button>
                </form>
            </div>
        </div>
      </Container>
    );
};

export default Contact;
