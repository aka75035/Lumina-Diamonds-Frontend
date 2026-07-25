"use client";

export default function StoneDetails({ product }) {

  const stones = product?.stones || [];

  if (stones.length === 0) {
    return null;
  }

  return (
    <div className="mt-6 border overflow-hidden rounded-lg">

      {/* Header */}
      <div className="px-6 py-4 border-b bg-gray-50">
        <h2 className="text-lg font-semibold">
          {product?.stoneType || "Stone"} Details
        </h2>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">

          <thead className="bg-gray-100">

            <tr>

              <th className="px-4 py-3 text-left">
                Shape
              </th>

              <th className="px-4 py-3 text-left">
                Quantity
              </th>

              <th className="px-4 py-3 text-left">
                Weight (ct)
              </th>

              <th className="px-4 py-3 text-left">
                Color
              </th>

              <th className="px-4 py-3 text-left">
                Clarity
              </th>

              <th className="px-4 py-3 text-left">
                Size Range
              </th>

              <th className="px-4 py-3 text-right">
                Price
              </th>

            </tr>

          </thead>

          <tbody>

            {stones.map((stone, index) => (

              <tr
                key={stone._id || index}
                className="border-t hover:bg-gray-50"
              >

                <td className="px-4 py-3">
                  {stone.shape || "-"}
                </td>

                <td className="px-4 py-3">
                  {stone.quantity ?? "-"}
                </td>

                <td className="px-4 py-3">
                  {stone.weight ?? "-"}
                </td>

                <td className="px-4 py-3">
                  {stone.color || "-"}
                </td>

                <td className="px-4 py-3">
                  {stone.clarity || "-"}
                </td>

                <td className="px-4 py-3">
                  {stone.sizeRange || "-"}
                </td>

                <td className="px-4 py-3 text-right">
                  {stone.pricingType === "dynamic"
                    ? "Dynamic"
                    : `₹${Number(stone.price || 0).toLocaleString("en-IN")}`}
                </td>

              </tr>

            ))}

          </tbody>

        </table>
      </div>
    </div>
  );
}