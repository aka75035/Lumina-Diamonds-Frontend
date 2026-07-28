import CategoryClient from "../../../components/Categories/categoryClient";
import BreadCrumbs from "../../../components/breadcrumbs";
import { getAllCategories } from "../../../lib/api";
import { useEffect, useState } from "react";

export default function CategoryPage(){
  const [products, setProducts] = useState();

  const [loading, setLoading] = useState(true);
  useEffect(() => {
  
    async function fetchProducts() {

      try {

        const data = await getAllCategories();

        setProducts(data);

      } catch (error) {

        console.log(error);

      } finally {

        setLoading(false);

      }

    }

    fetchProducts();

  }, []);

  if (loading) {

    return (
      <div className="py-6">
        Loading products...
      </div>
    );

  }
  
    return(
    <>
      <div className="lg:pl-10 pl-[22px] pt-2">
        <BreadCrumbs />
      </div>
      <h1 className="text-4xl block text-center p-2 ">Choose from Categories</h1>

      <CategoryClient intialCategories={products} />
    </>
    );
}