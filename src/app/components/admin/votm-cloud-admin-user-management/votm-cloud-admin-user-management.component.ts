import { SharedService } from './../../../services/shared.service';
import { UserGuestOrganization } from './../../../models/userprofile.model';
import { OrganizationService } from './../../../services/organizations/organization.service';
import { Organization } from './../../../models/organization.model';
import { UserService } from './../../../services/users/userService';
import { Component, OnInit, Input, OnDestroy, ViewChild, AfterViewInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserRole } from 'src/app/models/user-role';
import { Toaster } from '../../shared/votm-cloud-toaster/votm-cloud-toaster';
import { ToastrService } from 'ngx-toastr';
import { UserProfile } from 'src/app/models/userprofile.model';
import { TouchSequence } from 'selenium-webdriver';
import { VotmCloudConfimDialogComponent } from '../../shared/votm-cloud-confim-dialog/votm-cloud-confim-dialog.component';
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
  selectedUserForDelete: UserProfile;
  selectedUsers: UserProfile[] = [];
  selectedUserForGuestAccess: string;
  selectedOrgForGuestAccess: Organization;
  @ViewChild('confirmDelUser', null) confirmDelUser: VotmCloudConfimDialogComponent;
  @ViewChild('confirmUserStatus', null) confirmUserStatus: VotmCloudConfimDialogComponent;
  confirmUserStatusMessage = '';
  confirmDelUserMessage = '';
  customizePermissionsModal: any;
  userModal: any;
  grantGuestAccessModal: any;
  searchedText: string;

  constructor(
    private userService: UserService,
    private organizationService: OrganizationService,
    private toastr: ToastrService,
    private sharedService: SharedService
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
        response.forEach(user => user.name = user.firstName + ' ' + user.lastName);
        this.users = response;
        this.isGetUsersAPILoading = false;
      }, error => {
        this.isGetUsersAPILoading = false;
      }
    );
  }

  onUserSearch() {
    this.isGetUsersAPILoading = true;
    if (this.searchedText) {
      this.userService.searchUsers(this.searchedText).subscribe(
        response => {
          response.forEach(user => user.name = user.firstName + ' ' + user.lastName);
          this.users = response;
          this.isGetUsersAPILoading = false;
        }, error => {
          this.isGetUsersAPILoading = false;
        }
      );
    } else {
      this.getUsers();
    }
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
  }

  onClickOfSelectAllCheckBox() {

    if (this.selectedUsers.length !== this.users.length) {
      this.selectedUsers = [];
      this.selectedUsers = [...this.users];
    } else {
      this.selectedUsers = [];
    }
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
      organizationName: new FormControl(null),
      active: new FormControl(true)
    });
    const modal = document.getElementById('add_user');
    modal.style.display = 'block';
    this.userModal = document.getElementById('add_user');
    window.onclick =  (event) => {
      if (event.target === modal) {
        modal.style.display = 'none';
      }
    };
  }

  onClickOfUserDetails(user) {
    this.onClickOfEditUser(user, 'view');
  }

  onClickOfCloseAddUserModal() {
    this.userModal.style.display = 'none';
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
    userSubmitMethod.subscribe(
      response => {
        this.toaster.onSuccess('Successfully ' + (this.pageType === 'add' ? 'created' : 'updated'),
          this.pageType === 'add' ? 'Created' : 'Updated');
        this.isCreateUserAPILoading = false;
        this.onClickOfCloseAddUserModal();
        this.getUsers();
      }, error => {
        this.isCreateUserAPILoading = false;
        this.toaster.onFailure('Error while ' +  (this.pageType === 'add' ? 'creating' : 'updating') + ' User',
          this.pageType === 'add' ? 'Created' : 'Updated');
      }
    );
  }

  onChangeOfGuestUser() {
    const user = this.users.find(userObj => userObj.userId === this.selectedUserForGuestAccess);
    this.selectedUserForEdit = user;
    const modal = document.getElementById('grant_guest_access');
    modal.style.display = 'block';
    this.grantGuestAccessModal = document.getElementById('grant_guest_access');
    window.onclick =  (event) => {
      if (event.target === modal) {
        modal.style.display = 'none';
      }
    };
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
        this.toaster.onFailure('Error in granting guest access.', 'Not Granted!');
        this.onClickOfGrantAccessModalClose();
      }
    );
  }

  onClickOfGrantAccessModalClose() {
    this.pageType = undefined;
    this.grantGuestAccessModal.style.display = 'none';
    this.selectedOrgForGuestAccess = undefined;
    this.selectedUserForEdit = undefined;
    this.selectedUserForGuestAccess = undefined;
  }

  onClickOfCustomizePermissions() {
    const modal = document.getElementById('cus_data_per');
    modal.style.display = 'block';
    this.customizePermissionsModal = document.getElementById('cus_data_per');
    window.onclick =  (event) => {
      if (event.target === modal) {
        modal.style.display = 'none';
      }
    };
  }

  onClickOfCustomizePermissionModalClose() {
    this.customizePermissionsModal.style.display = 'none';
  }

  onClickOfEditUser(user, type) {
    this.pageType = type;
    this.userService.getUserDetail(user.userId).subscribe(
      response => {
        this.selectedUserForEdit = response;
        this.userForm = new FormGroup({
          firstName: new FormControl({ value: this.selectedUserForEdit.firstName, disabled: type === 'view'}, [Validators.required]),
          lastName: new FormControl({value: this.selectedUserForEdit.lastName, disabled: type === 'view'}, [Validators.required]),
          emailId: new FormControl({value: this.selectedUserForEdit.emailId, disabled: type === 'view'}, [Validators.required]),
          roleId: new FormControl({value: this.selectedUserForEdit.roleId, disabled: type === 'view'}, [Validators.required]),
          phoneNumber: new FormControl({ value: this.selectedUserForEdit.phoneNumber, disabled: type === 'view'}),
          organizationId: new FormControl({ value: this.selectedUserForEdit.organizationId, disabled: type === 'view'},
          [Validators.required]),
          roleName: new FormControl(this.selectedUserForEdit.roleName),
          organizationName: new FormControl(this.selectedUserForEdit.organizationName),
          active: new FormControl(this.selectedUserForEdit.active)
        });
        const modal = document.getElementById('add_user');
        modal.style.display = 'block';
        this.userModal = document.getElementById('add_user');
        window.onclick =  (event) => {
          if (event.target === modal) {
            modal.style.display = 'none';
          }
        };
      }, error => {
        if (!user.status) {
          this.toaster.onFailure(type + ' functionality is not available for Deactivated user.', 'Association');
        }
      }
    );
  }


  onClickOfRemoveGuestAccess(guestIndex) {
    this.selectedUserForEdit.userGuestOrganization.splice(guestIndex, 1);
    // ermaining API call
  }

  onClickOfConfirmDeleteUser(user) {
    this.selectedUserForDelete = user;
    this.confirmDelUserMessage = 'Are you sure, you want to delete this ' +
      this.sharedService.toTitleCase(user.firstName) + ' ' +
      this.sharedService.toTitleCase(user.lastName) + ' User?';
    this.confirmDelUser.open();
  }

  onClickOfDeleteUser(event) {
    if (event) {
      this.userService.deleteUser(this.selectedUserForDelete.userId, 'delete').subscribe(
        response => {
          this.toaster.onSuccess('Successfully deleted.', 'Deleted');
          this.getUsers();
          this.selectedUserForDelete = undefined;
        }, error => {
          this.toaster.onFailure('Error while deleting user.', 'Deleted');
          this.selectedUserForDelete = undefined;
        }
      );
    }
  }

  onClickOfConfirmUserStatus(user) {
    this.selectedUserForEdit = user;
    this.confirmUserStatusMessage = 'Are you sure, you want to ' +
      (user.active ? 'Deactivate' : 'Activate') + ' this ' +
      this.sharedService.toTitleCase(user.firstName) + ' ' +
      this.sharedService.toTitleCase(user.lastName) + ' User?';
    this.confirmUserStatus.open();
  }

  onClickOfChangeUserStatus(event) {
    if (event) {
      const userObj = {
        ...this.selectedUserForEdit
      };
      userObj.active = !userObj.active;
      this.userService.deleteUser(this.selectedUserForEdit.userId, 'status').subscribe(
        response => {
          this.toaster.onSuccess('Successfully updated', 'Updated');
          this.getUsers();
        }, error => {
          this.toaster.onFailure('Error while updating User', 'Updated');
        }
      );
    }
  }

  ngOnDestroy(): void {
    if (this.userModal) {
      this.userModal.style.display = 'none';
    }
    if (this.grantGuestAccessModal) {
      this.grantGuestAccessModal.style.display = 'none';
    }
    if (this.customizePermissionsModal) {
      this.customizePermissionsModal.style.display = 'none';
    }
  }
}
