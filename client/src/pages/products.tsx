import { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"
import { Product } from "../types"
import { categoriesData, dummyProducts } from "../assets/assets"

const Products = () => {
  const [searchParams,setSearchParms] = useSearchParams()
  const [products,setProducts]= useState<Product[]>([])
  const [totalPages , setTotalPages ] =useState(1)
  const [loading , setLoading] = useState(true);
const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
const category = searchParams.get("category") || "";
const organic = searchParams.get("organic") || "";
const sort = searchParams.get("sort") || "";   
const page = Number(searchParams.get("page")) || 1;   
const minPrice = searchParams.get("minPrice") || "";   
const maxPrice = searchParams.get("maxPriec") || "";  
const fetchProducts = async()=>{
  setLoading(true)
  setProducts(dummyProducts.filter((p)=> p.category === category || category === ""));
  setLoading(false)
}

const updateFilter =(key:string,value:string)=>{
const newParams = new URLSearchParams(searchParams)
if(value){
  newParams.set(key,value)
}
else{
  newParams.delete(key)
}
if (key !== "page"){
  newParams.delete("page")
}
setSearchParms(newParams)
}
const clearFilters = ()=> setSearchParms({})
const activeCategory = categoriesData.find((c)=> c.slug === category)
const hasFilters = category || organic || minPrice || maxPrice;

useEffect(()=>{
  fetchProducts()
},[category, organic, sort, page, minPrice, maxPrice ]
)

  return (
    <div className="min-h-screen bg-app-cream">
      <div className="max-w-7xl mx-autp px-4 sm:px-6 lg:px-8 py-6">
        
      </div>

    </div>
  )
}

export default Products