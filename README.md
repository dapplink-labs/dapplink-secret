<!--
parent:
  order: false
-->

<div align="center">
  <h1> Savour Secret repo </h1>
</div>

<div align="center">
  <a href="https://github.com/savour-labs/dapplink-secret/releases/latest">
    <img alt="Version" src="https://img.shields.io/github/tag/savour-labs/dapplink-secret.svg" />
  </a>
  <a href="https://github.com/savour-labs/dapplink-secret/blob/main/LICENSE">
    <img alt="License: Apache-2.0" src="https://img.shields.io/github/license/savour-labs/dapplink-secret.svg" />
  </a>
</div>

dapplink-secret is an implementation of [Shamir's threshold secret sharing scheme](http://en.wikipedia.org/wiki/Shamir's_Secret_Sharing) in JavaScript, for Node.js and browsers with both Global variable and AMD module loading support.

It can be used to split any "secret" (i.e. a password, text file, Bitcoin private key, anything) into _n_ number of "shares" (each the same size in bits as the original secret), requiring that exactly any number _t_ ("threshold") of them be present to reconstruct the original secret.

This is a fork of the original excellent code created by `amper5and` on Github. The [original dapplink-secret can be found there](https://github.com/savour-labs/dapplink-secret/).

## Install

### Install dependencies
```bash
npm install
```
### build
```bash
npm run build
```

### example
```bash
const savoursecret = require("dapplink-secret")

const key = savoursecret.random(512)
console.log("key=", key)

const head_body = savoursecret.share(key, 2, 2)
console.log("head_body=", head_body)

const body = head_body[1]
const shares = savoursecret.share(body, 10, 5)
console.log("shares=", shares)

const body_recover = savoursecret.combine(shares.slice(4, 9))
console.log("body_recover=", body_recover)

const shares_recover = [body_recover, head_body[0]]
const key_recover = savoursecret.combine(shares_recover)
console.log("key_recover=", key_recover)
```

### api

- savour_secret.share()
- savour_secret.combine()
- savour_secret.newShare()
- savour_secret.init()
- savour_secret.getConfig()
- savour_secret.extractShareComponents()
- savour_secret.setRNG()
- savour_secret.random()
- savour_secret.str2hex()
- savour_secret.hex2str()
- savour_secret.xorShare()
- savour_secret.inverseXor()

## Contribute

### 1.fork repo

fork dapplink-secret to your github

### 2.clone repo

```bash
git@github.com:guoshijiang/dapplink-secret.git
```

### 3. create new branch and commit code

```bash
git branch -C xxx
git checkout xxx

coding

git add .
git commit -m "xxx"
git push origin xxx
```

### 4.commit PR

Have a pr on your github and submit it to the savour-hd repository

### 5.review

After the dapplink-secret code maintainer has passed the review, the code will be merged into the dapplink-secret library. At this point, your PR submission is complete




