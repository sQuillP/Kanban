import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, ElementRef, OnDestroy, OnInit, QueryList, Renderer2, ViewChild, ViewChildren } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { KanbanBoard } from './kanban.model';
import { KanbanService } from './kanban.service';

@Component({
  selector: 'app-kanban',
  templateUrl: './kanban.component.html',
  styleUrls: ['./kanban.component.css']
})
export class KanbanComponent implements OnInit, OnDestroy {

  // TODO: finish functionality to add issues to categories.
  //- add drag and drop features + styles.

  key:string; 
  kanbanBoard:KanbanBoard;
  selectedCategory:number = -1;
  default_category_title:string = "new category";
  showOverlay:boolean = false;
  overlayIssueIndex:number;

  private clickListener:()=>void;
  private keyListener:()=>void;

  private paramsSubscription:Subscription;


  @ViewChild("editCategory") editCategory:ElementRef;
  @ViewChild("editIssue") editIssue:ElementRef;
  @ViewChild("overlay") overlayRef:ElementRef;
  @ViewChild("overlayContent") overlayContentRef:ElementRef;
  @ViewChild("overlayInput") overlayInput:ElementRef;


  @ViewChildren("toggler") togglers:QueryList<ElementRef>;
  @ViewChildren("addRef") addIssueRefs:QueryList<ElementRef>;
  @ViewChildren("deleteRef") deleteCategoryRefs:QueryList<ElementRef>;
  
  constructor(private route:ActivatedRoute,
              private kanbanService:KanbanService,
              private renderer:Renderer2
              ) { 
    this.paramsSubscription = this.route.params.subscribe((params:Params)=>{
      this.key = params["key"];
      this.kanbanBoard = this.kanbanService.getKanbanBoard(this.key);
    }
    );
  }

  ngOnInit(): void {

    this.clickListener = this.renderer.listen("document","click",(event:Event)=>{

      const toggleAddRef:boolean = this.addIssueRefs
      .toArray()
      .some((x:ElementRef,i:number)=>{
        if(x.nativeElement.contains(event.target)){
          this.overlayIssueIndex = i
          this.showOverlay = true;
          return true;
        }
      })

      const toggleDeleteRef:boolean = this.deleteCategoryRefs.toArray().some((x:ElementRef,i:number)=>{
        
        if(x.nativeElement.contains(event.target)){
          this.onDeleteCategory(i);
          return true;
        }
      })

      //Prevent editing title when delete/add issue refs are clicked.
      if(toggleAddRef || toggleDeleteRef)
        return;

      const didToggle:boolean = this.togglers
      .toArray()
      .some((x,i)=>{ 
        if(x.nativeElement.contains(event.target)){
          this.selectedCategory = i;
          return true;
        }
      })

      const noInputClick:boolean = this.editCategory && this.editCategory.nativeElement !== event.target;

      //check if user clicked away from input or the category title togglers.
      if(!didToggle&&noInputClick){
          this.updateCategoryTitle();
      }

      const clickedAwayOverlay:boolean = this.overlayRef && !this.overlayContentRef.nativeElement.contains(event.target);
      
      //check if the user clicked away from the overlay input
      if(clickedAwayOverlay)
        this.showOverlay = false;
    });

    //detect an enter keypress to save the contents of category name.
    this.keyListener = this.renderer.listen("window","keypress",(event:KeyboardEvent)=>{

      if(event.key === "Enter" && this.showOverlay){
        console.log("firing")
        this.onAddIssue();
      }
      else if(event.key === "Enter" && this.selectedCategory !== -1){
        this.updateCategoryTitle();
      }
    })
  }


  ngOnDestroy(): void {
    this.clickListener();
    this.keyListener();
    this.paramsSubscription.unsubscribe();
  }

  updateCategoryTitle():void{
    if(this.editCategory.nativeElement.value !== "" && !/^\s+$/gi.test(this.editCategory.nativeElement.value))
        this.kanbanBoard.categories[this.selectedCategory].category = this.editCategory.nativeElement.value.substring(0,25);
    else 
      this.kanbanBoard.categories[this.selectedCategory].category = this.default_category_title;
    this.selectedCategory = -1;
    // this.kanbanService.updateKanbanBoard(this.kanbanBoard);
  }

  onAddCategory():void{
    this.kanbanBoard.categories.push({category:"new category",issues:[]});
    // this.kanbanService.updateKanbanBoard(this.kanbanBoard);
  }

  onAddIssue():void{
    const overlayInput:string = this.overlayInput.nativeElement.value;

    if(overlayInput !== "" && !/^\s+$/gi.test(overlayInput)){
      this.kanbanBoard.categories[this.overlayIssueIndex].issues.push(overlayInput);
      // this.kanbanService.updateKanbanBoard(this.kanbanBoard);
    }
    this.showOverlay = false;
  }

  
  onDeleteCategory(categoryIndex:number):void{
    this.kanbanBoard.categories.splice(categoryIndex,1);
    // this.kanbanService.updateKanbanBoard(this.kanbanBoard)
  }

  onDeleteIssue(categoryIndex:number,issueIndex:number):void{
    this.kanbanBoard.categories[categoryIndex].issues.splice(issueIndex,1);
  }


  onDrop(event:CdkDragDrop<string[]>):void{
    if(event.previousContainer === event.container){
      moveItemInArray(event.container.data,event.previousIndex, event.currentIndex);
    } else{
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex)
    }
  }
}