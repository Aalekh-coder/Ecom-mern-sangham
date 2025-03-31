import ProductFilter from '@/components/shoppingView/Filter'
import ProductDetailsDialog from '@/components/shoppingView/ProductDetails'
import ShoppingProductTile from '@/components/shoppingView/ProductTile'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { sortOptions } from '@/config'
import { fetchAllFilteredProducts, fetchProductDetails } from '@/store/shop/ProductSlice'
import { ArrowUpDownIcon } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useSearchParams } from 'react-router-dom'


function createSearchParamsHelper(filterParams) {
  const queryParams = [];

  for (const [key, value] of Object.entries(filterParams)) {
    if (Array.isArray(value) && value.length > 0) {
      const paramValue = value.join(",");

      queryParams.push(`${key}=${encodeURIComponent(paramValue)}`)
    }
  }
  return queryParams.join("&")
}

const Listing = () => {
  const dispatch = useDispatch();
  const { productList,productDetails } = useSelector(state => state.shopProducts);
  const [filters, setFilters] = useState({});
  const [sort, setSort] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const [openDetailDialog, setOpenDetailDialog] = useState(false);


  function handleSort(value) {
    setSort(value);
  }

  function handleFilter(getSectionId, getCurrentOption) {
    let cpyFilters = { ...filters };
    const indexOfCurrentSection = Object.keys(cpyFilters).indexOf(getSectionId);

    if (indexOfCurrentSection === -1) {
      cpyFilters = {
        ...cpyFilters,
        [getSectionId]: [getCurrentOption],
      };
    } else {
      const indexOfCurrentOption =
        cpyFilters[getSectionId].indexOf(getCurrentOption);

      if (indexOfCurrentOption === -1)
        cpyFilters[getSectionId].push(getCurrentOption);
      else cpyFilters[getSectionId].splice(indexOfCurrentOption, 1);
    }

    setFilters(cpyFilters);
    sessionStorage.setItem("filters", JSON.stringify(cpyFilters));
  }

  function handleGetProductDetails(getCurrentProductId) {
    dispatch(fetchProductDetails(getCurrentProductId));
  }

  useEffect(() => {
    setSort("price-lowtohigh");
    setFilters(JSON.parse(sessionStorage.getItem("filters")) || {})
  }, []);
  
  useEffect(() => {
    if (filters && Object.keys(filters).length > 0) {
      const createQueryString = createSearchParamsHelper(filters)
      setSearchParams(new URLSearchParams(createQueryString))
    }
  },[filters])

  useEffect(() => {
    if(filters !== null && sort !== null)
    dispatch(fetchAllFilteredProducts({filterParams:filters, sortParams:sort}))
  }, [dispatch,sort,filters]);

  useEffect(() => {
    if(productDetails !== null) setOpenDetailDialog(true)
  },[productDetails])

  return (
    <div className='grid grid-col-1 md:grid-cols-[300px_1fr] gap-6 p-4 md:p-6'>
      <ProductFilter filters={filters}
        handleFilter={handleFilter} />
      <div className="bg-background w-full rounded-lg shadow-sm">
        <div className="p-4 border-b flex items-center justify-between">
          <h2 className='text-lg font-extrabold '>All products</h2>
          <div className='flex items-center gap-3'>
            <span className='text-muted-foreground '>{productList?.length} Products</span>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="flex items-center gap-1"><ArrowUpDownIcon className='h-4 w-4' /><span>Sort by</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[200px]">
                <DropdownMenuRadioGroup value={sort} onValueChange={handleSort}>
                  {sortOptions.map((sortItem) => (
                    <DropdownMenuRadioItem key={sortItem.id} value={sortItem?.id}>{sortItem.label}</DropdownMenuRadioItem>
                  ))}
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {
            productList && productList.length > 0 ? productList.map(productItem => <ShoppingProductTile key={productItem._id} product={productItem} handleGetProductDetails={handleGetProductDetails} />) : <div>Not product Found</div>
          }
        </div>
      </div>
      <ProductDetailsDialog open={openDetailDialog} setOpen={setOpenDetailDialog} productDetails={productDetails}/>
    </div>
  )
}

export default Listing