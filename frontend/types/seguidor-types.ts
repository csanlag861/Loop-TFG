export interface SeguidorUser {
  id: number;
  username: string;
  nombre: string;
  avatarURL: string | null;
  isFollowing: boolean;
}

export interface SeguidorListResponse {
  list: SeguidorUser[];
  metadata: {
    count: number;
    hasNextPage: boolean;
    cursor?: number;
  };
}
