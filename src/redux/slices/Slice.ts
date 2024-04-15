import { IBlog } from "../../shared/types/Blog";
import { BlogDetailsState } from "./blogDetailsSlice";

export interface State<T> {
    status: "loading" | "idle" | 'succeeded' | 'failed',
    data: T[],
    error: string
}

export interface RootState {
    blogReducer: State<IBlog>; 
    blogDetailsReducer: BlogDetailsState;
}