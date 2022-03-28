import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { KanbanBoard } from "./kanban.model";
import faker from "faker";

@Injectable({
    providedIn:"root"
})
export class KanbanService{

    // kanbansSubject = new Subject<KanbanBoard[]>();

    private kanbanBoards:KanbanBoard[] = [
        new KanbanBoard("My Project",
            "DP",
            "Software Engineering",
            "Leif Erikson",
            {
                projectImg: faker.image.image(300,300,true), 
                leadImg: faker.image.image(300,300,true)
            }
        )
    ];


    constructor(){}

    createKanbanBoard(kanbanBoard:KanbanBoard):void{
        this.kanbanBoards.push(kanbanBoard);
        // this.kanbansSubject.next(this.kanbanBoards);
    }

    getKanbanBoards():KanbanBoard[]{
        return this.kanbanBoards;
    }

    getKanbanBoard(key:string):KanbanBoard{
        return this.findKanbanBoard(key);
    }


    private findKanbanBoard(key:string):KanbanBoard{
        for(let i = 0; i<this.kanbanBoards.length; i++)
            if(key === this.kanbanBoards[i].key)
                return this.kanbanBoards[i];
        return null;
    }


    // updateKanbanBoard(kanban:KanbanBoard){
    //     let currentKanbanBoard = this.findKanbanBoard(kanban.key);
    //     currentKanbanBoard = kanban;
    //     // this.kanbansSubject.next(this.kanbanBoards.slice());
    //     console.log("from kanbanService (updated kanban boards)",this.kanbanBoards);
    // }


}