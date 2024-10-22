import { fetchUser } from '../../../lib/data';
import styles from'../../../ui/dashboard/users/singleUser/singleUser.module.css';
import Image from 'next/image';
import { updateUser } from "../../../lib/actions";
  
const SingleUserPage= async({params})=>{ 
    const {id}=params;
    const user = await fetchUser(id);
    return (
<div className={styles.container}>
        <div className={styles.infoContainer}>
<div className={styles.imgContainer} >
    <Image src={user.img || "/noavatar.png"} alt="" fill />
</div>
{user.username}
</div>
<div className={styles.formContainer}>
<form action={updateUser} className={styles.form}>
<input type="hidden" name="id" value={user.id}/> 
<label>Nom et prenom</label>
<input type="username" name="username" placeholder={user.username} />
<label>email</label>
<input type="email" name="email" placeholder={user.email} />
<label>mot de passe</label>
<input type="password" name="password" placeholder='******' />
<select name="isAdmin" id="isAdmin">
                <option value="" disabled selected>rôle</option>
                <option value="admin">admin</option>
                <option value="caissier">caissier</option>
                <option value="agent">agent</option>
            </select>
            <select name="isActive" id="isActive">
                <option value={true}>actif</option>
                <option value={false}>inactif</option>
            </select>
<button className={styles.button}>mise à jour</button>
</form>
</div>
</div>

    );
};
export default SingleUserPage