type Scalars = {
  readonly ID: string;
  readonly Boolean: boolean;
  readonly String: string;
  readonly Int: number;
  readonly Float: number;
  readonly JSON: import('@keystone-next/types').JSONValue;
};

export type LoomVideoRelateToManyInput = {
  readonly create?: ReadonlyArray<LoomVideoCreateInput | null> | null;
  readonly connect?: ReadonlyArray<LoomVideoWhereUniqueInput | null> | null;
  readonly disconnect?: ReadonlyArray<LoomVideoWhereUniqueInput | null> | null;
  readonly disconnectAll?: Scalars['Boolean'] | null;
};

export type UserWhereInput = {
  readonly AND?: ReadonlyArray<UserWhereInput | null> | null;
  readonly OR?: ReadonlyArray<UserWhereInput | null> | null;
  readonly id?: Scalars['ID'] | null;
  readonly id_not?: Scalars['ID'] | null;
  readonly id_in?: ReadonlyArray<Scalars['ID'] | null> | null;
  readonly id_not_in?: ReadonlyArray<Scalars['ID'] | null> | null;
  readonly name?: Scalars['String'] | null;
  readonly name_not?: Scalars['String'] | null;
  readonly name_contains?: Scalars['String'] | null;
  readonly name_not_contains?: Scalars['String'] | null;
  readonly name_starts_with?: Scalars['String'] | null;
  readonly name_not_starts_with?: Scalars['String'] | null;
  readonly name_ends_with?: Scalars['String'] | null;
  readonly name_not_ends_with?: Scalars['String'] | null;
  readonly name_i?: Scalars['String'] | null;
  readonly name_not_i?: Scalars['String'] | null;
  readonly name_contains_i?: Scalars['String'] | null;
  readonly name_not_contains_i?: Scalars['String'] | null;
  readonly name_starts_with_i?: Scalars['String'] | null;
  readonly name_not_starts_with_i?: Scalars['String'] | null;
  readonly name_ends_with_i?: Scalars['String'] | null;
  readonly name_not_ends_with_i?: Scalars['String'] | null;
  readonly name_in?: ReadonlyArray<Scalars['String'] | null> | null;
  readonly name_not_in?: ReadonlyArray<Scalars['String'] | null> | null;
  readonly email?: Scalars['String'] | null;
  readonly email_not?: Scalars['String'] | null;
  readonly email_contains?: Scalars['String'] | null;
  readonly email_not_contains?: Scalars['String'] | null;
  readonly email_starts_with?: Scalars['String'] | null;
  readonly email_not_starts_with?: Scalars['String'] | null;
  readonly email_ends_with?: Scalars['String'] | null;
  readonly email_not_ends_with?: Scalars['String'] | null;
  readonly email_i?: Scalars['String'] | null;
  readonly email_not_i?: Scalars['String'] | null;
  readonly email_contains_i?: Scalars['String'] | null;
  readonly email_not_contains_i?: Scalars['String'] | null;
  readonly email_starts_with_i?: Scalars['String'] | null;
  readonly email_not_starts_with_i?: Scalars['String'] | null;
  readonly email_ends_with_i?: Scalars['String'] | null;
  readonly email_not_ends_with_i?: Scalars['String'] | null;
  readonly email_in?: ReadonlyArray<Scalars['String'] | null> | null;
  readonly email_not_in?: ReadonlyArray<Scalars['String'] | null> | null;
  readonly image?: Scalars['String'] | null;
  readonly image_not?: Scalars['String'] | null;
  readonly image_contains?: Scalars['String'] | null;
  readonly image_not_contains?: Scalars['String'] | null;
  readonly image_starts_with?: Scalars['String'] | null;
  readonly image_not_starts_with?: Scalars['String'] | null;
  readonly image_ends_with?: Scalars['String'] | null;
  readonly image_not_ends_with?: Scalars['String'] | null;
  readonly image_i?: Scalars['String'] | null;
  readonly image_not_i?: Scalars['String'] | null;
  readonly image_contains_i?: Scalars['String'] | null;
  readonly image_not_contains_i?: Scalars['String'] | null;
  readonly image_starts_with_i?: Scalars['String'] | null;
  readonly image_not_starts_with_i?: Scalars['String'] | null;
  readonly image_ends_with_i?: Scalars['String'] | null;
  readonly image_not_ends_with_i?: Scalars['String'] | null;
  readonly image_in?: ReadonlyArray<Scalars['String'] | null> | null;
  readonly image_not_in?: ReadonlyArray<Scalars['String'] | null> | null;
  readonly password_is_set?: Scalars['Boolean'] | null;
  readonly sentLooms_every?: LoomVideoWhereInput | null;
  readonly sentLooms_some?: LoomVideoWhereInput | null;
  readonly sentLooms_none?: LoomVideoWhereInput | null;
  readonly receivedLooms_every?: LoomVideoWhereInput | null;
  readonly receivedLooms_some?: LoomVideoWhereInput | null;
  readonly receivedLooms_none?: LoomVideoWhereInput | null;
  readonly passwordResetToken_is_set?: Scalars['Boolean'] | null;
  readonly passwordResetIssuedAt?: Scalars['String'] | null;
  readonly passwordResetIssuedAt_not?: Scalars['String'] | null;
  readonly passwordResetIssuedAt_lt?: Scalars['String'] | null;
  readonly passwordResetIssuedAt_lte?: Scalars['String'] | null;
  readonly passwordResetIssuedAt_gt?: Scalars['String'] | null;
  readonly passwordResetIssuedAt_gte?: Scalars['String'] | null;
  readonly passwordResetIssuedAt_in?: ReadonlyArray<
    Scalars['String'] | null
  > | null;
  readonly passwordResetIssuedAt_not_in?: ReadonlyArray<
    Scalars['String'] | null
  > | null;
  readonly passwordResetRedeemedAt?: Scalars['String'] | null;
  readonly passwordResetRedeemedAt_not?: Scalars['String'] | null;
  readonly passwordResetRedeemedAt_lt?: Scalars['String'] | null;
  readonly passwordResetRedeemedAt_lte?: Scalars['String'] | null;
  readonly passwordResetRedeemedAt_gt?: Scalars['String'] | null;
  readonly passwordResetRedeemedAt_gte?: Scalars['String'] | null;
  readonly passwordResetRedeemedAt_in?: ReadonlyArray<
    Scalars['String'] | null
  > | null;
  readonly passwordResetRedeemedAt_not_in?: ReadonlyArray<
    Scalars['String'] | null
  > | null;
  readonly magicAuthToken_is_set?: Scalars['Boolean'] | null;
  readonly magicAuthIssuedAt?: Scalars['String'] | null;
  readonly magicAuthIssuedAt_not?: Scalars['String'] | null;
  readonly magicAuthIssuedAt_lt?: Scalars['String'] | null;
  readonly magicAuthIssuedAt_lte?: Scalars['String'] | null;
  readonly magicAuthIssuedAt_gt?: Scalars['String'] | null;
  readonly magicAuthIssuedAt_gte?: Scalars['String'] | null;
  readonly magicAuthIssuedAt_in?: ReadonlyArray<
    Scalars['String'] | null
  > | null;
  readonly magicAuthIssuedAt_not_in?: ReadonlyArray<
    Scalars['String'] | null
  > | null;
  readonly magicAuthRedeemedAt?: Scalars['String'] | null;
  readonly magicAuthRedeemedAt_not?: Scalars['String'] | null;
  readonly magicAuthRedeemedAt_lt?: Scalars['String'] | null;
  readonly magicAuthRedeemedAt_lte?: Scalars['String'] | null;
  readonly magicAuthRedeemedAt_gt?: Scalars['String'] | null;
  readonly magicAuthRedeemedAt_gte?: Scalars['String'] | null;
  readonly magicAuthRedeemedAt_in?: ReadonlyArray<
    Scalars['String'] | null
  > | null;
  readonly magicAuthRedeemedAt_not_in?: ReadonlyArray<
    Scalars['String'] | null
  > | null;
};

export type UserWhereUniqueInput = {
  readonly id: Scalars['ID'];
};

export type SortUsersBy =
  | 'id_ASC'
  | 'id_DESC'
  | 'name_ASC'
  | 'name_DESC'
  | 'email_ASC'
  | 'email_DESC'
  | 'image_ASC'
  | 'image_DESC'
  | 'sentLooms_ASC'
  | 'sentLooms_DESC'
  | 'receivedLooms_ASC'
  | 'receivedLooms_DESC'
  | 'passwordResetIssuedAt_ASC'
  | 'passwordResetIssuedAt_DESC'
  | 'passwordResetRedeemedAt_ASC'
  | 'passwordResetRedeemedAt_DESC'
  | 'magicAuthIssuedAt_ASC'
  | 'magicAuthIssuedAt_DESC'
  | 'magicAuthRedeemedAt_ASC'
  | 'magicAuthRedeemedAt_DESC';

export type UserUpdateInput = {
  readonly name?: Scalars['String'] | null;
  readonly email?: Scalars['String'] | null;
  readonly image?: Scalars['String'] | null;
  readonly password?: Scalars['String'] | null;
  readonly sentLooms?: LoomVideoRelateToManyInput | null;
  readonly receivedLooms?: LoomVideoRelateToManyInput | null;
  readonly passwordResetToken?: Scalars['String'] | null;
  readonly passwordResetIssuedAt?: Scalars['String'] | null;
  readonly passwordResetRedeemedAt?: Scalars['String'] | null;
  readonly magicAuthToken?: Scalars['String'] | null;
  readonly magicAuthIssuedAt?: Scalars['String'] | null;
  readonly magicAuthRedeemedAt?: Scalars['String'] | null;
};

export type UsersUpdateInput = {
  readonly id: Scalars['ID'];
  readonly data?: UserUpdateInput | null;
};

export type UserCreateInput = {
  readonly name?: Scalars['String'] | null;
  readonly email?: Scalars['String'] | null;
  readonly image?: Scalars['String'] | null;
  readonly password?: Scalars['String'] | null;
  readonly sentLooms?: LoomVideoRelateToManyInput | null;
  readonly receivedLooms?: LoomVideoRelateToManyInput | null;
  readonly passwordResetToken?: Scalars['String'] | null;
  readonly passwordResetIssuedAt?: Scalars['String'] | null;
  readonly passwordResetRedeemedAt?: Scalars['String'] | null;
  readonly magicAuthToken?: Scalars['String'] | null;
  readonly magicAuthIssuedAt?: Scalars['String'] | null;
  readonly magicAuthRedeemedAt?: Scalars['String'] | null;
};

export type UsersCreateInput = {
  readonly data?: UserCreateInput | null;
};

export type UserRelateToOneInput = {
  readonly create?: UserCreateInput | null;
  readonly connect?: UserWhereUniqueInput | null;
  readonly disconnect?: UserWhereUniqueInput | null;
  readonly disconnectAll?: Scalars['Boolean'] | null;
};

export type LoomVideoWhereInput = {
  readonly AND?: ReadonlyArray<LoomVideoWhereInput | null> | null;
  readonly OR?: ReadonlyArray<LoomVideoWhereInput | null> | null;
  readonly id?: Scalars['ID'] | null;
  readonly id_not?: Scalars['ID'] | null;
  readonly id_in?: ReadonlyArray<Scalars['ID'] | null> | null;
  readonly id_not_in?: ReadonlyArray<Scalars['ID'] | null> | null;
  readonly sharedUrl?: Scalars['String'] | null;
  readonly sharedUrl_not?: Scalars['String'] | null;
  readonly sharedUrl_contains?: Scalars['String'] | null;
  readonly sharedUrl_not_contains?: Scalars['String'] | null;
  readonly sharedUrl_starts_with?: Scalars['String'] | null;
  readonly sharedUrl_not_starts_with?: Scalars['String'] | null;
  readonly sharedUrl_ends_with?: Scalars['String'] | null;
  readonly sharedUrl_not_ends_with?: Scalars['String'] | null;
  readonly sharedUrl_i?: Scalars['String'] | null;
  readonly sharedUrl_not_i?: Scalars['String'] | null;
  readonly sharedUrl_contains_i?: Scalars['String'] | null;
  readonly sharedUrl_not_contains_i?: Scalars['String'] | null;
  readonly sharedUrl_starts_with_i?: Scalars['String'] | null;
  readonly sharedUrl_not_starts_with_i?: Scalars['String'] | null;
  readonly sharedUrl_ends_with_i?: Scalars['String'] | null;
  readonly sharedUrl_not_ends_with_i?: Scalars['String'] | null;
  readonly sharedUrl_in?: ReadonlyArray<Scalars['String'] | null> | null;
  readonly sharedUrl_not_in?: ReadonlyArray<Scalars['String'] | null> | null;
  readonly embedUrl?: Scalars['String'] | null;
  readonly embedUrl_not?: Scalars['String'] | null;
  readonly embedUrl_contains?: Scalars['String'] | null;
  readonly embedUrl_not_contains?: Scalars['String'] | null;
  readonly embedUrl_starts_with?: Scalars['String'] | null;
  readonly embedUrl_not_starts_with?: Scalars['String'] | null;
  readonly embedUrl_ends_with?: Scalars['String'] | null;
  readonly embedUrl_not_ends_with?: Scalars['String'] | null;
  readonly embedUrl_i?: Scalars['String'] | null;
  readonly embedUrl_not_i?: Scalars['String'] | null;
  readonly embedUrl_contains_i?: Scalars['String'] | null;
  readonly embedUrl_not_contains_i?: Scalars['String'] | null;
  readonly embedUrl_starts_with_i?: Scalars['String'] | null;
  readonly embedUrl_not_starts_with_i?: Scalars['String'] | null;
  readonly embedUrl_ends_with_i?: Scalars['String'] | null;
  readonly embedUrl_not_ends_with_i?: Scalars['String'] | null;
  readonly embedUrl_in?: ReadonlyArray<Scalars['String'] | null> | null;
  readonly embedUrl_not_in?: ReadonlyArray<Scalars['String'] | null> | null;
  readonly title?: Scalars['String'] | null;
  readonly title_not?: Scalars['String'] | null;
  readonly title_contains?: Scalars['String'] | null;
  readonly title_not_contains?: Scalars['String'] | null;
  readonly title_starts_with?: Scalars['String'] | null;
  readonly title_not_starts_with?: Scalars['String'] | null;
  readonly title_ends_with?: Scalars['String'] | null;
  readonly title_not_ends_with?: Scalars['String'] | null;
  readonly title_i?: Scalars['String'] | null;
  readonly title_not_i?: Scalars['String'] | null;
  readonly title_contains_i?: Scalars['String'] | null;
  readonly title_not_contains_i?: Scalars['String'] | null;
  readonly title_starts_with_i?: Scalars['String'] | null;
  readonly title_not_starts_with_i?: Scalars['String'] | null;
  readonly title_ends_with_i?: Scalars['String'] | null;
  readonly title_not_ends_with_i?: Scalars['String'] | null;
  readonly title_in?: ReadonlyArray<Scalars['String'] | null> | null;
  readonly title_not_in?: ReadonlyArray<Scalars['String'] | null> | null;
  readonly sender?: UserWhereInput | null;
  readonly sender_is_null?: Scalars['Boolean'] | null;
  readonly receiver?: UserWhereInput | null;
  readonly receiver_is_null?: Scalars['Boolean'] | null;
};

export type LoomVideoWhereUniqueInput = {
  readonly id: Scalars['ID'];
};

export type SortLoomVideosBy =
  | 'id_ASC'
  | 'id_DESC'
  | 'sharedUrl_ASC'
  | 'sharedUrl_DESC'
  | 'embedUrl_ASC'
  | 'embedUrl_DESC'
  | 'title_ASC'
  | 'title_DESC'
  | 'sender_ASC'
  | 'sender_DESC'
  | 'receiver_ASC'
  | 'receiver_DESC';

export type LoomVideoUpdateInput = {
  readonly sharedUrl?: Scalars['String'] | null;
  readonly embedUrl?: Scalars['String'] | null;
  readonly title?: Scalars['String'] | null;
  readonly sender?: UserRelateToOneInput | null;
  readonly receiver?: UserRelateToOneInput | null;
};

export type LoomVideosUpdateInput = {
  readonly id: Scalars['ID'];
  readonly data?: LoomVideoUpdateInput | null;
};

export type LoomVideoCreateInput = {
  readonly sharedUrl?: Scalars['String'] | null;
  readonly embedUrl?: Scalars['String'] | null;
  readonly title?: Scalars['String'] | null;
  readonly sender?: UserRelateToOneInput | null;
  readonly receiver?: UserRelateToOneInput | null;
};

export type LoomVideosCreateInput = {
  readonly data?: LoomVideoCreateInput | null;
};

export type _ksListsMetaInput = {
  readonly key?: Scalars['String'] | null;
  readonly auxiliary?: Scalars['Boolean'] | null;
};

export type _ListSchemaFieldsInput = {
  readonly type?: Scalars['String'] | null;
};

export type PasswordAuthErrorCode =
  | 'FAILURE'
  | 'IDENTITY_NOT_FOUND'
  | 'SECRET_NOT_SET'
  | 'MULTIPLE_IDENTITY_MATCHES'
  | 'SECRET_MISMATCH';

export type CreateInitialUserInput = {
  readonly name?: Scalars['String'] | null;
  readonly email?: Scalars['String'] | null;
  readonly password?: Scalars['String'] | null;
};

export type KeystoneAdminUIFieldMetaCreateViewFieldMode = 'edit' | 'hidden';

export type KeystoneAdminUIFieldMetaListViewFieldMode = 'read' | 'hidden';

export type KeystoneAdminUIFieldMetaItemViewFieldMode =
  | 'edit'
  | 'read'
  | 'hidden';

export type KeystoneAdminUISortDirection = 'ASC' | 'DESC';

export type UserListTypeInfo = {
  key: 'User';
  fields:
    | 'id'
    | 'name'
    | 'email'
    | 'image'
    | 'password'
    | 'sentLooms'
    | 'receivedLooms'
    | 'passwordResetToken'
    | 'passwordResetIssuedAt'
    | 'passwordResetRedeemedAt'
    | 'magicAuthToken'
    | 'magicAuthIssuedAt'
    | 'magicAuthRedeemedAt';
  backing: {
    readonly id: string;
    readonly name?: string | null;
    readonly email?: string | null;
    readonly image?: string | null;
    readonly password?: string | null;
    readonly sentLooms?: string | null;
    readonly receivedLooms?: string | null;
    readonly passwordResetToken?: string | null;
    readonly passwordResetIssuedAt?: Date | null;
    readonly passwordResetRedeemedAt?: Date | null;
    readonly magicAuthToken?: string | null;
    readonly magicAuthIssuedAt?: Date | null;
    readonly magicAuthRedeemedAt?: Date | null;
  };
  inputs: {
    where: UserWhereInput;
    create: UserCreateInput;
    update: UserUpdateInput;
  };
  args: {
    listQuery: {
      readonly where?: UserWhereInput | null;
      readonly sortBy?: ReadonlyArray<SortUsersBy> | null;
      readonly first?: Scalars['Int'] | null;
      readonly skip?: Scalars['Int'] | null;
    };
  };
};

export type UserListFn = (
  listConfig: import('@keystone-next/keystone/schema').ListConfig<
    UserListTypeInfo,
    UserListTypeInfo['fields']
  >
) => import('@keystone-next/keystone/schema').ListConfig<
  UserListTypeInfo,
  UserListTypeInfo['fields']
>;

export type LoomVideoListTypeInfo = {
  key: 'LoomVideo';
  fields: 'id' | 'sharedUrl' | 'embedUrl' | 'title' | 'sender' | 'receiver';
  backing: {
    readonly id: string;
    readonly sharedUrl?: string | null;
    readonly embedUrl?: string | null;
    readonly title?: string | null;
    readonly sender?: string | null;
    readonly receiver?: string | null;
  };
  inputs: {
    where: LoomVideoWhereInput;
    create: LoomVideoCreateInput;
    update: LoomVideoUpdateInput;
  };
  args: {
    listQuery: {
      readonly where?: LoomVideoWhereInput | null;
      readonly sortBy?: ReadonlyArray<SortLoomVideosBy> | null;
      readonly first?: Scalars['Int'] | null;
      readonly skip?: Scalars['Int'] | null;
    };
  };
};

export type LoomVideoListFn = (
  listConfig: import('@keystone-next/keystone/schema').ListConfig<
    LoomVideoListTypeInfo,
    LoomVideoListTypeInfo['fields']
  >
) => import('@keystone-next/keystone/schema').ListConfig<
  LoomVideoListTypeInfo,
  LoomVideoListTypeInfo['fields']
>;

export type KeystoneListsTypeInfo = {
  readonly User: UserListTypeInfo;
  readonly LoomVideo: LoomVideoListTypeInfo;
};
