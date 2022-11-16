import React from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FiShoppingCart } from "react-icons/fi";
import style from "../../styles/Home/Navbar.module.css";
import { useSelector } from "react-redux";

function Navbar() {
  const { cardQuantity } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.user);

  return (
    <section className={style.container}>
      <div className={style.wrapper}>
        <div className={style.left}>
          <span className={style.language}>EN</span>
          <div className={style.search_container}>
            <input type="text" className={style.search_input} />
            <FontAwesomeIcon
              icon={faMagnifyingGlass}
              style={{ color: `gray`, fontSize: `16px` }}
            />
          </div>
        </div>
        <div className={style.center}>
          <h1 className={style.center_logo}>
            <Link href="/">Logo</Link>
          </h1>
        </div>
        <div className={style.right}>
          <div className={style.right_menuItem}>
            {userInfo.userName ? null : <Link href="/register">Register</Link> }
          </div>
          <div className={style.right_menuItem}>
            {userInfo.userName ? (
              <Link disabled={true} href="/login">{userInfo.userName}</Link>
            ) : (
              <Link disabled={false} href="/login">LogIn</Link>
            )}
          </div>
          <div className={style.right_menuItem}>
            <Link href="/cart">
              <FiShoppingCart fontSize={"20px"} />
            </Link>
            <span className={style.menuItem_count}>{cardQuantity}</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Navbar;
