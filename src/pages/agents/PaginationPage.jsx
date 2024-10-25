import { useState } from 'react';
import Pagination from './Pagination';
import { useSelector } from 'react-redux';

const PaginationHandler = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const totalItems = 100;

  const handlePageChange = (page) => {
    setCurrentPage(page);
    console.log('Current Page:', currentPage);
  };

  const isModal2Shown = useSelector(state => state.portal.isProfileModalOpen);
  const isEdit2ModalShown = useSelector(state => state.portal.isProfileHandlerOpen);

  return <div className={`mt-4 fixed bottom-1 flex justify-end ${isModal2Shown || isEdit2ModalShown? 'w-[65%]' : 'w-[82%]'}`}>
      <Pagination
        totalItems={totalItems}
        itemsPerPage={itemsPerPage}
        onPageChange={handlePageChange}
      />
    </div>
};

export default PaginationHandler;
