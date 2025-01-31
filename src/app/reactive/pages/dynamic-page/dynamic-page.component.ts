import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  templateUrl: './dynamic-page.component.html',
  styles: ``
})
export class DynamicPageComponent {

  public myForm: FormGroup ;

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
    if ( this.myForm.invalid ){
      this.myForm.markAllAsTouched();
      return;
    }

    console.log(this.myForm.value);
    this.myForm.reset();

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


}
