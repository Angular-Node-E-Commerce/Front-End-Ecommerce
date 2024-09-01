import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormsModule, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CategoriesService } from '../../../services/categories-request.service';

@Component({
  selector: 'app-add-categry',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './add-categry.component.html',
  styleUrl: './add-categry.component.css'
})
export class AddCategryComponent {
  category = {
    name: '',
    description: '',
    image: null as File | null
  };
  registerForm: FormGroup;

  constructor(private router: Router, private categoriesService: CategoriesService, private fb: FormBuilder) {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', [Validators.required, Validators.minLength(30)]],
      image: [null, Validators.required]
    })
   }
  
  get name(){ return this.registerForm.get('name');}
  get description(){ return this.registerForm.get('description')}
  get image() { return this.registerForm.get('image'); }


  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      this.category.image = event.target.files[0];
    }
  }

  onSubmit() {
    const formData = new FormData();
    formData.append('name', this.category.name);
    formData.append('description', this.category.description);
    if (this.category.image) {
      formData.append('image', this.category.image);
    }  

    formData.forEach((value, key) => {
      console.log(key + ': ' + value);
    });

    console.log(formData);

    this.categoriesService.addCategory(formData).subscribe({
      next: (res: any) => {
        console.log('Category added successfully', res);
        this.category = { name: '', description: '', image: null };
        this.router.navigate(['/admin-categories']);
      },
      error: (error) => {
        console.error('Error adding category', error);
      }
    });
  }
}
