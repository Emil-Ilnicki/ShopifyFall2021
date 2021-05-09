import Skeleton from "./Skeleton";
import "../styles/Skeleton.css";
import Shimmer from "./Shimmer";

const SkeletonMovie = () => {
  return (
    <div className="skeletonWrapper">
      <div className="skeletonMovie">
        <Skeleton style="poster" />
        <Skeleton style="text" />
      </div>
      <Shimmer />
    </div>
  );
};

export default SkeletonMovie;
