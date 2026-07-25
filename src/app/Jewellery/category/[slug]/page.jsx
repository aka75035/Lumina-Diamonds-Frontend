// import { useParams, useSearchParams } from "react-router-dom";
// import ProductClient from "../../../../components/product-page/product-client";
// import JewelleryClient from "../../../../components/Jewellery/jewellery-client";
// import { useEffect, useState } from "react";
// import { getCategoryById, getProductsByCategory } from "../../../../lib/api";
// import { handleCategoryFilter, handleCategoryFilterData } from "../../../../lib/category";

// export default function CategorySlug(){

//   const [products, setProducts] = useState();
//   const [category, setCategory] = useState();
//   const [filterData, setFilterData] = useState();

  
//   const [loading, setLoading] = useState(true);
//   const {slug}  = useParams();
//   const [searchParams, setSearchParams] = useSearchParams();


//   useEffect(() => {
  
//     async function fetch() {

//       try {

//         const allData = await handleCategoryFilter(slug,searchParams);  
//         const filterData = await handleCategoryFilterData(slug);
//         setFilterData(filterData.filterData.collections)
        
//         console.log(allData);
//         console.log(filterData.filterData.collections);
        
//         setProducts(allData.products);

//       } catch (error) {

//         console.log(error);

//       } finally {

//         setLoading(false);

//       }

//     }

    

//     fetch();

//   }, [searchParams]);
  
//   if (loading) {

//     return (
//       <div className="py-6">
//         Loading products...
//       </div>
//     );

//   }
//     return (
//         <>
//         <JewelleryClient initialProducts={products} forBreadCrumbs={category} filterData={filterData} searchParams={searchParams} setSearchParams={setSearchParams}/>
//         </>
//     )
// }