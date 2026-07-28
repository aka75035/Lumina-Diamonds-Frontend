import { useParams } from "react-router-dom";
import { getProductsByCollection } from "../../../utils/filter";
import JewelleryClient from "../../../components/Jewellery/jewellery-client";

export default function CollectionSlug(){
    const { slug } = useParams();
    const products = getProductsByCollection(slug);
    return (
        <>
        <JewelleryClient initialProducts={products} />
        </>
    )
}