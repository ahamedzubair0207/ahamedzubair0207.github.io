import { UserGuestOrganization } from './../../../models/userprofile.model';
import { OrganizationService } from './../../../services/organizations/organization.service';
import { Organization } from './../../../models/organization.model';
import { UserService } from './../../../services/users/userService';
import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserRole } from 'src/app/models/user-role';
import { Toaster } from '../../shared/votm-cloud-toaster/votm-cloud-toaster';
import { ToastrService } from 'ngx-toastr';
import { UserProfile } from 'src/app/models/userprofile.model';
import { TouchSequence } from 'selenium-webdriver';
declare var $: any;
@Component({
  selector: 'app-votm-cloud-admin-user-management',
  templateUrl: './votm-cloud-admin-user-management.component.html',
  styleUrls: ['./votm-cloud-admin-user-management.component.scss']
})
export class VotmCloudAdminUserManagementComponent implements OnInit, OnDestroy {

  pageType: string;
  userForm: FormGroup;
  roles: UserRole[] = [];
  organizations: Organization[] = [];
  toaster: Toaster = new Toaster(this.toastr);
  isGetUsersAPILoading = false;
  isCreateUserAPILoading = false;
  users: UserProfile[] = [];
  selectedUserForEdit: UserProfile;
  selectedUsers: UserProfile[] = [];
  selectedUserForGuestAccess: string;
  selectedOrgForGuestAccess: Organization;

  constructor(
    private userService: UserService,
    private organizationService: OrganizationService,
    private toastr: ToastrService,
  ) { }

  ngOnInit() {
    this.getUsers();
    this.getRoles();
    this.getOrganizations();
  }

  getUsers() {
    this.isGetUsersAPILoading = true;
    this.userService.getAllUsers().subscribe(
      response => {
        this.users = response;
        this.isGetUsersAPILoading = false;
      }, error => {
        this.isGetUsersAPILoading = false;
      }
    );
  }

  getRoles() {
    this.userService.getUserRoles().subscribe(
      response => this.roles = response
    );
  }

  getOrganizations() {
    this.organizationService.getAllOrganizationsList().subscribe(
      response => this.organizations = response
    );
  }

  onClickOfUserCheckBox(userObj) {
    if (this.selectedUsers.length === 0) {
      this.selectedUsers.push(userObj);
    } else {
      const index = this.selectedUsers.findIndex(user => user.userId === userObj.userId);
      if (index === -1) {
        this.selectedUsers.push(userObj);
      } else {
        this.selectedUsers.splice(index, 1);
      }
    }
    console.log(this.selectedUsers);
  }

  onClickOfSelectAllCheckBox() {

    if (this.selectedUsers.length !== this.users.length) {
      this.selectedUsers = [];
      this.selectedUsers = [...this.users];
    } else {
      this.selectedUsers = [];
    }
    console.log(this.selectedUsers);
  }

  onClickOfAddUser() {
    this.pageType = 'add';
    this.userForm = new FormGroup({
      firstName: new FormControl(null, [Validators.required]),
      lastName: new FormControl(null, [Validators.required]),
      emailId: new FormControl(null, [Validators.required]),
      roleId: new FormControl(null, [Validators.required]),
      phoneNumber: new FormControl(null),
      organizationId: new FormControl(null, [Validators.required]),
      roleName: new FormControl(null),
      organizationName: new FormControl(null)
    });
  }

  onClickOfCloseAddUserModal() {
    $('.modal.fade.in');
    $('#cus_add_user').modal('hide');
    this.userForm = undefined;
    this.selectedUserForEdit = undefined;
  }

  onClickOfSubmitUser() {
    this.isCreateUserAPILoading = true;
    const userObj = {...this.userForm.value};
    this.roles.forEach(role => {
      if (role.roleId === userObj.roleId) {
        userObj.roleName = role.roleName;
      }
    });
    this.organizations.forEach(organization => {
      if (organization.organizationId === userObj.organizationId) {
        userObj.organizationName = organization.name;
      }
    });
    let userSubmitMethod = this.userService.createUser(userObj);
    if (this.pageType === 'edit') {
      userObj.userId = this.selectedUserForEdit.userId;
      userObj.userGuestOrganization = this.selectedUserForEdit.userGuestOrganization;
      userSubmitMethod = this.userService.updateUser(userObj);
    }
    console.log(JSON.stringify(userObj));
    userSubmitMethod.subscribe(
      response => {
        this.toaster.onSuccess('Successfully ' + this.pageType === 'add' ? 'created' : 'updated',
          this.pageType === 'add' ? 'Created' : 'Updated');
        this.isCreateUserAPILoading = false;
        this.onClickOfCloseAddUserModal();
        this.getUsers();
      }, error => {
        this.isCreateUserAPILoading = false;
        this.toaster.onFailure('Error while ' +  this.pageType === 'add' ? 'creating' : 'updating' + ' User',
          this.pageType === 'add' ? 'Created' : 'Updated');
      }
    );
  }

  onChangeOfGuestUser() {
    const user = this.users.find(userObj => userObj.userId === this.selectedUserForGuestAccess);
    this.selectedUserForEdit = user;
  }

  onClickOfGrantGuestAccess() {
    const grantAccessObj = {
      userId: this.selectedUserForEdit.userId,
      roleId: this.selectedUserForEdit.roleId,
      roleName: this.selectedUserForEdit.roleName,
      organizationId: this.selectedOrgForGuestAccess.organizationId,
      organizationName: this.selectedUserForEdit.organizationName,
      locationId: this.selectedUserForEdit.locationId,
      active: this.selectedUserForEdit.active
    };
    this.userService.addUserGuestOrganization(grantAccessObj).subscribe(
      response => {
        this.toaster.onSuccess('Guest access granted successfully.', 'Granted');
        this.onClickOfGrantAccessModalClose();
        this.getUsers();
      }, error => {
        this.toaster.onFailure('Error in granting guest access.', 'Granted');
        this.onClickOfGrantAccessModalClose();
      }
    );
  }

  onClickOfGrantAccessModalClose() {
    this.pageType = undefined;
    $('.modal.fade.in');
    $('#grant_guest_access').modal('hide');

    this.selectedOrgForGuestAccess = undefined;
    this.selectedUserForEdit = undefined;
    this.selectedUserForGuestAccess = undefined;
  }

  onClickOfEditUser(user) {
    this.pageType = 'edit';
    this.userService.getUserDetail(user.userId).subscribe(
      response => {
        this.selectedUserForEdit = response;
        this.userForm = new FormGroup({
          firstName: new FormControl(this.selectedUserForEdit.firstName, [Validators.required]),
          lastName: new FormControl(this.selectedUserForEdit.lastName, [Validators.required]),
          emailId: new FormControl(this.selectedUserForEdit.emailId, [Validators.required]),
          roleId: new FormControl(this.selectedUserForEdit.roleId, [Validators.required]),
          phoneNumber: new FormControl(this.selectedUserForEdit.phoneNumber),
          organizationId: new FormControl(this.selectedUserForEdit.organizationId, [Validators.required]),
          roleName: new FormControl(this.selectedUserForEdit.roleName),
          organizationName: new FormControl(this.selectedUserForEdit.organizationName)
        });
        console.log(JSON.stringify(this.selectedUserForEdit));
      }
    );
  }


  onClickOfRemoveGuestAccess(guestIndex) {
    this.selectedUserForEdit.userGuestOrganization.splice(guestIndex, 1);
    // ermaining API call
  }

  onClickOfDeleteUser(userObj) {
    this.userService.deleteUser(userObj.userId).subscribe(
      response => {
        this.toaster.onSuccess('Successfully deleted.', 'Deleted');
        this.getUsers();
      }, error => {
        this.toaster.onFailure('Error while deleting user.', 'Deleted');
      }
    );
  }

  ngOnDestroy(): void {
    $('.modal.fade.in');
    $('#grant_guest_access').modal('hide');
    $('#cus_add_user').modal('hide');

  }
}
