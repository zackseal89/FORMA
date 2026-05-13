/**
 * Stitch placeholder image URLs.
 * Marketing-only assets that don't belong in Shopify. Product imagery is
 * fetched from the Storefront API — do not add product placeholders here.
 *
 * `lh3()` appends `=w<HD_WIDTH>-rw` (googleusercontent's resize hint) so
 * next/image derives device-appropriate variants from the high-res source.
 */

const HD_WIDTH = 2400;
const lh3 = (id: string) =>
  `https://lh3.googleusercontent.com/aida-public/${id}=w${HD_WIDTH}-rw`;

export const PLACEHOLDERS = {
  homeHero: "/home_hero.png",
  ourStory: "/founder_portrait.png",
  bento: lh3(
    "AB6AXuD4a1bY63O0PPAKMlITvKr_SbsUvUwByMARUNOs60Mw2FZldZsdEPRx-tAecxnieOHJVTwJbAKgI1KsGvlWld7_BHFPwE1aVx_eZjhKLub176PHPzMwZ7L3d31J7uJbnu4gDlRTq8n2sGRMLzlIsmL9iIEmqmSdNvLPbarwvC_pT3LPLViDItaedlSzwznRDYEyEedD_unLup6euPFQp4H2kB_dkViXqEeF5vRwXb1R1osKaXH1sWQzdk0Ilq-YI6tQUyAcXg5GyQYY",
  ),
  journalFeatured: lh3(
    "AB6AXuD5XvErIclEOXElzx8en7YdATSaMDDSOs9wddZArH8wW1I9vjlfAdBiqz4O99dFBjv0P0io6ny3po1eDkNHw1pfTgwdEd4k2zid4pWEcHBmDdp9BKw0kSUy_mCRIBEoonQqC6m1ZlerVevyL-BP48JA6C9p2oo3Es6hIJY-a_HgSsN2-BQ-WhpvnVb1U5iqgMM6rDT8nFw4FSRUddo9mK8Xs--HM5HvlLQiO31mkv3JrGvmlDcxukpRdeYVicmu_Coi8OWX8s5HNRHg",
  ),
  journalEntry1: lh3(
    "AB6AXuCF3eda6SfymbXFkEIojNdEJf9cVbKvjgecn3WkDJL0Na3pYlUsOr3qRgfK3yQFJVWjpUPoBw5zuYM5g5vfMyKumhDwRHNnGMfAXvKfAu0Qywax8R6UUoAFT3pla6P5qnNcte4EhdX4SUqVuj8ADHdP5Pt6M3_3jEdjhml0Ub_jOwOZGpaPCZYpw4ekqtj3jiZsCREse8QYNgH0R4vGi1mTsBU0Ub5O-sp25JT6R5wmMpyA4t63QIYq8UMV-hl9aUB6Ju_EmuhWo0mJ",
  ),
  journalEntry2: lh3(
    "AB6AXuAUKVfU3TpBLKN7jMVzRPIGTuYanq24eW8bGlmpgOMt-EFpAbVrh7lsfcvZiM1R6ZgCdOlCzuvKZE2hMKs6bZwSiQFjHnXhShwx4Jbsq5j-zOo-RFocijgimYweUNl-bwI0WWnLSaOc7BBdD81HPV8tMCphrqOaUpDut8GN-weH7XGBQQctcGpFeBjYreocDIw5xBNgMmtohAPSn4M2R_C9S9pLdxQI5yXTtrfOTNdEsT18_MVVh7UBM1idXKkCRppZnuQdR2BDDKVA",
  ),
  journalEntry3: lh3(
    "AB6AXuAvIS4IwNX1LtQVmyE402msLCL7G5wxkpH0QY7cdjXOmpb_lY9QXpOYQFojYHtCG6S9-umw_HmAAGcLPdFoRkwcMIfAeyI5HkTgChDJYkB7SnJ3H9zXmFGIQbKhSCn1N0B23AC9_kMgyh3eQ2KGMd3KdykJS_geRei6VLBMqprAss2tIafu9cNM0Xe8DqjQJ5u0tJXEhLToH3ksd5ZbhrREn1MSvHumu2qE3xi9dW5welzl7FCIEhTBfgg0_Z6yulINVlKA1vI71rpc",
  ),
  studioVisit: lh3(
    "AB6AXuC3USLB9Mk6ERGIj8RvTSXkNSf9bQza0_cfoVeNGwFRn2WGpd8H48mBvzjyDmD0cMf1wgXuP8tVgOy7MsNuq00J62RVivj4EvTkB1zd4oaynOEoKnyf0C05WyFRoiLCT4_db_lWnTKmy7ehsUCYaD1B7Q2K9gKDrpOrdFvS5CVza2vPJRXc6RBUHC8iq2Dy3jn1mq7q3FY9ZIgBKoaNLshQckQr7U6Ey_Dd5F0dwjl1muEoMvtV0Ra9LLRI2SVjOIYi_iwecIqecH-Z",
  ),
  measureBust: lh3(
    "AB6AXuAz4PY3q-8nnu5miZ4nhcDPutLVtZwCKSGcVMgoIbBPZ8EouIRtcePPR6B2uP5VD1TURmyazElqayjXcNjyhQDpho_4tgOduq02Du8N137PN7LHfoK9oOhLeAYVRR7uBbZOs4lQFYaL3_CATOSeG0GUiPq_Se2EBI7Q2h2BO46_xu01kcWpAMPhUbHUsYWt4-O29bKhu3crwL6j1ZMdmpzfPL7R-jcq-1eAGiTfg3cA9YtcW0fYcZfPV0gPzKLVgm53jbI_0KWllUvd",
  ),
  measureWaist: lh3(
    "AB6AXuAgEMcbgkQ4pFnx7sXcrwkQhIF67YHug9QLEJzanc45qkM4d1dCjkat5sz3Y4FrjaxsOlx0BWF15MKyZnaNv_zicZrUNce0PXdlJHB_vg-kw_DdKxqJc-lkvVgG0H6TcqvW6jdt8VswL8vapJIZ7XKFL6AEGp5DUwqx3F-DUIdPnsgFtoeoLMzngus9YA4F7xK_5AqKYhID9X1grgpWWDFxPd0_VlPqDA40A_HQvkwJv3v2XzTsiehiUz8v6LiCbWNECeMH2m5JQUjW",
  ),
  measureHips: lh3(
    "AB6AXuANLRWKqkf2E1-sH8kZrmYQ5Eu0bvEIh100vwJcsxmyzRIaEpWuAGbrxyzsYxwPDPeCVqJ_EhK3o7_eGveVRuNWvDdsIxDT9K4l6FtmtkMpwQDKO0i1axyve6FMy5fCYwT8oqOFUySrypNKsC2DTKkgcvkUbogJCWidXiFnFKggMdl2u1CxI3wxGxgnXDV07_1UyyXjCPRXsemwLKtpFolKkiglxAOywLVlveDMF5BgCFVixuLWVaFQp01CCPATJYd38U52SKzs4tPF",
  ),
} as const;

export type PlaceholderKey = keyof typeof PLACEHOLDERS;
