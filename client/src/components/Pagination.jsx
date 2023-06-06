import React from 'react'

export const Pagination = ({totalPosts, itemsPerPage, setCurrentPage, currentPage}) => {

  let pages = [];

  for(let i = 1; i <= Math.ceil(totalPosts/itemsPerPage); i++) {
    pages.push(i);
  };

  const prevPage = () => {
    if(currentPage !== 1) setCurrentPage(currentPage - 1)
  };

  const nextPage = () => {
    if(currentPage !== pages) setCurrentPage(currentPage + 1)
  };

  return (
    <div>
        
        <nav className='py-2'>
    <ul className="pagination justify-content-center">
    <li className="page-item shadow-none"><a href="#" className="page-link" onClick={prevPage}>Previous</a></li>
    {pages.map((page, index) => (
        <li className={`page-item ${currentPage === page ? 'active' : ''}`} key={index}>
            <a href="#" className="page-link" onClick={() => setCurrentPage(page)}>{page}</a>
        </li>
    ))}
    <li className="page-item shadow-none"><a href="#" className="page-link" onClick={nextPage}>Next</a></li>
  </ul>
  </nav>
    </div>
  )
}


//type rfc 
