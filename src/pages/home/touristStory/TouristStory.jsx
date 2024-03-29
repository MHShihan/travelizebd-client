import Lottie from "lottie-react";
import TouristStoryCard from "../../../components/TouristStoryCard";
import useLoadingAnimation from "../../../hooks/useLoadingAnimation";
import useTouristStory from "../../../hooks/useTouristStory";
import CommonBtn from "../../../components/CommonBtn";
import { Link } from "react-router-dom";
import SectionTitle from "../../../components/Sectiontitle";

const TouristStory = () => {
  const loadingAnimation = useLoadingAnimation();
  const [touristStories, isLoading] = useTouristStory();
  return (
    <div data-aos="fade-left" className="pt-20">
      <SectionTitle
        heading="Happy Tourist"
        subheading="Read some"
      ></SectionTitle>
      <div className="bg-[#f6f8f9] p-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 ">
          {isLoading && <Lottie animationData={loadingAnimation}></Lottie>}
          {touristStories.slice(0, 4).map((touristStory) => (
            <TouristStoryCard
              key={touristStory._id}
              touristStory={touristStory}
            ></TouristStoryCard>
          ))}
        </div>

        <Link to="allTouristStory">
          <CommonBtn btnTitle="All Story"></CommonBtn>
        </Link>
      </div>
    </div>
  );
};

export default TouristStory;
