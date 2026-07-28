import DropdownMenu from "./DropdownMenu";

export default function ProductBar({
  parentCategories = [],
  childCategories = [],
  collections = [],
}) {
  return (
    <nav className="hidden lg:flex justify-center border-y border-gray-200 bg-white">
      <div className="flex">
        {parentCategories.map((parent) => (
          <DropdownMenu
            key={parent._id}
            title={parent.name}
            titleLink={`/product?category=${parent.slug}`}
            items={childCategories.filter(
              (child) => child?.parentCategory === parent._id
            )}
            collections={collections.slice(0, 6)}
          />
        ))}
      </div>
    </nav>
  );
}