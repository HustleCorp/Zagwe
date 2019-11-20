import {IPostService} from 'src/core/services/posts';
import {SocialProviderTypes} from 'src/core/socialProviderTypes';
import {provider} from 'src/socialEngine';
import {db} from 'data/firestoreClient';

const postService: IPostService = provider.get<IPostService>(
  SocialProviderTypes.PostService,
);

// TODO secutiry flow here, will ned to be fixed
export const addToFeatured: (postId: string) => Promise<void> = (
  postId: string,
) => {
  return new Promise<void>((resolve, reject) => {
    postService.getPostById(postId).then(post => {
      db.collection('featuredPosts')
        .doc(postId)
        .set({id: postId});
    });
  });
};

// TODO secutiry flow here, will ned to be fixed
export const removeFromFeatured: (postId: string) => Promise<void> = (
  postId: string,
) => {
  return new Promise<void>((resolve, reject) => {
    postService.getPostById(postId).then(post => {
      db.collection('featuredPosts')
        .doc(postId)
        .delete();
    });
  });
};
