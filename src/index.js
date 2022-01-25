import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import {
    titleChanged,
    taskDeleted,
    completeTask,
    loadTasks,
    getTasksLoadingStatus,
    getTasks,
    createTask,
} from "./store/task";
import configureStore from "./store/store";
import { Provider } from "react-redux";
import { useSelector, useDispatch } from "react-redux";
import { getError } from "./store/errors";

const store = configureStore();

const App = (params) => {
    const state = useSelector(getTasks());
    const isLoading = useSelector(getTasksLoadingStatus());
    const error = useSelector(getError());
    const dispatch = useDispatch();
    const payload = {
        title: "new task",
        completed: false,
    };

    useEffect(() => {
        dispatch(loadTasks());
    }, []);

    const changeTitle = (taskId) => {
        dispatch(titleChanged(taskId));
    };

    const deleteTask = (taskId) => {
        dispatch(taskDeleted(taskId));
    };
    if (isLoading) {
        return <h1>Loading...</h1>;
    }
    if (error) {
        return <h1>{error}</h1>;
    }
    return (
        <>
            <h1>App</h1>
            <button onClick={() => dispatch(createTask(payload))}>
                Create new task
            </button>
            <ul>
                {state.map((i) => (
                    <li key={i.id}>
                        <p>{i.title}</p>
                        <p>{`Completed: ${i.completed}`}</p>
                        <button onClick={() => dispatch(completeTask(i.id))}>
                            complete
                        </button>
                        <button onClick={() => changeTitle(i.id)}>
                            Change Title
                        </button>
                        <button onClick={() => deleteTask(i.id)}>DELETE</button>
                        <hr />
                    </li>
                ))}
            </ul>
        </>
    );
};

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </React.StrictMode>,
    document.getElementById("root"),
);
