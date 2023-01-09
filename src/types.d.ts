export interface ListItem {
  name: string;
  id: string;
}

export interface TodoItem {
  id: string;
  name: string;
  // priority: number;
  listId: ListItem["id"];
}
