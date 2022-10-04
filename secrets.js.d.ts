interface SecretsConfig {
  radix: number
  bits: number
  maxShares: number
  hasCSPRNG: boolean
  typeCSPRNG: string
}

interface ShareComponents {
  bits: number
  id: number
  data: string
}

type RNGType =
  | "nodeCryptoRandomBytes"
  | "browserCryptoGetRandomValues"
  | "testRandom"

type Shares = Array<string>

interface Share {
  x: number
  y: number
}

type RNGFunction = (bits: number) => string

/**
 * Initialize secrets with default settings.
 */
export function init(bits: number, rngType: string): void

/**
 * Get the current config.
 */
export function getConfig(): SecretsConfig

/**
 * Evaluates the Lagrange interpolation polynomial at x=`at` for individual
 * config.bits-length segments of each share in the `shares` Array. Each
 * share is expressed in base `inputRadix`. The output is expressed in base
 * `outputRadix'.
 */
export function combine(shares: Shares, at?: number): string

/**
 * Given a public share, extract the bits (Integer), share ID (Integer),
 * and share data (Hex) and return an Object containing those components.
 */
export function extractShareComponents(share: string): ShareComponents

/**
 * Set the PRNG to use. If no RNG function is supplied, pick a default using getRNG()
 * @param rng One of the acceptable RNG types.
 */
export function setRNG(rng?: RNGType): void

/**
 * Converts a given UTF16 character string to the HEX representation.
 * Each character of the input string is represented by
 * `bytesPerChar` bytes in the output string which defaults to 2.
 */
export function str2hex(str: string, bytesPerChar?: number): string

/**
 * Converts a given HEX number string to a UTF16 character string.
 * Each character of the output string is represented by
 * `bytesPerChar` bytes in the input string which defaults to 2.
 */
export function hex2str(str: string, bytesPerChar?: number): string

/**
 * Generates a random bits-length number string using the PRNG
 */
export function random(bits: number): string

/**
 * Divides a `secret` number String str expressed in radix `inputRadix` (optional, default 16)
 * into `numShares` shares, each expressed in radix `outputRadix` (optional, default to `inputRadix`),
 * requiring `threshold` number of shares to reconstruct the secret.
 * Optionally, zero-pads the secret to a length that is a multiple of padLength before sharing.
 */
export function share(
  secret: string,
  numShares: number,
  threshold: number,
  padLength?: number
): Shares

/**
 * Generate a new share with id `id` (a number between 1 and 2^bits-1)
 * `id` can be a Number or a String in the default radix (16)
 */
export function newShare(id: number, shares: Shares): string

export function _reset(): void

/**
 * Pads a string `str` with zeros on the left so that its length is a multiple of `bits`
 */
export function _padLeft(str: string, multipleOfBits?: number): string

export function _hex2bin(str: string): string
export function _bin2hex(str: string): string

/**
 * Returns a pseudo-random number generator of the form function(bits){}
 * which should output a random string of 1's and 0's of length `bits`.
 * `type` (Optional) : A string representing the CSPRNG that you want to
 * force to be loaded, overriding feature detection. Can be one of:
 *    "nodeCryptoRandomBytes"
 *    "browserCryptoGetRandomValues"
 */
export function _getRNG(type?: RNGType): RNGFunction

export function _isSetRNG(): boolean

/**
 * Splits a number string `bits`-length segments, after first
 * optionally zero-padding it to a length that is a multiple of `padLength.
 * Returns array of integers (each less than 2^bits-1), with each element
 * representing a `bits`-length segment of the input string from right to left,
 * i.e. parts[0] represents the right-most `bits`-length segment of the input string.
 */
export function _splitNumStringToIntArray(
  str: string,
  padLength?: number
): Array<number>

/**
 * Polynomial evaluation at `x` using Horner's Method
 * NOTE: fx=fx * x + coeff[i] ->  exp(log(fx) + log(x)) + coeff[i],
 *       so if fx===0, just set fx to coeff[i] because
 *       using the exp/log form will result in incorrect value
 */
export function _horner(x: number, coeffs: number): number

/**
 * Evaluate the Lagrange interpolation polynomial at x = `at`
 * using x and y Arrays that are of the same length, with
 * corresponding elements constituting points on the polynomial.
 */
export function _lagrange(
  at: number,
  x: Array<number>,
  y: Array<number>
): number

/**
 * This is the basic polynomial generation and evaluation function
 * for a `config.bits`-length secret (NOT an arbitrary length)
 * Note: no error-checking at this stage! If `secret` is NOT
 * a NUMBER less than 2^bits-1, the output will be incorrect!
 */
export function _getShares(
  secret: number,
  numShares: number,
  threshold: number
): Array<Share>

export function _constructPublicShareString(
  bits: string,
  id: string,
  data: string
): string
