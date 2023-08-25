import { BottomIconProps } from "types/layout";

const SearchIcon = (selected: BottomIconProps) =>
  selected ? (
    <svg viewBox="0 0 24 24" fill="currentColor" height="24px" width="24px">
      <path d="M10 2c-4.411 0-8 3.589-8 8s3.589 8 8 8a7.952 7.952 0 004.897-1.688l4.396 4.396 1.414-1.414-4.396-4.396A7.952 7.952 0 0018 10c0-4.411-3.589-8-8-8z" />
    </svg>
  ) : (
    <svg viewBox="0 0 24 24" fill="currentColor" height="24px" width="24px">
      <path d="M10 18a7.952 7.952 0 004.897-1.688l4.396 4.396 1.414-1.414-4.396-4.396A7.952 7.952 0 0018 10c0-4.411-3.589-8-8-8s-8 3.589-8 8 3.589 8 8 8zm0-14c3.309 0 6 2.691 6 6s-2.691 6-6 6-6-2.691-6-6 2.691-6 6-6z" />
    </svg>
  );

export default SearchIcon;
