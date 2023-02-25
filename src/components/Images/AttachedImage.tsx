import { AttachedImageFragment } from "../../apollo/gen";
import { getImagePath } from "../../utils/image.utils";

interface Props {
  image: AttachedImageFragment;
  marginBottom?: string | number;
  width?: string | number;
}

const AttachedImage = ({ image, marginBottom, width = "100%" }: Props) => (
  <img
    alt={image.filename}
    src={getImagePath(image.id)}
    style={{
      display: "block",
      marginBottom,
      width,
    }}
  />
);

export default AttachedImage;
