import { Injectable } from '@angular/core'
import * as CryptoJS from 'crypto-js'
import { environment } from '../../../environments/environment'

@Injectable({
  providedIn: 'root',
})
export class CryptService {
  public static crypt(data) {
    if (typeof data === 'object') {
      data = JSON.stringify(data)
    }
    return CryptoJS.AES.encrypt(data, environment.crypt.ytfasf)
      .toString()
      .split('/')
      .join(environment.crypt.udhesaw)
  }

  public static decrypt(id, json) {
    const dec = CryptoJS.AES.decrypt(
      id.split(environment.crypt.udhesaw).join('/'),
      environment.crypt.ytfasf
    ).toString(CryptoJS.enc.Utf8)
    if (json) {
      return JSON.parse(dec)
    }
    return dec
  }

  public static sha1(v) {
    return CryptoJS.SHA1(v).toString()
  }
}
