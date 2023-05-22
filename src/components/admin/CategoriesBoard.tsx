import React, { useEffect, useState } from "react";
import axios from "axios";
import { UserStateInterface } from "src/reducers/UserReducer";

interface CategoryInterface {
  id: number;
  name: string;
}

interface Props {
  user: UserStateInterface;
}

export default function CategoriesBoard({ user }: Props) {
  const [categories, setCategories] = useState([]);
  const isAdmin = user.id && user.role === "ADMIN";

  useEffect(() => {
    if (isAdmin) {
      axios({
        method: "get",
        url: `/api/admin/categories`,
        withCredentials: true,
      })
        .then((res) => setCategories(res.data.categories))
        .catch((err) => console.log(err));
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
