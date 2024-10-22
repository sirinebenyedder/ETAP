import styles from "../../ui/dashboard/cheque/cheque.module.css";
import Search from "../../ui/dashboard/search/search";
import Pagination from "../../ui/dashboard/pagination/pagination";
import { fetchChequeEmis } from "../../lib/data";
import Image from "next/image"
import Link from "next/link"
//import { annulation } from "../../lib/actions";
const EmissionPage = async({searchParams}) => {     
    const q = searchParams?.q || "";
    const page = searchParams?.page || 1;  
    const { conteurs, chequeEmi } = await fetchChequeEmis(q, page);

    //console.log(chequeEmi);
    return (
    <div className={styles.container}>
        <div className={styles.top}>
        <Search placeholder="recherche sur cheque"/>
        
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
                        Date Valeur
                    </td>
                    <td>Action</td>
                </tr>
                </thead> 
                <tbody>
                {chequeEmi.map((cheque) =>(
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
                    <td>{cheque.datevaleur.toString().slice(4, 16)}</td>
                    
                    <td>
                    <div className={styles.buttons}>
                    <Link href={`/dashboard/emission/${cheque.id}`}>
                    <button className={`${styles.button} ${styles.view}`}> Voir </button></Link>
                    </div>
                   
                    </td>

                </tr>
                ))}
                </tbody>
            
        </table>
        <Pagination count={conteurs}/>
        </div>
    )
}

export default EmissionPage;