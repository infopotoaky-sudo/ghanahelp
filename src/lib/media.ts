/**
 * Media assets for the Ghana Help Hub demo.
 * Images are generated brand photography; demo-reel videos come from
 * Google's long-lived public sample bucket and are clearly labelled
 * "sample footage" in the UI.
 */
export const media = {
  /** Young Ghanaian electrician in green overalls — hero visual */
  heroElectrician:
    "https://image.qwenlm.ai/generated-images/11672608-d852-4efa-b89c-6089d74c825f/_result.png",
  /** Radio host at a studio microphone — radio section */
  radioHost:
    "https://image.qwenlm.ai/generated-images/237360bf-0ca2-4306-bbd1-97c6002db775/_result.png",
  /** Tailor showing kente fabric to a customer — about page */
  workshop:
    "https://image.qwenlm.ai/generated-images/79a3b61c-d8fa-4a00-9081-2de82f3456a4/_result.png",
  /** Hands holding a phone with the GHH app + kente — video poster */
  appHands:
    "https://image.qwenlm.ai/generated-images/787dfdc7-b4cb-478d-9ea1-282d402e38d1/_result.png",
  /** Golden-hour Ghanaian market scene — second video poster */
  market:
    "https://image.qwenlm.ai/generated-images/20422b73-fd6e-423a-b49d-a9187d02fd5d/_result.png",

  /** Demo reel #1 — "See it in action" (home) */
  demoVideo:
    "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
  /** Demo reel #2 — "The spirit we're building for" (about) */
  demoVideoTwo:
    "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
} as const;
