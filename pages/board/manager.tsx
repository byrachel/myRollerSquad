import React, { useState } from "react";
import styles from "src/styles/AdminLayout.module.scss";
import CategoriesBoard from "src/components/admin/CategoriesBoard";

const CATEGORIES = 1;
const STYLES = 2;
const USERS = 3;
const EVENTS = 4;

export default function Manager() {
  const [componentToDisplay, setComponentToDisplay] = useState(CATEGORIES);

  return (
    <>
      <div className="coloredSeparator" />
      <div className={styles.adminContainer}>
        <div className={styles.adminSidebar}>
          <ul className={styles.adminSidebarNav}>
            <li>
              <div
                className={
                  componentToDisplay === CATEGORIES ? styles.active : ""
                }
                role="button"
                onClick={() => setComponentToDisplay(CATEGORIES)}
                onKeyDown={() => setComponentToDisplay(CATEGORIES)}
                tabIndex={0}
              >
                Catégories
              </div>
            </li>
            <li>
              <div
                className={componentToDisplay === STYLES ? styles.active : ""}
                role="button"
                onClick={() => setComponentToDisplay(STYLES)}
                onKeyDown={() => setComponentToDisplay(STYLES)}
                tabIndex={0}
              >
                Styles
              </div>
            </li>
            <li>
              <div
                tabIndex={0}
                className={componentToDisplay === USERS ? styles.active : ""}
                role="button"
                onClick={() => setComponentToDisplay(USERS)}
                onKeyDown={() => setComponentToDisplay(USERS)}
              >
                Utilisateurs
              </div>
            </li>
            <li>
              <div
                tabIndex={0}
                className={componentToDisplay === EVENTS ? styles.active : ""}
                role="button"
                onClick={() => setComponentToDisplay(EVENTS)}
                onKeyDown={() => setComponentToDisplay(EVENTS)}
              >
                Evénements
              </div>
            </li>
          </ul>
        </div>
        <div className={styles.adminContent}>
          <h2>{componentToDisplay}</h2>
          {componentToDisplay === CATEGORIES && <CategoriesBoard />}
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
