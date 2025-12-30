import ReactPaginate from 'react-paginate'

const Pagination = () => {
    return (
        <div className="w-full">
            <ReactPaginate
                pageCount={10}
                pageRangeDisplayed={3}
                marginPagesDisplayed={2}
                onPageChange={(selected) => console.log(selected.selected)}
                containerClassName="flex gap-2 justify-center mt-4 flex-wrap"
                pageClassName="px-3 py-1 theme-border border rounded theme-surface theme-text-primary hover:theme-surface-hover transition-colors cursor-pointer"
                activeClassName="bg-primary-600 text-white border-primary-600 hover:bg-primary-700 theme-text-primary"
                previousClassName="px-3 py-1 theme-border border rounded theme-surface theme-text-primary hover:theme-surface-hover transition-colors cursor-pointer"
                nextClassName="px-3 py-1 theme-border border rounded theme-surface theme-text-primary hover:theme-surface-hover transition-colors cursor-pointer"
                disabledClassName="opacity-50 cursor-not-allowed"
                breakClassName="px-3 py-1 theme-text-muted"
            />
        </div>
    )
}

export default Pagination