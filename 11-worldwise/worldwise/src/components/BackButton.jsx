import { useNavigate } from "react-router-dom";
import Button from "./Button";

const BackButton = () => {
const navigate = useNavigate();

  return (
    <Button
    type="back"
    onClick={(e) => {
      // prevent re-submit all form(re-rendering) because button inside the form
      e.preventDefault();
      // move to previous page
      navigate(-1);
    }}
  >
    &larr; Back
  </Button>
  )
};

export default BackButton
