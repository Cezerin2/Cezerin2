import { RouterContext } from "@koa/router"
import { ensureDir } from "fs-extra"
import koaBody from "koa-body"
import { resolve } from "path"
import slug from "slug"
import SitemapService from "../services/sitemap"

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

export default {
  cleanSlug: cleanSlug,
  getAvailableSlug: getAvailableSlug,
  getCorrectFileName: getCorrectFileName,
  getProjectionFromFields: getProjectionFromFields,
}
