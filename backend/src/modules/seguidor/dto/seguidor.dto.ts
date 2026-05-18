export class SeguidorUserDto {
  id: number;
  username: string;
  nombre: string;
  avatarURL: string | null;
  isFollowing: boolean;
}

export class SeguidorPaginationMetadataDto {
  count: number;
  hasNextPage: boolean;
  cursor?: number;
}

export class ResponseSeguidorListDto {
  list: SeguidorUserDto[];
  metadata: SeguidorPaginationMetadataDto;
}
