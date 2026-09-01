import { useNavigate } from "react-router-dom";
import type {Product} from "../types";
interface Props{
    product: Product;
}
const ProductCard = ({product}:Props) => {
    const currency = import.meta.env.VITE_CURRENCY_SYMBOL || "$";
    const {addToCart} = {addToCart: (_data :any)=>{}}
    const navigate = useNavigate()
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow hover:shadow-md transition-all duration-300 group animate-fate-in cursor-pointer" onClick={()=> navigate ('/products/${product_id}')}>
        {/* {Image} */}
        <div className="relative aspect-square overflow-hidden">
            <img src={product.image} alt={product.image} className="w-full h-full object cover p-4 group-hover:p-2 transition-all duration-300" />

            {/* {Badge} */}
            <div>
                {product.discount > 0 && 
             <span className="px-2 py-0.5 text-[10px] font-semibold uppercase bg-app-orange text-white rounded-full">   {product.discount}% OFF
             </span>}
            </div>

        </div>
    </div>
  )
}

export default ProductCard