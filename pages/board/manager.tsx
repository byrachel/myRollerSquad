import React, { useEffect, useState } from "react";
import styles from "app/styles/AdminLayout.module.scss";
import CategoriesBoard from "@/components/admin/CategoriesBoard";

const CATEGORIES = 1;
const STYLES = 2;
const USERS = 3;
const EVENTS = 4;

export default function Manager() {
  const [token, setToken] = useState<string | null>(null);
  const [componentToDisplay, setComponentToDisplay] = useState(CATEGORIES);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setToken(token);
  }, []);

  return (
    <>
      <div className="coloredSeparator" />
      <div className={styles.adminContainer}>
        <div className={styles.adminSidebar}>
          <ul className={styles.adminSidebarNav}>
            <li
              className={componentToDisplay === CATEGORIES ? styles.active : ""}
              role="button"
              onClick={() => setComponentToDisplay(CATEGORIES)}
            >
              Catégories
            </li>
            <li
              className={componentToDisplay === STYLES ? styles.active : ""}
              role="button"
              onClick={() => setComponentToDisplay(STYLES)}
            >
              Styles
            </li>
            <li
              className={componentToDisplay === USERS ? styles.active : ""}
              role="button"
              onClick={() => setComponentToDisplay(USERS)}
            >
              Utilisateurs
            </li>
            <li
              className={componentToDisplay === EVENTS ? styles.active : ""}
              role="button"
              onClick={() => setComponentToDisplay(EVENTS)}
            >
              Evénements
            </li>
          </ul>
        </div>
        <div className={styles.adminContent}>
          <h2>{componentToDisplay}</h2>
          {componentToDisplay === CATEGORIES && (
            <CategoriesBoard token={token} />
          )}
        </div>
      </div>
    </>
  );
}

// export async function getStaticProps() {
//   const result = await axios.get("http://localhost:3000/api/admin/categories");
//   const data = result.data.categories;
//   return {
//     props: {
//       data,
//     },
//   };
// }
