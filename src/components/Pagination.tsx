import ReactPaginate from 'react-paginate'

interface Props {
    totalPages: number
    currentPage: number
    onPageChange: (page: number) => void
}

const Pagination = ({ totalPages, currentPage, onPageChange }: Props) => {
    return (
        <div className="w-full">
            <ReactPaginate
                pageCount={totalPages}
                pageRangeDisplayed={3}
                marginPagesDisplayed={2}
                onPageChange={(selected) => onPageChange(selected.selected + 1)}
                forcePage={currentPage - 1} // <-- important: 0-based index
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

