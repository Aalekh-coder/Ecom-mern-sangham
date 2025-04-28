import ProductimageUpload from '@/components/adminView/image_upload';
import { Button } from '@/components/ui/button';
import { addFeatureImage, getFeatureImages } from '@/store/commonSlice';
import { Heading1 } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';

const AdminDashboard = () => {

  const [imageFile, setImageFile] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [imageLoadingState, setimageLoadingState] = useState(false);
  const dispatch = useDispatch();
  const { featureImageList } = useSelector(state => state.commonFeatures);

  function handleUploadFeatureImage() {
    dispatch(addFeatureImage(uploadedImageUrl)).then((data) => {
      if (data?.payload?.success) {
        toast.success("Image Uploaded successfully")
        getFeatureImages();
        setImageFile(null);
        setUploadedImageUrl("")
      }
    })
  }

  useEffect(() => {
    dispatch(getFeatureImages())
  }, [dispatch])

  console.log(featureImageList);
  return (
    <div className='flex flex-col items-center'>
      <ProductimageUpload imageFile={imageFile} setImageFile={setImageFile} uploadedImageUrl={uploadedImageUrl} setUploadedImageUrl={setUploadedImageUrl} imageLoadingState={imageLoadingState}
        setimageLoadingState={setimageLoadingState} isCustomStyling={true} />
      <Button disabled={uploadedImageUrl} className="mt-5 w-1/2" onClick={handleUploadFeatureImage}>
        Upload
      </Button>
      <div className='flex flex-col gap-4 mt-5'>
        {featureImageList && featureImageList.length > 0 ? featureImageList.map(({ image }) => {
          return <div className="relative">
            <img src={image} className="w-full h-[300] object-cover rounded-t-lg" />

          </div>
        }) : <>hello</>}
      </div>
    </div>
  )
}

export default AdminDashboard