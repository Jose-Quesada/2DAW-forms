import { Component } from '@angular/core';
import { Router } from '@angular/router';

interface MenuItem {
  title: string;
  route: string;
}


@Component({
  selector: 'shared-side-menu',
  templateUrl: './side-menu.component.html',
  styles: ``
})
export class SideMenuComponent {

  constructor(private router:Router){}

  public reactiveMenu: MenuItem[]= [
    {title: 'Básicos', route: './reactive/basic'},
    {title: 'Dinámicos', route: './reactive/dynamic'},
    {title: 'Switches', route: './reactive/switches'},
  ];

  public authMenu: MenuItem[]= [
    {title: 'Registro', route: './auth'},
  ];



}
