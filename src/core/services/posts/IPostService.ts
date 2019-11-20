import {User} from 'core/domain/users';
import {Post} from 'core/domain/posts';

/**
 * Post service interface
 *
 * @export
 * @interface IPostService
 */
export interface IPostService {
  addPost: (post: Post, postBody: Post) => Promise<string>;
  updatePost: (post: Post, postBody: Post) => Promise<void>;
  deletePost: (postId: string) => Promise<void>;
  getFeaturedPosts: () => Promise<{posts: {[postId: string]: Post}[]}>;
  getAllPosts: (
    lastPostId: string,
    page: number,
    limit: number,
  ) => Promise<{posts: {[postId: string]: Post}[]; newLastPostId: string}>;
  getAllPostsByTopic: (
    header: string,
    lastPostId: string,
    page: number,
    limit: number,
  ) => Promise<{posts: {[postId: string]: Post}[]; newLastPostId: string}>;
  getPosts: (
    currentUserId: string,
    lastPostId: string,
    page: number,
    limit: number,
  ) => Promise<{posts: {[postId: string]: Post}[]; newLastPostId: string}>;

  /**
   * Get list of post by user identifier
   */
  getPostsByUserId: (
    userId: string,
    lastPostId?: string,
    page?: number,
    limit?: number,
  ) => Promise<{posts: {[postId: string]: Post}[]; newLastPostId: string}>;

  /**
   * Get post by the post identifier
   */
  getPostById: (postId: string) => Promise<Post>;

  getPostBodyById: (postId: string) => Promise<Post>;
}
