import { useParams, useSearchParams } from "react-router-dom";

export default function CategoryFilterPanel({ filter }) {
  const { slug } = useParams();

  const collections = filter?.collections?.length ? filter.collections : [];

  const [searchParams, setSearchParams] = useSearchParams();

  function toggleOption(key, option) {
    const params = new URLSearchParams(searchParams);

    const current = params.getAll(key);

    let updated = [];

    if (current.includes(option)) {
      updated = current.filter(item => item !== option);
    } else {
      updated = [...current, option];
    }

    params.delete(key);

    updated.forEach(value => {
      params.append(key, value);
    });

    setSearchParams(params);
  }

  return (
    <div className="p-4 border rounded">

      <h2 className="font-bold text-lg mb-4">
        Filters
      </h2>

      {/* Category */}
      <div className="mb-4">
        <h3 className="font-semibold mb-2">
          Category
        </h3>

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked
            readOnly
          />
          <span className="capitalize">
            {slug}
          </span>
        </label>
      </div>

      {/* Collections */}
      <div>
        <h3 className="font-semibold mb-2">
          Collections
        </h3>

        {collections.map(item => {
          const checked =
            searchParams
              .getAll("collections")
              .includes(item);

          return (
            <label
              key={item}
              className="flex items-center gap-2 py-1"
            >
              <input
                type="checkbox"
                checked={checked}
                onChange={() =>
                  toggleOption(
                    "collections",
                    item
                  )
                }
              />

              <span>{item}</span>
            </label>
          );
        })}
      </div>
    </div>
  );
}