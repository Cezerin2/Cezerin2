import { RouterContext } from "@koa/router"
import axios, { AxiosResponse } from "axios"
import { ensureDir } from "fs-extra"
import koaBody from "koa-body"
import { resolve } from "path"
import slug from "slug"
import SitemapService from "../services/sitemap"
import serverSettings from "./settings"

const slugConfig = {
  symbols: false, // replace unicode symbols or not
  remove: null, // (optional) regex to remove characters
  lower: true, // result in lower case
}

const cleanSlug = text => {
  return slug(text || "", slugConfig)
}

const getAvailableSlug = (path, resource?, enableCleanPath = true) => {
  return SitemapService.getPaths().then(paths => {
    if (enableCleanPath) {
      path = cleanSlug(path)
    }

    let pathExists = paths.find(
      e => e.path === "/" + path && e.resource != resource
    )
    while (pathExists) {
      path += "-2"
      pathExists = paths.find(
        e => e.path === "/" + path && e.resource != resource
      )
    }
    return path
  })
}

const getCorrectFileName = (filename: string) => {
  if (filename) {
    // replace unsafe characters
    return filename.replace(/[\s*/:;&?@$()<>#%\{\}|\\\^\~\[\]]/g, "-")
  } else {
    return filename
  }
}

const getProjectionFromFields = fields => {
  const fieldsArray = fields && fields.length > 0 ? fields.split(",") : []
  return Object.assign({}, ...fieldsArray.map(key => ({ [key]: 1 })))
}

export const URLResolve = (from: string, to: string) => {
  const resolvedUrl = new URL(to, new URL(from, "resolve://"))
  if (resolvedUrl.protocol === "resolve:") {
    // `from` is a relative URL.
    const { pathname, search, hash } = resolvedUrl
    return pathname + search + hash
  }
  return resolvedUrl.toString()
}

export interface SaveFileReturn {
  newFilename: string
  size: number
}

export const saveFile = async <Multiples extends boolean>(
  ctx: RouterContext,
  uploadDir: string,
  multiples?: Multiples
) => {
  await ensureDir(resolve(uploadDir))
  await koaBody({
    formidable: { keepExtensions: true, multiples, uploadDir },
    multipart: true,
  })(ctx, async () => undefined)

  const files = ctx.request.files?.file

  if (!files) return ctx.throw("Required fields are missing!", 400)

  const arrayReturn: SaveFileReturn[] = Array.isArray(files)
    ? files.map(({ newFilename, size }) => ({
        newFilename,
        size,
      }))
    : [{ newFilename: files.newFilename, size: files.size }]

  const value = multiples ? arrayReturn : arrayReturn[0]
  return value as Multiples extends true ? SaveFileReturn[] : SaveFileReturn
}

interface Hash {
  password: string
  iterations?: number
  memory?: number
}

export const hash = async (password: string) => {
  const { data } = await axios.post<string, AxiosResponse<string>, Hash>(
    "https://crypto.services.ansiglobal.com/hash",
    {
      password,
      memory: 2 ** serverSettings.hashMemory,
    },
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  )

  return data
}

interface Compare {
  hash: string
  password: string
}

export const compare = async (password: string, passwordHash: string) => {
  const { status } = await axios.post<string, AxiosResponse<string>, Compare>(
    "https://crypto.services.ansiglobal.com/compare",
    { hash: passwordHash, password },
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  )

  return status === 200
}

export default {
  cleanSlug: cleanSlug,
  getAvailableSlug: getAvailableSlug,
  getCorrectFileName: getCorrectFileName,
  getProjectionFromFields: getProjectionFromFields,
}
