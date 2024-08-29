import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersRequestService } from '../../../services/users-request.service';

@Component({
  selector: 'app-admin-orders',
  standalone: true,
  imports: [],
  templateUrl: './admin-orders.component.html',
  styleUrl: './admin-orders.component.css'
})
export class AdminOrdersComponent {



  users: any[] = [];
  error: string | null = null;

  constructor(private usersRequestService: UsersRequestService) {}

  ngOnInit(): void {
    this.usersRequestService.getUsers().subscribe((res: any) => {
      console.log('Data received from service:', res);
      this.handleData(res);
    });
  }

  handleData(data: any) {
    this.users = data;
  }




}
