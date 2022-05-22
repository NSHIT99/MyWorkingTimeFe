import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducer/authReducer";
import commentReducer from "./reducer/commentReducer";
import myworkingtimeReducer from "./reducer/myworkingtimeReducer";
import projectReducer from "./reducer/projectReducer";
import roleReducer from "./reducer/roleReducer";
import taskReducer from "./reducer/taskReducer";
import userRuducer from "./reducer/userRuducer";
import workingtimeReducer from "./reducer/workingtimeReducer";

const reducer = {
  auth: authReducer,
  user: userRuducer,
  role: roleReducer,
  task: taskReducer,
  project: projectReducer,
  workingtime: workingtimeReducer,
  myworkingtime: myworkingtimeReducer,
  comment: commentReducer,
};

const store = configureStore({
  reducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
