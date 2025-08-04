
import React from 'react'
import AdminGallary from '../../Admin/MainAdminPage/pages/Gallery/AdminGallary'

export default function Gallery() {
  return (
    <div className="text-white">
      <h2 className="fw-bold text-uppercase m-0 p-0">Imagedd Gallery</h2>
      <AdminGallary showDelete={false} />
    </div>
  )
}
