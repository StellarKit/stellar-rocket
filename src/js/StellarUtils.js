const StellarSdk = require('stellar-sdk')
const $ = require('jquery')
import StellarServer from './StellarServer.js'

export default class StellarUtils {
  constructor() {
    this.s = new StellarServer()
  }

  server() {
    return this.s.server()
  }

  friendBotServer() {
    return this.s.friendBotServer()
  }

  lumins() {
    return StellarSdk.Asset.native()
  }

  assetFromObject(object) {
    if (!object.asset_issuer) {
      return StellarSdk.Asset.native()
    }

    return new StellarSdk.Asset(object.asset_code, object.asset_issuer)
  }

  toStr(object) {
    if (object instanceof Error) {
      const json = JSON.stringify(object, null, '  ')

      // seems to return {} when it fails?
      const obj = JSON.parse(json)
      if (Object.keys(obj).length > 0) {
        return json
      }

      return object.toString()
    } else if (typeof object === 'string') {
      return object
    } else if (typeof object === 'object') {
      return JSON.stringify(object, null, '  ')
    }

    return typeof object
  }

  log(object) {
    console.log(this.toStr(object))
  }

  api() {
    return this.s.serverAPI()
  }

  horizonMetrics() {
    return this.api().horizonMetrics()
  }

  accountInfo(publicKey) {
    return this.api().accountInfo(publicKey)
  }

  balances(publicKey) {
    return this.api().balances(publicKey)
  }

  mergeAccount(sourceSecret, destKey) {
    return this.api().mergeAccount(sourceSecret, destKey)
  }

  manageOffer(sourceSecret, buying, selling, amount, price, offerID = 0) {
    return this.api().manageOffer(sourceSecret, buying, selling, amount, price, offerID)
  }

  setTrustForAsset(sourceSecret, asset, amount) {
    return this.api().setTrustForAsset(sourceSecret, asset, amount)
  }

  setDomain(sourceSecret, domain) {
    return this.api().setDomain(sourceSecret, domain)
  }

  makeMultiSig(sourceSecret, publicKey) {
    return this.api().makeMultiSig(sourceSecret, publicKey)
  }

  sendAsset(sourceSecret, destKey, amount, asset = null, memo = null, additionalSigners = null) {
    return this.api().sendAsset(sourceSecret, destKey, amount, asset, memo, additionalSigners)
  }

  buyTokens(sourceSecret, sendAsset, destAsset, sendMax, destAmount) {
    return this.api().buyTokens(sourceSecret, sendAsset, destAsset, sendMax, destAmount)
  }

  lockAccount(sourceSecret) {
    return this.api().lockAccount(sourceSecret)
  }

  setOptions(sourceSecret, options) {
    return this.api().setOptions(sourceSecret, options)
  }
}
