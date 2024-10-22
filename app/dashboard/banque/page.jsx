import styles from "../../ui/dashboard/banque/banque.module.css"
import Search from "../../ui/dashboard/search/search"
import Link from "next/link"
import Image from "next/image";
import Pagination from "../../ui/dashboard/pagination/pagination";
import { fetchBanques } from "../../lib/data"
import {deleteBanque} from "../../lib/actions";
import { auth } from "../../auth";
const BanquePage = async({searchParams}) => {
    const q = searchParams?.q || "";
    const page = searchParams?.page || 1;  
    const { count, banques } = await fetchBanques(q, page);
    
    const session = await auth ();

    //console.log("session dans banque page",session);
    //console.log("isAdmin::",session.user.isAdmin);
    if (session.user.isAdmin !== "admin") {console.log("access denied");
        return null;
    };


    return (
        <div className={styles.container}>
            <div className={styles.top}>
            <Search placeholder="recherche banque"/>
            <Link href="/dashboard/banque/add">
            <button className={styles.addButton}> Ajouter une banque</button>
            </Link>
            </div>
            <table className={styles.table}>
            <thead>
                <tr>   
                    <td>
                    nom de la banque 
                    </td>
                    <td> </td>
                    
                </tr>
                </thead> 
            <tbody>
                {banques.map((banque) =>(
                <tr key={banque.id}>
                    <td>
                        {banque.nom} </td>
                        <td>
                        <div className={styles.buttons}>
                        <form action={deleteBanque}>
                        <input type="hidden" name="id" value={banque.id}/>
                        {/*<button className={`${styles.button} ${styles.delete}`}>Supprime</button>*/}
                        </form></div>
                        
                        
                        </td>

</tr>
))}
</tbody>

</table>
<Pagination count={count}/>
</div>           
                
           
    )
}

export default BanquePage;
