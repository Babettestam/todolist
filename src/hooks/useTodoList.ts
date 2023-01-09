import { useContext } from "react";
import TodoListContext, {
  TodoListContextValues,
} from "contexts/TodoListContext";

const useTodoList = (): TodoListContextValues => {
  return useContext(TodoListContext);
};

export default useTodoList;
