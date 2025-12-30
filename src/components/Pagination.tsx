import ReactPaginate from 'react-paginate'

const Pagination = () => {
    return (
        <div>
            <ReactPaginate
                pageCount={10}
                pageRangeDisplayed={3}
                marginPagesDisplayed={2}
                onPageChange={(selected) => console.log(selected.selected)}
                containerClassName="flex gap-2 justify-center mt-4"
                pageClassName="px-3 py-1 border rounded"
                activeClassName="bg-blue-600 text-white"
            />
        </div>
    )
}

export default Pagination