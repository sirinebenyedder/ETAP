import styles from "../../ui/dashboard/users/users.module.css"
import Search from "../../ui/dashboard/search/search"
import Link from "next/link"
import Image from "next/image"
import Pagination from "../../ui/dashboard/pagination/pagination"
import { fetchUsers } from "../../lib/data"
import { deleteUser } from "../../lib/actions"
import { auth } from "../../auth";
const UsersPage = async({searchParams}) => {
    const q = searchParams?.q || "";
    const page = searchParams?.page || 1;  
    const { count, users } = await fetchUsers(q, page);

    const session = await auth ();
    console.log("session dans users page",session);
    console.log("isAdmin::",session.user.isAdmin);
    if (session.user.isAdmin !== "admin") {console.log("access denied");
        return null;
    };
    




    return (
        <div className={styles.container}>
            <div className={styles.top}>
            <Search placeholder="recherche sur utilisateur"/>
            <Link href="/dashboard/users/add">
            <button className={styles.addButton}> Ajouter un utilisateur</button>
            </Link>
            </div>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <td>
                            Name
                        </td>
                        <td>
                          Email  
                        </td>
                        <td>
                           created at 
                        </td>
                        <td>
                            role
                        </td>
                        <td>
                            status
                        </td>
                        <td>Actions</td>
                    </tr>
                    </thead>  
                    <tbody>
                        {users.map((user) => (
                    <tr key={user.id}>
                        <td>
                            <div className={styles.user}>
                                <Image src={user.img || "/noavatar.png"} alt="" width={40} height={40} className={styles.userImage}/>
                                {user.username}
                                </div>
                        </td>
                        <td>{user.email}</td>
                        <td>{user.createdAt?.toString().slice(4, 16)}</td>
                        <td>{user.isAdmin}</td>
                        <td>{user.isActive ? "active" : "passive"}</td>
                        <td>
                        <div className={styles.buttons}>
                        <Link href={`/dashboard/users/${user.id}`}>
                        <button className={`${styles.button} ${styles.view}`}> voir </button></Link>
                        <form action={deleteUser}>
                        <input type="hidden" name="id" value={user.id}/>
                        <button className={`${styles.button} ${styles.delete}`}>Supprime</button></form></div>
                        
                        </td>   

                    </tr>
                    ))}
                    </tbody>
                
            </table>
             <Pagination count={count} />
            </div>
    )
}

export default UsersPage
