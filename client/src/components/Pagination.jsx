import React from 'react'

export const Pagination = ({totalPosts, itemsPerPage, setCurrentPage, currentPage}) => {
''
  let pages = [];

  for(let i = 1; i <= Math.ceil(totalPosts/itemsPerPage); i++) {
    pages.push(i);
  }

  return (
    <div>
        
        <nav>
    <ul className="pagination justify-content-center">
    <li className="page-item"><a className="page-link">Previous</a></li>
    {pages.map((page, index) => (
        <li className={`page-item ${currentPage === page ? 'active' : ''}`} key={index}>
            <a href="#" className="page-link" onClick={() => setCurrentPage(page)}>{page}</a>
        </li>
    ))}

    
  </ul>
  </nav>
    </div>
  )
}


//type rfc 
//<li className="page-item"><a className="page-link" onClick={prevPage}>Previous</a></li>
//<li className="page-item"><a className="page-link" onClick={nextPage}>Next</a></li>