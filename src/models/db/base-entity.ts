export interface IActive {
  isActive: boolean;
}

export interface IDefault {
  isDefault: boolean;
}

export interface IDelete {
  isDeleted: boolean;
}

export interface IIsVerified {
  isVerified: boolean;
}

export interface ICms {
  cmsId: string;
}

export interface IOrg {
  orgId: string;
}

export interface IOwner {
  companyId: string;
  orgId: string;
}

export interface IUser {
  userId: string;
}

export interface BaseEntity extends IActive {
  id: string;
  createdBy: string;
  createdAt: Date;
  updatedBy: string;
  updatedAt: Date;
}
