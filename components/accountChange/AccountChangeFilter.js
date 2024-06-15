"use client";

import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

const AccountChangeFilter = () => {

    const searchParams = useSearchParams();
    const { replace } = useRouter();
    const pathname = usePathname();

    const handleSearch = useDebouncedCallback((e) => {
        const params = new URLSearchParams(searchParams);

        params.set("sortByType", "all");

        if (e.target.value === "all") {
            params.delete("sortByType");
            return replace(`${pathname}?${params}`);
        }

        if (e.target.value) {
            params.set("sortByType", e.target.value);
        } else {
            params.delete("sortByType");
        }

        replace(`${pathname}?${params}`);
    }, 300)

    return (
        <div className="search-panel">
            <select onChange={(e) => handleSearch(e)}>
                <option value="all">Sort product by type - all</option>
                <option value="credit">Credit</option>
                <option value="debit">Debit</option>
                <option value="orderCommision">Order Commission</option>
                <option value="withdrawal">Withdrawal</option>
            </select>
        </div>
    )
}

export default AccountChangeFilter;