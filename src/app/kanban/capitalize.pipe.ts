import { Pipe } from "@angular/core";


@Pipe({
    name:"capitalize"
})
export class CapitalizePipe {
    transform(word:string):string{
        return word[0].toUpperCase() + word.substring(1);
    }
}