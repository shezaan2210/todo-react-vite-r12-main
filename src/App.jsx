import { useState } from "react";

const App = () => {
    const [title, settitle] = useState("");
    const [tasks, settasks] = useState([]);
    const TaskSubmitHandler = (e) => {
        e.preventDefault();

        settasks([...tasks, { title: title, completed: false }]);
        settitle("");
    };

    const DeleteHandler = (i) => {
        const copyTasks = [...tasks];

        let isValid = false;
        if (!copyTasks[i].completed) {
            isValid = confirm("Do you really Want to delete this Task ?");
        }

        if (isValid || copyTasks[i].completed) {
            copyTasks.splice(i, 1);
            settasks(copyTasks);
        }

        // settasks(tasks.filter((task,index) => index !== i))
    };

    const CompleteTaskToggle = (i) => {
        const copyTasks = [...tasks];
        copyTasks[i].completed = !tasks[i].completed;
        settasks(copyTasks);
    };

    let tasksrender = (
        <h1 className="text-center text-orange-500 font-extrabold text-2xl">
            No pending Tasks...
        </h1>
    );
    if (tasks.length > 0) {
        tasksrender = tasks.map((task, index) => {
            return (
                <li
                    key={index}
                    className="mb-5 flex justify-between items-center border rounded-xl p-5"
                >
                    <div className="flex items-center">
                        <div
                            onClick={() => CompleteTaskToggle(index)}
                            className={`${
                                task.completed ? "bg-green-500" : "border"
                            } mr-4 rounded-full w-[30px] h-[30px]  border-orange-600`}
                        ></div>
                        <h1
                            className={`${
                                task.completed && "line-through"
                            } text-2xl font-extrabold text-yellow-100`}
                        >
                            {task.title}
                        </h1>
                    </div>
                    <div className="flex gap-3 text-2xl text-yellow-100">
                        <i className="ri-file-edit-line"></i>
                        <i
                            onClick={() => DeleteHandler(index)}
                            className="ri-delete-bin-3-line"
                        ></i>
                    </div>
                </li>
            );
        });
    }

    return (
        <div className="overflow-x-hidden border-t-2 w-screen min-h-[100vh] bg-zinc-800 flex  items-center flex-col">
            <div className="mt-[7%] w-[35%] h-[30vh] border rounded-3xl flex justify-around items-center">
                <div className="text-yellow-100">
                    <h1 className="text-3xl font-bold">LETS TODO</h1>
                    <p>Keeps doing things</p>
                </div>
                <div className="text-3xl font-extrabold flex justify-center items-center w-[10vmax] h-[10vmax] rounded-full bg-orange-600">
                    {tasks.filter((t) => t.completed === true).length}/
                    {tasks.length}
                </div>
            </div>
            {/*  */}
            <form
                onSubmit={TaskSubmitHandler}
                className="w-[35%] flex justify-between px-5 my-[2%]"
            >
                <input
                    onChange={(e) => settitle(e.target.value)}
                    value={title}
                    placeholder="write your next task..."
                    className="px-5 py-2 text-yellow-100 outline-none w-[80%] rounded-xl bg-zinc-700 "
                    type="text"
                />
                <button className="outline-none text-4xl font-extrabold flex justify-center items-center w-[5vmax] h-[5vmax] rounded-full bg-orange-600">
                    <i className="ri-add-fill"></i>
                </button>
            </form>
            {/*  */}
            <ul className="list-none w-[35%] ">{tasksrender}</ul>
        </div>
    );
};

export default App;
