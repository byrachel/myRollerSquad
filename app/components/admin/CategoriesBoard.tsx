import { UserContext } from "app/context/UserContext";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";

interface Props {
  token: string | null;
}

interface CategoryInterface {
  id: number;
  name: string;
}

export default function CategoriesBoard({ token }: Props) {
  const [categories, setCategories] = useState([]);
  const { userState } = useContext(UserContext);
  const isAdmin = userState.user && userState.user.role === "ADMIN";

  useEffect(() => {
    if (token && isAdmin) {
      console.log("test");
      axios({
        method: "get",
        url: "/api/admin/categories",
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      })
        .then(res => setCategories(res.data.categories))
        .catch(err => console.log(err));
    }
  }, [token, isAdmin]);

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
