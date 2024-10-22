import styles from "../../ui/dashboard/cheque/cheque.module.css"
import Search from "../../ui/dashboard/search/search"
import Link from "next/link"
import Image from "next/image"
import Pagination from "../../ui/dashboard/pagination/pagination"
import { fetchCheques } from "../../lib/data"
import { annulation } from "../../lib/actions"; 

const ChequePage = async ({searchParams}) => {
    const q = searchParams?.q || "";
    const page = searchParams?.page || 1;  
    const { count, cheques } = await fetchCheques(q, page);

    return (
        <div className={styles.container}>
        <div className={styles.top}>
        <Search placeholder="recherche sur cheque"/>
        <Link href="/dashboard/cheque/add">
        <button className={styles.addButton}> Ajouter un cheque</button>
        </Link>
        </div>
        <table className={styles.table}>
            <thead>
                <tr>
                    <td>
                        Title
                    </td>
                    <td>
                    Bénéficiaire
                    </td>
                    <td>
                      Type 
                    </td>
                    <td>
                        Montant
                    </td>
                    <td>
                       Creé le  
                    </td>

                    <td>
                        Etat
                    </td>
                    <td>Action</td>
                </tr>
                </thead> 
                <tbody>
                {cheques.map((cheque) =>(
                <tr key={cheque.id}>
                    <td>
                        <div className={styles.product}>
                            <Image src={cheque.img || "/noproduct.jpg"} alt="" width={40} height={40} className={styles.productImage}/>
                            {cheque.title}
                        </div>
                    </td>
                    <td>{cheque.beneficiary}</td>
                    <td>{cheque.type}</td>
                    <td>{cheque.montant}DT</td>
                    <td>{cheque.createdAt?.toString().slice(4, 16)}</td>
                    <td>{cheque.etat}</td>
                    
                    <td>
                    <div className={styles.buttons}>
                    <Link href={`/dashboard/cheque/${cheque.id}`}>
                    <button className={`${styles.button} ${styles.view}`}> Voir </button></Link>
                    {cheque.etat !="émis" && cheque.etat !="annulé" && (
                    <form action={annulation}>
                    <input type="hidden" name="id" value={cheque.id}/>
                    <button className={`${styles.button} ${styles.delete}`}>Annule</button> </form>)}</div>
                    </td>

                </tr>
                ))}
                </tbody>
            
        </table>
        <Pagination count={count}/>
        </div>
    )
}

export default ChequePage