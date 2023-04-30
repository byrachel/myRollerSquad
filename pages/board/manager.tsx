import React, { useState } from "react";
import styles from "src/styles/AdminLayout.module.scss";
import CategoriesBoard from "src/components/admin/CategoriesBoard";
import PlacesBoard from "@/components/admin/PlacesBoard";

const CATEGORIES = 1;
const STYLES = 2;
const USERS = 3;
const PLACES = 4;

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
                className={componentToDisplay === PLACES ? styles.active : ""}
                role="button"
                onClick={() => setComponentToDisplay(PLACES)}
                onKeyDown={() => setComponentToDisplay(PLACES)}
              >
                Business
              </div>
            </li>
          </ul>
        </div>
        <div className={styles.adminContent}>
          {componentToDisplay === CATEGORIES && <CategoriesBoard />}
          {componentToDisplay === PLACES && <PlacesBoard />}
        </div>
      </div>
    </>
  );
}
