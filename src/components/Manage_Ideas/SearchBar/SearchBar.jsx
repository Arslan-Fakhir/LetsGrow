"use client"

import { Search } from "lucide-react"
import "./SearchBar.css"

const SearchBar = ({ searchQuery, setSearchQuery }) => {
  return (
    <div className="card mb-4 border-0 shadow-sm">
      <div className="card-body">
        <div className="input-group">
          <span className="input-group-text bg-white border-end-0">
            <Search size={18} />
          </span>
          <input
            type="text"
            className="form-control border-start-0"
            placeholder="Search by title, entrepreneur, or industry..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
    </div>
  )
}

export default SearchBar
