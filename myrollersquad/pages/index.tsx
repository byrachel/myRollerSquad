import React from "react";
import OutlineButton from "../components/buttons/OutlineButton";
import Header from "../components/header/Header";
import styles from "../styles/Home.module.scss";

export default function Home(props: any) {
  const [todo, setTodo] = React.useState(props.todo);

  const syncData = async () => {
    const { todo } = await fetch("http://localhost:3000/api/todo", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    }).then(resp => resp.json());
    setTodo(todo);
  };

  const handleUpdateTodo = async (e: any, row: any) => {
    await fetch(`/api/todo/${row.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ todo: row.todo, status: e.target.value }),
    }).then(resp => resp.json());
    syncData();
  };

  const handleDeleteTodo = async (entity: any) => {
    await fetch(`/api/todo/${entity.id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    }).then(resp => resp.json());
    syncData();
  };

  const text = "MyRollerSquad"

  return (
    <>
        <Header />
      <div className={styles.description}>
        <OutlineButton text="Se connecter" />
        <h1>texte titre</h1>
        <h2 className={styles.description_test}>Fan de Roller Quad</h2>
        <h2 className={styles.description_blue}>Fan de Roller Quad</h2>
        <h2 className={styles.description_yellow}>Fan de Roller Quad</h2>
        <h2 className={styles.description_green}>Fan de Roller Quad</h2>
        <h2 className={styles.description_grey}>{text.toUpperCase()}</h2>
        <h2 className={styles.description_text}>Ceci est un texte tout simplement. Roller Sqaud</h2>

      </div>
        
      <div className="overflow-x-auto w-full m-2">
        <table className="table border min-w-full text-sm divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="p-4 font-medium text-left text-gray-900 whitespace-nowrap">
                #
              </th>
              <th className="p-4 font-medium text-left text-gray-900 whitespace-nowrap">
                Todo
              </th>
              <th className="p-4 font-medium text-left text-gray-900 whitespace-nowrap">
                Status
              </th>
              <th className="p-4 font-medium text-left text-gray-900 whitespace-nowrap"></th>
            </tr>
          </thead>
          <tbody>
            {!todo ||
              (todo.length === 0 && (
                <tr>
                  <td colSpan={4}>
                    <div className="flex justify-center items-center w-full text-red-500">
                      No Records Found
                    </div>
                  </td>
                </tr>
              ))}
            {todo &&
              todo.map((row: any, index: any) => {
                return (
                  <tr key={row.id}>
                    <td className="sticky left-0 p-4 bg-white">{index + 1}</td>
                    <td className="p-4 text-gray-700 whitespace-nowrap">
                      <a href={`/${row.id}`}>{row.todo}</a>
                    </td>
                    <td className="p-4 text-gray-700 whitespace-nowrap">
                      <div className="form-control min-w-full">
                        <select
                          onChange={e => handleUpdateTodo(e, row)}
                          className="select select-bordered min-w-full"
                        >
                          <option selected={row.status === "New"} value="New">
                            New
                          </option>
                          <option
                            selected={row.status === "Started"}
                            value="Started"
                          >
                            Started
                          </option>
                          <option
                            selected={row.status === "Completed"}
                            value="Completed"
                          >
                            Completed
                          </option>
                        </select>
                      </div>
                    </td>
                    <td className="p-4 text-gray-700 whitespace-nowrap">
                      <button
                        className="btn btn-sm btn-warning"
                        onClick={() => handleDeleteTodo(row)}
                      >
                        delete
                      </button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </>
  );
}

export async function getServerSideProps(context: any) {
  const { todo } = await fetch("http://localhost:3000/api/todo", {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  }).then(resp => resp.json());

  return {
    props: { todo },
  };
}
