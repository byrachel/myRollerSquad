import { UserContext } from "src/context/UserContext";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";

interface CategoryInterface {
  id: number;
  name: string;
}

export default function CategoriesBoard() {
  const [categories, setCategories] = useState([]);
  const { userState } = useContext(UserContext);
  const isAdmin = userState.isLoggedIn && userState.role === "ADMIN";

  console.log("is admin >", isAdmin);

  useEffect(() => {
    if (isAdmin) {
      axios({
        method: "get",
        url: `/api/admin/categories`,
        withCredentials: true,
      })
        .then(res => setCategories(res.data.categories))
        .catch(err => console.log(err));
    }
  }, [isAdmin]);

  return (
    <div>
      <h2>Catégories</h2>
      <ul>
        {categories.map((category: CategoryInterface) => (
          <li key={category.id}>
            {category.id} : {category.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
