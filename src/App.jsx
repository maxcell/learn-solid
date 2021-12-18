import { For } from "solid-js";
import { createStore } from "solid-js/store";

function TodoInput(props) {
  function onSubmit(event) {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const todoText = formData.get("todo")

    props.addTodo(todoText)

    event.currentTarget.reset()

  }

  return (
    <form onSubmit={onSubmit}>
      <label>Add todo 
        <input name="todo" type="text" />
      </label>
      <input type="submit" value="Add Todo" />
    </form>
  )
}

/**
 * {
 *  todos: {
 *    text: string;
 *    status: "complete" | "incomplete";
 *  }
 * }
 */

function TodoItem(props) {


  return (
    <li>
      <span>{props.text}</span>
      <span className={props.status}>{props.status}</span>
      <Show when={props.status === "incomplete"}>
        <button onClick={props.setComplete}>Mark as complete</button>
      </Show>
    </li>
  )
}


function App() {

  const [state, setState] = createStore({todos: []})

  function addTodo(todoText) {
    setState('todos', state.todos.length, { text: todoText, status: "incomplete" })
  }

  function setComplete(index) {
    return () => setState('todos', index, "status", "complete")
  }

  return (
    <>
      <TodoInput addTodo={addTodo}/>
      <ol>
        <For each={state.todos} fallback={<p>No todos set</p>}>
          {(todo, index) => (<TodoItem text={todo.text} status={todo.status} setComplete={setComplete(index())} />)}
        </For>
      </ol>
    </>
  );
}

export default App;
