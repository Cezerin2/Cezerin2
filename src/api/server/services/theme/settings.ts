import fse from "fs-extra"
import LRUCache from "lru-cache"
import path from "path"
import serverSettings from "../../lib/settings"

const cache = new LRUCache({
  max: 10000,
  ttl: 1000 * 60 * 60 * 24, // 24h
})

const themeSettingsCacheKey = "themesettings"
const settingsFile = path.resolve("theme/settings/settings.json")
const settingsSchemaFile = path.resolve(
  `theme/settings/${serverSettings.language}.json`
)
const settingsSchemaFileEn = path.resolve("theme/settings/en.json")

class ThemeSettingsService {
  readFile(file) {
    return new Promise((resolve, reject) => {
      fse.readFile(file, "utf8", (err, data) => {
        if (err) {
          reject(err)
        } else {
          let jsonData = {}
          try {
            jsonData = data.length > 0 ? JSON.parse(data) : {}
            resolve(jsonData)
          } catch (e) {
            reject("Failed to parse JSON")
          }
        }
      })
    })
  }

  writeFile(file, jsonData) {
    return new Promise<void>((resolve, reject) => {
      const stringData = JSON.stringify(jsonData)
      fse.writeFile(file, stringData, err => {
        if (err) {
          reject(err)
        } else {
          resolve()
        }
      })
    })
  }

  getSettingsSchema() {
    if (fse.existsSync(settingsSchemaFile)) {
      return this.readFile(settingsSchemaFile)
    }

    // If current locale not exist, use scheme in English
    return this.readFile(settingsSchemaFileEn)
  }

  getSettings() {
    const settingsFromCache = cache.get(themeSettingsCacheKey)

    if (settingsFromCache) {
      return Promise.resolve(settingsFromCache)
    }
    return this.readFile(settingsFile).then(settings => {
      cache.set(themeSettingsCacheKey, settings)
      return settings
    })
  }

  updateSettings(settings) {
    cache.set(themeSettingsCacheKey, settings)
    return this.writeFile(settingsFile, settings)
  }
}

export default new ThemeSettingsService()
