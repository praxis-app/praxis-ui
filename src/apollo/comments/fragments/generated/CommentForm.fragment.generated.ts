import { gql } from "@apollo/client";
import { AttachedImageFragmentDoc } from "../../../images/fragments/generated/AttachedImage.fragment.generated";

// THIS FILE IS GENERATED, DO NOT EDIT
/* eslint-disable */

export type CommentFormFragment = {
  __typename?: "Comment";
  id: number;
  body?: string | null;
  images: Array<{ __typename?: "Image"; id: number; filename: string }>;
};

export const CommentFormFragmentDoc = gql`
  fragment CommentForm on Comment {
    id
    body
    images {
      ...AttachedImage
    }
  }
  ${AttachedImageFragmentDoc}
`;
