import { Component, ElementRef, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { KanbanBoard } from "../kanban/kanban.model";
import { KanbanService } from "../kanban/kanban.service";



@Component({
    selector:"app-home",
    templateUrl: "./home.component.html",
    styleUrls:["home.component.css"]
})
export class HomeComponent{
    
    kanbanBoards:KanbanBoard[];

    @ViewChild("editRef") editRef:ElementRef;
    @ViewChild("deleteRef") deleteRef:ElementRef;
    @ViewChild("EditContainerRef") editContainerRef:ElementRef;



    constructor(private router:Router, private kanbanService:KanbanService){
        // this.kanbanService.kanbansSubject.subscribe((kanbanBoards:KanbanBoard[])=>{
        //     this.kanbanBoards = kanbanBoards;
        // });
        this.kanbanBoards = this.kanbanService.getKanbanBoards();
    }


    onCreateNewProject():void{
        this.router.navigate(["new-project"]);
    }


    onEditKanban():void{

    }

    
}