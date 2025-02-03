import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  templateUrl: './dynamic-page.component.html',
  styles: ``
})
export class DynamicPageComponent {

  public myForm: FormGroup ;

  public newFavorite: FormControl = new FormControl('',Validators.required)


  constructor(private fb: FormBuilder) {

    this.myForm = this.fb.group({
      name: ['',[Validators.required, Validators.minLength(3)]],
      favoritesGames: this.fb.array([
        ['Metal Gear', Validators.required],
        ['Half Life', Validators.required],
        ['Star Craft', Validators.required],
      ])
    })

  }

  onSubmit(): void{
    if ( this.myForm.invalid ) {
      this.myForm.markAllAsTouched();
      return;
    }

    console.log(this.myForm.value);

    //TODO falta reestablecer los campos del formulario
    (this.myForm.controls['favoritesGames'] as FormArray ) = this.fb.array([]);
    //(this.myForm.controls['favoritesGames'] ) = new FormArray([]);
    this.myForm.reset()



  }

  get favoriteGames() {
    return this.myForm.get('favoritesGames') as FormArray;
  }

  isValidField( field: string): boolean| null{
    return this.myForm.controls[field].errors
      && this.myForm.controls[field].touched;
  }

  isValidFieldInArray( formArray: FormArray, index: number ){
    return formArray.controls[index].errors
      && formArray.controls[index].touched;
  }

  getFieldError( field:string):string | null{
    if (!this.myForm.controls[field]) return null;

    const errors = this.myForm.controls[field].errors || {};

    for (const key of Object.keys(errors)) {
      //recorro los distintos "keys" del objeto errors
      //recorro los distintos "keys" del objeto errors
      switch ( key ){
        case 'required':
          return 'Este campo es requerido';

        case 'minlength':
          return `Mínimo ${errors['minlength'].requiredLength} caracteres`;

          case 'min':
            return `Mínimo valor es 0`;
      }

    }


    return 'Hola mundo';

  }

  onDeleteFavorite( index:number ):void {
    this.favoriteGames.removeAt(index);
  }

  onAddToFavorites():void{
    if ( this.newFavorite.invalid ) return;

    const newGame = this.newFavorite.value;

    this.favoriteGames.push(
      this.fb.control( newGame, Validators.required)
    );

    this.newFavorite.reset();


  }




}
