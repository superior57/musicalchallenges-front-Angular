import {Pipe, PipeTransform} from '@angular/core';

// @Pipe({name: 'highlightPipe'})
// export class HighlightPipe implements PipeTransform{

//   transform(text:string, filter:string) : any{
//     if(filter){
//       text = text.replace(new RegExp('('+filter+')', 'gi'), '<b class="highlight">$1</b>');
//     }
    
//     return text;
//   }
// }
 

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {
  public transform(value, keys: string, term: string) {

    if (!term) return value;
    return (value || []).filter((item) => keys.split(',').some(key => item.hasOwnProperty(key) && new RegExp(term, 'gi').test(item[key])));

  }
}