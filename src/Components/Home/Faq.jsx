import Container from "../Shared/Container";


const Faq = () => {
    return (
        <Container>
            <div className="join join-vertical bg-base-100 w-full">
                <div className="collapse collapse-arrow join-item border-base-300 border">
                    <input type="radio" name="my-accordion-4" defaultChecked />
                    <div className="collapse-title font-semibold">How does the platform work?</div>
                    <div className="collapse-content text-sm">Our platform connects buyers, agents, and admins seamlessly. Buyers can browse properties, add them to their wishlist, and purchase directly. Agents can list and manage properties, while admins oversee the entire process for smooth operations.</div>
                </div>
                <div className="collapse collapse-arrow join-item border-base-300 border">
                    <input type="radio" name="my-accordion-4" />
                    <div className="collapse-title font-semibold">Why Choose Us?</div>
                    <div className="collapse-content text-sm">We provide a user-friendly interface, verified listings, trusted agents, and a secure transaction process. Whether you're buying, selling, or managing, we ensure a hassle-free experience.</div>
                </div>
                <div className="collapse collapse-arrow join-item border-base-300 border">
                    <input type="radio" name="my-accordion-4" />
                    <div className="collapse-title font-semibold">What tools are available for agents?</div>
                    <div className="collapse-content text-sm">Agents can add new properties, track requests, and view their sales performance. With detailed analytics, managing your listings has never been easier.</div>
                </div>
            </div>
        </Container>
    );
};

export default Faq;