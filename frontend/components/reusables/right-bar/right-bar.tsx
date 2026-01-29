import { Search } from "../search/search";

export const RightBar = () => {
  return (
    <aside className="h-screen w-full flex flex-col items-center justify-center bg-(--bg-01) border-l border-(--gris-07)">
      <Search />
    </aside>
  );
};

export default RightBar;
