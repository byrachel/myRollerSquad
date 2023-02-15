import React from "react";
import FindACoach from "../components/homepage/FindACoach";
import Hero from "../components/homepage/Hero";
import NextEvent from "../components/homepage/NextEvent";

export default function Home(props: any) {

  // const syncData = async () => {
  //   const { todo } = await fetch("http://localhost:3000/api/todo", {
  //     method: "GET",
  //     headers: { "Content-Type": "application/json" },
  //   }).then(resp => resp.json());
  // };

  // const handleUpdateTodo = async (e: any, row: any) => {
  //   await fetch(`/api/todo/${row.id}`, {
  //     method: "PUT",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify({ todo: row.todo, status: e.target.value }),
  //   }).then(resp => resp.json());
  //   syncData();
  // };

  // const handleDeleteTodo = async (entity: any) => {
  //   await fetch(`/api/todo/${entity.id}`, {
  //     method: "DELETE",
  //     headers: { "Content-Type": "application/json" },
  //   }).then(resp => resp.json());
  //   syncData();
  // };

  return (
    <>
      <Hero />
      <FindACoach />
      <NextEvent />
    </>
  );
}
