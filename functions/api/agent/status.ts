import { json, options } from '../../_shared/http'

type Env = {
  AI?: unknown
  OPENAI_API_KEY?: string
  OPENAI_MODEL?: string
  AGENT_MODEL?: string
  FEDFUNDING_CACHE?: KVNamespace
  DB?: D1Database
}

export const onRequestGet: PagesFunction<Env> = async ({ env }) => {
  return json({
    source: 'ContractingPreacher AI Agent',
    live: Boolean(env.AI || env.OPENAI_API_KEY),
    checkedAt: new Date().toISOString(),
    llm: {
      cloudflareWorkersAiBinding: Boolean(env.AI),
      openAiFallbackConfigured: Boolean(env.OPENAI_API_KEY),
      model: env.AGENT_MODEL || env.OPENAI_MODEL || '@cf/meta/llama-3.1-8b-instruct',
    },
    tools: [
      'opportunity_discovery',
      'single_source_search',
      'open_data_enrichment',
      'crm_readiness_guidance',
      'source_status',
    ],
    bindings: {
      d1: Boolean(env.DB),
      kvCache: Boolean(env.FEDFUNDING_CACHE),
    },
    warning: env.AI || env.OPENAI_API_KEY
      ? undefined
      : 'No LLM binding is configured yet. Add a Cloudflare Workers AI binding named AI or set OPENAI_API_KEY.',
  })
}

export const onRequestOptions: PagesFunction = async () => options()
