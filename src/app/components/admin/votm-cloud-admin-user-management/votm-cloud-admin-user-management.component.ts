import { OrganizationService } from './../../../services/organizations/organization.service';
import { Organization } from './../../../models/organization.model';
import { UserService } from './../../../services/users/userService';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { UserRole } from 'src/app/models/user-role';

@Component({
  selector: 'app-votm-cloud-admin-user-management',
  templateUrl: './votm-cloud-admin-user-management.component.html',
  styleUrls: ['./votm-cloud-admin-user-management.component.scss']
})
export class VotmCloudAdminUserManagementComponent implements OnInit {

  userForm: FormGroup;
  roles: UserRole[] = [];
  organizations: Organization[] = [];

  constructor(
    private userService: UserService,
    private organizationService: OrganizationService
  ) { }

  ngOnInit() {
    this.getRoles();
    this.getOrganizations();
  }

  getRoles() {
    this.userService.getUserRoles().subscribe(
      response => {
        this.roles = response;
      }
    );
  }

  getOrganizations() {
    this.organizationService.getAllOrganizations().subscribe(
      response => {
        this.organizations = response;
      }
    );
  }

  onClickOfAddUser() {
    this.userForm = new FormGroup({
      firstName: new FormControl(null),
      lastName: new FormControl(null),
      emailId: new FormControl(null),
      roleId: new FormControl(null),
      phoneNumber: new FormControl(null)
    });
  }

  onClickOfSubmitUser() {
    console.log(this.userForm.value);
  }

}
