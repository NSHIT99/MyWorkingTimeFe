import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { createSelector } from "reselect";
import {
  ICreateProject,
  IProjectReq,
} from "../../interfaces/project/projectType";
import { IError } from "../../interfaces/auth/authType";
import { ITaskReq } from "../../interfaces/task/taskType";
import {
  activeProject,
  createProject,
  deleteProject,
  getProject,
  getUserNotPagging,
  inactiveProject,
} from "../actions/project";
import { getTask } from "../actions/task";
import { IUserNotPagging } from "../../interfaces/user/userType";

export interface ProjectState {
  projects: IProjectReq[];
  createProjects: ICreateProject[];
  users: IUserNotPagging[];
  progress: string;
  success: boolean;
  searchName: string;
  error: IError;
  filteredUsers: IUserNotPagging[];
  selectedMembers: IUserNotPagging[];
  tasks: ITaskReq[];
  viewTask: ITaskReq[];
  selectedTasks: ITaskReq[];
  project: ICreateProject;
}

const initialState: ProjectState = {
  projects: [],
  createProjects: [],
  users: [],
  progress: "",
  success: false,
  searchName: "",
  filteredUsers: [],
  selectedMembers: [],
  tasks: [],
  viewTask: [],
  selectedTasks: [],
  project: {
    name: "",
    code: "",
    status: 0,
    timeStart: "",
    timeEnd: "",
    note: "",
    projectType: 0,
    tasks: [
      {
        taskId: 0,
        billable: false,
        id: 0,
      },
    ],
    users: [
      {
        userId: 0,
        type: 0,
        id: 0,
      },
    ],
    projectTargetUsers: [
      {
        userId: 0,
        roleName: "",
        id: 0,
      },
    ],
    isAllUserBelongTo: false,
    id: 0,
  },
  error: {
    code: 0,
    details: "",
    validationErrors: {},
    message: "",
  },
};

const projectSlice = createSlice({
  name: "project",
  initialState,
  reducers: {
    resetProgress(state) {
      state.progress = "";
    },
    resetSuccess(state) {
      state.success = false;
    },
    resetMessage(state) {
      state.error.message = "";
    },
    filter: (state, action) => {
      state.filteredUsers = state.users.filter(
        (user) =>
          (action.payload.branch === "All" ||
            user.branch === action.payload.branch) &&
          (action.payload.type === "All" || user.type === action.payload.type)
      );
    },
    pushTask: (state, action: PayloadAction<ITaskReq>) => {
      state.selectedTasks.push(action.payload);
      state.viewTask = state.viewTask.filter(
        (task) => task.id !== action.payload.id
      );
    },
    removeTask: (state, action: PayloadAction<ITaskReq>) => {
      state.selectedTasks = state.selectedTasks.filter(
        (task) => task.id !== action.payload.id
      );
      state.viewTask.push(action.payload);
    },
    updateMemberType: (state, action: PayloadAction<IUserNotPagging>) => {
      state.selectedMembers = state.selectedMembers.map((member) => {
        if (member.id === action.payload.id) {
          member.projectType = action.payload.type;
        }
        return member;
      });
    },
    updateBillable: (state, action: PayloadAction<ITaskReq>) => {
      state.viewTask = state.viewTask.map((task) => {
        if (task.id === action.payload.id) {
          task.billable = action.payload.billable;
        }
        return task;
      });
    },
    pushMember: (state, action: PayloadAction<IUserNotPagging>) => {
      state.selectedMembers.push(action.payload);
      state.filteredUsers = state.filteredUsers.filter(
        (user) => user.id !== action.payload.id
      );
    },
    removeMember: (state, action: PayloadAction<IUserNotPagging>) => {
      state.selectedMembers = state.selectedMembers.filter(
        (user) => user.id !== action.payload.id
      );
      state.filteredUsers.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProject.pending, (state, action) => {
        state.progress = "pending";
      })
      .addCase(getProject.fulfilled, (state, action) => {
        state.progress = "done";
        state.projects = action.payload.result;
      })
      .addCase(getProject.rejected, (state, action) => {
        state.progress = "error";
      });
    builder
      .addCase(createProject.pending, (state, action) => {
        state.progress = "pending";
      })
      .addCase(createProject.rejected, (state, action) => {
        state.progress = "error";
      });
    builder
      .addCase(getTask.fulfilled, (state, action) => {
        state.tasks = action.payload.result;
        state.viewTask = action.payload.result;
      })
      .addCase(getTask.pending, (state, action) => {
        state.progress = "pending";
      });
    builder.addCase(createProject.fulfilled, (state, action) => {
      state.progress = "done";
      const findProject = state.createProjects.find(
        (project) => project.id === action.payload.result.id
      );
      if (findProject) {
        state.createProjects = state.createProjects.map((project) => {
          if (project.id === action.payload.result.id) {
            project.name = action.payload.result.name;
            project.code = action.payload.result.code;
            project.timeStart = action.payload.result.timeStart;
            project.timeEnd = action.payload.result.timeEnd;
            project.note = action.payload.result.note;
            project.isAllUserBelongTo = action.payload.result.isAllUserBelongTo;
            project.projectType = action.payload.result.projectType;
            project.users = action.payload.result.users;
            project.tasks = action.payload.result.tasks;
          }
          return project;
        });
      } else {
        state.createProjects.push(action.payload.result);
      }
    });
    builder
      .addCase(activeProject.pending, (state, action) => {
        state.progress = "pending";
      })
      .addCase(activeProject.rejected, (state, action) => {
        state.progress = "error";
      })
      .addCase(activeProject.fulfilled, (state, action) => {
        state.progress = "done";
        if (action.payload.id) {
          state.projects = state.projects.map((project) => {
            if (project.id === action.payload.id) {
              project.status = 0;
            }
            return project;
          });
        }
      });
    builder
      .addCase(inactiveProject.pending, (state, action) => {
        state.progress = "pending";
      })
      .addCase(inactiveProject.rejected, (state, action) => {
        state.progress = "error";
      })
      .addCase(inactiveProject.fulfilled, (state, action) => {
        state.progress = "done";
        if (action.payload.id) {
          state.projects = state.projects.map((project) => {
            if (project.id === action.payload.id) {
              project.status = 1;
            }
            return project;
          });
        }
      });
    builder
      .addCase(deleteProject.pending, (state, action) => {
        state.progress = "pending";
      })
      .addCase(deleteProject.fulfilled, (state, action) => {
        state.progress = "done";
        state.error = action.payload.error;
        if (state.error === null) {
          state.projects = state.projects.filter(
            (project) => project.id !== action.payload.id
          );
        } else {
          state.error.message = action.payload.error.message;
        }
      });
    builder
      .addCase(getUserNotPagging.pending, (state, action) => {
        state.progress = "pending";
      })
      .addCase(getUserNotPagging.fulfilled, (state, action) => {
        state.users = action.payload.result;
        state.filteredUsers = action.payload.result;
      })
      .addCase(getUserNotPagging.rejected, (state, action) => {
        state.progress = "error";
      });
  },
});

const selectSelf = (state: RootState) => state.project;
const getAllProjectSelector = createSelector(
  selectSelf,
  (state) => state.projects
);

const getAllProjectStatus0 = createSelector(getAllProjectSelector, (projects) =>
  projects.filter((projects) => projects.status === 0)
);
const getAllProjectStatus1 = createSelector(getAllProjectSelector, (projects) =>
  projects.filter((projects) => projects.status === 1)
);

export const projectSelector = {
  getAllProjectSelector,
  getAllProjectStatus0,
  getAllProjectStatus1,
};

export const {
  resetProgress,
  resetSuccess,
  resetMessage,
  filter,
  pushTask,
  removeTask,
  updateMemberType,
  updateBillable,
  pushMember,
  removeMember,
} = projectSlice.actions;

export default projectSlice.reducer;
