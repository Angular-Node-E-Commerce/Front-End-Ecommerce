import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersRequestService } from '../../../services/users-request.service';

@Component({
  selector: 'app-admin-users',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-users.component.html',
  styleUrl: './admin-users.component.css'
})
export class AdminUsersComponent implements OnInit {
  users: any[] = [];
  error: string | null = null;
  message: string | null = null;

  constructor(private usersRequestService: UsersRequestService) {}

  ngOnInit(): void {
    this.usersRequestService.getUsers().subscribe({
      next: (res: any) => {
        console.log('Data received from users service:', res);
        if (res.data && Array.isArray(res.data.users)) {
          this.handleData(res.data.users);
        } else {
          console.error('Expected an array but received:', typeof res.data.users, res.data.users);
          this.error = 'Invalid data format received.';
        }
      },
      error: (error) => {
        console.error('Error fetching users:', error);
        this.error = error.message || 'An error occurred while fetching users.';
      }
    });
  }

  handleData(data: any[]) {
    this.users = data;
  }

  deleteUser(userId: string) {
    this.usersRequestService.deleteUser(userId).subscribe({
      next: () => {
        console.log('User deleted successfully');
        // Remove the deleted user from the local users array
        this.users = this.users.filter(user => user._id !== userId);
      },
      error: (error) => {
        console.error('Error deleting user:', error);
        this.error = typeof error === 'string' ? error : error.message || 'An error occurred while deleting the user.';
      }
    });
  }
}
