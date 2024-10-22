import styles from "../../ui/dashboard/compte/compte.module.css"
import Search from "../../ui/dashboard/search/search"
import Link from "next/link"
import Image from "next/image";
import Pagination from "../../ui/dashboard/pagination/pagination";
import { fetchComptes } from "../../lib/data"
import { deleteCompte } from "../../lib/actions";
import { auth } from "../../auth";
const ComptePage = async({searchParams}) => {
    const q = searchParams?.q || "";
    const page = searchParams?.page || 1;  
    const { count, comptes } = await fetchComptes(q, page);
    //const names = await fetchingbank(id);
    console.log(comptes);

    const session = await auth ();

    console.log("session dans compte page",session);
    console.log("isAdmin::",session.user.isAdmin);
    if (session.user.isAdmin !== "admin") {console.log("access denied");
        return null;
    };
    



    return (
        <div className={styles.container}>
            <div className={styles.top}>
            <Search placeholder="recherche compte"/>
            <Link href="/dashboard/compte/add">
            <button className={styles.addButton}> Ajouter un compte</button>
            </Link>
            </div>
            <table className={styles.table}>
            <thead>
                <tr>
                    <td>
                       num du comte
                    </td>
                    <td >
                        Compte chez 
                    </td>
                    
                </tr>
                </thead> 
            <tbody>
                {comptes.map((compte) =>(
                <tr key={compte.id}>
                    <td>
                    {compte.num} </td>
                        
                        <td>{compte.nomBanque.nom}</td>
                        <td>
                        
                            
                        <div className={styles.buttons}>
                        <form action={deleteCompte}>
                        <input type="hidden" name="id" value={compte.id}/>
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

export default ComptePage;
