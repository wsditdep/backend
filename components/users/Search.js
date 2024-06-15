"use client";

import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

const Search = () => {

    const searchParams = useSearchParams();
    const { replace } = useRouter();
    const pathname = usePathname();

    const handleSearch = useDebouncedCallback((e) => {
        const params = new URLSearchParams(searchParams);

        params.set("page", 1);

        if (e.target.value) {
            params.set("q", e.target.value);
        } else {
            params.delete("q");
        }

        replace(`${pathname}?${params}`);
    }, 300)

    const handleReset = () => {
        const params = new URLSearchParams(searchParams);
        params.delete("q");
        replace(`${pathname}?${params}`);
    }

    return (
        <div className="search-panel">
            <input
                type="text"
                placeholder="Search..."
                onChange={handleSearch}
            />
            <button className="btn btn-outline mr-4" onClick={() => handleReset()}>Reset</button>
            {/* <button className="btn btn-tertiary mr-4" onClick={handleSearch}>Inquiry</button> */}
        </div>
    )
}

export default Search