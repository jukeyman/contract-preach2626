import { json, options } from '../../_shared/http'

type Env = {
  SAM_API_KEY?: string
  SAMS_API_KEY?: string
  SIMPLER_GRANTS_API_KEY?: string
  DATA_GOV_API_KEY?: string
  OPEN_CORPORATES_API_KEY?: string
  OPENSANCTIONS_API_KEY?: string
  DB?: D1Database
  FEDFUNDING_CACHE?: KVNamespace
}

export const onRequestGet: PagesFunction<Env> = async ({ env }) => {
  return json({
    ok: true,
    checkedAt: new Date().toISOString(),
    bindings: {
      d1: Boolean(env.DB),
      kv: Boolean(env.FEDFUNDING_CACHE),
    },
    secrets: {
      sam: Boolean(env.SAM_API_KEY || env.SAMS_API_KEY),
      simplerGrants: Boolean(env.SIMPLER_GRANTS_API_KEY),
      dataGov: Boolean(env.DATA_GOV_API_KEY),
      usaspending: true,
      sbir: true,
      federalRegister: true,
      legacyGrantsSearch: true,
      openCorporates: Boolean(env.OPEN_CORPORATES_API_KEY),
      openSanctions: Boolean(env.OPENSANCTIONS_API_KEY),
      microlink: true,
      collegeScorecard: true,
      universitiesList: true,
      wikidata: true,
      wikipedia: true,
      archiveOrg: true,
      teleport: true,
    },
    warning:
      'This endpoint reports configuration only. It does not verify entity status, certification eligibility, or legal requirements.',
  })
}

export const onRequestOptions: PagesFunction = async () => options()
