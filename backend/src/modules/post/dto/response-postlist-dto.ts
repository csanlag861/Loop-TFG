import { PaginationMetadataDto } from './pagination-metadata-dto';
import { ResponsePostDto } from './response-post.dto';

export class ResponsePostlistDto {
    list: ResponsePostDto[];
    metadata: PaginationMetadataDto;
}
