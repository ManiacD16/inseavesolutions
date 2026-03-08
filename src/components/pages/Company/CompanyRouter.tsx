import { Navigate, useParams } from "react-router-dom";
import CompanyPage from "./CompanyPage";
import { companyPages } from "./companyData";

export default function CompanyRouter() {
  const { slug } = useParams();

  const page = companyPages.find((p) => p.slug === slug);

  if (!page) return <Navigate to="/" replace />;

  return <CompanyPage page={page} />;
}
