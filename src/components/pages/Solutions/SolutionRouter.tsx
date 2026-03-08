import { Navigate, useParams } from "react-router-dom";
import SolutionPage from "./SolutionPage";
import { solutionItems } from "./solutionData";

export default function SolutionRouter() {
  const { slug } = useParams();

  const item = solutionItems.find((s) => s.slug === slug);

  if (!item) {
    return <Navigate to="/" replace />;
  }

  return <SolutionPage item={item} />;
}
