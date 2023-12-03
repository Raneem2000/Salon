export interface IContentPermission {
  id: string;
  name: string;
  canAdd: boolean;
  canEdit: boolean;
  canDelete: boolean;
  canView: boolean;
  canDownload: boolean;
}

export interface IPermissionGet {
  roleId: string;
  roleName: string;
  contents: IContentPermission[];
}