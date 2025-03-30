import ProductimageUpload from '@/components/adminView/image_upload';
import CommonForm from '@/components/common/form';
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { addProductFormElements } from '@/config';
import { addNewProduct, fetchAllProduct } from '@/store/admin/productSlice';
import { Fragment, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import ProductTile from './ProductTile';
import AdminProductTile from './ProductTile';

const intitialFormData = {
  image: null,
  title: "",
  description: "",
  category: "",
  brand: "",
  price: "",
  salePrice: "",
  totalStock: ""

}

const AdminProduct = () => {
  const [openCreateProductDialog, setOpenCreateProductDialog] = useState(false);
  const [formData, setFormData] = useState(intitialFormData);
  const [imageFile, setImageFile] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [imageLoadingState, setimageLoadingState] = useState(false);
  const { productList } = useSelector(state => state.adminProduct)
  const dispatch = useDispatch()

  function onSubmit(e) {
    e.preventDefault();
    dispatch(addNewProduct({
      ...formData, image: uploadedImageUrl
    })).then((data) => {
      if (data?.payload?.success) {

        dispatch(fetchAllProduct())
        setImageFile(null);
        setFormData(intitialFormData)
        toast.success("Product add successfully");
        setOpenCreateProductDialog(false)
      }
    })
  }

  useEffect(() => {
    dispatch(fetchAllProduct())
  }, [dispatch])

  console.log(productList);
  return (
    <Fragment>
      <div className="mb-5 flex justify-between w-full">
        <div className='grid gap-4 md:grid-cols-3 lg:grid-flow-col-4'>{
          productList && productList.map((productItem)=> <AdminProductTile product={productItem}/>)
        }</div>
        <Button onClick={() => setOpenCreateProductDialog(true)}>Add New Product</Button>
        <Sheet open={openCreateProductDialog} onOpenChange={() => {
          setOpenCreateProductDialog(false)
        }}>
          <SheetContent side="right" className="overflow-auto">
            <SheetHeader>
              <SheetTitle>Add New Product</SheetTitle>
            </SheetHeader>
            <ProductimageUpload imageFile={imageFile} setImageFile={setImageFile} uploadedImageUrl={uploadedImageUrl} setUploadedImageUrl={setUploadedImageUrl} imageLoadingState={imageLoadingState}
              setimageLoadingState={setimageLoadingState} />
            <div className="py-6">
              <CommonForm onSubmit={onSubmit} formData={formData} setFormData={setFormData} buttonText={"Add"} formControls={addProductFormElements} />
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </Fragment>
  )
}

export default AdminProduct