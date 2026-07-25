export default function ImageSection({ img }) {

  return (
    <div className="lg:w-2/3 w-full">

      {!img || img.length === 0 ? (

        <div className="text-stone-400">
          No images available
        </div>

      ) : Array.isArray(img) && img.length > 1 ? (

        <div className="grid grid-cols-2 gap-2">

          {img.map((field, index) => (

            <div
              key={index}
              className="aspect-square bg-gray-100 overflow-hidden"
            >

              <img
                src={field}
                alt={`Thumbnail ${index + 1}`}
                className="
                  w-full
                  h-full
                  object-cover
                  opacity-75
                  hover:opacity-100
                  transition
                "
              />

            </div>

          ))}

        </div>

      ) : (

        <div className="aspect-square bg-gray-100 overflow-hidden">

          <img
            src={Array.isArray(img) ? img[0] : img}
            alt="Product"
            className="w-full h-full object-cover"
          />

        </div>

      )}

    </div>
  );
}