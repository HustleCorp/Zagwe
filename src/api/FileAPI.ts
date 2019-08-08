import { storageRef } from 'data/firestoreClient'
import {SocialError} from 'core/domain/common'

// - Get file Extension
const getExtension = (fileName: string) => {
  let re: RegExp = /(?:\.([^.]+))?$/
  return re.exec(fileName)![1]
}

const getThumbUrl = (  imagePath: string) => {
   const [folder, image] = imagePath.split('/')
   return  new Promise<string | null> ((resolve, reject) => {
          storageRef.child(`${folder}/thumb@128_${image}`).getDownloadURL().then( (url) => {
                    resolve(url)
              }).catch((error) => {
                  console.log(error)
                  resolve(null)
                  // reject(new SocialError(error.code, 'FileAPI/getThumbUrl :' + error.message))
                  
             })
     })
   }

// Converts image to canvas returns new canvas element
const convertImageToCanvas = (image: HTMLImageElement | HTMLCanvasElement | HTMLVideoElement | ImageBitmap) => {
  let canvas = document.createElement('canvas')
  canvas.width = image.width
  canvas.height = image.height
  canvas.getContext('2d')!.drawImage(image, 0, 0)

  return canvas
}

/**
 * Constraint image size
 * @param {file} file
 * @param {number} maxWidth
 * @param {number} maxHeight
 */
const constraintImage = async (file: File,fileName: string, maxWidth?: number, maxHeight?: number) => {
    // Ensure it's an image
  return new Promise<{_resizedImage: Blob, _fileName: string}>((resolve, reject) => {  
  if (file.type.match(/image.*/)) {
        // Load the image
    let reader = new FileReader()
    reader.onload = (readerEvent: any) => {
      let image = new Image()
      image.onload = (imageEvent: Event) => {

                // Resize the image
        let canvas: HTMLCanvasElement = document.createElement('canvas')
        let maxSize: number = 986// TODO : pull max size from a site config
        let width: number = image.width
        let height: number = image.height
        if (width > height) {
          if (width > maxSize) {
            height *= maxSize / width
            width = maxSize
          }
       } else {
          if (height > maxSize) {
            width *= maxSize / height
            height = maxSize
          }
        }
        canvas.width = width
        canvas.height = height
        canvas.getContext('2d')!.drawImage(image, 0, 0, width, width)
        let dataUrl =  canvas.toDataURL()
        let resizedImage = dataURLToBlob(dataUrl)
        resolve({_resizedImage: resizedImage, _fileName: fileName})
        let evt = new CustomEvent('onSendResizedImage', { detail: {resizedImage,fileName} })
        window.dispatchEvent(evt)
        
      }
      image.src = readerEvent.target.result
    }
     reader.readAsDataURL(file)
    
  }
})
}

/**
 * Convert data URL to blob
 * @param {object} dataURL
 */
const dataURLToBlob = (dataURL: string) => {

  let BASE64_MARKER = 'base64,'
  if (dataURL.indexOf(BASE64_MARKER) === -1) {
    let parts = dataURL.split(',')
    let contentType = parts[0].split(':')[1]
    let raw = parts[1]

    return new Blob([raw], {type: contentType})
  }

  let parts = dataURL.split(BASE64_MARKER)
  let contentType = parts[0].split(':')[1]
  let raw = window.atob(parts[1])
  let rawLength = raw.length

  let uInt8Array = new Uint8Array(rawLength)

  for (let i = 0 ;i < rawLength; ++i) {
    uInt8Array[i] = raw.charCodeAt(i)
  }

  return new Blob([uInt8Array], {type: contentType})
}

export default {
  getThumbUrl,
  dataURLToBlob,
  convertImageToCanvas,
  getExtension,
  constraintImage

}
