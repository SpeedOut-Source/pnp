import dynamic from "next/dynamic";

const SearchDialog = dynamic(() => import("./search/search_dialog"));

export default function ImportPopup() {
  return (
    <>
      <SearchDialog />
    </>
  );
}
