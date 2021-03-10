import { Service } from "typedi";
import {State} from "../enum/state";

@Service()
export class StateService {
    
    private nextState = new Map<State, State[]>();

    constructor() {
        //define next posible states
        this.nextState.set(State.TODO,        [State.TODO, State.IN_PROGRESS]);
        this.nextState.set(State.IN_PROGRESS, [State.IN_PROGRESS, State.IN_QA, State.BLOCKED]);
        this.nextState.set(State.IN_QA,       [State.IN_QA, State.TODO, State.DONE]);
        this.nextState.set(State.DONE,        [State.DONE, State.DEPLOYED]);
        this.nextState.set(State.BLOCKED,     [State.BLOCKED, State.TODO]);
    }

    isValidState(currentState: State, nextState: State) {

        const values = this.nextState.get(currentState);
        if (values) {
            return values.indexOf(nextState) > -1

        }
        return false;
    }

}   