import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducer/authReducer";
import projectReducer from "./reducer/projectReducer";
import roleReducer from "./reducer/roleReducer";
import taskReducer from "./reducer/taskReducer";
import userRuducer from "./reducer/userRuducer";

const reducer = {
  auth: authReducer,
  user: userRuducer,
  role: roleReducer,
  task: taskReducer,
  project: projectReducer,
};

const store = configureStore({
  reducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
