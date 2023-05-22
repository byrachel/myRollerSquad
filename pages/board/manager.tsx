import React, { useState } from "react";
import styles from "src/styles/AdminLayout.module.scss";
import CategoriesBoard from "client/components/admin/CategoriesBoard";
import PlacesBoard from "client/components/admin/PlacesBoard";
import { withSessionSsr } from "@/server/middleware/auth/withSession";
import { UserStateInterface } from "client/reducers/UserReducer";

const CATEGORIES = 1;
const STYLES = 2;
const USERS = 3;
const PLACES = 4;

interface Props {
  user: UserStateInterface;
}

export default function Manager({ user }: Props) {
  const [componentToDisplay, setComponentToDisplay] = useState(CATEGORIES);
  const isAdmin = user.id && user.role === "ADMIN";

  return isAdmin ? (
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
          {componentToDisplay === CATEGORIES && <CategoriesBoard user={user} />}
          {componentToDisplay === PLACES && <PlacesBoard user={user} />}
        </div>
      </div>
    </>
  ) : null;
}

export const getServerSideProps = withSessionSsr(async ({ req }) => {
  const user = req.session as any;
  return {
    props: user,
  };
});
