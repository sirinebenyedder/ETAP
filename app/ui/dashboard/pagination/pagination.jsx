"use client";
import styles from "./pagination.module.css"
import { usePathname, useRouter, useSearchParams } from "next/navigation"

const Pagination = ({ count })=>{ 
    const searchParams = useSearchParams();
    const { replace } = useRouter();
    const pathname = usePathname();

    const page = searchParams.get("page") || 1;

    const params = new URLSearchParams(searchParams);

    
    const ITEM_PAGE = 10;

    //2 variables pour activer et desactiver les boutons 

     const hasPrev = ITEM_PAGE * (parseInt(page) -1) > 0
     const hasnext = ITEM_PAGE * (parseInt(page) -1) + ITEM_PAGE < count;

     const handleChangePage = (type) =>{
        type==="prev" ?params.set("page",parseInt(page)-1):params.set("page",parseInt(page)+1);
        replace(`${pathname}?${params}`);
     };
    return (
    <div className={styles.container}>
<button className={styles.button} disabled={!hasPrev} onClick={()=>handleChangePage("prev")}>precedent</button>
<button className={styles.button} disabled={!hasnext} onClick={()=>handleChangePage("next")}>suite</button>
    </div>
    )
}

export default Pagination;