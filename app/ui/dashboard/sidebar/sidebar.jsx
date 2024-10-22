import styles from "./sidebar.module.css";
import MenuLink from "./menuLink/menuLink";
import Image from "next/image";

import {
    MdDashboard,
    MdSupervisedUserCircle,
    MdAttachMoney,
    MdOutlineSettings,  
    MdHelpCenter,
    MdLogout,
    MdAccountBalanceWallet,

  } from "react-icons/md";
  import { FaMoneyCheckAlt } from "react-icons/fa";
  import { CiBank } from "react-icons/ci";
import { signOut , auth } from "../../../auth";
const menuItems = [
    {
      title: "Pages",
      list: [
        {
          title: "Dashboard",
          path: "/dashboard",
          icon: <MdDashboard />,
        },
        {
          title: "Users",
          path: "/dashboard/users",
          icon: <MdSupervisedUserCircle />,
          requiredRole:["admin"],
        },
        {
          title: "Cheque",
          path: "/dashboard/cheque",
          icon: <MdAttachMoney />,
          requiredRole:["agent","admin"],
        },
        {
          title: "Emission",
          path: "/dashboard/emission",
          icon: <FaMoneyCheckAlt />,
          requiredRole:["caissier" ,"admin"],
        },
        {
          title: "Banque",
          path: "/dashboard/banque",
          icon: <CiBank  />,
          requiredRole:["admin"],
        },
        {
          title: "Compte",
          path: "/dashboard/compte",
          icon: <MdAccountBalanceWallet />,
          requiredRole:["admin"],
        },
      ], 
    },

  ];

  const Sidebar = async () => {
    const { user } = await auth();
    const role = user.isAdmin;
    //console.log(role);

    return (
        <div className={styles.container}>
            <div className={styles.user}>
                <Image  className={styles.userImage} src={user.img || "/noavatar.png"} alt="" width="50" height="50"/>
                <div className={styles.userDetail}>
          <span className={styles.username}>{user.username}</span>
          <span className={styles.userTitle}>{user.isAdmin}</span>
         
        
        </div>
            </div>
 
        <ul className={styles.list}>
            {menuItems.map((cat) => (
            <li key={cat.title}>
            <span className={styles.cat}>{cat.title}</span>
            {cat.list
        .filter(item => !item.requiredRole || item.requiredRole.some(role => user.isAdmin.includes(role)))
        .map((item) => (
          <MenuLink item={item} key={item.title} />
        ))}
          </li>
        ))}
      </ul>
      <form action = {async () =>{
        "use server";
        await signOut();
      } }>
      <button className={styles.logout}>
        <MdLogout />logout</button>
        </form>
        </div>
    )
}
export default Sidebar