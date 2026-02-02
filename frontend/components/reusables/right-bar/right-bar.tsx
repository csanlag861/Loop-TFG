import { Search } from "../search/search";

export const RightBar = () => {
  return (
    <aside className="h-screen w-full flex flex-col items-center justify-baseline pt-48 bg-(--bg-01) border-l border-(--gris-07)">
      <Search />
    </aside>
  );
};

export default RightBar;
