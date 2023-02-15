export default class Store {
  todoList: {
    id: number;
    todo: string;
    status: string;
  }[];
  constructor() {
    this.todoList = [{ id: 20, todo: "learn React.js", status: "New" }];
  }

  get(id: string) {
    const entity = this.todoList.find((item: any) => item.id === parseInt(id));
    return entity;
  }

  add(entity: any) {
    const record = { ...entity, id: this.todoList.length + 1 };
    this.todoList.push(record);
    return record;
  }
  update(id: string, entity: any) {
    const indexById = this.todoList.findIndex(
      (item: any) => item.id === parseInt(id)
    );
    this.todoList[indexById] = { ...this.todoList[indexById], ...entity };
    return this.todoList[indexById];
  }
  delete(id: string) {
    const indexById = this.todoList.findIndex(
      (item: any) => item.id === parseInt(id)
    );
    const resp = this.todoList.splice(indexById, 1);
    return resp;
  }
}
