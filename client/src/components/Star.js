import { FaStar, FaStarHalfAlt } from "react-icons/fa";
import { AiOutlineStar } from "react-icons/ai";
import "./styles/Star.scss"

const Star = ({ rating, reviews }) => {
    const ratingStar = Array.from({ length: 5 }, (elem, index) => {
        let number = index + 0.5;
        // debugger;
        return (
            <span key={index}>
                {rating >= index + 1 ? (
                    <FaStar className="icon" />
                ) : rating >= number ? (
                    <FaStarHalfAlt className="icon" />
                ) : (
                    <AiOutlineStar className="icon" />
                )}
            </span>
        );
    });

    return (
        <section id="star">
            <div className="icon-style">
                {ratingStar}
                <p>({reviews} customer reviews)</p>
            </div>
        </section>
    );
};

export default Star;