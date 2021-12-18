import { createSignal, createEffect, For } from "solid-js";

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

  const [todos, setTodos] = createSignal([])

  function addTodo(todoText) {
    setTodos(todos => [...todos, { text: todoText, status: "incomplete" }])
  }

  function setComplete(index) {
    return () => setTodos(todos => [
      ...todos.slice(0, index), 
      {...todos[index], status: "complete"},
      ...todos.slice(index+1)
    ])
  }

  createEffect(() => console.log(todos()))

  return (
    <>
      <TodoInput addTodo={addTodo}/>
      <ol>
        <For each={todos()} fallback={<p>No todos set</p>}>
          {(todo, index) => (<TodoItem text={todo.text} status={todo.status} setComplete={setComplete(index())} />)}
        </For>
      </ol>
    </>
  );
}

export default App;
