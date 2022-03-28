
interface Thumbnails{
    projectImg:string,
    leadImg:string
}


interface Category {
    category: string,
    issues:string[]
}


export class KanbanBoard{
    
    private _key:string;
    private _type:string;
    private _lead: string;
    private _name: string;
    private _thumbnails:Thumbnails;
    private _categories:Category[];


    constructor(
        name:string, 
        key:string, 
        type:string, 
        lead:string, 
        thumbnails:Thumbnails
    ){
        this._name = name;
        this._key = key;
        this._type = type;
        this._thumbnails = thumbnails;
        this._lead = lead;
        this._categories = [
            {category:"todo", issues:[]},
            {category:"in progress", issues: []},
            {category:"done", issues:[]}
        ];
    }


    get key(){ return this._key}
    get type(){return this._type}
    get lead(){return this._lead}
    get name(){return this._name}
    get thumbnails(){return this._thumbnails}
    get categories(){return this._categories}


    set key(key:string){this._key = key}
    set type(type:string){this._type = type}
    set lead(lead:string){this._lead = lead}
    set name(name:string){this._name = name}
    set thumbnails(thumbnails:Thumbnails){this._thumbnails = thumbnails}
    set categories(categories:Category[]){this._categories = categories}

}