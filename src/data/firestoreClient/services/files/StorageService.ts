import {storageRef} from 'data/firestoreClient';
import {IStorageService} from 'core/services/files';
import {FileResult} from 'models/files/fileResult';
import {injectable} from 'inversify';

@injectable()
export class StorageService implements IStorageService {
  /**
   * Upload image on the server
   * @param {file} file
   * @param {string} fileName
   */
  public uploadFile = (
    file: any,
    dir: string,
    fileName: string,
    progress: (percentage: number, status: boolean) => void,
  ) => {
    return new Promise<FileResult>((resolve, reject) => {
      // Create a storage refrence
      let storegeFile = storageRef.child(`${dir}/${fileName}`);

      // Upload file
      let task = storegeFile.put(file);
      task
        .then(result => {
          result.ref
            .getDownloadURL()
            .then(downloadURL => {
              resolve(new FileResult(downloadURL, result.metadata.fullPath));
            })
            .catch(error => {
              reject(error);
            });
        })
        .catch(error => {
          reject(error);
        });

      // Upload storage bar
      task.on(
        'state_changed',
        (snapshot: any) => {
          let percentage: number =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          progress(percentage, true);
        },
        error => {
          console.log('========== Upload Image ============');
          console.log(error);
          console.log('====================================');
        },
        () => {
          progress(100, false);
        },
      );
    });
  };
}
