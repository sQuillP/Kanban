import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { KanbanBoard } from '../kanban/kanban.model';
import { KanbanService } from '../kanban/kanban.service';
import faker from "faker";

@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.css']
})
export class CreateProjectComponent implements OnInit {

  id:number;


  createKanban:FormGroup;

  idError:string;

  nameError:string;

  invalidForm:boolean = false;

  constructor(private router:Router, 
              private kanbanService:KanbanService) {
   }

  ngOnInit(): void {
    this.createKanban = new FormGroup({
      "kanban-name": new FormControl(null,[Validators.required,Validators.maxLength(15)]),
      "kanban-id":new FormControl(null,[Validators.required,Validators.maxLength(6)]),
      "type": new FormControl(null,[Validators.required,Validators.maxLength(30)]),
      "lead": new FormControl(null, [Validators.required,Validators.maxLength(30)])
    });

    this.createKanban.statusChanges.subscribe((status)=>{
      console.log(status);
    })
  }


  onNavigateBack():void{
    this.router.navigate(["../"]);
  }


  onHandleIdErrors():boolean{
    if(this.createKanban.get("kanban-id").errors){
      if(this.createKanban.get("kanban-id").errors["maxlength"]){
        this.idError = "ID must by less than 6 characters";
        return true;
      }
    }
    return false;
  }

  onHandleNameErrors():boolean{
    if(this.createKanban.get("kanban-name").errors){
      if(this.createKanban.get("kanban-name").errors["maxlength"]){
        this.nameError = "Name must be less than 16 characters";
        return true;
      }
    }
    return false;
  }

  onNameError(name:string):boolean{
    if(this.createKanban.get(name).errors && this.createKanban.get(name).errors['maxlength'])
      return true;
    return false;
  }


  onCreateKanban():void{
    const kanbanName:string = this.createKanban.get("kanban-name").value;
    const kanbanKey:string = this.createKanban.get("kanban-id").value;
    if(this.createKanban.valid){
      this.kanbanService.createKanbanBoard(new KanbanBoard(
        kanbanName,
        kanbanKey,
        "Software Development",
        "William Pattison",
        {projectImg: faker.image.image(200,200,true), leadImg: faker.image.image(200,200,true)}
        ));
        this.router.navigate(["kanban",kanbanKey])
    } else {
      this.invalidForm = true;
    }
  }

}
